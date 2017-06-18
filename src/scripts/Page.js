class Page extends EventClass {
    constructor(config) {
        super();
        this.config = config;
        this.app = config.app;
        this.index = config.index;
        this.isFirst = config.isFirst;
        this.isLast = config.isLast;
        this.panels = [];
        this.PANEL_ANIMATION_SPEED = this.app.settings.get('panelTransitions');
        this.SHOW_PAGE_ON_ENTER = this.app.settings.get('showPageOnEnter');
        this.SHOW_PAGE_ON_EXIT = this.app.settings.get('showPageOnExit');
        this.TURN_THRESHHOLD = 30;
        this.currentPanel = false;
        this.previousPanel = false;
        this.nextPanel = false;
        this.lastPanelSeen = false;
        this.loadSrc(config.src);
        config.panels.forEach( function(panel,index) {
            this.panels.push(new Panel(this,panel,index));
        }.bind(this));
        this.app.settings.on('change:panelTransitions',function(data) {
            this.PANEL_ANIMATION_SPEED = data.value
        }.bind(this));
        this.app.settings.on('change:showPageOnEnter',function(data) {
            this.SHOW_PAGE_ON_ENTER = data.value
        }.bind(this));
        this.app.settings.on('change:showPageOnExit',function(data) {
            this.SHOW_PAGE_ON_EXIT = data.value
        }.bind(this));
        this.app.on('resize',this.setPosition.bind(this));
    }

    loadSrc(src) {
        $('<img src="'+ src +'" />').on('load',this.onPageLoaded.bind(this));
    }

    onPageLoaded(e) {
        this.$container = this.app.addPageMarkupToViewPort($('<div />').addClass('book__page page'));
        this.$element = $(e.currentTarget)
            .addClass('page__image')
            .appendTo(this.$container);
        this.originalWidth = this.$element.width();
        this.originalHeight = this.$element.height();
        this.centerInViewPort();

        this.app.on("user:panstart", function(ev) {
            this.originalLeft = parseInt( this.$container.css( "left" ), 10 );
        }.bind(this));
        this.app.on("user:pan", function(ev) {
            // Stop vertical pan flick
            if(ev.offsetDirection === 8) {
                return true;
            }
            this.left = this.originalLeft + ev.deltaX
            this.$container.css( {
                "left": this.left
            } );
        }.bind(this));
        this.app.on("user:pinch",function(env) {
            this.$element.css({
                width: tihs.getWidth() * e.originalEvent.gesture.scale,
                "margin-left": -this.getLeft() * e.originalEvent.gesture.scale,
                height: this.getHeight() * e.originalEvent.gesture.scale,
                "margin-top": -this.getTop() * e.originalEvent.gesture.scale
           });
        }.bind(this));

        this.trigger('load:page',this);
    }

    onPageEnterForward() {
        if( this.app.mode === PANEL_ZOOM_MODE && this.panels.length ) {
            this.nextPanel = this.getFirstPanel();
            this.previousPanel = this.getPreviousPanel();
            if( ! this.SHOW_PAGE_ON_ENTER ) {
                this.zoomToPanel(this.nextPanel);
            }
        }
    }

    onPageEnterBackward() {
        if( this.app.mode === PANEL_ZOOM_MODE && this.panels.length ) {
            this.previousPanel = this.getLastPanel();
            this.nextPanel = this.getNextPanel();
            if( ! this.SHOW_PAGE_ON_EXIT) {
                this.zoomToPanel(this.previousPanel);
            }
        }
    }

    setPosition() {
        this.centerInViewPort(false);
        this.setLeftPosition(this.app.book.currentPage.index);
        if( this.app.mode === PANEL_ZOOM_MODE && this.currentPanel ) {
            this.zoomToPanel(this.currentPanel,false);
        }
    }

    centerInViewPort(animate) {
        var viewPortWidth = this.app.getViewPortSize().width;
        var viewPortHeight = this.app.getViewPortSize().height;
        var width = viewPortWidth;
        var height = this.getOriginalHeight() * viewPortWidth / this.getOriginalWidth();

        if( height > viewPortHeight ) {
            height = viewPortHeight;
            width = this.getOriginalWidth() * viewPortHeight / this.getOriginalHeight();
        }

        var top = (viewPortHeight - height) / 2;
        var left = (viewPortWidth - width) / 2;

        this.$container.width(viewPortWidth).height(viewPortHeight);

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
        this.left = (this.index-offset) * this.app.getViewPortSize().width;
        this.$container.css('left',this.left);
    }

    hasPanels() {
        return this.panels.length !== 0;
    }

    setCurrentPanel(panel) {
        this.lastPanelSeen = this.currentPanel;
        this.currentPanel = panel;

        this.nextPanel = panel !== false
            ? (panel.nextPanel !== false
                ? this.panels[panel.nextPanel]
                : false)
            : false;

        this.previousPanel = panel !== false
            ? (panel.previousPanel !== false
                ? this.panels[panel.previousPanel]
                : false)
            : false;
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
        return this.panels.length ? this.panels[0] : false;
    }

    zoomToPanel(panel,animate) {
        var viewPortWidth = this.app.getViewPortSize().width;
        var viewPortHeight = this.app.getViewPortSize().height;

        var width = panel.getWidth() >= panel.getHeight() ? viewPortWidth : panel.getWidth() * viewPortHeight / panel.getHeight();
        var height = panel.getHeight() > panel.getWidth() ? viewPortHeight : panel.getHeight() * viewPortWidth / panel.getWidth();

        if( width > viewPortWidth ) {
            width = viewPortWidth;
            height = panel.getHeight() * viewPortWidth / panel.getWidth();
        }

        if( height > viewPortHeight ) {
            height = viewPortHeight;
            width = panel.getWidth() * viewPortHeight / panel.getHeight();
        }

        var pageHeight = height * this.getOriginalHeight() / panel.getHeight();
        var pageWidth = width * this.getOriginalWidth() / panel.getWidth();

        var top = panel.getTopPos() * pageHeight / this.getOriginalHeight();
        var left = panel.getLeftPos() * pageWidth / this.getOriginalWidth();

        animate = typeof animate === 'undefined' ? true : animate;

        this.$element.animate({
            top: -top + (viewPortHeight - height) / 2,
            left: -left + ((viewPortWidth - width) / 2),
            width: pageWidth,
            height: pageHeight
        },{
            duration: animate ? this.PANEL_ANIMATION_SPEED : 0,
            easing: 'easeOutSine'
        });

        this.app.setLetterBoxing(viewPortWidth-width,viewPortHeight-height,animate);

        this.setCurrentPanel(panel);
        this.app.settings.remember('panel',panel.index);
    }

    zoomOut() {
        this.setCurrentPanel(false);
        this.centerInViewPort(true);
        this.app.setLetterBoxing(0,0);
        this.app.settings.remember('panel',false);
    }

    getOriginalWidth() {
        return this.originalWidth;
    }

    getOriginalHeight() {
        return this.originalHeight;
    }

    getTop() {
        return parseInt(this.$element.css('top'));
    }

    getLeft() {
        return parseInt(this.$element.css('left'));
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
