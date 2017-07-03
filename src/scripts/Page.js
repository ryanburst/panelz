/**
 * Directional number used by the HammerJS
 * library to indicate a left pan.
 *
 * @constant
 * @type {Number}
 * @default
 */
const PAN_LEFT_DIR = 2;

/**
 * Directional number used by the HammerJS
 * library to indicate a right pan.
 *
 * @constant
 * @type {Number}
 * @default
 */
const PAN_RIGHT_DIR = 4;

/**
 * Page class representing a comic page. Represents the
 * actual image on the screen, as well as all the calculations
 * for panning/zooming and determining which panel should
 * be zoomed on/zooming on panels.
 *
 * @class
 * @extends EventClass
 * @author  Ryan Burst <ryanburst@gmail.com>
 * @version 0.3.0
 */
class Page extends EventClass {
    /**
     * Creates a new instance of the Page class. Sets all
     * the initial variables needed by this class and
     * a few event listeners for setting changes. This
     * constructor also initializes all the panels, if any,
     * as new classes and stores them in a local array property.
     *
     * @constructs Page
     * @param  {Class}  app    Panelz app instance
     * @param  {Class}  Book   Book instance
     * @param  {Object} config Configuration options
     * @param  {Number} index  Which index within the book this page is
     */
    constructor(app,Book,config,index) {
        super();

        /**
         * Keep a reference to the app instance as
         * a local property
         * @type {Class}
         */
        this.app = app;
        /**
         * Book class reference as local property
         * @type {Class}
         */
        this.book = Book;
        /**
         * The configuration options for this page
         * @type {Object}
         */
        this.config = config;
        /**
         * Which index within the book this page is
         * @type {Number}
         */
        this.index = index;
        /**
         * The Page number
         * @type {Number}
         */
        this.num = index + 1;
        /**
         * If the index is 0, this is the first page
         * @type {Boolean}
         */
        this.isFirst = index===0;
        /**
         * If the index is the very last index, using
         * the book configuration object to count, this
         * would be the last page
         * @type {Boolean}
         */
        this.isLast = index===this.book.config.pages.length-1;
        /**
         * Size of the page image element, in bytes, used for
         * calculating total book size and wait time for loading
         * @type {Number}
         */
        this.size = config.size || 0;
        /**
         * Whether or not this is the current page
         * @type {Boolean}
         */
        this.isCurrentPage = false;
        /**
         * Current scale of the page image element
         * @type {Number}
         */
        this.scale = 1;
        /**
         * Number that keeps track of the last scale size
         * between starting/stopping events like pinching
         * @type {Number}
         */
        this.lastScale = 1;
        /**
         * Whether or not the left edge is visible and
         * the page element should be panned normally
         * @type {Boolean}
         */
        this.leftEdge = true;
        /**
         * Whether or not the right edge is visible and
         * the page element should be panned normally
         * @type {Boolean}
         */
        this.rightEdge = true;
        /**
         * Holds all of the panels objects for this page.
         * @type {Array}
         */
        this.panels = [];
        /**
         * Holds the current panel being zoomed on, if any
         * @type {Boolean}
         */
        this.currentPanel = false;
        /**
         * Which panel comes before the current one, if any
         * @type {Boolean}
         */
        this.previousPanel = false;
        /**
         * Which panel comes after the current one, if any
         * @type {Boolean}
         */
        this.nextPanel = false;
        /**
         * Holds the jQuery element containing the page container
         * @type {Object}
         */
        this.$container = false;
        /**
         * Holds the jQuery image element
         * @type {Object}
         */
        this.$element = false;
        /**
         * Original/actual width of page image
         * @type {Number}
         */
        this.originalWidth = 0;
        /**
         * Original/actual height of page image
         * @type {Number}
         */
        this.originalHeight = 0;
        /**
         * Holds how far left an image sits within
         * a container in order to be centered
         * @type {Number}
         */
        this.originalLeft = 0;
        /**
         * When panning, we adjust the margin. Holds the
         * original left position at the start of a pan
         * @type {Number}
         */
        this.elementOriginalLeft = 0;
        /**
         * When panning, we adjust the margin. Holds the
         * original top position at the start of a pan
         * @type {Number}
         */
        this.elementOriginalTop = 0;
        /**
         * Object representing the origin of a punch event.
         * Should have an x/y property
         * @type {Object}
         */
        this.pinchOrigin = {};
        /**
         * Speed in ms at which the panel transition animation
         * should occur. Treated like a constant although it
         * can be changed through the settings by the user.
         * @type {Number}
         */
        this.PANEL_ANIMATION_SPEED = this.app.settings.get('panelTransitions');
        /**
         * Whether or not to show the entire page when it
         * becomes current. Applies for Panel Zoom Mode only.
         * @type {Boolean}
         */
        this.SHOW_PAGE_ON_ENTER = this.app.settings.get('showPageOnEnter');
        /**
         * Whether or not to show the entire page before moving
         * to a new page. Applies for Panel Zoom Mode only.
         * @type {Boolean}
         */
        this.SHOW_PAGE_ON_EXIT = this.app.settings.get('showPageOnExit');
        /**
         * How many pixels a page needs to be panned before
         * snapping fully to the next or previous page.
         * @type {Number}
         */
        this.TURN_THRESHHOLD = 30;
        /**
         * Maximum scale value when pinching
         * @type {Number}
         */
        this.MAX_SCALE = 3;

        this.setEventListeners();

        this.panels = [];
        config.panels.forEach( function(panel,index) {
            this.panels.push(new Panel(this,panel,index));
        }.bind(this));
    }

