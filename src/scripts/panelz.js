
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
        this.tutorial = new Tutorial(this.settings);
        this.book = new Book(this.config);

        this.setInitialMode();

        Menu.init(this.config);
        ViewPort.init(this.config);
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

    switchModes() {
        var mode = (this.mode === PAGE_MODE)
            ? PANEL_ZOOM_MODE
            : PAGE_MODE;
        this.setMode(mode);
        this.settings.remember('mode',mode);
    }

    setMode(mode) {
        this.mode = mode;
        this.trigger('change:mode',mode);
    }
}
