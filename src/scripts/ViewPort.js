var ViewPort = {

    init: function() {
        this.$element = $('.viewport');
        this.$container = $(window);
        this.$menu = $('.viewport__menu');
        this.$horizontalLetterBox = $('.letterbox__horizontal');
        this.$verticalLetterBox = $('.letterbox__vertical');

        this.settings = new Settings();
        this.tutorial = new Tutorial(this.settings);

        this.PAGE_MODE = 'PAGE_MODE';
        this.PANEL_ZOOM_MODE = 'PANEL_ZOOM_MODE';
        this.MODE = this.getInitalMode();
        this.PAGE_TURN_THRESHOLD = 0.25;
        this.LETTERBOX_STYLE = this.settings.get('letterboxing');
        this.LEFT_HAND_MODE = this.settings.get('leftHandMode');
        this.cmds = {};
        this.cmds.PAGE_BACK = 'PAGE_BACK';
        this.cmds.PAGE_FORWARD = 'PAGE_FORWARD';
        this.cmds.TOGGLE_MAIN_MENU = 'TOGGLE_MAIN_MENU';

        this.setEventListeners();
        this.setViewPortSize();
        this.setTapThresholds();

        if(this.MODE === this.PANEL_ZOOM_MODE) {
            Menu.activateOption('panel-zoom');
        }

        this.interactable = new Hammer.Manager(this.$element.find('.viewport__interactable')[0]);

        var pan = new Hammer.Pan({threshold: 20, enable: this.canRecognizePan.bind(this)});
        var pinch = new Hammer.Pinch({ threshold: 0 });
        var singletap = new Hammer.Tap({threshold: 2, posThreshold: 150});
        var doubletap = new Hammer.Tap({event: 'doubletap', taps: 2 });
        var swipe = new Hammer.Swipe({enable: this.canRecognizeSwipe.bind(this)});

        this.interactable.add([pan,singletap,doubletap,swipe]);

        //pinch.recognizeWith(pan);
        singletap.requireFailure(doubletap);

        $('body').on('touchend',function() {
            ViewPort.$menu.removeClass('viewport__menu--was-shown');
            if( ViewPort.$menu.hasClass('viewport__menu--active') ) {
                ViewPort.$menu.removeClass('viewport__menu--active').addClass('viewport__menu--was-shown');
            }
        });

        this.tutorial.on('done',this.onTutorialDone.bind(this));

        $('body').on('click', '[data-skip-to-page]', function(e) {
            var $this = $(e.currentTarget);
            var page = $this.attr('data-skip-to-page');
            $this.closest('.pane').find('[data-close]').trigger('click');
            Book.skipToPage(page);
        }.bind(this));

        $('body').on('click','[data-close]',function() {
            var $this = $(this);
            $this.closest('.pane').addClass('pane--hidden');
            $this.closest('.pane').find('.pane__content')[0].scrollTop = 0;
        });
    },

    onBookLoaded: function() {
        this.interactable.on('panend',function(ev) {
            var newPage = false;
            Book.pages.forEach(function(page) {
                if(page.shouldBeSetAsCurrent(ev)) {
                    Book.setCurrentPage(page);
                }
            });
            Book.snapPagesToCurrent();
        });
        this.interactable.on("tap", function(ev) {
            if( ev.tapCount >= 2 ) {
                return ViewPort.switchModes();
            }
            var cmd = ViewPort.findTapZone(ev.center.x,ev.center.y);
            if( cmd === ViewPort.cmds.PAGE_FORWARD ) {
                return Book.pageForward();
            }
            if( cmd === ViewPort.cmds.PAGE_BACK ) {
                return Book.pageBackward();
            }
            if( cmd === ViewPort.cmds.TOGGLE_MAIN_MENU ) {
                if( ! ViewPort.$menu.hasClass('viewport__menu--was-shown') ) {
                    ViewPort.$menu.addClass('viewport__menu--active');
                }
            }
        });
        this.interactable.on("swipeleft", function(ev) {
            if( this.MODE === this.PANEL_ZOOM_MODE ) {
                Book.pageForward();
            }
        });
        this.interactable.on("swiperight", function(ev) {
            if( this.MODE === this.PANEL_ZOOM_MODE ) {
                Book.pageBackward();
            }
        });

        this.settings.on('change:letterboxing',function(data){
            this.LETTERBOX_STYLE = data.value;
            this.setLetterBoxStyle();
        }.bind(this));

        this.settings.on('change:leftHandMode',function(data){
            this.LEFT_HAND_MODE = data.value;
            this.setTapThresholds();
        }.bind(this));

        $(window).on('resize orientationchange',this.onResize.bind(this));
    },

    onTutorialDone: function() {
        this.$menu.addClass('viewport__menu--active');
        this.message('The tutorial is always available in the settings menu at the bottom right.')
        setTimeout(function() {
            this.$menu.removeClass('viewport__menu--active');
        }.bind(this),5000);
    },

    getInitalMode: function() {
        if( this.settings.getLocalSetting('mode') ) {
            return this.settings.getLocalSetting('mode');
        }
        return this.settings.get('startInPanelZoom') ? this.PANEL_ZOOM_MODE : this.PAGE_MODE;
    },

    canRecognizePan: function(rec, input) {
        return this.MODE === this.PAGE_MODE;
    },

    canRecognizeSwipe: function(rec, input) {
        return this.MODE === this.PANEL_ZOOM_MODE;
    },

    setContainer: function($container) {
        this.$container = $container;
    },

    switchModes: function() {
        var mode = (this.MODE === this.PAGE_MODE)
            ? this.PANEL_ZOOM_MODE
            : this.PAGE_MODE;
        this.setMode(mode);
        this.settings.remember('mode',mode);
    },

    setMode: function(mode) {
        this.MODE = mode;
        if( mode === ViewPort.PAGE_MODE ) {
            Book.setForPageMode();
            Menu.deactivateOption('panel-zoom');
            //this.message('Page mode activated.');
        } else {
            Book.setForPanelZoomMode();
            Menu.activateOption('panel-zoom');
            //this.message('Panel Zoom mode activated.');
        }
    },

    setEventListeners: function() {
        this.$container.on('resize',this.setViewPortSize.bind(this));
    },

    setViewPortSize: function(e) {
        this.$element.width(this.$container.outerWidth());
        this.$element.height(this.$container.outerHeight());
    },

    setTapThresholds: function() {
        if(this.LEFT_HAND_MODE) {
            this.PAGE_BACK_MIN = this.getWidth() - (this.getWidth() * this.PAGE_TURN_THRESHOLD);
            this.PAGE_BACK_MAX = this.getWidth();
            this.PAGE_FORWARD_MIN = 0;
            this.PAGE_FORWARD_MAX = this.getWidth() * this.PAGE_TURN_THRESHOLD;
        } else {
            this.PAGE_FORWARD_MIN = this.getWidth() - (this.getWidth() * this.PAGE_TURN_THRESHOLD);
            this.PAGE_FORWARD_MAX = this.getWidth();
            this.PAGE_BACK_MIN = 0;
            this.PAGE_BACK_MAX = this.getWidth() * this.PAGE_TURN_THRESHOLD;
        }
    },

    findTapZone: function(x,y) {
        if( x >= this.PAGE_BACK_MIN && x <= this.PAGE_BACK_MAX) {
            return this.cmds.PAGE_BACK;
        }
        if( x >= this.PAGE_FORWARD_MIN && x <= this.PAGE_FORWARD_MAX) {
            return this.cmds.PAGE_FORWARD;
        }
        return this.cmds.TOGGLE_MAIN_MENU;
    },

    setLetterBoxing: function(height,width,animate) {
        var horizSize = height > 0 ? height / 2 : 0;
        var vertSize = width > 0 ? width / 2 : 0;
        var speed = this.settings.get('panelTransitions');
        animate = typeof animate === 'undefined' ? true : animate;
        this.$horizontalLetterBox.animate({
            height: horizSize
        },{
            duration: animate ? speed : 0,
            easing: 'easeOutSine'
        });
        this.$verticalLetterBox.animate({
            width: vertSize
        },{
            duration: animate ? speed : 0,
            easing: 'easeOutSine'
        });
    },

    setLetterBoxStyle: function() {
        var opacity = (this.LETTERBOX_STYLE === 'no'
            ? 0
            :(this.LETTERBOX_STYLE === 'opaque'
                ? 0.75
                : 1));

        this.$horizontalLetterBox.css('opacity',opacity);
        this.$verticalLetterBox.css('opacity',opacity);
    },

    getWidth: function() {
        return this.$element.outerWidth();
    },

    getHeight: function() {
        return this.$element.outerHeight();
    },

    message: function(text) {
        var $messageContainer = $('.viewport__message');
        var $message = $('.message__text');
        $message.text(text);
        $messageContainer.removeClass('viewport__message--hide');
        setTimeout(function() {
            $messageContainer.addClass('viewport__message--hide');
        },5000);
    },

    onResize: function(e) {
        this.setViewPortSize();
        this.setTapThresholds();
        Book.pages.forEach(function(page) {
            page.centerInViewPort(false);
            page.setLeftPosition(Book.currentPage.index);
            if( ViewPort.MODE === ViewPort.PANEL_ZOOM_MODE && page.currentPanel ) {
                page.zoomToPanel(page.currentPanel,false);
            }
        }.bind(this));
    }
};
