/**
 * Book classes representing the entire comic. Loads
 * all of the pages and handles what happens when they
 * want to navigate between pages.
 *
 * @class
 * @extends EventClass
 * @author  Ryan Burst <ryanburst@gmail.com>
 * @version 0.3.0
 */
class Book extends EventClass {

    /**
     * Creates a new instance of the Book class. Sets all the
     * initial varaibles and listens for events on the application.
     *
     * @constructs Book
     * @param  {Class}  app    Panelz app instance
     * @param  {Object} config Configuration options
     */
    constructor(app,config) {
        super();
        /**
         * Configuration options
         * @type {Object}
         */
        this.config = config;
        /**
         * Panelz app instance
         * @type {Class}
         */
        this.app = app;
        /**
         * Title of the comic
         * @type {String}
         */
        this.title = config.title || 'Unknown title';
        /**
         * Size of the comic.
         * @type {Number}
         */
        this.size = config.size || 0;
        /**
         * How many pages have been loaded
         * @type {Number}
         */
        this.loaded = 0;
        /**
         * How much of the book has been loaded in bytes
         * @type {Number}
         */
        this.loadedSize = 0;
        /**
         * Whether or not the book has been fully loaded
         * @type {Boolean}
         */
        this.isLoaded = false;
        /**
         * Whether or not the user should be allowed to
         * pan all the pages or not.
         * @type {Boolean}
         */
        this.panFrozen = false;
        /**
         * How much the user has zoomed in on the book
         * @type {Number}
         */
        this.zoomPanAmount = 0;

        this.setEventListeners();
        this.pages = [];
        config.pages.forEach(function(pageConfig,index) {
            pageConfig.panels = pageConfig.panels || [];
            var page = new Page(this.app,this,pageConfig,index);
            page.on('load',this.onPageLoaded.bind(this));
            this.pages.push(page);
        }.bind(this));
    }

    /**
     * Getter for the size of the comic
     *
     * @return {Number}
     */
    get size() {
        return this._size;
    }

