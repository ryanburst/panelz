class Menu extends EventClass {
    constructor(config) {
        super();
        this.app = config.app;
        this.$menu = $('.viewport__menu');

        this.setEventListeners();

        this.onModeChange(this.app.mode);

    }

    setEventListeners() {
        $('body').on('touchend click','.menu__option--mode',this.onModeToggleClick.bind(this));
        this.app.on('change:mode',this.onModeChange.bind(this));
    }

    activateOption(option) {
        this.$menu.find('.menu__option--' + option).addClass('menu__option--active');
    }

    deactivateOption(option) {
        this.$menu.find('.menu__option--' + option).removeClass('menu__option--active');
    }

    onModeToggleClick(e) {
        e.preventDefault();
        this.app.switchModes();
    }

    onModeChange(mode) {
        if( mode === PAGE_MODE ) {
            this.$menu.find('.menu__option--mode').html('Page<br />Mode');
        } else {
            this.$menu.find('.menu__option--mode').html('Panel Zoom<br />Mode');
        }
    }
};
