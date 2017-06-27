class Book extends EventClass {

    constructor(config) {
        super();
        this.config = config;
        this.app = config.app;
        this.pages = [];
        this.loaded = 0;
        this.isLoaded = false;
        this.panFrozen = false;
        this.zoomPanAmount = 0;
        this.size = config.size;
        this.loadedSize = 0;
        this.setEventListeners();
        console.log(this.config);
        config.comic.pages.forEach(function(pageConfig,index) {
            pageConfig.app = this.app;
            pageConfig.panels = pageConfig.panels || [];
            var page = new Page(this,pageConfig,index);
            page.on('load',this.onPageLoaded.bind(this));
            this.pages.push(page);
        }.bind(this));
    }

    get size() {
        return this._size;
    }

    set size(size) {
        if( ! size ) {
            size = 0;
            this.config.comic.pages.forEach(function(pageConfig) {
                size += parseInt(pageConfig.size);
            });
        }
        this._size = size;
        $('.loading__progress').circleProgress({
            value: 0.2,
            size: 80,
            startAngle: Math.PI * 1.5,
            fill: '#55a1e6'
        });
        $('[data-comic-size]').text(this.getReadableSize());
    }

    get loadedSize() {
        return this._loadedSize;
    }

    set loadedSize(size) {
        this._loadedSize = size;
        var percent = this.loadedSize / this.size;
        var degrees = 360 * percent;

        $('.loading__progress').circleProgress('value', percent);
        $('[data-loaded-size]').text(this.getReadableSize(this.loadedSize));
    }

    getReadableSize(size) {
        var bytes = typeof size !== 'undefined' ? size : this.size;
        var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
        if (bytes == 0) return '0 Byte';
        var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
        return (bytes / Math.pow(1024, i)).toFixed(2) + ' ' + sizes[i];
    };

    setEventListeners() {
        this.app.on('change:mode',this.onModeChange.bind(this));
        this.app.on('user',this.registerUserEvent.bind(this));
        this.app.on('user:skipToPage',this.skipToPage.bind(this));
        this.app.on('user:panend',this.onPanEnd.bind(this));
        this.app.on('user:pageForward',this.pageForward.bind(this));
        this.app.on('user:pageBackward',this.pageBackward.bind(this));
    }

    onPageLoaded(page) {
        this.loaded += 1;
        this.loadedSize += parseInt(page.size);
        if(this.loaded === this.pages.length) {
            this.onBookLoaded();
        }
    }

    onBookLoaded() {
        var lastRead = this.app.settings.getBookSetting('page');
        var pageToSet = lastRead ? lastRead : 0;
        this.setCurrentPage(this.pages[pageToSet]);

        // Zoom to panel on start
        if( this.app.mode === PANEL_ZOOM_MODE && this.currentPage.hasPanels() ) {
            var panel = false;
            if( this.app.settings.getBookSetting('panel') !== false ) {
                this.currentPage.zoomToPanel(this.currentPage.panels[this.app.settings.getBookSetting('panel')]);
            } else if( ! this.currentPage.SHOW_PAGE_ON_ENTER ) {
                console.log('show first');
                this.currentPage.zoomToPanel(this.currentPage.getFirstPanel());
            } else {
                this.currentPage.nextPanel = this.currentPage.getFirstPanel();
            }
        }

        this.pages.forEach(function(page, index) {
            page.setLeftPosition(pageToSet);
            if( this.app.mode === PAGE_MODE || this.currentPage.index === index) {
                page.$container.animate({
                    opacity: 1
                },{ duration: 650, easing: 'easeOutSine'});
            }
        }.bind(this));
        this.buildPageIndex();
        setTimeout(function() {
            this.isLoaded = true;
            this.trigger('load:book',this);
            $('.loading').addClass('loading--hidden');
        }.bind(this),1200);
    }

    onModeChange(mode) {
        if( mode === PAGE_MODE ) {
            this.setForPageMode();
        } else {
            this.setForPanelZoomMode();
        }
    }

    onPanEnd(ev) {
        if( this.panFrozen ) {
            return;
        }
        this.pages.forEach(function(page) {
            if(page.shouldBeSetAsCurrent(ev)) {
                this.setCurrentPage(page);
            }
        }.bind(this));
        this.snapPagesToCurrent();
    }

    buildPageIndex() {
        this.pages.forEach(function(page) {
            var $page = $('.page-list__page--template').clone().removeClass('page-list__page--template');
            $page.attr('data-skip-to-page',page.index+1);
            $page.find('.page-list__image').attr('src',page.config.url);
            $page.find('.page-list__number').text(page.index+1);
            $('.page-list').append($page);
        }.bind(this));
    }

    registerUserEvent(e) {
        this.e = e;
    }

    setCurrentPage(page) {
        if(this.currentPage && this.currentPage.panels.length) {
            this.currentPage.currentPanel = false;
        }
        if( this.app.mode === PANEL_ZOOM_MODE && this.currentPage ) {
            this.currentPage.$container.animate({
                opacity: 0
            },{ duration: 550, easing: 'easeOutSine' });
        }
        this.currentPage = page;
        if( this.app.mode === PANEL_ZOOM_MODE ) {
            this.currentPage.$container.css('left',0).animate({
                opacity: 1
            },{ duration: 550, easing: 'easeOutSine' });
        }

        this.trigger('pageSet',page);

        this.app.settings.rememberBookSetting('page',page.index);
    }

    setForPageMode() {
        console.log('Set For Page mode');
        var currentIndex = this.currentPage.index;
        this.pages.forEach(function(page) {
            page.setLeftPosition(currentIndex);
            page.$container.css('opacity',1);
        }.bind(this));
        this.currentPage.zoomOut();
    }

    setForPanelZoomMode() {
        console.log('Set for Panel Zoom mode');
        this.pages.forEach(function(page) {
            page.resetScale();
            page.$container.css('left',0).css('opacity',0);
        }.bind(this));
        this.currentPage.$container.css('opacity',1);

        if( this.currentPage.panels.length ) {
            var panel = this.e && this.e.type === "doubletap" && this.app.settings.get('detectPanelOnDoubleTap')
                ? this.currentPage.findPanelWithPos(this.e.center.x,this.e.center.y)
                : this.currentPage.getFirstPanel();
            this.currentPage.zoomToPanel(panel);
        }
    }

    getNextPage() {
        return this.pages[this.currentPage.index+1];
    }

    getPreviousPage() {
        return this.pages[this.currentPage.index-1];
    }

    snapPagesToCurrent() {
        var amount = -this.currentPage.left
        this.pages.forEach(function(page) {
            page.snapTo(amount);
        });
    }

    pageForward() {
        if( this.app.mode === PANEL_ZOOM_MODE && this.currentPage.panels.length ) {
            if( this.currentPage.hasNextPanel() ) {
                console.log('Zoom to next panel');
                this.currentPage.zoomToPanel(this.currentPage.getNextPanel());
                return true;
            }
            if( this.currentPage.currentPanel !== false && ! this.currentPage.hasNextPanel() ) {
                console.log('Zoom out');
                this.currentPage.zoomOut();
                this.currentPage.previousPanel = this.currentPage.getLastPanel();
                if( this.app.settings.get('showPageOnExit') ) {
                    return true;
                }
            }
        }

        if( this.currentPage.isLast ) {
            return false;
        }

        this.setCurrentPage(this.getNextPage());
        if( this.app.mode === PAGE_MODE ) {
            this.snapPagesToCurrent();
        }
        this.currentPage.onPageEnterForward();
        return true;
    }

    pageBackward() {
        if( this.app.mode === PANEL_ZOOM_MODE && this.currentPage.panels.length ) {
            if( this.currentPage.hasPreviousPanel() ) {
                console.log('Zoom to last panel');
                this.currentPage.zoomToPanel(this.currentPage.getPreviousPanel());
                return true;
            }
            if( this.currentPage.currentPanel !== false && ! this.currentPage.hasPreviousPanel() ) {
                console.log('Zoom out');
                this.currentPage.zoomOut();
                this.currentPage.nextPanel = this.currentPage.getFirstPanel()
                if( this.app.settings.get('showPageOnEnter') ) {
                    return true;
                }

            }
        }

        if( this.currentPage.isFirst ) {
            return false;
        }

        this.setCurrentPage(this.getPreviousPage());
        if( this.app.mode === PAGE_MODE ) {
            this.snapPagesToCurrent();
        }
        this.currentPage.onPageEnterBackward();
    }

    skipToPage(pageNum) {
        console.log('Skip to',pageNum);
        var page = this.pages[pageNum-1];
        this.currentPage.zoomOut();
        this.setCurrentPage(page);
        this.pages.forEach(function(page) {
            page.setLeftPosition(pageNum-1);
            page.$container.css('opacity',1);
        }.bind(this));
        if( this.app.mode === PAGE_MODE ) {
            this.setForPageMode();
        } else {
            this.setForPanelZoomMode();
        }
    }

}