    /**
     * When setting the configation property, set the
     * internal property. Also kick off loading the
     * image from the config url
     *
     * @param  {Object} config Configuration options
     */
    set config(config) {
        this._config = config;
        this.loadPageElement();
    }

    /**
     * Gets the configuration internal
     *
     * @return {Object}
     */
    get config() {
        return this._config;
    }

    /**
     * Sets all event listeners for internal classes
     */
    setEventListeners() {
        this.on('load:page',this.centerInViewPort.bind(this));
        this.app.settings.on('change:panelTransitions',this.onSettingsChange.bind(this));
        this.app.settings.on('change:showPageOnEnter',this.onSettingsChange.bind(this));
        this.app.settings.on('change:showPageOnExit',this.onSettingsChange.bind(this));
        this.app.on("user:panstart", this.onPanStart.bind(this));
        this.app.on("user:pan", this.onPan.bind(this));
        this.app.on("user:panleft", this.onPanLeft.bind(this));
        this.app.on("user:panright", this.onPanRight.bind(this));
        this.app.on('user:pinchstart',this.onPinchStart.bind(this));
        this.app.on("user:pinch",this.onPinch.bind(this));
        this.app.on("user:pinchend",this.onPinchEnd.bind(this));
        this.app.on('resize',this.setPosition.bind(this));
        this.book.on('pageSet',this.setCurrentPageStatus.bind(this));
    }

    /**
     * When certain settings are changed, update our local
     * property references to those settings
     *
     * @param  {Object} data Event data for the settings change
     */
    onSettingsChange(data) {
        switch(data.setting) {
            case 'panelTransitions':
                this.PANEL_ANIMATION_SPEED = data.value;
                break;
            case 'showPageOnEnter':
                this.SHOW_PAGE_ON_ENTER = data.value
                break;
            case 'showPageOnExit':
                this.SHOW_PAGE_ON_EXIT = data.value
                break;
        }
    }

    /**
     * Checks to see if a page class instance is this
     * page instance. If it is, this should be the
     * current page.
     *
     * @param {Class} page Page instance
     */
    setCurrentPageStatus(page) {
        this.isCurrentPage = (page.index===this.index);
    }

    /**
     * Loads the page element into an img tag and when it
     * has been loaded, initiates a page load method.
     */
    loadPageElement() {
        $("<img />").attr("src", this.config.url).on('load',this.onPageLoaded.bind(this));
    }

    /**
     * When the page has been loaded, set a container element
     * and a property holding the image itself. The page needs
     * to be centered in the viewport and its original dimensions
     * pulled in so we can perform sizing calculations.
     *
     * @param  {Object} e Event object
     * @fires Page#load:page
     */
    onPageLoaded(e) {
        this.$container = this.app.addPageMarkupToViewPort($('<div />').addClass('book__page page'));
        this.$element = $(e.currentTarget)
            .addClass('page__image')
            .appendTo(this.$container);
        this.originalWidth = this.$element.width();
        this.originalHeight = this.$element.height();
        /**
         * Load page event
         *
         * @event Page#load:page
         * @type {Object}
         * @property {Class} Current page instance
         */
        this.trigger('load:page',this);
    }

