class Panelz extends EventClass {
    constructor(config) {
        super();
        ViewPort.init();
        Menu.init();
        Book.init(config);
    }
}
