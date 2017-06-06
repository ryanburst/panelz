var Book = {

    pages: [],

    loaded: 0,

    init: function(config) {
        this.config = config;
        config.pages.forEach(function(page) {
            page = new Page(page);
            page.on('load',this.onPageLoaded.bind(this));
            this.pages.push(page);
        }.bind(this));
    },

    onPageLoaded: function(page) {
        this.loaded += 1;
        if(this.loaded === this.pages.length) {
            this.onBookLoaded();
        }
    },

    onBookLoaded: function() {
        var lastRead = ViewPort.settings.getLocalSetting('page');
        var pageToSet = lastRead ? lastRead : 0;
        this.setCurrentPage(this.pages[pageToSet]);
        this.currentPage.onPageEnterForward();
        this.pages.forEach(function(page, index) {
            page.setLeftPosition(pageToSet);
            if( ViewPort.MODE === ViewPort.PAGE_MODE || this.currentPage.index === index) {
                page.$container.animate({
                    opacity: 1
                },{ duration: 650, easing: 'easeOutSine'});
            }
        }.bind(this));
        this.buildPageIndex();
        ViewPort.onBookLoaded();
    },

    buildPageIndex: function() {
        this.pages.forEach(function(page) {
            var $page = $('.page-list__page--template').clone().removeClass('page-list__page--template');
            $page.attr('data-skip-to-page',page.index+1);
            $page.find('.page-list__image').attr('src',page.config.src);
            $page.find('.page-list__number').text(page.index+1);
            $('.page-list').append($page);
        }.bind(this));
    },

    setCurrentPage: function(page) {
        if(this.currentPage && this.currentPage.panels.length) {
            this.currentPage.currentPanel = false;
        }
        if( ViewPort.MODE === ViewPort.PANEL_ZOOM_MODE && this.currentPage ) {
            this.currentPage.$container.animate({
                opacity: 0
            },{ duration: 550, easing: 'easeOutSine' });
        }
        this.currentPage = page;
        if( ViewPort.MODE === ViewPort.PANEL_ZOOM_MODE ) {
            this.currentPage.$container.css('left',0).animate({
                opacity: 1
            },{ duration: 550, easing: 'easeOutSine' });
        }

        ViewPort.settings.remember('page',page.index);
    },

    setForPageMode: function() {
        console.log('Set For Page mode');
        var currentIndex = this.currentPage.index;
        this.pages.forEach(function(page) {
            page.setLeftPosition(currentIndex);
            page.$container.css('opacity',1);
        }.bind(this));
        this.currentPage.zoomOut();
    },

    setForPanelZoomMode: function() {
        console.log('Set for Panel Zoom mode');
        this.pages.forEach(function(page) {
            page.$container.css('left',0).css('opacity',0);
        }.bind(this));
        this.currentPage.$container.css('opacity',1);

        if( this.currentPage.panels.length ) {
            this.currentPage.onPageEnterForward();
        }
    },

    getNextPage: function() {
        return this.pages[this.currentPage.index+1];
    },

    getPreviousPage: function() {
        return this.pages[this.currentPage.index-1];
    },

    snapPagesToCurrent: function() {
        var amount = -this.currentPage.left
        this.pages.forEach(function(page) {
            page.snapTo(amount);
        });
    },

    pageForward: function() {
        ViewPort.$menu.removeClass('viewport__menu--active');
        if( ViewPort.MODE === ViewPort.PANEL_ZOOM_MODE && this.currentPage.panels.length ) {
            if( this.currentPage.hasNextPanel() ) {
                console.log('Zoom to next panel');
                this.currentPage.zoomToPanel(this.currentPage.getNextPanel());
                return true;
            }
            if( this.currentPage.currentPanel !== false && ! this.currentPage.hasNextPanel() ) {
                console.log('Zoom out');
                this.currentPage.zoomOut();
                this.currentPage.previousPanel = this.currentPage.getLastPanel();
                if( ViewPort.settings.get('showPageOnExit') ) {
                    return true;
                }
            }
        }

        if( this.currentPage.isLast ) {
            return false;
        }
        this.currentPage.onPageLeaveFoward();
        this.setCurrentPage(this.getNextPage());
        if( ViewPort.MODE === ViewPort.PAGE_MODE ) {
            this.snapPagesToCurrent();
        }
        this.currentPage.onPageEnterForward();
        return true;
    },

    pageBackward: function() {
        ViewPort.$menu.removeClass('viewport__menu--active');
        if( ViewPort.MODE === ViewPort.PANEL_ZOOM_MODE && this.currentPage.panels.length ) {
            if( this.currentPage.hasPreviousPanel() ) {
                console.log('Zoom to last panel');
                this.currentPage.zoomToPanel(this.currentPage.getPreviousPanel());
                return true;
            }
            if( this.currentPage.currentPanel !== false && ! this.currentPage.hasPreviousPanel() ) {
                console.log('Zoom out');
                this.currentPage.zoomOut();
                this.currentPage.nextPanel = this.currentPage.getFirstPanel()
                if( ViewPort.settings.get('showPageOnEnter') ) {
                    return true;
                }

            }
        }

        if( this.currentPage.isFirst ) {
            return false;
        }
        this.currentPage.onPageLeaveBackward();
        this.setCurrentPage(this.getPreviousPage());
        if( ViewPort.MODE === ViewPort.PAGE_MODE ) {
            this.snapPagesToCurrent();
        }
        this.currentPage.onPageEnterBackward();
    },

    skipToPage: function(pageNum) {
        var page = this.pages[pageNum-1];
        this.currentPage.zoomOut();
        this.setCurrentPage(page);
        this.pages.forEach(function(page) {
            page.setLeftPosition(pageNum-1);
            page.$container.css('opacity',1);
        }.bind(this));
        if( ViewPort.MODE === ViewPort.PAGE_MODE ) {
            this.setForPageMode();
        } else {
            this.setForPanelZoomMode();
        }
    }

};