    /**
     * When a user initiates a pan event, we need to set the original
     * positions and zoom amount and use that number when calculating
     * how far the pan delta needs to be offset by.
     *
     * @param  {Object} e Event object
     */
    onPanStart(e) {
        this.elementOriginalLeft = parseInt( this.$element.css( "margin-left" ), 10 );
        this.elementOriginalTop = parseInt( this.$element.css( "margin-top" ), 10 );
        this.originalLeft = parseInt( this.$container.css( "left" ), 10 );
        this.book.zoomPanAmount = 0;
    }

    /**
     * When the user pans, they are allowed to pan up or down
     * if they are zoomed in on a panel (via pinching). If
     * they are not zoomed in or the pan direction is not left
     * or right, then return true to event further pan events
     * from registering and screwing things up.
     *
     * @param  {Object} e Event object
     * @return {boolean}
     */
    onPan(e) {
        // If the page is zoomed, allow them to pan up. Pan left and
        // right is handled by specific event handlers below.
        if( this.isZoomed() ) {
            var deltaY = this.elementOriginalTop + e.deltaY;
            var restrictedPosition = this.restrictPosition(0,deltaY);
            this.$element.css( {
                "margin-top": restrictedPosition.top
            } );
        } else if(e.offsetDirection !== PAN_LEFT_DIR && e.offsetDirection !== PAN_RIGHT_DIR ) {
            return true;
        }
    }

    /**
     * The user wants to pan left. There are several use cases that
     * need to be accounted for. If the user is zoomed in on the
     * current page image/element, than only the element itself
     * should be allowed to be panned. If the right edge has been
     * reached (visible), than the entire page (and all the other
     * pages), should also pan together. This is accomplished by
     * "pan freezing" the entire book when an edge is not visible
     * and "un pan freezing" the entire book when it is.
     *
     * panleft = rightedge = forward
     *
     * @param  {Object} e Event object
     */
    onPanLeft(e) {
        if( this.isZoomed() ) {
            var maxLeft = (((this.getWidth() * this.scale) - this.getFullWidth()) / 2);
            var minLeft = maxLeft * -1;
            if( this.getWidth() * this.scale < this.getFullWidth() ) {
                maxLeft = 0;
            }
            var deltaX = this.elementOriginalLeft + e.deltaX;
            var left = Math.min(maxLeft,Math.max(deltaX,minLeft));

            var rightEdgeBefore = this.rightEdge;
            this.rightEdge = (left<=minLeft) ? true : false;
            if(rightEdgeBefore !== this.rightEdge && this.rightEdge ) {
                this.book.panFrozen = false;
                this.book.zoomPanAmount = e.deltaX;
            }

            if(this.book.panFrozen) {
                this.$element.css( {
                    "margin-left": left
                } );
            }
        } else if( this.book.panFrozen ) {
            // Helps make sure the other pages are set correctly (math isn't quite right)
            this.setLeftPosition(this.book.currentPage.index);
        }

        if( ! this.book.panFrozen ) {
            this.left = this.originalLeft + e.deltaX - this.book.zoomPanAmount;
            this.$container.css( {
                "left": this.left
            } );

            if( this.isCurrentPage && this.scale !== 1 && this.left < 0 && ! this.rightEdge ) {
                this.book.panFrozen = true;
            }
        }
    }
    /**
     * The user wants to pan right. There are several use cases that
     * need to be accounted for. If the user is zoomed in on the
     * current page image/element, than only the element itself
     * should be allowed to be panned. If the left edge has been
     * reached (visible), than the entire page (and all the other
     * pages), should also pan together. This is accomplished by
     * "pan freezing" the entire book when an edge is not visible
     * and "un pan freezing" the entire book when it is.
     *
     * panright = leftedge = backward
     *
     * @param  {Object} e Event object
     */
    onPanRight(e) {
        if( this.isZoomed() ) {
            var maxLeft = (((this.getWidth() * this.scale) - this.getFullWidth()) / 2);
            var minLeft = maxLeft * -1;
            if( this.getWidth() * this.scale < this.getFullWidth() ) {
                maxLeft = 0;
            }
            var deltaX = this.elementOriginalLeft + e.deltaX;
            var left = Math.min(maxLeft,Math.max(deltaX,minLeft));

            var leftEdgeBefore = this.leftEdge;
            this.leftEdge = (left==maxLeft) ? true : false;
            if(leftEdgeBefore !== this.leftEdge && this.leftEdge ) {
                this.book.panFrozen = false;
                this.book.zoomPanAmount = e.deltaX;
            }

            if(this.book.panFrozen) {
                this.$element.css( {
                    "margin-left": left
                } );
            }
        } else if( this.book.panFrozen ) {
            // Helps make sure the other pages are set correctly (math isn't quite right)
            this.setLeftPosition(this.book.currentPage.index);
        }

        if( ! this.book.panFrozen ) {
            this.left = this.originalLeft + e.deltaX - this.book.zoomPanAmount;
            this.$container.css( {
                "left": this.left
            } );
            if( this.isCurrentPage && this.scale !== 1 && this.left >=0 && ! this.leftEdge ) {
                this.book.panFrozen = true;
            }
        }
    }

