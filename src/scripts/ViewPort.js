/**
 * The ViewPort class represents the viewport available to the user
 * and viewing the comic. All pages and panels have to be sized to
 * fit within this viewport. It also handles and dispatches user
 * interaction events.
 *
 * @class
 * @extends EventClass
 * @author  Ryan Burst <ryanburst@gmail.com>
 * @version 0.3.0
 */
class ViewPort extends EventClass {
    /**
     * Initiates the ViewPort class, by setting properties,
     * listening to application and interaction events, and
     * setting up the viewport for use.
     *
     * @constructs ViewPort
     * @param {Panelz} app Panelz app instance
     */
    constructor(app) {
        super();
        /**
         * Panelz application instance
         * @type {Panelz}
         */
        this.app = app;
        /**
         * Settings class instance, derived from
         * an application property.
         * @type {Settings}
         */
        this.settings = app.settings;
        /**
         * jQuery object holding the viewport element
         * @type {Object}
         */
        this.$element = $('.viewport');
        /**
         * jQuery object holding the viewport container
         * @todo Switch this to be the container passed in the initial config
         * @type {Object}
         */
        this.$container = $(window);
        /**
         * jQuery object holding the horizontal letter box
         * @type {Object}
         */
        this.$horizontalLetterBox = $('.letterbox__horizontal');
        /**
         * jQuery object holding the vertical letter box
         * @type {Object}
         */
        this.$verticalLetterBox = $('.letterbox__vertical');
        /**
         * The interactable object the user can swipe or perform
         * user interactions on. Should be a HammerJS instance.
         * @type {Object}
         */
        this.interactable = false;
        /**
         * Holds the last user event to occur.
         * @type {Object}
         */
        this.e = false;
        /**
         * Whether or not the user is currently performing the
         * pinch interaction on the interactable element.
         * @type {Boolean}
         */
        this.pinching = false;
        /**
         * Function holding the message timeout.
         * @type {Function}
         */
        this.messageTimeout = false;
        /**
         * Minimum x coordinate for the page back tap zone.
         * @type {Number}
         */
        this.PAGE_BACK_MIN = 0;
        /**
         * Maximum x coordinate for the page back tap zone.
         * @type {Number}
         */
        this.PAGE_BACK_MAX = 0;
        /**
         * Minimum x coordinate for the page forward tap zone.
         * @type {Number}
         */
        this.PAGE_FORWARD_MIN = 0;
        /**
         * Maximum x coordinate for the page forward tap zone.
         * @type {Number}
         */
        this.PAGE_FORWARD_MAX = 0;
        /**
         * What percentage of the page on the left and right
         * is allocated to a page turn tap zone.
         * @type {Number}
         */
        this.PAGE_TURN_THRESHOLD = 0.25;
        /**
         * The style of letterbox to use when showing. This
         * value may change when the user update their settings.
         * @type {String}
         */
        this.LETTERBOX_STYLE = this.settings.get('letterboxing');
        /**
         * Whether or not to switch the left and right tap zones for
         * moving the book forward and backward. This value may change
         * when the user updates their settings.
         * @type {Boolean}
         */
        this.LEFT_HAND_MODE = this.settings.get('leftHandMode');

        this.setInteractable();
        this.setEventListeners();
        this.setViewPortSize();
        this.setTapThresholds();
        this.setLetterBoxStyle();
    }

    /**
     * Sets the interactable object by initiating the HammerJS library.
     * Enables the relevant touch events and registers them accordingly.
     */
    setInteractable() {
        this.interactable = new Hammer.Manager(this.$element.find('.viewport__interactable')[0]);

        var pan = new Hammer.Pan({threshold: 20, enable: this.canRecognizePan.bind(this)});
        var pinch = new Hammer.Pinch({ threshold: 0, enable: this.canRecognizePinch.bind(this), domEvents: true });
        var singletap = new Hammer.Tap({threshold: 2, posThreshold: 150});
        var doubletap = new Hammer.Tap({event: 'doubletap', taps: 2, threshold: 2, posThreshold: 150 });
        var swipe = new Hammer.Swipe({enable: this.canRecognizeSwipe.bind(this)});

        this.interactable.add([pan,doubletap,singletap,swipe,pinch]);

        doubletap.recognizeWith(singletap);

        singletap.requireFailure(doubletap);
        pan.requireFailure(pinch);
    }

    /**
     * Sets event listeners on DOM elements and the application instance.
     */
    setEventListeners() {
        $('body').on('click','[data-open-pane]',this.onOpenPane);
        $('body').on('click','.pane__item, .tutorial__menu-item',this.onPaneMenuItemClick);
        $('body').on('click', '[data-skip-to-page]',this.onSkipToPageClick.bind(this));
        $('body').on('click activate','[data-close]',this.onCloseClick);
        this.$container.on('resize',this.setViewPortSize.bind(this));
        this.app.on('load:book',this.onBookLoaded.bind(this));
        this.settings.on('change:letterboxing',this.onLetterboxSettingsChange.bind(this));
        this.settings.on('change:leftHandMode',this.onLeftHandModeSettingsChange.bind(this));
    }

