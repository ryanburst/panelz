/**
 * Constant holding the string value of Page Mode
 * for comparisons and setters.
 *
 * @constant
 * @type {String}
 * @default
 */
const PAGE_MODE = 'PAGE_MODE';

/**
 * Constant holding the string value of Panel Zoom
 * Mode for comparisons and setters.
 *
 * @constant
 * @type {String}
 * @default
 */
const PANEL_ZOOM_MODE = 'PANEL_ZOOM_MODE';

/**
 * Constant holding the string value of paging forward
 * for comparisons and setters.
 *
 * @constant
 * @type {String}
 * @default
 */
const PAGE_BACK = 'PAGE_BACK';

/**
 * Constant holding the string value of paging backward
 * for comparisons and setters.
 *
 * @constant
 * @type {String}
 * @default
 */
const PAGE_FORWARD = 'PAGE_FORWARD';

/**
 * Constant holding the string value of toggling
 * the main menu for comparisons and setters.
 *
 * @constant
 * @type {String}
 * @default
 */
const TOGGLE_MAIN_MENU = 'TOGGLE_MAIN_MENU';
/**
 * String value for no letterbox styling
 * @constant
 * @type {String}
 * @default
 */
const LETTERBOX_STYLE_NONE = 'no';
/**
 * Opacity value for no letterbox styling
 * @constant
 * @type {Number}
 * @default
 */
const LETTERBOX_STYLE_NONE_VALUE = 0;
/**
 * String value for opaque letterbox styling
 * @constant
 * @type {String}
 * @default
 */
const LETTERBOX_STYLE_OPAQUE = 'opaque';
/**
 * Opacity value for opaque letterbox styling
 * @constant
 * @type {Number}
 * @default
 */
const LETTERBOX_STYLE_OPAQUE_VALUE = 0.75;
/**
 * String value for the solid letterbox styling
 * @constant
 * @type {String}
 * @default
 */
const LETTERBOX_STYLE_SOLID = 'solid';
/**
 * Opacity value for the solid letterbox styling
 * @constant
 * @type {Number}
 * @default
 */
const LETTERBOX_STYLE_SOLID_VALUE = 1;
/**
 * The main client class for the Panelz application.
 *
 * @class
 * @extends EventClass
 * @author  Ryan Burst <ryanburst@gmail.com>
 * @version 0.3.0
 */
class Panelz extends EventClass {
    /**
     * Takes in a configuration object for the
     * application settings.
     *
     * @constructs Panelz
     * @param config
     */
    constructor(config) {
        super();

        this.DEFAULTS = {
            /**
             * The container to load the comic reader into.
             * Should be a jQuery selector
             *
             * @type {String}
             * @default
             */
            container: '.panelz-creator-container',

            /**
             * ID of the book to load when fetching the data.
             * This value is required if a <#comic> object
             * has not been provided.
             *
             * @type {String}
             * @default
             */
            id: false,

            /**
             * Object of comic data to load into the reader. Must
             * contain an id, title, and array of pages. Each page
             * object must look like the following:
             *     {
             *         url: "<urlOfImage>",
             *         size: <size> //in bytes
             *         panels: [
             *             {
             *                 x: xCoordinateOfPanel
             *                 y: yCoordinateOfPanel
             *                 width: widthOfPanel
             *                 height: heightOfPanel
             *             }
             *             ...
             *         ]
             *     }
             * The panels array within each page can be empty if the
             * page contains to panels to zoom to for the Panel Zoom feature.
             *
             * @type {Object}
             * @default
             */
            comic: {
                id: false,
                title: false,
                pages: []
            },

            /**
             * Supply a custom list of endpoints. The Panelz reader
             * only requires a single endpoint for fetching comic data
             * via the supplied <#id> configuration.
             *
             * The {id} placeholder will be swapped for the supplied
             * <#id> configuration parameter.
             *
             * @type {Object}
             * @default
             */
            endpoints: {
                get: '/comic/{id}'
            },
            /**
             * Directory where the tutorial images are stored
             *
             * @type {String}
             * @default
             */
            tutorialImageLocation: '../dist/images/'
        };

        this.config = $.extend(true,{},this.DEFAULTS,config);

        this.settings = new Settings(this);

        /**
         * If the user has supplied an id in the configuration,
         * fetch the book data using the <#endpoint.get> endpoint.
         * Otherwise we should have a <#comic> data object to use.
         */
        if(this.config.id) {
            this.fetchBookData();
        } else {
            this.setupBook();
        }
    }

    /**
     * When setting the config object, use this setter to set
     * a few of the items contained within the object.
     *
     * @param  {Object} config Configuration options
     */
    set config(config) {
        this.endpoints = config.endpoints;
        this.$container = $(config.container);
        config.app = this;
        this._config = config;
    }

    /**
     * Gets the configuration object internal.
     *
     * @return {Object}
     */
    get config() {
        return this._config;
    }

    /**
     * When setting the $container property, append the the
     * markup needed to run the Panelz reader.
     *
     * @param  {Object} $container jQuery object to append markup to
     */
    set $container($container) {
        this._$container = $container.append(PANELZ_MARKUP);
    }

    /**
     * Gets the $container object internal.
     *
     * @return {Object}
     */
    get $container() {
        return _$container;
    }

    /**
     * Gets a specific endpoint from the array of endpoints. Replaces
     * the {id} placeholder with the id set in the configuration.
     *
     * @param  {String} endpoint Which endpoint to grab from the array
     * @return {String}
     */
    getEndpoint(endpoint){
        return this.endpoints[endpoint].replace('{id}',this.config.id);
    }