    /**
     * When starting a pinch event, record the images current
     * left and top position (margin) in order to calculate
     * the total offset with the pinch delta. Also records
     * the punch origin in case the user wants to pan the
     * entire image while they are pinching.
     *
     * @param  {Object} e Event class
     */
    onPinchStart(e) {
        this.pinchOrigin = e.center;
        this.elementOriginalLeft = parseInt( this.$element.css( "margin-left" ), 10 );
        this.elementOriginalTop = parseInt( this.$element.css( "margin-top" ), 10 );
    }

    /**
     * The user is pinching, so magnify the image by the
     * pinch scale. This method also moves the image should
     * they want to pan while they are pinching by taking
     * the delta of the current pinch center and the original
     * pinch center. Not perfect, but works.
     *
     * @param  {Object} e Event class
     */
    onPinch(e) {
        if( ! this.isCurrentPage ) {
            return;
        }

        if(this.app.mode !== PAGE_MODE) {
            this.app.switchModes();
        }
        this.magnify(e.scale * this.lastScale);

        var deltaX = -1 * (this.pinchOrigin.x - e.center.x);
        var deltaY = -1 * (this.pinchOrigin.y - e.center.y);
        this.$element.css( {
            "margin-left": this.elementOriginalLeft + (deltaX * e.scale),
            "margin-top": this.elementOriginalTop + (deltaY * e.scale)
        } );
    }

    /**
     * At the end of a pinch reset the left and right position so
     * it sits at the min/max position and isn't mostly offscreen.
     * Also normalze the scale if it's less than one (smaller than
     * the viewport) or greater than the max scale value).
     *
     * @param  {Object} e Event class
     */
    onPinchEnd(e) {
        if( ! this.isCurrentPage ) {
            return;
        }

        this.pinchOrigin = {};

        this.book.panFrozen = true;

        var left = parseInt( this.$element.css( "margin-left" ), 10 );
        var top = parseInt( this.$element.css( "margin-top" ), 10 );
        var restrictedPosition = this.restrictPosition(left,top);
        this.$element.css({
            'margin-left': restrictedPosition.left,
            'margin-top': restrictedPosition.top
        });

        if( this.scale < 1 ) {
            return this.resetScale();
        }

        if( this.scale > this.MAX_SCALE ) {
            this.magnify(this.MAX_SCALE,true);
            var left = parseInt( this.$element.css( "margin-left" ), 10 );
            var top = parseInt( this.$element.css( "margin-top" ), 10 );
            var restrictedPosition = this.restrictPosition(left,top);
            this.$element.css({
                'margin-left': restrictedPosition.left,
                'margin-top': restrictedPosition.top
            });
            this.lastScale = this.scale;
            return;
        }

        this.lastScale = this.scale;
    }

    /**
     * When this page is entering as the current page and
     * in panel zoom mode, we have to setup the next/previous
     * panels. If they user doesn't want to show the page
     * on enter, then automatically zoom them to the first panel.
     */
    onPageEnterForward() {
        if( this.app.mode === PANEL_ZOOM_MODE && this.panels.length ) {
            this.nextPanel = this.getFirstPanel();
            this.previousPanel = this.getPreviousPanel();
            if( ! this.SHOW_PAGE_ON_ENTER ) {
                this.zoomToPanel(this.nextPanel);
            }
        }
    }

