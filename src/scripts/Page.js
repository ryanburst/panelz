class Page extends EventClass {
    constructor(config) {
        super();
        this.config = config;
        this.index = config.index;
        this.isFirst = config.isFirst;
        this.isLast = config.isLast;
        this.panels = [];
        this.PANEL_ANIMATION_SPEED = ViewPort.settings.get('panelTransitions');
        this.SHOW_PAGE_ON_ENTER = ViewPort.settings.get('showPageOnEnter');
        this.SHOW_PAGE_ON_EXIT = ViewPort.settings.get('showPageOnExit');
        this.TURN_THRESHHOLD = 30;
        this.currentPanel = false;
        this.previousPanel = false;
        this.nextPanel = false;
        this.lastPanelSeen = false;
        this.loadSrc(config.src);
        config.panels.forEach( function(panel,index) {
            this.panels.push(new Panel(this,panel,index));
        }.bind(this));
        ViewPort.settings.on('change:panelTransitions',function(data) {
            this.PANEL_ANIMATION_SPEED = data.value
        }.bind(this));
        ViewPort.settings.on('change:showPageOnEnter',function(data) {
            this.SHOW_PAGE_ON_ENTER = data.value
        }.bind(this));
        ViewPort.settings.on('change:showPageOnExit',function(data) {
            this.SHOW_PAGE_ON_EXIT = data.value
        }.bind(this));
    }

    loadSrc(src) {
        $('<img src="'+ src +'" />').on('load',this.onPageLoaded.bind(this));
    }

    onPageLoaded(e) {
        this.$container = $('<div />').addClass('book__page page').appendTo(ViewPort.$element);
        this.$element = $(e.currentTarget)
            .addClass('page__image')
            .appendTo(this.$container);
        this.originalWidth = this.$element.width();
        this.originalHeight = this.$element.height();
        this.centerInViewPort();

        ViewPort.interactable.on("panstart", function(ev) {
            this.originalLeft = parseInt( this.$container.css( "left" ), 10 );
        }.bind(this));
        ViewPort.interactable.on("pan", function(ev) {
            // Stop vertical pan flick
            if(ev.offsetDirection === 8) {
                return true;
            }
            this.left = this.originalLeft + ev.deltaX
            this.$container.css( {
                "left": this.left
            } );
        }.bind(this));
        ViewPort.interactable.on("pinch",function(env) {
            console.log(env);
        });

        this.trigger('load:page',this);
    }

    onPageEnterForward() {
        if( ViewPort.MODE === ViewPort.PANEL_ZOOM_MODE && this.panels.length ) {
            this.nextPanel = this.getFirstPanel();
            this.previousPanel = this.getPreviousPanel();
            if( ! this.SHOW_PAGE_ON_ENTER || this.nextPanel.index !== 0) {
                this.zoomToPanel(this.nextPanel);
            }
        }
    }

    onPageLeaveFoward() {

    }

    onPageEnterBackward() {
        if( ViewPort.MODE === ViewPort.PANEL_ZOOM_MODE && this.panels.length ) {
            this.previousPanel = this.getLastPanel();
            this.nextPanel = this.getNextPanel();
            if( ! this.SHOW_PAGE_ON_EXIT) {
                this.zoomToPanel(this.previousPanel);
            }
        }
    }

    onPageLeaveBackward() {

    }

    centerInViewPort(animate) {
        var width = ViewPort.getWidth();
        var height = this.getOriginalHeight() * ViewPort.getWidth() / this.getOriginalWidth();

        if( height > ViewPort.getHeight() ) {
            height = ViewPort.getHeight();
            width = this.getOriginalWidth() * ViewPort.getHeight() / this.getOriginalHeight();
        }

        var top = (ViewPort.getHeight() - height) / 2;
        var left = (ViewPort.getWidth() - width) / 2;

        this.$container.width(ViewPort.getWidth()).height(ViewPort.getHeight());

        this.$element.animate({
            top: top,
            left: left,
            width: width,
            height: height
        },{
            duration: (animate ? this.PANEL_ANIMATION_SPEED : 0),
            easing: 'easeOutSine'
        });
    }

    shouldBeSetAsCurrent(env) {
        if(this.isFirst && this.left > 0) {
            return true;
        }
        if(this.isLast && this.left < 0) {
            return true;
        }
        if(env.deltaX < 0 && this.left > 0 && this.left < this.getFullWidth() - this.TURN_THRESHHOLD) {
            return true;
        }
        if(env.deltaX > 0 && this.left + this.getFullWidth() > this.TURN_THRESHHOLD && this.left + this.getFullWidth() < this.getFullWidth()) {
            return true;
        }
        return false
    }

    findPanelWithPos(x,y) {
        var panel = false;
        if(this.panels.length) {
            this.panels.forEach(function(panel) {
                //var convertedX = this.
            }.bind(this));
        }
    }

    snapTo(amount) {
        this.left = this.left + amount;
        this.$container.animate({
            left: this.left
        },{
            duration: 250,
            easing: 'easeOutSine'
        });
    }

    setLeftPosition(offset) {
        if( typeof offset === 'undefined' ) {
            offset = 0;
        }
        this.left = (this.index-offset) * ViewPort.getWidth();
        this.$container.css('left',this.left);
    }

    setCurrentPanel(panel) {
        this.lastPanelSeen = this.currentPanel;
        this.currentPanel = panel;
    }

    setNextPanel() {
        this.nextPanel = this.currentPanel !== false
            ? (this.currentPanel.nextPanel !== false
                ? this.panels[this.currentPanel.nextPanel]
                : false)
            : false
    }

    setPreviousPanel() {
        this.previousPanel = this.currentPanel !== false
            ? (this.currentPanel.previousPanel !== false
                ? this.panels[this.currentPanel.previousPanel]
                : false)
            : false
    }

    getLastPanelSeen() {
        return this.lastPanelSeen;
    }

    hasPreviousPanel() {
        return this.previousPanel !== false;
    }

    getPreviousPanel() {
        return this.previousPanel;
    }

    getLastPanel() {
        return this.panels[this.panels.length-1];
    }

    hasNextPanel() {
        return this.nextPanel !== false;
    }

    getNextPanel() {
        return this.nextPanel;
    }

    getFirstPanel() {
        if( ViewPort.settings.getLocalSetting('panel') ) {
            return this.panels[ViewPort.settings.getLocalSetting('panel')];
        }
        return this.panels.length ? this.panels[0] : false;
    }

    zoomToPanel(panel,animate) {
        var width = panel.getWidth() >= panel.getHeight() ? ViewPort.getWidth() : panel.getWidth() * ViewPort.getHeight() / panel.getHeight();
        var height = panel.getHeight() > panel.getWidth() ? ViewPort.getHeight() : panel.getHeight() * ViewPort.getWidth() / panel.getWidth();

        if( width > ViewPort.getWidth() ) {
            width = ViewPort.getWidth();
            height = panel.getHeight() * ViewPort.getWidth() / panel.getWidth();
        }

        if( height > ViewPort.getHeight() ) {
            height = ViewPort.getHeight();
            width = panel.getWidth() * ViewPort.getHeight() / panel.getHeight();
        }

        var pageHeight = height * this.getOriginalHeight() / panel.getHeight();
        var pageWidth = width * this.getOriginalWidth() / panel.getWidth();

        var top = panel.getTopPos() * pageHeight / this.getOriginalHeight();
        var left = panel.getLeftPos() * pageWidth / this.getOriginalWidth();

        animate = typeof animate === 'undefined' ? true : animate;

        this.$element.animate({
            top: -top + (ViewPort.getHeight() - height) / 2,
            left: -left + ((ViewPort.getWidth() - width) / 2),
            width: pageWidth,
            height: pageHeight
        },{
            duration: animate ? this.PANEL_ANIMATION_SPEED : 0,
            easing: 'easeOutSine'
        });

        ViewPort.setLetterBoxing(ViewPort.getHeight()-height,ViewPort.getWidth()-width,animate);

        this.setCurrentPanel(panel);
        this.setNextPanel();
        this.setPreviousPanel();
        ViewPort.settings.remember('panel',panel.index);
    }

    zoomOut() {
        this.setCurrentPanel(false);
        this.centerInViewPort(true);
        this.setCurrentPanel(false);
        ViewPort.setLetterBoxing(0,0);
        ViewPort.settings.remember('panel',false);
    }

    getOriginalWidth() {
        return this.originalWidth;
    }

    getOriginalHeight() {
        return this.originalHeight;
    }

    getWidth() {
        return this.$element.width();
    }

    getFullWidth() {
        return this.$container.width();
    }

    getHeight() {
        return this.$element.height();
    }

    getFullHeight() {
        return this.$container.height();
    }
}
