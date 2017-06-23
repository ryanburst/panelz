
const PAGE_MODE = 'PAGE_MODE';
const PANEL_ZOOM_MODE = 'PANEL_ZOOM_MODE';
const PAGE_BACK = 'PAGE_BACK';
const PAGE_FORWARD = 'PAGE_FORWARD';
const TOGGLE_MAIN_MENU = 'TOGGLE_MAIN_MENU';

class Panelz extends EventClass {
    constructor(config) {
        super();

        this.DEFAULTS = {
            id: false,
            container: '.panelz-creator-container',
            comic: {
                title: false,
                pages: []
            },
            endpoints: {
                get: '/comic/'
            }
        };

        this.config = $.extend(true,{},this.DEFAULTS,config);

        this.settings = new Settings(this);

        if(this.config.id) {
            this.fetchBookData();
        } else {
            this.setupBook();
        }
    }

    set config(config) {
        this.endpoints = config.endpoints;
        this.$container = $(config.container);
        config.app = this;
        this._config = config;
    }

    get config() {
        return this._config;
    }

    set $container($container) {
        this._$container = $container.append(PANELZ_MARKUP);
    }

    get $container() {
        return _$container;
    }

    getEndpoint(endpoint){
        return this.endpoints[endpoint];
    }

    fetchBookData() {
        $.ajax({
            url: this.getEndpoint('get') + this.config.id,
            method: 'GET',
            error: this.onRequestError.bind(this),
            success: this.onBookDataFetched.bind(this)
        });
    }

    onBookDataFetched(comic) {
        this.config.comic = comic;

        this.setupBook();
    }

    onRequestError() {
        console.log('ERROR FETCHING BOOK DATA!',response);
    }

    setupBook() {
        this.setInitialMode();

        this.tutorial = new Tutorial(this,this.settings);
        this.menu = new Menu(this.config);
        this.viewport = new ViewPort(this.config);
        this.book = new Book(this.config);

        this.setEventListeners();
    }

    setInitialMode() {
        if( this.settings.getBookSetting('mode') ) {
            this.mode = this.settings.getBookSetting('mode');
        } else {
            this.mode = this.settings.get('startInPanelZoom') ? PANEL_ZOOM_MODE : PAGE_MODE;
        }
    }

    setEventListeners() {
        this.book.on('load',this.onBookLoaded.bind(this));
    }

    onBookLoaded(book) {
        this.trigger('load:book',book);
    }

    getComicId() {
        return this.config.comic.id;
    }

    switchModes() {
        var mode = (this.mode === PAGE_MODE)
            ? PANEL_ZOOM_MODE
            : PAGE_MODE;

        this.setMode(mode);

        this.message(this.getReadableModeText());
    }

    setMode(mode) {
        this.mode = mode;
        this.settings.rememberBookSetting('mode',mode);
        this.trigger('change:mode',mode);
    }

    getReadableModeText(mode) {
        if( ! mode ) {
            mode = this.mode;
        }
        return mode.replace(/_/g,' ').toLowerCase().replace(/(?:^|\s)\S/g, function(a) { return a.toUpperCase(); });
    }

    setLetterBoxing(width,height,animate) {
        this.viewport.setLetterBoxing(width,height,animate);
    }

    getViewPortSize() {
        return {
            width: this.viewport.getWidth(),
            height: this.viewport.getHeight()
        }
    }

    addPageMarkupToViewPort($markup) {
        return $markup.appendTo(this.viewport.$element);
    }

    message(message,time) {
        this.viewport.message(message,time);
    }
}