    /**
     * When this page is entering as the current page, but from
     * a succeeding page, setup the next/previous panels. If the user
     * doesn't want to show page on exit, zoom them into the last panel.
     * @return {[type]} [description]
     */
    onPageEnterBackward() {
        if( this.app.mode === PANEL_ZOOM_MODE && this.panels.length ) {
            this.previousPanel = this.getLastPanel();
            this.nextPanel = this.getNextPanel();
            if( ! this.SHOW_PAGE_ON_EXIT) {
                this.zoomToPanel(this.previousPanel);
            }
        }
    }

    /**
     * Check to see if this page is zoomed. Can only be considered
     * zoomed if it's the current page and the scale is not 1.
     *
     * @return {Boolean}
     */
    isZoomed() {
        return this.isCurrentPage && this.scale !== 1;
    }

    /**
     * Set the page's starting position by centering it in the
     * viewport and setting its left offset (relative to the
     * books current page index). If we're in panel zoom mode
     * and there is a current panel, zoom in on it.
     */
    setPosition() {
        this.centerInViewPort(false);
        this.setLeftPosition(this.book.currentPage.index);
        if( this.app.mode === PANEL_ZOOM_MODE && this.currentPanel ) {
            this.zoomToPanel(this.currentPanel,false);
        }
    }

    /**
     * Uses the math to center this page in the viewport. Uses
     * the pages original size compared to the viewport size
     * to determine how to best fit it to the center of the screen.
     *
     * @param  {Boolean} animate Whether or not to animate the centering
     */
    centerInViewPort(animate) {
        var viewPortWidth = this.app.getViewPortSize().width;
        var viewPortHeight = this.app.getViewPortSize().height;
        var width = viewPortWidth;
        var height = this.getOriginalHeight() * viewPortWidth / this.getOriginalWidth();

        if( height > viewPortHeight ) {
            height = viewPortHeight;
            width = this.getOriginalWidth() * viewPortHeight / this.getOriginalHeight();
        }

        var top = (viewPortHeight - height) / 2;
        var left = (viewPortWidth - width) / 2;

        this.$container.width(viewPortWidth).height(viewPortHeight);

        this.$element.animate({
            top: top,
            left: left,
            width: width,
            height: height,
            'margin-left': 0,
            'margin-top': 0
        },{
            duration: (animate ? this.PANEL_ANIMATION_SPEED : 0),
            easing: 'easeOutSine'
        });
    }

    /**
     * Restricts a left and top position to their maximum or
     * minimum values. This normalizes a "requested" position
     * with the best position available (so they can't over pan).
     *
     * @param  {Number} left Requested left position
     * @param  {Number} top  Requested top position
     * @return {Object}
     */
    restrictPosition(left,top) {
        // Calculate the restrained left position
        var maxLeft = (this.getFullWidth() - (this.getWidth() * this.scale)) / 2;
        var minLeft = maxLeft * -1;
        if( this.getWidth() * this.scale < this.getFullWidth() ) {
            minLeft = maxLeft = 0;
        }
        left = Math.min(minLeft,Math.max(maxLeft,left));

        // Calculate the restrained top position
        var maxTop = (this.getFullHeight() - (this.getHeight() * this.scale)) / 2;
        var minTop = maxTop * -1;
        if( this.getHeight() * this.scale < this.getFullHeight() ) {
            minTop = maxTop = 0;
        }
        top = Math.min(minTop,Math.max(maxTop,top));
        return {
            left: left,
            top: top,
            minLeft: minLeft,
            maxLeft: maxLeft,
            minTop: minTop,
            maxTop: maxTop
        };
    }

    /**
     * Checks to see if this page should be set as the current
     * page. This method is requested when a user is panning
     * manually and part of multiple pages may be visible at the
     * same time. If the page passes the TURN THRESHHOLD, it
     * should be set as current.
     *
     * @param  {Object} e Event Object
     * @return {Boolean}
     */
    shouldBeSetAsCurrent(e) {
        if(this.isFirst && this.left > 0) {
            return true;
        }
        if(this.isLast && this.left < 0) {
            return true;
        }
        if(e.deltaX < 0 && this.left > 0 && this.left < this.getFullWidth() - this.TURN_THRESHHOLD) {
            return true;
        }
        if(e.deltaX > 0 && this.left + this.getFullWidth() > this.TURN_THRESHHOLD && this.left + this.getFullWidth() < this.getFullWidth()) {
            return true;
        }
        return false
    }

