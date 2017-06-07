var ViewPort = {

    init: function(config) {
        this.app = config.app;
        this.$element = $('.viewport');
        this.$container = $(window);
        this.$menu = $('.viewport__menu');
        this.$horizontalLetterBox = $('.letterbox__horizontal');
        this.$verticalLetterBox = $('.letterbox__vertical');

        this.PAGE_TURN_THRESHOLD = 0.25;
        this.LETTERBOX_STYLE = this.app.settings.get('letterboxing');
        this.LEFT_HAND_MODE = this.app.settings.get('leftHandMode');

        this.setEventListeners();
        this.setViewPortSize();
        this.setTapThresholds();

        if(this.app.mode === PANEL_ZOOM_MODE) {
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
            this.$menu.removeClass('viewport__menu--was-shown');
            if( this.$menu.hasClass('viewport__menu--active') ) {
                this.$menu.removeClass('viewport__menu--active').addClass('viewport__menu--was-shown');
            }
        }.bind(this));

        this.app.tutorial.on('done',this.onTutorialDone.bind(this));

        $('body').on('click', '[data-skip-to-page]', function(e) {
            var $this = $(e.currentTarget);
            var page = $this.attr('data-skip-to-page');
            $this.closest('.pane').find('[data-close]').trigger('click');
            this.app.book.skipToPage(page);
        }.bind(this));

        $('body').on('click','[data-close]',function() {
            var $this = $(this);
            $this.closest('.pane').addClass('pane--hidden');
            $this.closest('.pane').find('.pane__content')[0].scrollTop = 0;
        });

        this.app.book.on('load',this.onBookLoaded.bind(this));
    },

    onBookLoaded: function() {
        this.interactable.on('panend',function(ev) {
            var newPage = false;
            this.app.book.pages.forEach(function(page) {
                if(page.shouldBeSetAsCurrent(ev)) {
                    this.app.book.setCurrentPage(page);
                }
            }.bind(this));
            this.app.book.snapPagesToCurrent();
        }.bind(this));
        this.interactable.on("tap", function(ev) {
            if( ev.tapCount >= 2 ) {
                return this.app.switchModes();
            }
            var cmd = this.findTapZone(ev.center.x,ev.center.y);
            if( cmd === PAGE_FORWARD ) {
                return this.app.book.pageForward();
            }
            if( cmd === PAGE_BACK ) {
                return this.app.book.pageBackward();
            }
            if( cmd === TOGGLE_MAIN_MENU ) {
                if( ! this.$menu.hasClass('viewport__menu--was-shown') ) {
                    this.$menu.addClass('viewport__menu--active');
                }
            }
        }.bind(this));
        this.interactable.on("swipeleft", function(ev) {
            if( this.app.mode === PANEL_ZOOM_MODE ) {
                this.app.book.pageForward();
            }
        }.bind(this));
        this.interactable.on("swiperight", function(ev) {
            if( this.app.mode === PANEL_ZOOM_MODE ) {
                this.app.book.pageBackward();
            }
        }.bind(this));

        this.app.settings.on('change:letterboxing',function(data){
            this.LETTERBOX_STYLE = data.value;
            this.setLetterBoxStyle();
        }.bind(this));

        this.app.settings.on('change:leftHandMode',function(data){
            this.LEFT_HAND_MODE = data.value;
            this.setTapThresholds();
        }.bind(this));

        this.app.on('change:mode',this.onModeChange.bind(this));

        $(window).on('resize orientationchange',this.onResize.bind(this));
    },

    onTutorialDone: function() {
        this.$menu.addClass('viewport__menu--active');
        this.message('The tutorial is always available in the settings menu at the bottom right.')
        setTimeout(function() {
            this.$menu.removeClass('viewport__menu--active');
        }.bind(this),5000);
    },

    canRecognizePan: function(rec, input) {
        return this.app.mode === PAGE_MODE;
    },

    canRecognizeSwipe: function(rec, input) {
        return this.app.mode === PANEL_ZOOM_MODE;
    },

    setContainer: function($container) {
        this.$container = $container;
    },

    onModeChange: function(mode) {
        if( mode === PAGE_MODE ) {
            Menu.deactivateOption('panel-zoom');
            //this.message('Page mode activated.');
        } else {
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
            return PAGE_BACK;
        }
        if( x >= this.PAGE_FORWARD_MIN && x <= this.PAGE_FORWARD_MAX) {
            return PAGE_FORWARD;
        }
        return TOGGLE_MAIN_MENU;
    },

    setLetterBoxing: function(height,width,animate) {
        var horizSize = height > 0 ? height / 2 : 0;
        var vertSize = width > 0 ? width / 2 : 0;
        var speed = this.app.settings.get('panelTransitions');
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
        this.app.trigger('resize',e);
    }
};
