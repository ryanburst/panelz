class Menu extends EventClass {
    constructor(config) {
        super();
        this.app = config.app;
        this.$menu = $('.viewport__menu');

        this.setEventListeners();

        if(this.app.mode === PANEL_ZOOM_MODE) {
            this.activateOption('panel-zoom');
        }

    }

    setEventListeners() {
        this.$menu.on('click','.menu__option--panel-zoom',this.onPanelZoomToggleClick.bind(this));
        this.app.on('change:mode',this.onModeChange.bind(this));
    }

    activateOption(option) {
        this.$menu.find('.menu__option--' + option).addClass('menu__option--active');
    }

    deactivateOption(option) {
        this.$menu.find('.menu__option--' + option).removeClass('menu__option--active');
    }

    onPanelZoomToggleClick(e) {
        this.app.switchModes();
    }

    onModeChange(mode) {
        if( mode === PAGE_MODE ) {
            this.deactivateOption('panel-zoom');
        } else {
            this.activateOption('panel-zoom');
        }
    }
};