    /**
     * Setter for the size of the comic. If the size is
     * zero or a non number, go through all the pages to
     * determine the total comic size.
     *
     * Also initializes the progress loader.
     *
     * @param  {Number} size Size of the comic
     */
    set size(size) {
        if( ! size ) {
            size = 0;
            this.config.pages.forEach(function(pageConfig) {
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

    /**
     * Gets the currently loaded size of the comic.
     *
     * @return {Number}
     */
    get loadedSize() {
        return this._loadedSize;
    }

    /**
     * Update the total loaded size. Updates the progress
     * loader element for the user.
     *
     * @param  {Number} size Size to add to total
     */
    set loadedSize(size) {
        this._loadedSize = size;
        var percent = this.loadedSize / this.size;
        var degrees = 360 * percent;

        $('.loading__progress').circleProgress('value', percent);
        $('[data-loaded-size]').text(this.getReadableSize(this.loadedSize));
    }

    /**
     * Gets a readable size of the comic, as it is in bytes.
     *
     * @param  {Number} size Size in bytes
     * @return {String}
     */
    getReadableSize(size) {
        var bytes = typeof size !== 'undefined' ? size : this.size;
        var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
        if (bytes == 0) return '0 Byte';
        var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
        return (bytes / Math.pow(1024, i)).toFixed(2) + ' ' + sizes[i];
    };

    /**
     * Application event listeners
     */
    setEventListeners() {
        this.app.on('user:skipToPage',this.skipToPage.bind(this));
        this.app.on('user:panend',this.onPanEnd.bind(this));
        this.app.on('user:pageForward',this.pageForward.bind(this));
        this.app.on('user:pageBackward',this.pageBackward.bind(this));
        this.app.on('change:mode',this.onModeChange.bind(this));
    }

    /**
     * When a page is loaded, update the total number of pages
     * loaded. If that's all of them, trigger the book loaded method.
     *
     * @param  {Class} page Page instance
     */
    onPageLoaded(page) {
        this.loaded += 1;
        this.loadedSize += parseInt(page.size);
        if(this.loaded === this.pages.length) {
            this.onBookLoaded();
        }
    }

    /**
     * Book has loaded. Set the current page and determine whether
     * or not to zoom in on a panel. Otherwise set all the pages
     * left positions to be offset to each other.
     *
     * Waits 1200ms to trigger the loaded event due to the progress
     * timer animation taking 1200ms to update.
     *
     * @fires Book#load:book
     */
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
            /**
             * Load book event
             *
             * @event Book#load:book:<setting>
             * @type {Object}
             * @property {Class} Book class instance
             */
            this.trigger('load:book',this);
            $('.loading').addClass('loading--hidden');
        }.bind(this),1200);
    }

    /**
     * When there is a mode change, setup the book for that mode.
     *
     * @param  {String} mode Mode of app
     */
    onModeChange(mode) {
        if( mode === PAGE_MODE ) {
            this.setForPageMode();
        } else {
            this.setForPanelZoomMode();
        }
    }

    /**
     * Pan has ended. Check to see if a new page needs to be set
     * as the current page and snap (animate) all the pages to
     * their respective positions.
     *
     * @param  {Object} e Event object
     * @return {[type]}    [description]
     */
    onPanEnd(e) {
        if( this.panFrozen ) {
            return;
        }
        var currentPage = this.currentPage;
        this.pages.forEach(function(page) {
            if(page.shouldBeSetAsCurrent(e)) {
                this.setCurrentPage(page);
            }
        }.bind(this));
        this.snapPagesToCurrent();
        if( this.currentPage === currentPage && currentPage.isLast ) {
            this.onEndReached();
        }
    }

    /**
     * The end of the comic has been reached. Message the user.
     */
    onEndReached() {
        this.app.message('End of comic');
    }

    /**
     * Builds the page index so the user can jump to any page
     * wherever they are in the comic.
     */
    buildPageIndex() {
        this.pages.forEach(function(page) {
            var $page = $('.page-list__page--template').clone().removeClass('page-list__page--template');
            $page.attr('data-skip-to-page',page.index+1);
            $page.find('.page-list__image').attr('src',page.config.url);
            $page.find('.page-list__number').text(page.index+1);
            $('.page-list').append($page);
        }.bind(this));
    }

    /**
     * Sets the current page of the comic.
     *
     * @param {Class} page Page class instance
     * @fires Book#pageSet
     */
    setCurrentPage(page) {
        if(this.currentPage && this.currentPage.panels.length) {
            this.currentPage.resetZoom();
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

        /**
         * Page Set event
         *
         * @event Book#pageSet
         * @type {Object}
         * @property {Class} Page instance of current page
         */
        this.trigger('pageSet',page);

        this.app.settings.rememberBookSetting('page',page.index);
    }

    /**
     * Sets up all the pages for Page Mode. All of the
     * pages need to be side by side so the user can
     * pan left and right through them.
     */
    setForPageMode() {
        console.log('Set For Page mode');
        var currentIndex = this.currentPage.index;
        this.pages.forEach(function(page) {
            page.setLeftPosition(currentIndex);
            page.$container.css('opacity',1);
        }.bind(this));
        this.currentPage.zoomOut();
    }

    /**
     * Sets up all the pages for Panel Zoom Mode. All of
     * the pages can stack on top of each other, with the
     * "active" page on top. If this page has panels,
     * zoom in on one of them, either the first one or if
     * they were double tapping, the panel they double
     * tapped on (if settings allow it)
     */
    setForPanelZoomMode() {
        console.log('Set for Panel Zoom mode');
        this.pages.forEach(function(page) {
            page.resetScale();
            page.$container.css('left',0).css('opacity',0);
        }.bind(this));
        this.currentPage.$container.css('opacity',1);
        if( this.currentPage.panels.length ) {
            var lastUserEvent = this.app.getLastUserEvent();
            var panel = lastUserEvent && lastUserEvent.type === "doubletap" && this.app.settings.get('detectPanelOnDoubleTap')
                ? this.currentPage.findPanelWithPos(lastUserEvent.center.x,lastUserEvent.center.y)
                : this.currentPage.getFirstPanel();
            this.currentPage.zoomToPanel(panel);
        }
    }

    /**
     * Gets the next page instance in the sequence.
     *
     * @return {Class}
     */
    getNextPage() {
        return this.pages[this.currentPage.index+1];
    }

    /**
     * Gets the previous page instance in the sequence.
     *
     * @return {Class}
     */
    getPreviousPage() {
        return this.pages[this.currentPage.index-1];
    }

    /**
     * Snaps all the pages relative to the current page.
     */
    snapPagesToCurrent() {
        var amount = -this.currentPage.left
        this.pages.forEach(function(page) {
            page.snapTo(amount);
        });
    }

    /**
     * Pages the user forward in the book. If they are in Panel
     * Zoom Mode, it will move them forward by panels. If they
     * are in page mode, it will move them forward an entire page.
     *
     * @return {Boolean}
     */
    pageForward() {
        if( this.app.mode === PANEL_ZOOM_MODE && this.currentPage.panels.length ) {
            // Zoom in on the next panel and bail from method
            if( this.currentPage.hasNextPanel() ) {
                console.log('Zoom to next panel');
                return this.currentPage.zoomToPanel(this.currentPage.getNextPanel());
            }
            // Currently zoomed on a panel, but there are no next panels, we need to zoom out
            // and bail from method (if they don't want to show page on exit)
            if( this.currentPage.currentPanel !== false && ! this.currentPage.hasNextPanel() ) {
                console.log('Zoom out');
                this.currentPage.previousPanel = this.currentPage.getLastPanel();
                if( this.currentPage.isLast && ! this.currentPage.hasNextPanel() ) {
                    this.onEndReached();
                }
                if( this.app.settings.get('showPageOnExit') ) {
                    this.currentPage.zoomOut();
                    return true;
                }
            }
        }

        // No panels to zoom on, we're zoomed out, but this is the last page
        if( this.currentPage.isLast ) {
            return this.onEndReached() && false;
        }

        // No panels to zoom on, we're zoomed out, so move on to the next page
        this.setCurrentPage(this.getNextPage());
        if( this.app.mode === PAGE_MODE ) {
            this.snapPagesToCurrent();
        }
        this.currentPage.onPageEnterForward();
        if( this.app.settings.get('showPageChangeMessage') ) {
            this.app.message('Page ' + this.currentPage.num);
        }
        return true;
    }

    /**
     * Pages the user backward in the book. If they are in Panel
     * Zoom Mode, it will move them backward by panels. If they
     * are in page mode, it will move them backward an entire page.
     *
     * @return {Boolean}
     */
    pageBackward() {
        if( this.app.mode === PANEL_ZOOM_MODE && this.currentPage.panels.length ) {
            // Zoom in on the next panel and bail from method
            if( this.currentPage.hasPreviousPanel() ) {
                console.log('Zoom to last panel');
                return this.currentPage.zoomToPanel(this.currentPage.getPreviousPanel());
            }
            // Currently zoomed on a panel, but there are no next panels, we need to zoom out
            // and bail from the method (if they don't want to show page on enter)
            if( this.currentPage.currentPanel !== false && ! this.currentPage.hasPreviousPanel() ) {
                console.log('Zoom out');
                this.currentPage.nextPanel = this.currentPage.getFirstPanel()
                if( this.app.settings.get('showPageOnEnter') ) {
                    this.currentPage.zoomOut();
                    return true;
                }
            }
        }

        // No panels to zoom on, we're zoomed out, but this is the last page
        if( this.currentPage.isFirst ) {
            return false;
        }

        // No panels to zoom on, we're zoomed out, so move on to the next page
        this.setCurrentPage(this.getPreviousPage());
        if( this.app.mode === PAGE_MODE ) {
            this.snapPagesToCurrent();
        }
        if( this.app.settings.get('showPageChangeMessage') ) {
            this.app.message('Page ' + this.currentPage.num);
        }
        this.currentPage.onPageEnterBackward();
    }

    /**
     * Skips to specific page in the sequence. In order to do so,
     * we need to to take care of a few things. First, make sure
     * the current page is zoomed out (may or may not be), set
     * the current page to the requested page, set all the pages
     * left positions to account for moving to the new page,
     * and then set the page for whatever mode we're in.
     *
     * @param  {Number} pageNum Page number to skip to
     */
    skipToPage(pageNum) {
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