    /**
     * Finds a panel given a x and y coordinate. This is a little
     * tricky because we have the original panel sizes, which need
     * to be converted to the current panel size and then whether
     * or not the x y coordinate is inside of THAT. Math=hard
     *
     * Returns the panel class instance if the panel is found.
     *
     * @param  {Number} x X coordinate
     * @param  {Number} y Y coordinate
     * @return {Class}
     */
    findPanelWithPos(x,y) {
        var found = false;
        if(this.panels.length) {
            var left = this.getLeft();
            var top = this.getTop();
            this.panels.forEach(function(panel) {
                var convertedX = left + (panel.x * this.getWidth() / this.getOriginalWidth());
                var convertedY = top + (panel.y * this.getHeight() / this.getOriginalHeight());
                var convertedXMax = left + convertedX + (panel.width * this.getWidth() / this.getOriginalWidth());
                var convertedYMax = top + convertedY + (panel.height * this.getHeight() / this.getOriginalHeight());
                if( ! found && x > convertedX && x <= convertedXMax && y > convertedY && y <= convertedYMax ) {
                    found = panel;
                }
            }.bind(this));
        }
        return found;
    }

    /**
     * Magnifies a page to a given scale. Animates by adding
     * a class that will animate a transform change, changes the
     * transform scale, then removes the class afterward.
     *
     * @param  {Number}  amount  Scale amount
     * @param  {Boolean} animate Whether or not to animate the scale
     */
    magnify(amount,animate) {
        var animateClass = animate ? 'page__image--transition' : '';

        this.scale = amount;

        this.$element.addClass(animateClass).css({
            transform: 'scale('+this.scale+')'
        });

        if( animate ) {
            setTimeout(function() {
                this.$element.removeClass('page__image--transition');
            }.bind(this),260);
        }
    }

    /**
     * Resets the scale back 0 and unfreezes everything.
     *
     * @param  {Boolean} animate Whether or not to animate the scale change
     */
    resetScale(animate) {
        this.magnify(1,animate);
        this.lastScale = 1;
        this.leftEdge = true;
        this.rightEdge = true;
        this.book.panFrozen = false;
        this.$element.css({
            'margin-left': 0,
            'margin-top': 0
        });
    }

    /**
     * Snaps the page to a left position by a given amount.
     * Animates this change which gives the appearance of "snapping"
     *
     * @param  {Number} amount Amount needed to snap
     */
    snapTo(amount) {
        this.left = this.left + amount;
        this.originalLeft = this.left;
        this.$container.animate({
            left: this.left
        },{
            duration: 250,
            easing: 'easeOutSine',
            complete: function() {
                if( ! this.isCurrentPage && this.scale !== 1 ) {
                    this.resetScale();
                }
                // Makes sure the left position is correct
                this.setLeftPosition(this.book.currentPage.index);
            }.bind(this)
        });
    }

    /**
     * Sets the left position of the page given a page offset.
     * This should lay out each page side by side (or stack
     * them if the offset is 0)
     *
     * @param {Number} offset Number of pages to offset
     */
    setLeftPosition(offset) {
        if( typeof offset === 'undefined' ) {
            offset = 0;
        }
        this.left = (this.index-offset) * this.app.getViewPortSize().width;
        this.originalLeft = this.left;
        this.$container.css('left',this.left);
    }

    /**
     * Checks to see if this page has any panels.
     *
     * @return {Boolean}
     */
    hasPanels() {
        return this.panels.length !== 0;
    }

    /**
     * Sets the current panel and determines the next and previous panels.
     *
     * @param {Class} panel Panel instance to set to current
     */
    setCurrentPanel(panel) {
        this.currentPanel = panel;

        this.nextPanel = panel !== false
            ? (panel.nextPanel !== false
                ? this.panels[panel.nextPanel]
                : false)
            : false;

        this.previousPanel = panel !== false
            ? (panel.previousPanel !== false
                ? this.panels[panel.previousPanel]
                : false)
            : false;
    }

    /**
     * Checks to see if there is a previous panel set.
     *
     * @return {Boolean}
     */
    hasPreviousPanel() {
        return this.previousPanel !== false;
    }

    /**
     * Getter for the previous panel.
     *
     * @return {Class} Previous panel class instance
     */
    getPreviousPanel() {
        return this.previousPanel;
    }