    /**
     * User wants to open a pane, do so by removing a hidden class.
     *
     * @param {Object} e Event object
     */
    onOpenPane(e) {
        $('.pane--' + $(this).attr('data-open-pane')).removeClass('pane--hidden');
    }

    /**
     * On a pane menu item click, make sure the item is checked/unchecked accordingly
     *
     * @param {Object} e Event object
     */
    onPaneMenuItemClick(e) {
        if( ! $(e.target).is(':radio, :checkbox, .checkbox__label') ) {
            var $input = $(this).find(':radio, :checkbox');
            var checked = $input.is(':radio') ? true : !$input.prop('checked');
            $input.prop('checked',checked).trigger('change');
            $input.closest('.pane--modal').find('[data-close]').trigger('activate');
        }
    }

    /**
     * The skip to page item has been clicked so trigger an app
     * notification event to respond to.
     * @param {Object} e Event object
     * @fires Panelz#user:skipToPage
     */
    onSkipToPageClick(e) {
        var $this = $(e.currentTarget);
        var page = $this.attr('data-skip-to-page');
        $this.closest('.pane').find('[data-close]').trigger('activate');
        /**
         * User skip to page event
         *
         * @event Panelz#user:skipToPage
         * @type {Object}
         * @property {Page} Page instance to skip to
         */
        this.app.trigger('user:skipToPage',page);
    }

    /**
     * User wants to close a pane, add the CSS hidden class to hide it
     * @param {Object} e Event object
     */
    onCloseClick(e) {
        e.preventDefault();
        var $this = $(this);
        $this.closest('.pane').addClass('pane--hidden');
        $this.closest('.pane').find('.pane__content')[0].scrollTop = 0;
    }

    /**
     * The book/comic has been loaded, so we can add the interaction
     * events. All of the interaction events are then passed up
     * to the application for other classes to hook into.
     *
     * @param {Book} book The book that was loaded
     */
    onBookLoaded(book) {
        console.log('Book loaded');
        this.interactable.on('pinchstart',this.passUserEventToApplication.bind(this));
        this.interactable.on('pinch',this.passUserEventToApplication.bind(this));
        this.interactable.on('pinchmove',this.passUserEventToApplication.bind(this));
        this.interactable.on('pinchin',this.passUserEventToApplication.bind(this));
        this.interactable.on('pinchout',this.passUserEventToApplication.bind(this));
        this.interactable.on('pinchend',this.passUserEventToApplication.bind(this));
        this.interactable.on('panstart',this.passUserEventToApplication.bind(this));
        this.interactable.on('pan',this.passUserEventToApplication.bind(this));
        this.interactable.on('panleft',this.passUserEventToApplication.bind(this));
        this.interactable.on('panright',this.passUserEventToApplication.bind(this));
        this.interactable.on('panend',this.passUserEventToApplication.bind(this));
        this.interactable.on('doubletap',this.passUserEventToApplication.bind(this));
        this.interactable.on('tap',this.passUserEventToApplication.bind(this));
        this.interactable.on('swipeleft',this.passUserEventToApplication.bind(this));
        this.interactable.on('swiperight',this.passUserEventToApplication.bind(this));
        // Resize the book
        $(window).on('resize orientationchange',this.onResize.bind(this));
    }

    /**
     * When the letterboxing setting changes, update the
     * letterbox style accordingly.
     *
     * @param  {Object} data Settings event object
     */
    onLetterboxSettingsChange(data) {
        this.LETTERBOX_STYLE = data.value;
        this.setLetterBoxStyle();
    }

    /**
     * When the left hand mode setting changes, update the
     * tap zones/thresholds accordingly.
     *
     * @param  {Object} data Settings event object
     */
    onLeftHandModeSettingsChange(data) {
        this.LEFT_HAND_MODE = data.value;
        this.setTapThresholds();
    }

