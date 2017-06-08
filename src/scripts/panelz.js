
const PAGE_MODE = 'PAGE_MODE';
const PANEL_ZOOM_MODE = 'PANEL_ZOOM_MODE';
const PAGE_BACK = 'PAGE_BACK';
const PAGE_FORWARD = 'PAGE_FORWARD';
const TOGGLE_MAIN_MENU = 'TOGGLE_MAIN_MENU';

class Panelz extends EventClass {
    constructor(config) {
        super();
        this.config = config;

        this.settings = new Settings();
        this.setInitialMode();

        this.tutorial = new Tutorial(this.settings);
        this.menu = new Menu(this.config);
        this.viewport = new ViewPort(this.config);
        this.book = new Book(this.config);

        this.setEventListeners();
    }

    set config(config) {
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

    setInitialMode() {
        if( this.settings.getLocalSetting('mode') ) {
            this.mode = this.settings.getLocalSetting('mode');
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

    switchModes() {
        var mode = (this.mode === PAGE_MODE)
            ? PANEL_ZOOM_MODE
            : PAGE_MODE;

        // Current page has panels, but they're not zoomed into one, and about to switch into page mode.
        // OR
        // The page has no panels, which means no zooming at all.
        // ---
        // Message the user to make sure they know the page switch was successful
        var messageUser = ( this.book.currentPage.hasPanels() && ! this.book.currentPage.currentPanel && mode === PAGE_MODE ) || ( ! this.book.currentPage.hasPanels() );

        this.setMode(mode);

        if( messageUser ) {
            this.viewport.message(this.getReadableModeText());
        }

        this.settings.remember('mode',mode);
    }

    setMode(mode) {
        this.mode = mode;
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
}