    /**
     * Uses the {get} endpoint to fetch book data.
     */
    fetchBookData() {
        $.ajax({
            url: this.getEndpoint('get'),
            method: 'GET',
            success: this.onBookDataFetched.bind(this),
            error: this.onRequestError.bind(this)
        });
    }

    /**
     * When book data has fetched, set internal configuration
     * options and proceed with setting up the comic with the
     * returned object. Assumes a valid return format.
     *
     * @param  {Object} comic Object data outlined in configuration
     */
    onBookDataFetched(comic) {
        this.config.comic = comic;
        this.setupBook();
    }

    /**
     * The request to grab comic data has failed. Currently
     * does nothing more than output the response to the console.
     */
    onRequestError(response) {
        console.log('ERROR FETCHING BOOK DATA!',response);
    }

    /**
     * The reader is ready to setup. Initialize all the objects
     * needed to run the reader and setup event listeners.
     */
    setupBook() {
        this.setInitialMode();

        this.tutorial = new Tutorial(this,this.settings,{
            imageLocation: this.config.tutorialImageLocation
        });
        this.viewport = new ViewPort(this);
        this.book = new Book(this,this.config.comic);
        this.menu = new Menu(this,this.book,this.tutorial);

        this.setEventListeners();
    }

    /**
     * Sets the initial mode of the reader. If the reader has
     * read this comic before, their previous mode will be
     * remembered and used. Otherwise it will check their
     * settings preferences and fall back on PAGE_MODE.
     */
    setInitialMode() {
        if( this.settings.getBookSetting('mode') ) {
            this.mode = this.settings.getBookSetting('mode');
        } else {
            this.mode = this.settings.get('startInPanelZoom')
                ? PANEL_ZOOM_MODE
                : PAGE_MODE;
        }
    }

    /**
     * Sets event listeners on initialized objects. In this
     * case, we're listening for when the comic has been
     * fully loaded.
     */
    setEventListeners() {
        this.on('user:doubletap',this.switchModes.bind(this));
        this.book.on('load',this.onBookLoaded.bind(this));
    }

    /**
     * Pass along the loaded book event so other objects
     * only have to listen to and know about the app object.
     *
     * @param  {Book} book The class object representing a comic
     * @fires  Panelz#load:book
     */
    onBookLoaded(book) {
        /**
         * Load book event.
         *
         * @event Panelz#load:book
         * @type {object}
         * @property {Book} Book loaded
         */
        this.trigger('load:book',book);
    }

    /**
     * Getter for the comicc ID
     *
     * @return {Mixed}
     */
    getComicId() {
        return this.config.comic.id;
    }

    /**
     * Switches the application between the two modes,
     * PAGE_MODE and PANEL_ZOOM_MODE. Messages the user
     * about the mode change so they know what mode they are in.
     */
    switchModes() {
        var mode = (this.mode === PAGE_MODE)
            ? PANEL_ZOOM_MODE
            : PAGE_MODE;

        this.setMode(mode);

        this.message(this.getReadableModeText());
    }

    /**
     * Sets the current application mode. Makes sure the user's
     * change is remembered in the settings and then triggers
     * an event for other objects to hook into.
     *
     * @param {String} mode Which mode to set.
     * @fires Panelz#change:mode
     */
    setMode(mode) {
        this.mode = mode;
        this.settings.rememberBookSetting('mode',mode);
        /**
         * Change mode event
         *
         * @event Panelz#change:mode
         * @type {String}
         * @property {string} mode - What mode was set
         */
        this.trigger('change:mode',mode);
    }

    /**
     * Gets the human readable version of the current or passed
     * in mode. Takes the string and breaks it into something readable.
     * PANEL_ZOOM_MODE -> Panel Zoom Mode
     *
     * @param  {String}  mode        Optional mode, otherwise use current mode
     * @param  {Boolean} insertBreak Whether or not to insert a break element
     * @return {String}
     */
    getReadableModeText(mode,insertBreak) {
        if( ! mode ) {
            mode = this.mode;
        }
        return mode.replace(/_/g,' ')
            .toLowerCase()
            .replace(/(?:^|\s)\S/g, function(a) { return a.toUpperCase(); })
            .replace(' Mode',insertBreak ? '<br />Mode' : ' Mode');
    }

    /**
     * Sets the letterboxing in the viewport. Passes in the
     * width and height available for use and whether or not
     * the transition should be animated.
     *
     * @param {Number}  width   Width left to work with
     * @param {Number}  height  Height left to work with
     * @param {Boolean} animate Animate letterbox transition
     */
    setLetterBoxing(width,height,animate) {
        this.viewport.setLetterBoxing(width,height,animate);
    }

    /**
     * Gets the current size of the viewport as an object
     * containing the width and height.
     *
     * @return {Object}
     */
    getViewPortSize() {
        return {
            width: this.viewport.getWidth(),
            height: this.viewport.getHeight()
        }
    }

    /**
     * Returns the last user event object recorded.
     *
     * @return {Object}
     */
    getLastUserEvent() {
        return this.viewport.getLastUserEvent();
    }

    /**
     * Appends a jQuery <#$markup> object to the viewport.
     *
     * @param {Object} $markup jQuery element representing the page
     * @return {Object}
     */
    addPageMarkupToViewPort($markup) {
        return $markup.appendTo(this.viewport.$element);
    }

    /**
     * Displays a message for the user within the viewport.
     *
     * @param  {String} message Message to display
     * @param  {Number} time    Time in ms to display the message
     */
    message(message,time) {
        this.viewport.message(message,time);
    }
}
