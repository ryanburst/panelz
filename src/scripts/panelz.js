class Panelz extends EventClass {
    constructor(config) {
        super();
        $(config.container).append(PanelzMarkup);
        ViewPort.init();
        Menu.init();
        Book.init(config);
    }
}
