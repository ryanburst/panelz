class Panel {
    constructor(page,config,index) {
        this.page = page;
        this.index = index;
        this.x = config.x;
        this.y = config.y;
        this.nextPanel = this.page.config.panels[index+1] ? index + 1 : false;
        this.previousPanel = this.page.config.panels[index-1] ? index - 1 : false;
        this.width = config.width;
        this.height = config.height;
    }

    getWidth() {
        return this.width;
    }

    getHeight() {
        return this.height;
    }

    getLeftPos() {
        return this.x;
    }

    getTopPos() {
        return this.y;
    }
}
