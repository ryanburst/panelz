class ViewPort extends EventClass {

    constructor(config) {
        super();
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

        this.interactable = new Hammer.Manager(this.$element.find('.viewport__interactable')[0]);

        //var pan = new Hammer.Pan({threshold: 20, enable: this.canRecognizePan.bind(this)});
        var pinch = new Hammer.Pinch({ threshold: 0, enable: true });
        //var singletap = new Hammer.Tap({threshold: 2, posThreshold: 150});
        //var doubletap = new Hammer.Tap({event: 'doubletap', taps: 2 });
        //var swipe = new Hammer.Swipe({enable: this.canRecognizeSwipe.bind(this)});

        this.interactable.add([/*pan,singletap,doubletap,swipe,*/pinch]);

        //singletap.requireFailure(doubletap);
        //pan.requireFailure(pinch);

        this.interactable.get('pinch').set({ enable: true });

        $('body').on('touchend',function() {
            this.$menu.removeClass('viewport__menu--was-shown');
            if( this.$menu.hasClass('viewport__menu--active') ) {
                setTimeout(function() {
                    this.$menu.removeClass('viewport__menu--active').addClass('viewport__menu--was-shown');
                }.bind(this),500);
            }
        }.bind(this));

        this.app.tutorial.on('done',this.onTutorialDone.bind(this));
        this.app.on('load:book',this.onBookLoaded.bind(this));

        $('body').on('click','[data-open-pane]',function(e) {
            $('.pane--' + $(this).attr('data-open-pane')).removeClass('pane--hidden');
        });
        $('body').on('click','.pane__item',function(e) {
            if( ! $(e.target).is(':radio, :checkbox, .checkbox__label') ) {
                var $input = $(this).find(':radio, :checkbox');
                var checked = $input.is(':radio') ? true : !$input.prop('checked');
                $input.prop('checked',checked).trigger('change');
                $input.closest('.pane--modal').find('[data-close]').trigger('click');
            }
        });

        $('body').on('click', '[data-skip-to-page]', function(e) {
            var $this = $(e.currentTarget);
            var page = $this.attr('data-skip-to-page');
            $this.closest('.pane').find('[data-close]').trigger('click');
            this.app.trigger('user:skipToPage',page);
        }.bind(this));

        $('body').on('click','[data-close]',function(e) {
            var $this = $(this);
            $this.closest('.pane').addClass('pane--hidden');
            $this.closest('.pane').find('.pane__content')[0].scrollTop = 0;
        });
    }

    onBookLoaded() {
        console.log('Book loaded');
        this.interactable.on('panstart',function(ev) {
            this.app.trigger('user:panstart',ev);
        }.bind(this));
        this.interactable.on('pan',function(ev) {
            this.app.trigger('user:pan',ev);
        }.bind(this));
        this.interactable.on('panend',function(ev) {
            this.app.trigger('user:panend',ev);
        }.bind(this));
        this.interactable.on('pinch',function(ev) {
            alert('pinch');
            this.app.trigger('user:pinch',ev);
        }.bind(this));
        this.interactable.on("tap", function(ev) {
            if( ev.tapCount >= 2 ) {
                return this.app.switchModes();
            }
            var cmd = this.findTapZone(ev.center.x,ev.center.y);
            if( cmd === PAGE_FORWARD ) {
                this.app.trigger('user:pageForward');
            } else if( cmd === PAGE_BACK ) {
                this.app.trigger('user:pageBackward');
            } else if( cmd === TOGGLE_MAIN_MENU ) {
                if( ! this.$menu.hasClass('viewport__menu--was-shown') ) {
                    this.$menu.addClass('viewport__menu--active');
                }
            }
        }.bind(this));
        this.interactable.on("swipeleft", function(ev) {
            if( this.app.mode === PANEL_ZOOM_MODE ) {
                this.app.trigger('user:pageForward');
            }
        }.bind(this));
        this.interactable.on("swiperight", function(ev) {
            if( this.app.mode === PANEL_ZOOM_MODE ) {
                this.app.trigger('user:pageBackward');
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

        $(window).on('resize orientationchange',this.onResize.bind(this));
    }

    onTutorialDone() {
        this.$menu.addClass('viewport__menu--active');
        this.message('The tutorial is always available in the settings menu at the bottom right.',5000)
    }

    canRecognizePan(rec, input) {
        return this.app.mode === PAGE_MODE;
    }

    canRecognizeSwipe(rec, input) {
        return this.app.mode === PANEL_ZOOM_MODE;
    }

    setContainer($container) {
        this.$container = $container;
    }

    setEventListeners() {
        this.$container.on('resize',this.setViewPortSize.bind(this));
    }

    setViewPortSize(e) {
        this.$element.width(this.$container.outerWidth());
        this.$element.height(this.$container.outerHeight());
    }

    setTapThresholds() {
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
    }

    findTapZone(x,y) {
        if( x >= this.PAGE_BACK_MIN && x <= this.PAGE_BACK_MAX) {
            return PAGE_BACK;
        }
        if( x >= this.PAGE_FORWARD_MIN && x <= this.PAGE_FORWARD_MAX) {
            return PAGE_FORWARD;
        }
        return TOGGLE_MAIN_MENU;
    }

    setLetterBoxing(width,height,animate) {
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
    }

    setLetterBoxStyle() {
        var opacity = (this.LETTERBOX_STYLE === 'no'
            ? 0
            :(this.LETTERBOX_STYLE === 'opaque'
                ? 0.75
                : 1));

        this.$horizontalLetterBox.css('opacity',opacity);
        this.$verticalLetterBox.css('opacity',opacity);
    }

    getWidth() {
        return this.$element.outerWidth();
    }

    getHeight() {
        return this.$element.outerHeight();
    }

    message(text,time) {
        var $messageContainer = $('.viewport__message');
        var $message = $('.message__text');

        time = (typeof time === 'undefined') ? 3000 : time;

        clearTimeout(this.messageTimeout);

        $message.text(text);
        $messageContainer.removeClass('viewport__message--hide');
        this.messageTimeout = setTimeout(function() {
            clearTimeout(this.messageTimeout);
            $messageContainer.addClass('viewport__message--hide');
        },time);
    }

    onResize(e) {
        this.setViewPortSize();
        this.setTapThresholds();
        this.app.trigger('resize',e);
    }
};