    /**
     * Passes a user interaction event up to the application. Some
     * of the user events have special cases.
     *
     * @param  {Object} data Settings event object
     * @fires  Panelz#user:<interaction>
     * @return {Boolean}
     */
    passUserEventToApplication(e) {
        // Hammer likes to fire pan and pinch events, so set
        // a property which will allow us to disable pan events
        // while the user is performing pinching
        if(e.type === 'pinchstart') {
            this.pinching = true;
        }
        // Hammer is throwing pan events after a pinch end,
        // so add some delay before turning pinching off
        if(e.type === 'pinchend') {
            setTimeout(function() {
                this.pinching = false;
            }.bind(this),100);
        }
        // On a tap, we have to figure out where they tapped
        // and trigger the correct event
        if(e.type === 'tap') {
            this.app.trigger('user:tap',e);
            var cmd = this.findTapZone(e.center.x,e.center.y);
            if( cmd === PAGE_FORWARD ) {
                return this.app.trigger('user:pageForward',e);
            } else if( cmd === PAGE_BACK ) {
                return this.app.trigger('user:pageBackward',e);
            } else if( cmd === TOGGLE_MAIN_MENU ) {
                return this.app.trigger('show:menu');
            } else {
                return true;
            }
        }
        // Translate the swipeleft event
        if( e.type === 'swipeleft' ) {
            e.type = 'pageForward';
        }
        // Translate the swiperight event
        if( e.type === 'swiperight' ) {
            e.type = 'pageBackward';
        }

        this.registerUserEvent(e);

        /**
         * User interaction event
         *
         * @event Panelz#user:<interaction>
         * @type {Object}
         * @property {Object} Interaction event
         */
        this.app.trigger('user:' + e.type,e);
    }

    /**
     * Saves a user event to a local property.
     *
     * @param  {Object} e Event Object
     */
    registerUserEvent(e) {
        this.e = e;
    }

    /**
     * Returns the last user event object recorded.
     *
     * @return {Object}
     */
    getLastUserEvent() {
        return this.e;
    }

    /**
     * Recognize the user pinch event only in Page Mode.
     *
     * @return {Boolean}
     */
    canRecognizePinch() {
        return this.app.mode === PAGE_MODE;
    }

    /**
     * Recognize the user pan event only when in page mode
     * and if the user is not currently also pinching.
     *
     * @return {Boolean}
     */
    canRecognizePan() {
        return this.app.mode === PAGE_MODE && ! this.pinching;
    }

    /**
     * Recognize the user swipe event only when in panel zoom mode
     *
     * @return {Boolean}
     */
    canRecognizeSwipe() {
        return this.app.mode === PANEL_ZOOM_MODE;
    }

    /**
     * Sets the view port size to the width and height of the
     * container element.
     */
    setViewPortSize() {
        this.$element.width(this.$container.outerWidth());
        this.$element.height(this.$container.outerHeight());
    }

    /**
     * Sets where the tap zones are. In normal mode, it uses
     * the tap threshold to calculate a percentage of the screen
     * used for the left and right to be used as forward/back
     * with the leftover center area used as the menu toggle.
     *
     * If left hand mode, switches the left and right zones.
     */
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

    /**
     * Figures out what tap zone a pair of x and y coordinates are in.
     * returns the string constant associated with the correct tap zone.
     *
     * @param  {Number} x X coordinate
     * @param  {Number} y Y coordinate
     * @return {String}
     */
    findTapZone(x,y) {
        if( x >= this.PAGE_BACK_MIN && x <= this.PAGE_BACK_MAX) {
            return PAGE_BACK;
        }
        if( x >= this.PAGE_FORWARD_MIN && x <= this.PAGE_FORWARD_MAX) {
            return PAGE_FORWARD;
        }
        return TOGGLE_MAIN_MENU;
    }

    /**
     * Sets letterboxing style given leftover width and height to work with.
     * The left over size is divided in half to put letterboxes on both sides.
     * @param {Number}  width   Left over width
     * @param {Number}  height  Left over height
     * @param {Boolean} animate Whether or not to animate the letterboxes
     */
    setLetterBoxing(width,height,animate) {
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
    }

    /**
     * Sets the letterbox style by setting the opacity.
     */
    setLetterBoxStyle() {
        var opacity = (this.LETTERBOX_STYLE === LETTERBOX_STYLE_NONE
            ? LETTERBOX_STYLE_NONE_VALUE
            :(this.LETTERBOX_STYLE === LETTERBOX_STYLE_OPAQUE
                ? LETTERBOX_STYLE_OPAQUE_VALUE
                : LETTERBOX_STYLE_SOLID_VALUE));

        this.$horizontalLetterBox.css('opacity',opacity);
        this.$verticalLetterBox.css('opacity',opacity);
    }

    /**
     * Gets the width of the viewport.
     *
     * @return {Number}
     */
    getWidth() {
        return this.$element.outerWidth();
    }

    /**
     * Gets the height of the viewport.
     *
     * @return {Number}
     */
    getHeight() {
        return this.$element.outerHeight();
    }

    /**
     * Shows a message in the viewport for the user. Disappears
     * after a set or passed in amount of time.
     *
     * @param  {String} text Message to display
     * @param  {Number} time Time to show message in ms
     */
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

    /**
     * On resize, make sure the viewport and tap thresholds have
     * been adjusted to fit the new size of the container.
     *
     * @param {Object} e Event object
     * @fires Panelz#resize
     */
    onResize(e) {
        this.setViewPortSize();
        this.setTapThresholds();
        /**
         * Resize event
         *
         * @event Panelz#resize
         * @type {Object}
         * @property {Object} Resize event
         */
        this.app.trigger('resize',e);
    }
};