    /**
     * Gets the very last panel in the panels array.
     *
     * @return {Class} Panel instance
     */
    getLastPanel() {
        return this.panels[this.panels.length-1];
    }

    /**
     * Checks to see if there is a next panel
     *
     * @return {Boolean}
     */
    hasNextPanel() {
        return this.nextPanel !== false;
    }

    /**
     * Gets the next panel instance.
     *
     * @return {Class}
     */
    getNextPanel() {
        return this.nextPanel;
    }

    /**
     * Gets the very first panel in the panel array
     *
     * @return {Class}
     */
    getFirstPanel() {
        return this.panels.length ? this.panels[0] : false;
    }

    /**
     * Zooms into a specific panel on a page. Given the original
     * image size, and the original panel size and location, use
     * some maths to determine what the new size of the panel would
     * be if it were best fit and centered on the screen. Again,
     * maths is hard.
     *
     * @param  {Class}   panel   Panel instance
     * @param  {Boolean} animate Whether or not to animate the zoom
     * @return {Boolean}
     */
    zoomToPanel(panel,animate) {
        var viewPortWidth = this.app.getViewPortSize().width;
        var viewPortHeight = this.app.getViewPortSize().height;

        var width = panel.getWidth() >= panel.getHeight() ? viewPortWidth : panel.getWidth() * viewPortHeight / panel.getHeight();
        var height = panel.getHeight() > panel.getWidth() ? viewPortHeight : panel.getHeight() * viewPortWidth / panel.getWidth();

        if( width > viewPortWidth ) {
            width = viewPortWidth;
            height = panel.getHeight() * viewPortWidth / panel.getWidth();
        }

        if( height > viewPortHeight ) {
            height = viewPortHeight;
            width = panel.getWidth() * viewPortHeight / panel.getHeight();
        }

        var pageHeight = height * this.getOriginalHeight() / panel.getHeight();
        var pageWidth = width * this.getOriginalWidth() / panel.getWidth();

        var top = panel.getTopPos() * pageHeight / this.getOriginalHeight();
        var left = panel.getLeftPos() * pageWidth / this.getOriginalWidth();

        animate = typeof animate === 'undefined' ? true : animate;

        this.$element.animate({
            'top': -top + (viewPortHeight - height) / 2,
            'left': -left + ((viewPortWidth - width) / 2),
            width: pageWidth,
            height: pageHeight
        },{
            duration: animate ? this.PANEL_ANIMATION_SPEED : 0,
            easing: 'easeOutSine'
        });

        // Set letterboxing with the leftover width and height
        this.app.setLetterBoxing(viewPortWidth-width,viewPortHeight-height,animate);

        this.setCurrentPanel(panel);
        this.app.settings.rememberBookSetting('panel',panel.index);
        return true;
    }

    /**
     * Zooms the page out from a panel by resetting the page and
     * getting rid of the letterboxing.
     */
    zoomOut() {
        this.app.setLetterBoxing(0,0);
        this.resetZoom();
    }

    /**
     * Resets the zoom level of a page.
     */
    resetZoom() {
        this.setCurrentPanel(false);
        this.centerInViewPort(true);
        this.app.settings.rememberBookSetting('panel',false);
    }

    /**
     * Gets the original image element width
     *
     * @return {Number}
     */
    getOriginalWidth() {
        return this.originalWidth;
    }

    /**
     * Gets the original image element height
     *
     * @return {Number}
     */
    getOriginalHeight() {
        return this.originalHeight;
    }

    /**
     * Gets the current top position of the image element
     * by grabbing and parsing the css "top" property
     *
     * @return {Number}
     */
    getTop() {
        return parseInt(this.$element.css('top'));
    }

    /**
     * Gets the current left position of the image element
     * by grabbing and parsing the css "left" property
     *
     * @return {Number}
     */
    getLeft() {
        return parseInt(this.$element.css('left'));
    }

    /**
     * Gets the image element's current width
     *
     * @return {Number}
     */
    getWidth() {
        return this.$element.width();
    }

    /**
     * Gets the container width
     *
     * @return {Number}
     */
    getFullWidth() {
        return this.$container.width();
    }

    /**
     * Gets the image element's current height
     *
     * @return {Number}
     */
    getHeight() {
        return this.$element.height();
    }

    /**
     * Gets the container height
     *
     * @return {Number}
     */
    getFullHeight() {
        return this.$container.height();
    }
}
