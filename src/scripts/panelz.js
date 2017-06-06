class Panelz extends EventClass {
    constructor(config) {
        super();
        $(config.container).append(PanelzMarkup);
        Menu.init();
        ViewPort.init();
        Menu.init();
        Book.init(config);
    }
}
