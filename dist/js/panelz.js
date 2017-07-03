'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// https://github.com/sroucheray/event-class
var multiChannelSep = /(?:,|\s)+/g;
var channelSep = /:+/g;
var channelsSymbol = Symbol('channels');

var EventClass = function () {
    function EventClass() {
        _classCallCheck(this, EventClass);

        this[channelsSymbol] = {};
    }

    _createClass(EventClass, [{
        key: '_getChannels',
        value: function _getChannels(channelString) {
            return channelString.trim().split(multiChannelSep);
        }
    }, {
        key: '_getNameSpaces',
        value: function _getNameSpaces(channel) {
            var namespaces = [];
            var splittedChannels = channel.trim().split(channelSep);

            for (var i = splittedChannels.length; i >= 1; i--) {
                namespaces.push(splittedChannels.slice(0, i).join(':'));
            }

            return namespaces;
        }
    }, {
        key: 'trigger',
        value: function trigger(event, data) {
            var channels = this._getChannels(event);

            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = channels[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var channel = _step.value;

                    var namespaces = this._getNameSpaces(channel);
                    var _iteratorNormalCompletion2 = true;
                    var _didIteratorError2 = false;
                    var _iteratorError2 = undefined;

                    try {
                        for (var _iterator2 = namespaces[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                            var namespace = _step2.value;

                            if (!this[channelsSymbol][namespace]) {
                                continue;
                            }

                            var _iteratorNormalCompletion3 = true;
                            var _didIteratorError3 = false;
                            var _iteratorError3 = undefined;

                            try {
                                for (var _iterator3 = this[channelsSymbol][namespace][Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                                    var callback = _step3.value;

                                    callback.call(this, data);
                                }
                            } catch (err) {
                                _didIteratorError3 = true;
                                _iteratorError3 = err;
                            } finally {
                                try {
                                    if (!_iteratorNormalCompletion3 && _iterator3.return) {
                                        _iterator3.return();
                                    }
                                } finally {
                                    if (_didIteratorError3) {
                                        throw _iteratorError3;
                                    }
                                }
                            }
                        }
                    } catch (err) {
                        _didIteratorError2 = true;
                        _iteratorError2 = err;
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion2 && _iterator2.return) {
                                _iterator2.return();
                            }
                        } finally {
                            if (_didIteratorError2) {
                                throw _iteratorError2;
                            }
                        }
                    }
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }
        }
    }, {
        key: 'on',
        value: function on(event, callback) {
            var channels = this._getChannels(event);

            var _iteratorNormalCompletion4 = true;
            var _didIteratorError4 = false;
            var _iteratorError4 = undefined;

            try {
                for (var _iterator4 = channels[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                    var channel = _step4.value;

                    if (!this[channelsSymbol][channel]) {
                        this[channelsSymbol][channel] = [];
                    }

                    this[channelsSymbol][channel].push(callback);
                }
            } catch (err) {
                _didIteratorError4 = true;
                _iteratorError4 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion4 && _iterator4.return) {
                        _iterator4.return();
                    }
                } finally {
                    if (_didIteratorError4) {
                        throw _iteratorError4;
                    }
                }
            }
        }
    }, {
        key: 'off',
        value: function off(event, callback) {
            var channels = this._getChannels(event);

            var _iteratorNormalCompletion5 = true;
            var _didIteratorError5 = false;
            var _iteratorError5 = undefined;

            try {
                for (var _iterator5 = channels[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
                    var channel = _step5.value;

                    if (!this[channelsSymbol][channel]) {
                        return;
                    }

                    var index = this[channelsSymbol][channel].indexOf(callback);

                    if (index > -1) {
                        this[channelsSymbol][channel].splice(index, 1);
                    }
                }
            } catch (err) {
                _didIteratorError5 = true;
                _iteratorError5 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion5 && _iterator5.return) {
                        _iterator5.return();
                    }
                } finally {
                    if (_didIteratorError5) {
                        throw _iteratorError5;
                    }
                }
            }
        }
    }, {
        key: 'once',
        value: function once(event, callback) {
            function offCallback() {
                this.off(event, callback);
                this.off(event, offCallback);
            }

            this.on(event, callback);
            this.on(event, offCallback);
        }
    }]);

    return EventClass;
}();

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


var Book = function (_EventClass) {
    _inherits(Book, _EventClass);

    /**
     * Creates a new instance of the Book class. Sets all the
     * initial varaibles and listens for events on the application.
     *
     * @constructs Book
     * @param  {Class}  app    Panelz app instance
     * @param  {Object} config Configuration options
     */
    function Book(app, config) {
        _classCallCheck(this, Book);

        /**
         * Configuration options
         * @type {Object}
         */
        var _this = _possibleConstructorReturn(this, (Book.__proto__ || Object.getPrototypeOf(Book)).call(this));

        _this.config = config;
        /**
         * Panelz app instance
         * @type {Class}
         */
        _this.app = app;
        /**
         * Title of the comic
         * @type {String}
         */
        _this.title = config.title || 'Unknown title';
        /**
         * Size of the comic.
         * @type {Number}
         */
        _this.size = config.size || 0;
        /**
         * How many pages have been loaded
         * @type {Number}
         */
        _this.loaded = 0;
        /**
         * How much of the book has been loaded in bytes
         * @type {Number}
         */
        _this.loadedSize = 0;
        /**
         * Whether or not the book has been fully loaded
         * @type {Boolean}
         */
        _this.isLoaded = false;
        /**
         * Whether or not the user should be allowed to
         * pan all the pages or not.
         * @type {Boolean}
         */
        _this.panFrozen = false;
        /**
         * How much the user has zoomed in on the book
         * @type {Number}
         */
        _this.zoomPanAmount = 0;

        _this.setEventListeners();
        _this.pages = [];
        config.pages.forEach(function (pageConfig, index) {
            pageConfig.panels = pageConfig.panels || [];
            var page = new Page(this.app, this, pageConfig, index);
            page.on('load', this.onPageLoaded.bind(this));
            this.pages.push(page);
        }.bind(_this));
        return _this;
    }

    /**
     * Getter for the size of the comic
     *
     * @return {Number}
     */


    _createClass(Book, [{
        key: 'getReadableSize',


        /**
         * Gets a readable size of the comic, as it is in bytes.
         *
         * @param  {Number} size Size in bytes
         * @return {String}
         */
        value: function getReadableSize(size) {
            var bytes = typeof size !== 'undefined' ? size : this.size;
            var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
            if (bytes == 0) return '0 Byte';
            var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
            return (bytes / Math.pow(1024, i)).toFixed(2) + ' ' + sizes[i];
        }
    }, {
        key: 'setEventListeners',


        /**
         * Application event listeners
         */
        value: function setEventListeners() {
            this.app.on('user:skipToPage', this.skipToPage.bind(this));
            this.app.on('user:panend', this.onPanEnd.bind(this));
            this.app.on('user:pageForward', this.pageForward.bind(this));
            this.app.on('user:pageBackward', this.pageBackward.bind(this));
            this.app.on('change:mode', this.onModeChange.bind(this));
        }

        /**
         * When a page is loaded, update the total number of pages
         * loaded. If that's all of them, trigger the book loaded method.
         *
         * @param  {Class} page Page instance
         */

    }, {
        key: 'onPageLoaded',
        value: function onPageLoaded(page) {
            this.loaded += 1;
            this.loadedSize += parseInt(page.size);
            if (this.loaded === this.pages.length) {
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

    }, {
        key: 'onBookLoaded',
        value: function onBookLoaded() {
            var lastRead = this.app.settings.getBookSetting('page');
            var pageToSet = lastRead ? lastRead : 0;
            this.setCurrentPage(this.pages[pageToSet]);

            // Zoom to panel on start
            if (this.app.mode === PANEL_ZOOM_MODE && this.currentPage.hasPanels()) {
                var panel = false;
                if (this.app.settings.getBookSetting('panel') !== false) {
                    this.currentPage.zoomToPanel(this.currentPage.panels[this.app.settings.getBookSetting('panel')]);
                } else if (!this.currentPage.SHOW_PAGE_ON_ENTER) {
                    this.currentPage.zoomToPanel(this.currentPage.getFirstPanel());
                } else {
                    this.currentPage.nextPanel = this.currentPage.getFirstPanel();
                }
            }

            this.pages.forEach(function (page, index) {
                page.setLeftPosition(pageToSet);
                if (this.app.mode === PAGE_MODE || this.currentPage.index === index) {
                    page.$container.animate({
                        opacity: 1
                    }, { duration: 650, easing: 'easeOutSine' });
                }
            }.bind(this));
            this.buildPageIndex();
            setTimeout(function () {
                this.isLoaded = true;
                /**
                 * Load book event
                 *
                 * @event Book#load:book:<setting>
                 * @type {Object}
                 * @property {Class} Book class instance
                 */
                this.trigger('load:book', this);
                $('.loading').addClass('loading--hidden');
            }.bind(this), 1200);
        }

        /**
         * When there is a mode change, setup the book for that mode.
         *
         * @param  {String} mode Mode of app
         */

    }, {
        key: 'onModeChange',
        value: function onModeChange(mode) {
            if (mode === PAGE_MODE) {
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

    }, {
        key: 'onPanEnd',
        value: function onPanEnd(e) {
            if (this.panFrozen) {
                return;
            }
            var currentPage = this.currentPage;
            this.pages.forEach(function (page) {
                if (page.shouldBeSetAsCurrent(e)) {
                    this.setCurrentPage(page);
                }
            }.bind(this));
            this.snapPagesToCurrent();
            if (this.currentPage === currentPage && currentPage.isLast) {
                this.onEndReached();
            }
        }

        /**
         * The end of the comic has been reached. Message the user.
         */

    }, {
        key: 'onEndReached',
        value: function onEndReached() {
            this.app.message('End of comic');
        }

        /**
         * Builds the page index so the user can jump to any page
         * wherever they are in the comic.
         */

    }, {
        key: 'buildPageIndex',
        value: function buildPageIndex() {
            this.pages.forEach(function (page) {
                var $page = $('.page-list__page--template').clone().removeClass('page-list__page--template');
                $page.attr('data-skip-to-page', page.index + 1);
                $page.find('.page-list__image').attr('src', page.config.url);
                $page.find('.page-list__number').text(page.index + 1);
                $('.page-list').append($page);
            }.bind(this));
        }

        /**
         * Sets the current page of the comic.
         *
         * @param {Class} page Page class instance
         * @fires Book#pageSet
         */

    }, {
        key: 'setCurrentPage',
        value: function setCurrentPage(page) {
            if (this.currentPage && this.currentPage.panels.length) {
                this.currentPage.resetZoom();
                this.currentPage.currentPanel = false;
            }
            if (this.app.mode === PANEL_ZOOM_MODE && this.currentPage) {
                this.currentPage.$container.animate({
                    opacity: 0
                }, { duration: 550, easing: 'easeOutSine' });
            }
            this.currentPage = page;
            if (this.app.mode === PANEL_ZOOM_MODE) {
                this.currentPage.$container.css('left', 0).animate({
                    opacity: 1
                }, { duration: 550, easing: 'easeOutSine' });
            }

            /**
             * Page Set event
             *
             * @event Book#pageSet
             * @type {Object}
             * @property {Class} Page instance of current page
             */
            this.trigger('pageSet', page);

            this.app.settings.rememberBookSetting('page', page.index);
        }

        /**
         * Sets up all the pages for Page Mode. All of the
         * pages need to be side by side so the user can
         * pan left and right through them.
         */

    }, {
        key: 'setForPageMode',
        value: function setForPageMode() {
            console.log('Set For Page mode');
            var currentIndex = this.currentPage.index;
            this.pages.forEach(function (page) {
                page.setLeftPosition(currentIndex);
                page.$container.css('opacity', 1);
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

    }, {
        key: 'setForPanelZoomMode',
        value: function setForPanelZoomMode() {
            console.log('Set for Panel Zoom mode');
            this.pages.forEach(function (page) {
                page.resetScale();
                page.$container.css('left', 0).css('opacity', 0);
            }.bind(this));
            this.currentPage.$container.css('opacity', 1);
            if (this.currentPage.panels.length) {
                var lastUserEvent = this.app.getLastUserEvent();
                var panel = lastUserEvent && lastUserEvent.type === "doubletap" && this.app.settings.get('detectPanelOnDoubleTap') ? this.currentPage.findPanelWithPos(lastUserEvent.center.x, lastUserEvent.center.y) : this.currentPage.getFirstPanel();
                this.currentPage.zoomToPanel(panel);
            }
        }

        /**
         * Gets the next page instance in the sequence.
         *
         * @return {Class}
         */

    }, {
        key: 'getNextPage',
        value: function getNextPage() {
            return this.pages[this.currentPage.index + 1];
        }

        /**
         * Gets the previous page instance in the sequence.
         *
         * @return {Class}
         */

    }, {
        key: 'getPreviousPage',
        value: function getPreviousPage() {
            return this.pages[this.currentPage.index - 1];
        }

        /**
         * Snaps all the pages relative to the current page.
         */

    }, {
        key: 'snapPagesToCurrent',
        value: function snapPagesToCurrent() {
            var amount = -this.currentPage.left;
            this.pages.forEach(function (page) {
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

    }, {
        key: 'pageForward',
        value: function pageForward() {
            if (this.app.mode === PANEL_ZOOM_MODE && this.currentPage.panels.length) {
                // Zoom in on the next panel and bail from method
                if (this.currentPage.hasNextPanel()) {
                    console.log('Zoom to next panel');
                    return this.currentPage.zoomToPanel(this.currentPage.getNextPanel());
                }
                // Currently zoomed on a panel, but there are no next panels, we need to zoom out
                // and bail from method (if they don't want to show page on exit)
                if (this.currentPage.currentPanel !== false && !this.currentPage.hasNextPanel()) {
                    console.log('Zoom out');
                    this.currentPage.previousPanel = this.currentPage.getLastPanel();
                    if (this.currentPage.isLast && !this.currentPage.hasNextPanel()) {
                        this.onEndReached();
                    }
                    if (this.app.settings.get('showPageOnExit')) {
                        this.currentPage.zoomOut();
                        return true;
                    }
                }
            }

            // No panels to zoom on, we're zoomed out, but this is the last page
            if (this.currentPage.isLast) {
                return this.onEndReached() && false;
            }

            // No panels to zoom on, we're zoomed out, so move on to the next page
            this.setCurrentPage(this.getNextPage());
            if (this.app.mode === PAGE_MODE) {
                this.snapPagesToCurrent();
            }
            this.currentPage.onPageEnterForward();
            if (this.app.settings.get('showPageChangeMessage')) {
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

    }, {
        key: 'pageBackward',
        value: function pageBackward() {
            if (this.app.mode === PANEL_ZOOM_MODE && this.currentPage.panels.length) {
                // Zoom in on the next panel and bail from method
                if (this.currentPage.hasPreviousPanel()) {
                    console.log('Zoom to last panel');
                    return this.currentPage.zoomToPanel(this.currentPage.getPreviousPanel());
                }
                // Currently zoomed on a panel, but there are no next panels, we need to zoom out
                // and bail from the method (if they don't want to show page on enter)
                if (this.currentPage.currentPanel !== false && !this.currentPage.hasPreviousPanel()) {
                    console.log('Zoom out');
                    this.currentPage.nextPanel = this.currentPage.getFirstPanel();
                    if (this.app.settings.get('showPageOnEnter')) {
                        this.currentPage.zoomOut();
                        return true;
                    }
                }
            }

            // No panels to zoom on, we're zoomed out, but this is the last page
            if (this.currentPage.isFirst) {
                return false;
            }

            // No panels to zoom on, we're zoomed out, so move on to the next page
            this.setCurrentPage(this.getPreviousPage());
            if (this.app.mode === PAGE_MODE) {
                this.snapPagesToCurrent();
            }
            if (this.app.settings.get('showPageChangeMessage')) {
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

    }, {
        key: 'skipToPage',
        value: function skipToPage(pageNum) {
            var page = this.pages[pageNum - 1];
            this.currentPage.zoomOut();
            this.setCurrentPage(page);
            this.pages.forEach(function (page) {
                page.setLeftPosition(pageNum - 1);
                page.$container.css('opacity', 1);
            }.bind(this));
            if (this.app.mode === PAGE_MODE) {
                this.setForPageMode();
            } else {
                this.setForPanelZoomMode();
            }
        }
    }, {
        key: 'size',
        get: function get() {
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
        ,
        set: function set(size) {
            if (!size) {
                size = 0;
                this.config.pages.forEach(function (pageConfig) {
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

    }, {
        key: 'loadedSize',
        get: function get() {
            return this._loadedSize;
        }

        /**
         * Update the total loaded size. Updates the progress
         * loader element for the user.
         *
         * @param  {Number} size Size to add to total
         */
        ,
        set: function set(size) {
            this._loadedSize = size;
            var percent = this.loadedSize / this.size;
            var degrees = 360 * percent;

            $('.loading__progress').circleProgress('value', percent);
            $('[data-loaded-size]').text(this.getReadableSize(this.loadedSize));
        }
    }]);

    return Book;
}(EventClass);

/**
 * The Menu class handles the center tap popup menu
 * and adds context to a few of the buttons.
 *
 * @class
 * @extends EventClass
 * @author  Ryan Burst <ryanburst@gmail.com>
 * @version 0.3.0
 */


var Menu = function (_EventClass2) {
    _inherits(Menu, _EventClass2);

    /**
     * Creates a new Menu instance by establishing the
     * main element as a jQuery object and listening
     * for events on the application instance.
     *
     * @constructs Menu
     * @param {Class} app      Panelz app instance
     * @param {Class} Book     Book instance
     * @param {Class} Tutorial Tutorial instance
     */
    function Menu(app, Book, Tutorial) {
        _classCallCheck(this, Menu);

        var _this2 = _possibleConstructorReturn(this, (Menu.__proto__ || Object.getPrototypeOf(Menu)).call(this));

        _this2.app = app;
        _this2.book = Book;
        _this2.tutorial = Tutorial;
        _this2.$menu = $('.viewport__menu');

        _this2.setEventListeners();
        _this2.onModeChange(_this2.app.mode);
        return _this2;
    }

    /**
     * Listens for user touch events or application mode changes
     */


    _createClass(Menu, [{
        key: 'setEventListeners',
        value: function setEventListeners() {
            $('body').on('touchend click', '.menu__option--mode', this.onModeToggleClick.bind(this));
            $('body').on('touchend', this.onTouchEnd.bind(this));
            this.app.on('change:mode', this.onModeChange.bind(this));
            this.app.on('show:menu', this.show.bind(this));
            this.book.on('load:book', this.setTitleBar.bind(this));
            this.book.on('pageSet', this.onPageSet.bind(this));
            this.tutorial.on('done', this.onTutorialDone.bind(this));
        }

        /**
         * Sets the menu title bar with book data, like the title, current
         * page number, and total number of pages.
         */

    }, {
        key: 'setTitleBar',
        value: function setTitleBar() {
            $('[data-book-title]').text(this.book.title);
            $('[data-total-pages]').text(this.book.pages.length);
            $('[data-page-num]').text(this.book.currentPage.num);
        }

        /**
         * Adds an activation class to a given menu option
         *
         * @param  {String} option Menu option to activate
         */

    }, {
        key: 'activateOption',
        value: function activateOption(option) {
            this.$menu.find('.menu__option--' + option).addClass('menu__option--active');
        }

        /**
         * Removes an activation class to a given menu option
         *
         * @param  {String} option Menu option to deactivate
         */

    }, {
        key: 'deactivateOption',
        value: function deactivateOption(option) {
            this.$menu.find('.menu__option--' + option).removeClass('menu__option--active');
        }

        /**
         * Shows the menu by adding an active CSS class. Sometimes
         * multiple events get fired in one interaction, so a --was-shown
         * modifier class has been added in another specific use case. If
         * that class is not present, then we can show the menu.
         */

    }, {
        key: 'show',
        value: function show() {
            if (!this.$menu.hasClass('viewport__menu--was-shown')) {
                this.$menu.addClass('viewport__menu--active');
            }
        }

        /**
         * Hides the menu by removing the active CSS class.
         * @return {[type]} [description]
         */

    }, {
        key: 'hide',
        value: function hide() {
            this.$menu.removeClass('viewport__menu--active');
        }

        /**
         * The user has clicked on the mode toggle button, tell the
         * application to switch modes.
         *
         * @param  {Object} e Tap event object
         */

    }, {
        key: 'onModeToggleClick',
        value: function onModeToggleClick(e) {
            e.preventDefault();
            this.app.switchModes();
        }

        /**
         * The application's mode has been changed. Update the
         * wording of our mode toggle button to maintain context.
         *
         * @param  {String} mode Mode that was switched to
         */

    }, {
        key: 'onModeChange',
        value: function onModeChange(mode) {
            var readable = this.app.getReadableModeText(mode, true);
            if (mode === PAGE_MODE) {
                this.$menu.find('.menu__option--mode').html(readable);
            } else {
                this.$menu.find('.menu__option--mode').html(readable);
            }
        }

        /**
         * When a new page has been set, set the current page text
         * to reflect the current page number.
         *
         * @param  {Class} page Page instance of the new current page
         */

    }, {
        key: 'onPageSet',
        value: function onPageSet(page) {
            $('[data-page-num]').text(page.num);
        }

        /**
         * When the tutorial is finished, show the menu and message the
         * user about being able to find the tutorial in the settings menu.
         */

    }, {
        key: 'onTutorialDone',
        value: function onTutorialDone() {
            this.show();
            this.app.message('The tutorial is always available in the settings menu at the bottom right.', 5000);
        }

        /**
         * Touch events and click events both get fired sometimes. To prevent
         * hiding the menu when we just showed it, add a special class to
         * indicate that it was just shown.
         *
         * @param  {Object} e Event object
         */

    }, {
        key: 'onTouchEnd',
        value: function onTouchEnd(e) {
            this.$menu.removeClass('viewport__menu--was-shown');
            if (this.$menu.hasClass('viewport__menu--active')) {
                setTimeout(function () {
                    this.$menu.removeClass('viewport__menu--active').addClass('viewport__menu--was-shown');
                }.bind(this), 500);
            }
        }
    }]);

    return Menu;
}(EventClass);

;

/**
 * Directional number used by the HammerJS
 * library to indicate a left pan.
 *
 * @constant
 * @type {Number}
 * @default
 */
var PAN_LEFT_DIR = 2;

/**
 * Directional number used by the HammerJS
 * library to indicate a right pan.
 *
 * @constant
 * @type {Number}
 * @default
 */
var PAN_RIGHT_DIR = 4;

/**
 * Page class representing a comic page. Represents the
 * actual image on the screen, as well as all the calculations
 * for panning/zooming and determining which panel should
 * be zoomed on/zooming on panels.
 *
 * @class
 * @extends EventClass
 * @author  Ryan Burst <ryanburst@gmail.com>
 * @version 0.3.0
 */

var Page = function (_EventClass3) {
    _inherits(Page, _EventClass3);

    /**
     * Creates a new instance of the Page class. Sets all
     * the initial variables needed by this class and
     * a few event listeners for setting changes. This
     * constructor also initializes all the panels, if any,
     * as new classes and stores them in a local array property.
     *
     * @constructs Page
     * @param  {Class}  app    Panelz app instance
     * @param  {Class}  Book   Book instance
     * @param  {Object} config Configuration options
     * @param  {Number} index  Which index within the book this page is
     */
    function Page(app, Book, config, index) {
        _classCallCheck(this, Page);

        /**
         * Keep a reference to the app instance as
         * a local property
         * @type {Class}
         */
        var _this3 = _possibleConstructorReturn(this, (Page.__proto__ || Object.getPrototypeOf(Page)).call(this));

        _this3.app = app;
        /**
         * Book class reference as local property
         * @type {Class}
         */
        _this3.book = Book;
        /**
         * The configuration options for this page
         * @type {Object}
         */
        _this3.config = config;
        /**
         * Which index within the book this page is
         * @type {Number}
         */
        _this3.index = index;
        /**
         * The Page number
         * @type {Number}
         */
        _this3.num = index + 1;
        /**
         * If the index is 0, this is the first page
         * @type {Boolean}
         */
        _this3.isFirst = index === 0;
        /**
         * If the index is the very last index, using
         * the book configuration object to count, this
         * would be the last page
         * @type {Boolean}
         */
        _this3.isLast = index === _this3.book.config.pages.length - 1;
        /**
         * Size of the page image element, in bytes, used for
         * calculating total book size and wait time for loading
         * @type {Number}
         */
        _this3.size = config.size || 0;
        /**
         * Whether or not this is the current page
         * @type {Boolean}
         */
        _this3.isCurrentPage = false;
        /**
         * Current scale of the page image element
         * @type {Number}
         */
        _this3.scale = 1;
        /**
         * Number that keeps track of the last scale size
         * between starting/stopping events like pinching
         * @type {Number}
         */
        _this3.lastScale = 1;
        /**
         * Whether or not the left edge is visible and
         * the page element should be panned normally
         * @type {Boolean}
         */
        _this3.leftEdge = true;
        /**
         * Whether or not the right edge is visible and
         * the page element should be panned normally
         * @type {Boolean}
         */
        _this3.rightEdge = true;
        /**
         * Holds all of the panels objects for this page.
         * @type {Array}
         */
        _this3.panels = [];
        /**
         * Holds the current panel being zoomed on, if any
         * @type {Boolean}
         */
        _this3.currentPanel = false;
        /**
         * Which panel comes before the current one, if any
         * @type {Boolean}
         */
        _this3.previousPanel = false;
        /**
         * Which panel comes after the current one, if any
         * @type {Boolean}
         */
        _this3.nextPanel = false;
        /**
         * Holds the jQuery element containing the page container
         * @type {Object}
         */
        _this3.$container = false;
        /**
         * Holds the jQuery image element
         * @type {Object}
         */
        _this3.$element = false;
        /**
         * Original/actual width of page image
         * @type {Number}
         */
        _this3.originalWidth = 0;
        /**
         * Original/actual height of page image
         * @type {Number}
         */
        _this3.originalHeight = 0;
        /**
         * Holds how far left an image sits within
         * a container in order to be centered
         * @type {Number}
         */
        _this3.originalLeft = 0;
        /**
         * When panning, we adjust the margin. Holds the
         * original left position at the start of a pan
         * @type {Number}
         */
        _this3.elementOriginalLeft = 0;
        /**
         * When panning, we adjust the margin. Holds the
         * original top position at the start of a pan
         * @type {Number}
         */
        _this3.elementOriginalTop = 0;
        /**
         * Object representing the origin of a punch event.
         * Should have an x/y property
         * @type {Object}
         */
        _this3.pinchOrigin = {};
        /**
         * Speed in ms at which the panel transition animation
         * should occur. Treated like a constant although it
         * can be changed through the settings by the user.
         * @type {Number}
         */
        _this3.PANEL_ANIMATION_SPEED = _this3.app.settings.get('panelTransitions');
        /**
         * Whether or not to show the entire page when it
         * becomes current. Applies for Panel Zoom Mode only.
         * @type {Boolean}
         */
        _this3.SHOW_PAGE_ON_ENTER = _this3.app.settings.get('showPageOnEnter');
        /**
         * Whether or not to show the entire page before moving
         * to a new page. Applies for Panel Zoom Mode only.
         * @type {Boolean}
         */
        _this3.SHOW_PAGE_ON_EXIT = _this3.app.settings.get('showPageOnExit');
        /**
         * How many pixels a page needs to be panned before
         * snapping fully to the next or previous page.
         * @type {Number}
         */
        _this3.TURN_THRESHHOLD = 30;
        /**
         * Maximum scale value when pinching
         * @type {Number}
         */
        _this3.MAX_SCALE = 3;

        _this3.setEventListeners();

        _this3.panels = [];
        config.panels.forEach(function (panel, index) {
            this.panels.push(new Panel(this, panel, index));
        }.bind(_this3));
        return _this3;
    }

    /**
     * When setting the configation property, set the
     * internal property. Also kick off loading the
     * image from the config url
     *
     * @param  {Object} config Configuration options
     */


    _createClass(Page, [{
        key: 'setEventListeners',


        /**
         * Sets all event listeners for internal classes
         */
        value: function setEventListeners() {
            this.on('load:page', this.centerInViewPort.bind(this));
            this.app.settings.on('change:panelTransitions', this.onSettingsChange.bind(this));
            this.app.settings.on('change:showPageOnEnter', this.onSettingsChange.bind(this));
            this.app.settings.on('change:showPageOnExit', this.onSettingsChange.bind(this));
            this.app.on("user:panstart", this.onPanStart.bind(this));
            this.app.on("user:pan", this.onPan.bind(this));
            this.app.on("user:panleft", this.onPanLeft.bind(this));
            this.app.on("user:panright", this.onPanRight.bind(this));
            this.app.on('user:pinchstart', this.onPinchStart.bind(this));
            this.app.on("user:pinch", this.onPinch.bind(this));
            this.app.on("user:pinchend", this.onPinchEnd.bind(this));
            this.app.on('resize', this.setPosition.bind(this));
            this.book.on('pageSet', this.setCurrentPageStatus.bind(this));
        }

        /**
         * When certain settings are changed, update our local
         * property references to those settings
         *
         * @param  {Object} data Event data for the settings change
         */

    }, {
        key: 'onSettingsChange',
        value: function onSettingsChange(data) {
            switch (data.setting) {
                case 'panelTransitions':
                    this.PANEL_ANIMATION_SPEED = data.value;
                    break;
                case 'showPageOnEnter':
                    this.SHOW_PAGE_ON_ENTER = data.value;
                    break;
                case 'showPageOnExit':
                    this.SHOW_PAGE_ON_EXIT = data.value;
                    break;
            }
        }

        /**
         * Checks to see if a page class instance is this
         * page instance. If it is, this should be the
         * current page.
         *
         * @param {Class} page Page instance
         */

    }, {
        key: 'setCurrentPageStatus',
        value: function setCurrentPageStatus(page) {
            this.isCurrentPage = page.index === this.index;
        }

        /**
         * Loads the page element into an img tag and when it
         * has been loaded, initiates a page load method.
         */

    }, {
        key: 'loadPageElement',
        value: function loadPageElement() {
            $("<img />").attr("src", this.config.url).on('load', this.onPageLoaded.bind(this));
        }

        /**
         * When the page has been loaded, set a container element
         * and a property holding the image itself. The page needs
         * to be centered in the viewport and its original dimensions
         * pulled in so we can perform sizing calculations.
         *
         * @param  {Object} e Event object
         * @fires Page#load:page
         */

    }, {
        key: 'onPageLoaded',
        value: function onPageLoaded(e) {
            this.$container = this.app.addPageMarkupToViewPort($('<div />').addClass('book__page page'));
            this.$element = $(e.currentTarget).addClass('page__image').appendTo(this.$container);
            this.originalWidth = this.$element.width();
            this.originalHeight = this.$element.height();
            /**
             * Load page event
             *
             * @event Page#load:page
             * @type {Object}
             * @property {Class} Current page instance
             */
            this.trigger('load:page', this);
        }

        /**
         * When a user initiates a pan event, we need to set the original
         * positions and zoom amount and use that number when calculating
         * how far the pan delta needs to be offset by.
         *
         * @param  {Object} e Event object
         */

    }, {
        key: 'onPanStart',
        value: function onPanStart(e) {
            this.elementOriginalLeft = parseInt(this.$element.css("margin-left"), 10);
            this.elementOriginalTop = parseInt(this.$element.css("margin-top"), 10);
            this.originalLeft = parseInt(this.$container.css("left"), 10);
            this.book.zoomPanAmount = 0;
        }

        /**
         * When the user pans, they are allowed to pan up or down
         * if they are zoomed in on a panel (via pinching). If
         * they are not zoomed in or the pan direction is not left
         * or right, then return true to event further pan events
         * from registering and screwing things up.
         *
         * @param  {Object} e Event object
         * @return {boolean}
         */

    }, {
        key: 'onPan',
        value: function onPan(e) {
            // If the page is zoomed, allow them to pan up. Pan left and
            // right is handled by specific event handlers below.
            if (this.isZoomed()) {
                var deltaY = this.elementOriginalTop + e.deltaY;
                var restrictedPosition = this.restrictPosition(0, deltaY);
                this.$element.css({
                    "margin-top": restrictedPosition.top
                });
            } else if (e.offsetDirection !== PAN_LEFT_DIR && e.offsetDirection !== PAN_RIGHT_DIR) {
                return true;
            }
        }

        /**
         * The user wants to pan left. There are several use cases that
         * need to be accounted for. If the user is zoomed in on the
         * current page image/element, than only the element itself
         * should be allowed to be panned. If the right edge has been
         * reached (visible), than the entire page (and all the other
         * pages), should also pan together. This is accomplished by
         * "pan freezing" the entire book when an edge is not visible
         * and "un pan freezing" the entire book when it is.
         *
         * panleft = rightedge = forward
         *
         * @param  {Object} e Event object
         */

    }, {
        key: 'onPanLeft',
        value: function onPanLeft(e) {
            if (this.isZoomed()) {
                var maxLeft = (this.getWidth() * this.scale - this.getFullWidth()) / 2;
                var minLeft = maxLeft * -1;
                if (this.getWidth() * this.scale < this.getFullWidth()) {
                    maxLeft = 0;
                }
                var deltaX = this.elementOriginalLeft + e.deltaX;
                var left = Math.min(maxLeft, Math.max(deltaX, minLeft));

                var rightEdgeBefore = this.rightEdge;
                this.rightEdge = left <= minLeft ? true : false;
                if (rightEdgeBefore !== this.rightEdge && this.rightEdge) {
                    this.book.panFrozen = false;
                    this.book.zoomPanAmount = e.deltaX;
                }

                if (this.book.panFrozen) {
                    this.$element.css({
                        "margin-left": left
                    });
                }
            } else if (this.book.panFrozen) {
                // Helps make sure the other pages are set correctly (math isn't quite right)
                this.setLeftPosition(this.book.currentPage.index);
            }

            if (!this.book.panFrozen) {
                this.left = this.originalLeft + e.deltaX - this.book.zoomPanAmount;
                this.$container.css({
                    "left": this.left
                });

                if (this.isCurrentPage && this.scale !== 1 && this.left < 0 && !this.rightEdge) {
                    this.book.panFrozen = true;
                }
            }
        }
        /**
         * The user wants to pan right. There are several use cases that
         * need to be accounted for. If the user is zoomed in on the
         * current page image/element, than only the element itself
         * should be allowed to be panned. If the left edge has been
         * reached (visible), than the entire page (and all the other
         * pages), should also pan together. This is accomplished by
         * "pan freezing" the entire book when an edge is not visible
         * and "un pan freezing" the entire book when it is.
         *
         * panright = leftedge = backward
         *
         * @param  {Object} e Event object
         */

    }, {
        key: 'onPanRight',
        value: function onPanRight(e) {
            if (this.isZoomed()) {
                var maxLeft = (this.getWidth() * this.scale - this.getFullWidth()) / 2;
                var minLeft = maxLeft * -1;
                if (this.getWidth() * this.scale < this.getFullWidth()) {
                    maxLeft = 0;
                }
                var deltaX = this.elementOriginalLeft + e.deltaX;
                var left = Math.min(maxLeft, Math.max(deltaX, minLeft));

                var leftEdgeBefore = this.leftEdge;
                this.leftEdge = left == maxLeft ? true : false;
                if (leftEdgeBefore !== this.leftEdge && this.leftEdge) {
                    this.book.panFrozen = false;
                    this.book.zoomPanAmount = e.deltaX;
                }

                if (this.book.panFrozen) {
                    this.$element.css({
                        "margin-left": left
                    });
                }
            } else if (this.book.panFrozen) {
                // Helps make sure the other pages are set correctly (math isn't quite right)
                this.setLeftPosition(this.book.currentPage.index);
            }

            if (!this.book.panFrozen) {
                this.left = this.originalLeft + e.deltaX - this.book.zoomPanAmount;
                this.$container.css({
                    "left": this.left
                });
                if (this.isCurrentPage && this.scale !== 1 && this.left >= 0 && !this.leftEdge) {
                    this.book.panFrozen = true;
                }
            }
        }

        /**
         * When starting a pinch event, record the images current
         * left and top position (margin) in order to calculate
         * the total offset with the pinch delta. Also records
         * the punch origin in case the user wants to pan the
         * entire image while they are pinching.
         *
         * @param  {Object} e Event class
         */

    }, {
        key: 'onPinchStart',
        value: function onPinchStart(e) {
            this.pinchOrigin = e.center;
            this.elementOriginalLeft = parseInt(this.$element.css("margin-left"), 10);
            this.elementOriginalTop = parseInt(this.$element.css("margin-top"), 10);
        }

        /**
         * The user is pinching, so magnify the image by the
         * pinch scale. This method also moves the image should
         * they want to pan while they are pinching by taking
         * the delta of the current pinch center and the original
         * pinch center. Not perfect, but works.
         *
         * @param  {Object} e Event class
         */

    }, {
        key: 'onPinch',
        value: function onPinch(e) {
            if (!this.isCurrentPage) {
                return;
            }

            if (this.app.mode !== PAGE_MODE) {
                this.app.switchModes();
            }
            this.magnify(e.scale * this.lastScale);

            var deltaX = -1 * (this.pinchOrigin.x - e.center.x);
            var deltaY = -1 * (this.pinchOrigin.y - e.center.y);
            this.$element.css({
                "margin-left": this.elementOriginalLeft + deltaX * e.scale,
                "margin-top": this.elementOriginalTop + deltaY * e.scale
            });
        }

        /**
         * At the end of a pinch reset the left and right position so
         * it sits at the min/max position and isn't mostly offscreen.
         * Also normalze the scale if it's less than one (smaller than
         * the viewport) or greater than the max scale value).
         *
         * @param  {Object} e Event class
         */

    }, {
        key: 'onPinchEnd',
        value: function onPinchEnd(e) {
            if (!this.isCurrentPage) {
                return;
            }

            this.pinchOrigin = {};

            this.book.panFrozen = true;

            var left = parseInt(this.$element.css("margin-left"), 10);
            var top = parseInt(this.$element.css("margin-top"), 10);
            var restrictedPosition = this.restrictPosition(left, top);
            this.$element.css({
                'margin-left': restrictedPosition.left,
                'margin-top': restrictedPosition.top
            });

            if (this.scale < 1) {
                return this.resetScale();
            }

            if (this.scale > this.MAX_SCALE) {
                this.magnify(this.MAX_SCALE, true);
                var left = parseInt(this.$element.css("margin-left"), 10);
                var top = parseInt(this.$element.css("margin-top"), 10);
                var restrictedPosition = this.restrictPosition(left, top);
                this.$element.css({
                    'margin-left': restrictedPosition.left,
                    'margin-top': restrictedPosition.top
                });
                this.lastScale = this.scale;
                return;
            }

            this.lastScale = this.scale;
        }

        /**
         * When this page is entering as the current page and
         * in panel zoom mode, we have to setup the next/previous
         * panels. If they user doesn't want to show the page
         * on enter, then automatically zoom them to the first panel.
         */

    }, {
        key: 'onPageEnterForward',
        value: function onPageEnterForward() {
            if (this.app.mode === PANEL_ZOOM_MODE && this.panels.length) {
                this.nextPanel = this.getFirstPanel();
                this.previousPanel = this.getPreviousPanel();
                if (!this.SHOW_PAGE_ON_ENTER) {
                    this.zoomToPanel(this.nextPanel);
                }
            }
        }

        /**
         * When this page is entering as the current page, but from
         * a succeeding page, setup the next/previous panels. If the user
         * doesn't want to show page on exit, zoom them into the last panel.
         * @return {[type]} [description]
         */

    }, {
        key: 'onPageEnterBackward',
        value: function onPageEnterBackward() {
            if (this.app.mode === PANEL_ZOOM_MODE && this.panels.length) {
                this.previousPanel = this.getLastPanel();
                this.nextPanel = this.getNextPanel();
                if (!this.SHOW_PAGE_ON_EXIT) {
                    this.zoomToPanel(this.previousPanel);
                }
            }
        }

        /**
         * Check to see if this page is zoomed. Can only be considered
         * zoomed if it's the current page and the scale is not 1.
         *
         * @return {Boolean}
         */

    }, {
        key: 'isZoomed',
        value: function isZoomed() {
            return this.isCurrentPage && this.scale !== 1;
        }

        /**
         * Set the page's starting position by centering it in the
         * viewport and setting its left offset (relative to the
         * books current page index). If we're in panel zoom mode
         * and there is a current panel, zoom in on it.
         */

    }, {
        key: 'setPosition',
        value: function setPosition() {
            this.centerInViewPort(false);
            this.setLeftPosition(this.book.currentPage.index);
            if (this.app.mode === PANEL_ZOOM_MODE && this.currentPanel) {
                this.zoomToPanel(this.currentPanel, false);
            }
        }

        /**
         * Uses the math to center this page in the viewport. Uses
         * the pages original size compared to the viewport size
         * to determine how to best fit it to the center of the screen.
         *
         * @param  {Boolean} animate Whether or not to animate the centering
         */

    }, {
        key: 'centerInViewPort',
        value: function centerInViewPort(animate) {
            var viewPortWidth = this.app.getViewPortSize().width;
            var viewPortHeight = this.app.getViewPortSize().height;
            var width = viewPortWidth;
            var height = this.getOriginalHeight() * viewPortWidth / this.getOriginalWidth();

            if (height > viewPortHeight) {
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
                height: height,
                'margin-left': 0,
                'margin-top': 0
            }, {
                duration: animate ? this.PANEL_ANIMATION_SPEED : 0,
                easing: 'easeOutSine'
            });
        }

        /**
         * Restricts a left and top position to their maximum or
         * minimum values. This normalizes a "requested" position
         * with the best position available (so they can't over pan).
         *
         * @param  {Number} left Requested left position
         * @param  {Number} top  Requested top position
         * @return {Object}
         */

    }, {
        key: 'restrictPosition',
        value: function restrictPosition(left, top) {
            // Calculate the restrained left position
            var maxLeft = (this.getFullWidth() - this.getWidth() * this.scale) / 2;
            var minLeft = maxLeft * -1;
            if (this.getWidth() * this.scale < this.getFullWidth()) {
                minLeft = maxLeft = 0;
            }
            left = Math.min(minLeft, Math.max(maxLeft, left));

            // Calculate the restrained top position
            var maxTop = (this.getFullHeight() - this.getHeight() * this.scale) / 2;
            var minTop = maxTop * -1;
            if (this.getHeight() * this.scale < this.getFullHeight()) {
                minTop = maxTop = 0;
            }
            top = Math.min(minTop, Math.max(maxTop, top));
            return {
                left: left,
                top: top,
                minLeft: minLeft,
                maxLeft: maxLeft,
                minTop: minTop,
                maxTop: maxTop
            };
        }

        /**
         * Checks to see if this page should be set as the current
         * page. This method is requested when a user is panning
         * manually and part of multiple pages may be visible at the
         * same time. If the page passes the TURN THRESHHOLD, it
         * should be set as current.
         *
         * @param  {Object} e Event Object
         * @return {Boolean}
         */

    }, {
        key: 'shouldBeSetAsCurrent',
        value: function shouldBeSetAsCurrent(e) {
            if (this.isFirst && this.left > 0) {
                return true;
            }
            if (this.isLast && this.left < 0) {
                return true;
            }
            if (e.deltaX < 0 && this.left > 0 && this.left < this.getFullWidth() - this.TURN_THRESHHOLD) {
                return true;
            }
            if (e.deltaX > 0 && this.left + this.getFullWidth() > this.TURN_THRESHHOLD && this.left + this.getFullWidth() < this.getFullWidth()) {
                return true;
            }
            return false;
        }

        /**
         * Finds a panel given a x and y coordinate. This is a little
         * tricky because we have the original panel sizes, which need
         * to be converted to the current panel size and then whether
         * or not the x y coordinate is inside of THAT. Math=hard
         *
         * Returns the panel class instance if the panel is found.
         *
         * @param  {Number} x X coordinate
         * @param  {Number} y Y coordinate
         * @return {Class}
         */

    }, {
        key: 'findPanelWithPos',
        value: function findPanelWithPos(x, y) {
            var found = false;
            if (this.panels.length) {
                var left = this.getLeft();
                var top = this.getTop();
                this.panels.forEach(function (panel) {
                    var convertedX = left + panel.x * this.getWidth() / this.getOriginalWidth();
                    var convertedY = top + panel.y * this.getHeight() / this.getOriginalHeight();
                    var convertedXMax = left + convertedX + panel.width * this.getWidth() / this.getOriginalWidth();
                    var convertedYMax = top + convertedY + panel.height * this.getHeight() / this.getOriginalHeight();
                    if (!found && x > convertedX && x <= convertedXMax && y > convertedY && y <= convertedYMax) {
                        found = panel;
                    }
                }.bind(this));
            }
            return found;
        }

        /**
         * Magnifies a page to a given scale. Animates by adding
         * a class that will animate a transform change, changes the
         * transform scale, then removes the class afterward.
         *
         * @param  {Number}  amount  Scale amount
         * @param  {Boolean} animate Whether or not to animate the scale
         */

    }, {
        key: 'magnify',
        value: function magnify(amount, animate) {
            var animateClass = animate ? 'page__image--transition' : '';

            this.scale = amount;

            this.$element.addClass(animateClass).css({
                transform: 'scale(' + this.scale + ')'
            });

            if (animate) {
                setTimeout(function () {
                    this.$element.removeClass('page__image--transition');
                }.bind(this), 260);
            }
        }

        /**
         * Resets the scale back 0 and unfreezes everything.
         *
         * @param  {Boolean} animate Whether or not to animate the scale change
         */

    }, {
        key: 'resetScale',
        value: function resetScale(animate) {
            this.magnify(1, animate);
            this.lastScale = 1;
            this.leftEdge = true;
            this.rightEdge = true;
            this.book.panFrozen = false;
            this.$element.css({
                'margin-left': 0,
                'margin-top': 0
            });
        }

        /**
         * Snaps the page to a left position by a given amount.
         * Animates this change which gives the appearance of "snapping"
         *
         * @param  {Number} amount Amount needed to snap
         */

    }, {
        key: 'snapTo',
        value: function snapTo(amount) {
            this.left = this.left + amount;
            this.originalLeft = this.left;
            this.$container.animate({
                left: this.left
            }, {
                duration: 250,
                easing: 'easeOutSine',
                complete: function () {
                    if (!this.isCurrentPage && this.scale !== 1) {
                        this.resetScale();
                    }
                    // Makes sure the left position is correct
                    this.setLeftPosition(this.book.currentPage.index);
                }.bind(this)
            });
        }

        /**
         * Sets the left position of the page given a page offset.
         * This should lay out each page side by side (or stack
         * them if the offset is 0)
         *
         * @param {Number} offset Number of pages to offset
         */

    }, {
        key: 'setLeftPosition',
        value: function setLeftPosition(offset) {
            if (typeof offset === 'undefined') {
                offset = 0;
            }
            this.left = (this.index - offset) * this.app.getViewPortSize().width;
            this.originalLeft = this.left;
            this.$container.css('left', this.left);
        }

        /**
         * Checks to see if this page has any panels.
         *
         * @return {Boolean}
         */

    }, {
        key: 'hasPanels',
        value: function hasPanels() {
            return this.panels.length !== 0;
        }

        /**
         * Sets the current panel and determines the next and previous panels.
         *
         * @param {Class} panel Panel instance to set to current
         */

    }, {
        key: 'setCurrentPanel',
        value: function setCurrentPanel(panel) {
            this.currentPanel = panel;

            this.nextPanel = panel !== false ? panel.nextPanel !== false ? this.panels[panel.nextPanel] : false : false;

            this.previousPanel = panel !== false ? panel.previousPanel !== false ? this.panels[panel.previousPanel] : false : false;
        }

        /**
         * Checks to see if there is a previous panel set.
         *
         * @return {Boolean}
         */

    }, {
        key: 'hasPreviousPanel',
        value: function hasPreviousPanel() {
            return this.previousPanel !== false;
        }

        /**
         * Getter for the previous panel.
         *
         * @return {Class} Previous panel class instance
         */

    }, {
        key: 'getPreviousPanel',
        value: function getPreviousPanel() {
            return this.previousPanel;
        }

        /**
         * Gets the very last panel in the panels array.
         *
         * @return {Class} Panel instance
         */

    }, {
        key: 'getLastPanel',
        value: function getLastPanel() {
            return this.panels[this.panels.length - 1];
        }

        /**
         * Checks to see if there is a next panel
         *
         * @return {Boolean}
         */

    }, {
        key: 'hasNextPanel',
        value: function hasNextPanel() {
            return this.nextPanel !== false;
        }

        /**
         * Gets the next panel instance.
         *
         * @return {Class}
         */

    }, {
        key: 'getNextPanel',
        value: function getNextPanel() {
            return this.nextPanel;
        }

        /**
         * Gets the very first panel in the panel array
         *
         * @return {Class}
         */

    }, {
        key: 'getFirstPanel',
        value: function getFirstPanel() {
            return this.panels.length ? this.panels[0] : false;
        }

        /**
         * Zooms into a specific panel on a page. Given the original
         * image size, and the original panel size and location, use
         * some maths to determine what the new size of the panel would
         * be if it were best fit and centered on the screen. Again,
         * maths is hard.
         *
         * @param  {Class}   panel   Panel instance
         * @param  {Boolean} animate Whether or not to animate the zoom
         * @return {Boolean}
         */

    }, {
        key: 'zoomToPanel',
        value: function zoomToPanel(panel, animate) {
            var viewPortWidth = this.app.getViewPortSize().width;
            var viewPortHeight = this.app.getViewPortSize().height;

            var width = panel.getWidth() >= panel.getHeight() ? viewPortWidth : panel.getWidth() * viewPortHeight / panel.getHeight();
            var height = panel.getHeight() > panel.getWidth() ? viewPortHeight : panel.getHeight() * viewPortWidth / panel.getWidth();

            if (width > viewPortWidth) {
                width = viewPortWidth;
                height = panel.getHeight() * viewPortWidth / panel.getWidth();
            }

            if (height > viewPortHeight) {
                height = viewPortHeight;
                width = panel.getWidth() * viewPortHeight / panel.getHeight();
            }

            var pageHeight = height * this.getOriginalHeight() / panel.getHeight();
            var pageWidth = width * this.getOriginalWidth() / panel.getWidth();

            var top = panel.getTopPos() * pageHeight / this.getOriginalHeight();
            var left = panel.getLeftPos() * pageWidth / this.getOriginalWidth();

            animate = typeof animate === 'undefined' ? true : animate;

            this.$element.animate({
                'top': -top + (viewPortHeight - height) / 2,
                'left': -left + (viewPortWidth - width) / 2,
                width: pageWidth,
                height: pageHeight
            }, {
                duration: animate ? this.PANEL_ANIMATION_SPEED : 0,
                easing: 'easeOutSine'
            });

            // Set letterboxing with the leftover width and height
            this.app.setLetterBoxing(viewPortWidth - width, viewPortHeight - height, animate);

            this.setCurrentPanel(panel);
            this.app.settings.rememberBookSetting('panel', panel.index);
            return true;
        }

        /**
         * Zooms the page out from a panel by resetting the page and
         * getting rid of the letterboxing.
         */

    }, {
        key: 'zoomOut',
        value: function zoomOut() {
            this.app.setLetterBoxing(0, 0);
            this.resetZoom();
        }

        /**
         * Resets the zoom level of a page.
         */

    }, {
        key: 'resetZoom',
        value: function resetZoom() {
            this.setCurrentPanel(false);
            this.centerInViewPort(true);
            this.app.settings.rememberBookSetting('panel', false);
        }

        /**
         * Gets the original image element width
         *
         * @return {Number}
         */

    }, {
        key: 'getOriginalWidth',
        value: function getOriginalWidth() {
            return this.originalWidth;
        }

        /**
         * Gets the original image element height
         *
         * @return {Number}
         */

    }, {
        key: 'getOriginalHeight',
        value: function getOriginalHeight() {
            return this.originalHeight;
        }

        /**
         * Gets the current top position of the image element
         * by grabbing and parsing the css "top" property
         *
         * @return {Number}
         */

    }, {
        key: 'getTop',
        value: function getTop() {
            return parseInt(this.$element.css('top'));
        }

        /**
         * Gets the current left position of the image element
         * by grabbing and parsing the css "left" property
         *
         * @return {Number}
         */

    }, {
        key: 'getLeft',
        value: function getLeft() {
            return parseInt(this.$element.css('left'));
        }

        /**
         * Gets the image element's current width
         *
         * @return {Number}
         */

    }, {
        key: 'getWidth',
        value: function getWidth() {
            return this.$element.width();
        }

        /**
         * Gets the container width
         *
         * @return {Number}
         */

    }, {
        key: 'getFullWidth',
        value: function getFullWidth() {
            return this.$container.width();
        }

        /**
         * Gets the image element's current height
         *
         * @return {Number}
         */

    }, {
        key: 'getHeight',
        value: function getHeight() {
            return this.$element.height();
        }

        /**
         * Gets the container height
         *
         * @return {Number}
         */

    }, {
        key: 'getFullHeight',
        value: function getFullHeight() {
            return this.$container.height();
        }
    }, {
        key: 'config',
        set: function set(config) {
            this._config = config;
            this.loadPageElement();
        }

        /**
         * Gets the configuration internal
         *
         * @return {Object}
         */
        ,
        get: function get() {
            return this._config;
        }
    }]);

    return Page;
}(EventClass);

/**
 * Class for representing the a panel within a page.
 *
 * @class
 * @extends EventClass
 * @author  Ryan Burst <ryanburst@gmail.com>
 * @version 0.3.0
 */


var Panel = function () {
    /**
     * Initializes the new panel object. Sets a number
     * of local properties based on the passed in configuration
     *
     * @constructs Panel
     * @param  {Class}  page   Page class instance
     * @param  {Object} config Configuration
     * @param  {Number} index  Index of panels within page
     */
    function Panel(page, config, index) {
        _classCallCheck(this, Panel);

        this.page = page;
        this.index = index;
        this.x = config.x;
        this.y = config.y;
        this.width = config.width;
        this.height = config.height;
        this.nextPanel = this.page.config.panels[index + 1] ? index + 1 : false;
        this.previousPanel = this.page.config.panels[index - 1] ? index - 1 : false;
    }

    /**
     * Gets the width of the panel.
     *
     * @return {Number}
     */


    _createClass(Panel, [{
        key: 'getWidth',
        value: function getWidth() {
            return this.width;
        }

        /**
         * Gets the height of the panel.
         *
         * @return {Number}
         */

    }, {
        key: 'getHeight',
        value: function getHeight() {
            return this.height;
        }

        /**
         * Gets the x value
         *
         * @return {Number}
         */

    }, {
        key: 'getLeftPos',
        value: function getLeftPos() {
            return this.x;
        }

        /**
         * Gets the y value
         *
         * @return {Number}
         */

    }, {
        key: 'getTopPos',
        value: function getTopPos() {
            return this.y;
        }
    }]);

    return Panel;
}();

/**
 * Constant holding the string value of Page Mode
 * for comparisons and setters.
 *
 * @constant
 * @type {String}
 * @default
 */


var PAGE_MODE = 'PAGE_MODE';

/**
 * Constant holding the string value of Panel Zoom
 * Mode for comparisons and setters.
 *
 * @constant
 * @type {String}
 * @default
 */
var PANEL_ZOOM_MODE = 'PANEL_ZOOM_MODE';

/**
 * Constant holding the string value of paging forward
 * for comparisons and setters.
 *
 * @constant
 * @type {String}
 * @default
 */
var PAGE_BACK = 'PAGE_BACK';

/**
 * Constant holding the string value of paging backward
 * for comparisons and setters.
 *
 * @constant
 * @type {String}
 * @default
 */
var PAGE_FORWARD = 'PAGE_FORWARD';

/**
 * Constant holding the string value of toggling
 * the main menu for comparisons and setters.
 *
 * @constant
 * @type {String}
 * @default
 */
var TOGGLE_MAIN_MENU = 'TOGGLE_MAIN_MENU';
/**
 * String value for no letterbox styling
 * @constant
 * @type {String}
 * @default
 */
var LETTERBOX_STYLE_NONE = 'no';
/**
 * Opacity value for no letterbox styling
 * @constant
 * @type {Number}
 * @default
 */
var LETTERBOX_STYLE_NONE_VALUE = 0;
/**
 * String value for opaque letterbox styling
 * @constant
 * @type {String}
 * @default
 */
var LETTERBOX_STYLE_OPAQUE = 'opaque';
/**
 * Opacity value for opaque letterbox styling
 * @constant
 * @type {Number}
 * @default
 */
var LETTERBOX_STYLE_OPAQUE_VALUE = 0.75;
/**
 * String value for the solid letterbox styling
 * @constant
 * @type {String}
 * @default
 */
var LETTERBOX_STYLE_SOLID = 'solid';
/**
 * Opacity value for the solid letterbox styling
 * @constant
 * @type {Number}
 * @default
 */
var LETTERBOX_STYLE_SOLID_VALUE = 1;
/**
 * The main client class for the Panelz application.
 *
 * @class
 * @extends EventClass
 * @author  Ryan Burst <ryanburst@gmail.com>
 * @version 0.3.0
 */

var Panelz = function (_EventClass4) {
    _inherits(Panelz, _EventClass4);

    /**
     * Takes in a configuration object for the
     * application settings.
     *
     * @constructs Panelz
     * @param config
     */
    function Panelz(config) {
        _classCallCheck(this, Panelz);

        var _this4 = _possibleConstructorReturn(this, (Panelz.__proto__ || Object.getPrototypeOf(Panelz)).call(this));

        _this4.DEFAULTS = {
            /**
             * The container to load the comic reader into.
             * Should be a jQuery selector
             *
             * @type {String}
             */
            container: '.panelz-creator-container',

            /**
             * ID of the book to load when fetching the data.
             * This value is required if a <#comic> object
             * has not been provided.
             *
             * @type {Boolean}
             */
            id: false,

            /**
             * Object of comic data to load into the reader. Must
             * contain an id, title, and array of pages. Each page
             * object must look like the following:
             *     {
             *         url: "<urlOfImage>",
             *         size: <size> //in bytes
             *         panels: [
             *             {
             *                 x: xCoordinateOfPanel
             *                 y: yCoordinateOfPanel
             *                 width: widthOfPanel
             *                 height: heightOfPanel
             *             }
             *             ...
             *         ]
             *     }
             * The panels array within each page can be empty if the
             * page contains to panels to zoom to for the Panel Zoom feature.
             *
             * @type {Object}
             */
            comic: {
                id: false,
                title: false,
                pages: []
            },

            /**
             * Supply a custom list of endpoints. The Panelz reader
             * only requires a single endpoint for fetching comic data
             * via the supplied <#id> configuration.
             *
             * The {id} placeholder will be swapped for the supplied
             * <#id> configuration parameter.
             *
             * @type {Object}
             */
            endpoints: {
                get: '/comic/{id}'
            }
        };

        _this4.config = $.extend(true, {}, _this4.DEFAULTS, config);

        _this4.settings = new Settings(_this4);

        /**
         * If the user has supplied an id in the configuration,
         * fetch the book data using the <#endpoint.get> endpoint.
         * Otherwise we should have a <#comic> data object to use.
         */
        if (_this4.config.id) {
            _this4.fetchBookData();
        } else {
            _this4.setupBook();
        }
        return _this4;
    }

    /**
     * When setting the config object, use this setter to set
     * a few of the items contained within the object.
     *
     * @param  {Object} config Configuration options
     */


    _createClass(Panelz, [{
        key: 'getEndpoint',


        /**
         * Gets a specific endpoint from the array of endpoints. Replaces
         * the {id} placeholder with the id set in the configuration.
         *
         * @param  {String} endpoint Which endpoint to grab from the array
         * @return {String}
         */
        value: function getEndpoint(endpoint) {
            return this.endpoints[endpoint].replace('{id}', this.config.id);
        }

        /**
         * Uses the {get} endpoint to fetch book data.
         */

    }, {
        key: 'fetchBookData',
        value: function fetchBookData() {
            $.ajax({
                url: this.getEndpoint('get'),
                method: 'GET',
                success: this.onBookDataFetched.bind(this),
                error: this.onRequestError.bind(this)
            });
        }

        /**
         * When book data has fetched, set internal configuration
         * options and proceed with setting up the comic with the
         * returned object. Assumes a valid return format.
         *
         * @param  {Object} comic Object data outlined in configuration
         */

    }, {
        key: 'onBookDataFetched',
        value: function onBookDataFetched(comic) {
            this.config.comic = comic;
            this.setupBook();
        }

        /**
         * The request to grab comic data has failed. Currently
         * does nothing more than output the response to the console.
         */

    }, {
        key: 'onRequestError',
        value: function onRequestError(response) {
            console.log('ERROR FETCHING BOOK DATA!', response);
        }

        /**
         * The reader is ready to setup. Initialize all the objects
         * needed to run the reader and setup event listeners.
         */

    }, {
        key: 'setupBook',
        value: function setupBook() {
            this.setInitialMode();

            this.tutorial = new Tutorial(this, this.settings);
            this.viewport = new ViewPort(this);
            this.book = new Book(this, this.config.comic);
            this.menu = new Menu(this, this.book, this.tutorial);

            this.setEventListeners();
        }

        /**
         * Sets the initial mode of the reader. If the reader has
         * read this comic before, their previous mode will be
         * remembered and used. Otherwise it will check their
         * settings preferences and fall back on PAGE_MODE.
         */

    }, {
        key: 'setInitialMode',
        value: function setInitialMode() {
            if (this.settings.getBookSetting('mode')) {
                this.mode = this.settings.getBookSetting('mode');
            } else {
                this.mode = this.settings.get('startInPanelZoom') ? PANEL_ZOOM_MODE : PAGE_MODE;
            }
        }

        /**
         * Sets event listeners on initialized objects. In this
         * case, we're listening for when the comic has been
         * fully loaded.
         */

    }, {
        key: 'setEventListeners',
        value: function setEventListeners() {
            this.on('user:doubletap', this.switchModes.bind(this));
            this.book.on('load', this.onBookLoaded.bind(this));
        }

        /**
         * Pass along the loaded book event so other objects
         * only have to listen to and know about the app object.
         *
         * @param  {Class} book The class object representing a comic
         * @fires Panelz#load:book
         */

    }, {
        key: 'onBookLoaded',
        value: function onBookLoaded(book) {
            /**
             * Load book event.
             *
             * @event Panelz#load:book
             * @type {object}
             * @property {Class} book - Book instance
             */
            this.trigger('load:book', book);
        }

        /**
         * Getter for the comicc ID
         *
         * @return {Mixed}
         */

    }, {
        key: 'getComicId',
        value: function getComicId() {
            return this.config.comic.id;
        }

        /**
         * Switches the application between the two modes,
         * PAGE_MODE and PANEL_ZOOM_MODE. Messages the user
         * about the mode change so they know what mode they are in.
         */

    }, {
        key: 'switchModes',
        value: function switchModes() {
            var mode = this.mode === PAGE_MODE ? PANEL_ZOOM_MODE : PAGE_MODE;

            this.setMode(mode);

            this.message(this.getReadableModeText());
        }

        /**
         * Sets the current application mode. Makes sure the user's
         * change is remembered in the settings and then triggers
         * an event for other objects to hook into.
         *
         * @param {String} mode Which mode to set.
         * @fires Panelz#change:mode
         */

    }, {
        key: 'setMode',
        value: function setMode(mode) {
            this.mode = mode;
            this.settings.rememberBookSetting('mode', mode);
            /**
             * Change mode event
             *
             * @event Panelz#change:mode
             * @type {String}
             * @property {string} mode - What mode was set
             */
            this.trigger('change:mode', mode);
        }

        /**
         * Gets the human readable version of the current or passed
         * in mode. Takes the string and breaks it into something readable.
         * PANEL_ZOOM_MODE -> Panel Zoom Mode
         *
         * @param  {String}  mode        Optional mode, otherwise use current mode
         * @param  {Boolean} insertBreak Whether or not to insert a break element
         * @return {String}
         */

    }, {
        key: 'getReadableModeText',
        value: function getReadableModeText(mode, insertBreak) {
            if (!mode) {
                mode = this.mode;
            }
            return mode.replace(/_/g, ' ').toLowerCase().replace(/(?:^|\s)\S/g, function (a) {
                return a.toUpperCase();
            }).replace(' Mode', insertBreak ? '<br />Mode' : ' Mode');
        }

        /**
         * Sets the letterboxing in the viewport. Passes in the
         * width and height available for use and whether or not
         * the transition should be animated.
         *
         * @param {Number}  width   Width left to work with
         * @param {Number}  height  Height left to work with
         * @param {Boolean} animate Animate letterbox transition
         */

    }, {
        key: 'setLetterBoxing',
        value: function setLetterBoxing(width, height, animate) {
            this.viewport.setLetterBoxing(width, height, animate);
        }

        /**
         * Gets the current size of the viewport as an object
         * containing the width and height.
         *
         * @return {Object}
         */

    }, {
        key: 'getViewPortSize',
        value: function getViewPortSize() {
            return {
                width: this.viewport.getWidth(),
                height: this.viewport.getHeight()
            };
        }

        /**
         * Returns the last user event object recorded.
         *
         * @return {Object}
         */

    }, {
        key: 'getLastUserEvent',
        value: function getLastUserEvent() {
            return this.viewport.getLastUserEvent();
        }

        /**
         * Appends a jQuery <#$markup> object to the viewport.
         *
         * @param {Object} $markup jQuery element representing the page
         * @return {Object}
         */

    }, {
        key: 'addPageMarkupToViewPort',
        value: function addPageMarkupToViewPort($markup) {
            return $markup.appendTo(this.viewport.$element);
        }

        /**
         * Displays a message for the user within the viewport.
         *
         * @param  {String} message Message to display
         * @param  {Number} time    Time in ms to display the message
         */

    }, {
        key: 'message',
        value: function message(_message, time) {
            this.viewport.message(_message, time);
        }
    }, {
        key: 'config',
        set: function set(config) {
            this.endpoints = config.endpoints;
            this.$container = $(config.container);
            config.app = this;
            this._config = config;
        }

        /**
         * Gets the configuration object internal.
         *
         * @return {Object}
         */
        ,
        get: function get() {
            return this._config;
        }

        /**
         * When setting the $container property, append the the
         * markup needed to run the Panelz reader.
         *
         * @param  {Object} $container jQuery object to append markup to
         */

    }, {
        key: '$container',
        set: function set($container) {
            this._$container = $container.append(PANELZ_MARKUP);
        }

        /**
         * Gets the $container object internal.
         *
         * @return {Object}
         */
        ,
        get: function get() {
            return _$container;
        }
    }]);

    return Panelz;
}(EventClass);

/**
 * Handles the various user settings for the user. Keeps
 * track of selections made by the user as well as how
 * those selections are stored (local storage).
 *
 * @class
 * @extends EventClass
 * @author  Ryan Burst <ryanburst@gmail.com>
 * @version 0.3.0
 */


var Settings = function (_EventClass5) {
    _inherits(Settings, _EventClass5);

    /**
     * Initializes the settings class with defaults and loads
     * in saved preferences from local storage.
     *
     * @constructs Settings
     * @param  {Class} app      The Panelz class app instance\
     */
    function Settings(app) {
        _classCallCheck(this, Settings);

        var _this5 = _possibleConstructorReturn(this, (Settings.__proto__ || Object.getPrototypeOf(Settings)).call(this));

        _this5.DEFAULTS = {
            /**
             * Left hand mode preference
             * @type {Boolean}
             */
            leftHandMode: false,

            /**
             * Whether or not to start in
             * panel zoom mode
             * @type {Boolean}
             */
            startInPanelZoom: false,

            /**
             * Speed of panel transitions
             * 0|250|650
             * @type {Number}
             */
            panelTransitions: 250,

            /**
             * Letter boxing style
             * solid|opaque|none
             * @type {String}
             */
            letterboxing: 'solid',

            /**
             * Whether or not to detect panels
             * on double tapping
             * @type {Boolean}
             */
            detectPanelOnDoubleTap: true,

            /**
             * Shows a page on enter in panel zoom mode
             * @type {Boolean}
             */
            showPageOnEnter: true,

            /**
             * Shows a page on exit in panel zoom mode
             * @type {Boolean}
             */
            showPageOnExit: true,

            /**
             * Whether or not to show the tutorial
             * @type {Boolean}
             */
            showTutorial: true,

            /**
             * Whether or not to show a panel change
             * message in the viewport
             * @type {Boolean}
             */
            showPageChangeMessage: false
        };

        /**
         * What key to store the users preferences at
         * @type {String}
         */
        _this5.storageKey = 'panelz_2.0';

        _this5.app = app;
        _this5.localSettings = _this5.getLocalSettings();
        _this5.loadConfig($.extend({}, _this5.DEFAULTS, _this5.getUserSettings()));
        _this5.setFields();
        _this5.setEventListeners();
        return _this5;
    }

    /**
     * Event listeners for listening to changes or whether or not
     * they want to reset or clear their settings.
     */


    _createClass(Settings, [{
        key: 'setEventListeners',
        value: function setEventListeners() {
            $('[name="' + this.keys().join('"],[name="') + '"]').on('change', this.onFieldChange.bind(this));
            $('body').on('click', '[data-reset-settings]', this.reset.bind(this));
            $('body').on('click', '[data-clear-data]', this.clear.bind(this));
        }

        /**
         * Loads the settings configuration by looping through
         * the keys and setting them.
         *
         * @param  {Object} config Settings configuration
         */

    }, {
        key: 'loadConfig',
        value: function loadConfig(config) {
            this.config = {};
            Object.keys(config).forEach(function (setting) {
                this.set(setting, config[setting]);
            }.bind(this));
        }

        /**
         * Loops through all of the settings and sets each
         * field value and whether or not they should each
         * be checked/filled out
         */

    }, {
        key: 'setFields',
        value: function setFields() {
            this.keys().forEach(this.setField.bind(this));
        }

        /**
         * Sets an interface field with the value and status
         * from a given setting value. Assumes that the input
         * shares the same name value as the setting itself.
         *
         * @param {String} setting Which setting to set
         */

    }, {
        key: 'setField',
        value: function setField(setting) {
            var $fields = $('[name="' + setting + '"]');
            var value = this.get(setting);
            // May be a radio button, so may have several fields
            $fields.each(function (index, field) {
                var $this = $(field);
                var fieldVal = $this.val();
                // If it's a checkbox condition, set the true/value
                // property of the checked field
                if ($this.is(':checkbox')) {
                    $this.prop('checked', !!value);
                    // For radios, we need to normalize the field value to turn
                    // true/false strings into booleans and string numbers
                    // into actual numbers
                } else if ($this.is(':radio') && this.normalizeValue(fieldVal) == value) {
                    $this.prop('checked', true);
                }
            }.bind(this));
        }

        /**
         * Normalizes a value into it's proper type. String numbers
         * are turned into actual integers and true/false strings
         * are turned into true booleans.
         *
         * @param  {Mixed} val Value to normalize
         * @return {Mixed}
         */

    }, {
        key: 'normalizeValue',
        value: function normalizeValue(val) {
            val = isNaN(parseFloat(val)) ? val : parseInt(val);
            val = val === 'false' ? false : val;
            val = val === 'true' ? true : val;

            return val;
        }

        /**
         * When a field is changed, set the settings accordingly.
         * If the field has a certain attribute, message the user
         * that the setting has changed.
         *
         * @param  {Object} e Event object
         */

    }, {
        key: 'onFieldChange',
        value: function onFieldChange(e) {
            var $field = $(e.currentTarget);
            var val = $field.val();
            var name = $field.attr('name');

            if ($field.is(':checkbox')) {
                val = $field.is(':checked');
            }

            this.set(name, this.normalizeValue(val));

            // If the field has a data-readable attribute, we can message the
            // user with the human readable string of the field
            if ($field.closest('.pane__item[data-readable]').length) {
                var readableFieldLabel = $field.closest('.pane__item[data-readable]').attr('data-readable');
                var readableTitle = $field.closest('.pane[data-readable]').attr('data-readable');
                this.app.message(readableTitle + ' set to ' + readableFieldLabel);
            }
        }

        /**
         * Resets all the settings and messages the user.
         */

    }, {
        key: 'reset',
        value: function reset() {
            this.loadConfig(this.DEFAULTS);
            this.setFields();
            this.app.message('Settings reset');
        }

        /**
         * Clears all the settings, including all of the
         * settings for every comic they have viewed.
         */

    }, {
        key: 'clear',
        value: function clear() {
            this.localSettings = {};
            localStorage.removeItem(this.storageKey);
            this.reset();
            this.app.message('Application data cleared');
        }

        /**
         * Gets a specific setting
         *
         * @param  {String} setting Which setting to grab
         * @return {Mixed}
         */

    }, {
        key: 'get',
        value: function get(setting) {
            return this.config[setting];
        }

        /**
         * Sets a setting. Triggers a change event in the
         * settings, making sure to send out the old values
         * as well as the new value.
         *
         * @param {String} setting Setting to set
         * @param {Mixed} val      What value to set the setting to
         * @fires Settings#change:<setting>
         */

    }, {
        key: 'set',
        value: function set(setting, val) {
            var oldVal = this.get(setting);
            this.config[setting] = val;
            this.setUserSettings();
            /**
             * Setting event
             *
             * @event Settings#change:<setting>
             * @type {Object}
             * @property {Object} setting, what setting was changed
             */
            this.trigger('change:' + setting, {
                setting: setting,
                value: val,
                oldValue: oldVal,
                settings: this.config
            });
        }

        /**
         * Returns all the configuration keys
         *
         * @return {Array} Array of configuration keys
         */

    }, {
        key: 'keys',
        value: function keys() {
            return Object.keys(this.config);
        }

        /**
         * Gets the settings saved via local storage. If the pull
         * from local storage fails for some reason catch the
         * exception and return an empty object.
         *
         * @return {Object} Local settings object
         */

    }, {
        key: 'getLocalSettings',
        value: function getLocalSettings() {
            try {
                var localSettings = JSON.parse(localStorage.getItem(this.storageKey));
                console.log('Local Settings:', localSettings);
                return localSettings ? localSettings : {};
            } catch (Exception) {
                return {};
            }
        }

        /**
         * Sets local storage with the local settings object
         */

    }, {
        key: 'setLocalSettings',
        value: function setLocalSettings() {
            localStorage.setItem(this.storageKey, JSON.stringify(this.localSettings));
        }

        /**
         * Remembers a setting in local storage. Triggers a
         * save of the entire local settings object.
         *
         * @param  {String} key Setting to set
         * @param  {Mixed}  val What to set the value to
         */

    }, {
        key: 'remember',
        value: function remember(key, val) {
            this.localSettings[key] = val;
            this.setLocalSettings();
        }

        /**
         * Gets a local setting via a given key.
         *
         * @param  {String} key Setting to grab
         * @return {Mixed}
         */

    }, {
        key: 'getLocalSetting',
        value: function getLocalSetting(key) {
            return this.localSettings[key];
        }

        /**
         * Gets all the book specific settings.
         *
         * @param {Boolean} allBooks Return all books or just this one
         * @return {Object}
         */

    }, {
        key: 'getBookSettings',
        value: function getBookSettings(allBooks) {
            var books = this.getLocalSetting('comics') || {};
            return allBooks ? books : books[this.app.getComicId()] || {};
        }

        /**
         * Remembers a setting specific to the current comic/book.
         *
         * @param  {String} key Setting to set
         * @param  {Mixed}  val Value to set for setting
         */

    }, {
        key: 'rememberBookSetting',
        value: function rememberBookSetting(key, val) {
            var books = this.getBookSettings(true);
            var bookSettings = books[this.app.getComicId()] || {};
            bookSettings[key] = val;
            books[this.app.getComicId()] = bookSettings;
            this.remember('comics', books);
        }

        /**
         * Gets a book/comic specific setting
         *
         * @param  {String} key Setting to get
         * @return {Mixed}
         */

    }, {
        key: 'getBookSetting',
        value: function getBookSetting(key) {
            return this.getBookSettings()[key];
        }

        /**
         * Gets all the user settings.
         *
         * @return {Object}
         */

    }, {
        key: 'getUserSettings',
        value: function getUserSettings() {
            return this.getLocalSetting('settings') ? this.getLocalSetting('settings') : {};
        }

        /**
         * Set user preferences by remembering them
         * to local storage.
         */

    }, {
        key: 'setUserSettings',
        value: function setUserSettings() {
            this.remember('settings', this.config);
        }
    }]);

    return Settings;
}(EventClass);

/**
 * Class for showing and handling the beginners tutorial that
 * appears in front of loading the comic (unless the reader has
 * turned this option off or completed the tutorial previously)
 *
 * The tutorial shows mp4 videos on repeat as the reader steps
 * through. At the end of the tutorial, the user is asked if
 * they want to customize settings. This is also handled by this
 * class and portion of the interface, as it's another way
 * to introduce the reader to the various options available to them.
 *
 * @class
 * @extends EventClass
 * @author  Ryan Burst <ryanburst@gmail.com>
 * @version 0.3.0
 */


var Tutorial = function (_EventClass6) {
    _inherits(Tutorial, _EventClass6);

    /**
     * Initializes the tutorial class with an interactable interface
     * than can listen to touch events via the HammerJS library.
     *
     * @constructs Tutorial
     * @param  {Class} app      The Panelz class app instance
     * @param  {Class} settings Settings class instance
     */
    function Tutorial(app, settings) {
        _classCallCheck(this, Tutorial);

        var _this6 = _possibleConstructorReturn(this, (Tutorial.__proto__ || Object.getPrototypeOf(Tutorial)).call(this));

        _this6.app = app;
        _this6.settings = settings;

        _this6.interactable = new Hammer.Manager($('.tutorial')[0]);
        _this6.interactable.add(new Hammer.Swipe());

        _this6.addEventListeners();

        if (_this6.settings.get('showTutorial')) {
            _this6.show();
        }
        return _this6;
    }

    /**
     * Adds the various event listeners needed. Listens for user
     * interactions and settings changes.
     */


    _createClass(Tutorial, [{
        key: 'addEventListeners',
        value: function addEventListeners() {
            $('body').on('click', '[data-tutorial-next]', this.next.bind(this));
            $('body').on('click', '[data-tutorial-back]', this.back.bind(this));
            $('body').on('click', '[data-tutorial-done]', this.done.bind(this));
            $('body').on('change activate', '[data-tutorial-image]', this.swapImage.bind(this));
            $('body').on('change', '.tutorial [name="startInPanelZoom"]', this.setBeginnerMode.bind(this));

            this.settings.on('change:showTutorial', this.toggle.bind(this));

            this.interactable.on('swipeleft', this.next.bind(this));
            this.interactable.on('swiperight', this.back.bind(this));
        }

        /**
         * User has interacted with the tutorial and wants to proceed
         * to the next item in the tutorial. This method also employs
         * hot loading the video of the next panel.
         *
         * @param  {Object} e Event object
         */

    }, {
        key: 'next',
        value: function next(e) {
            var $panel = $('.tutorial__panel:not(.tutorial__panel--hidden)');
            if ($panel.next().length) {
                $panel.addClass('tutorial__panel--hidden');
                var $nextPanel = $panel.next();
                var $imageLoader = $nextPanel.find('[data-tutorial-image]');
                if ($imageLoader.length) {
                    if ($imageLoader.is('video')) {
                        this.swapImage({ currentTarget: $imageLoader[0] });
                    } else {
                        $nextPanel.find('[data-tutorial-image]:checked').trigger('activate');
                    }
                }
                $nextPanel.removeClass('tutorial__panel--hidden');
            }
        }

        /**
         * User has interacted with a tutorial and wants to go back
         * to the previous item in the tutorial.
         *
         * @param  {Object} e Event object
         */

    }, {
        key: 'back',
        value: function back(e) {
            var $panel = $('.tutorial__panel:not(.tutorial__panel--hidden)');
            if ($panel.prev().length) {
                $panel.addClass('tutorial__panel--hidden');
                $panel.prev().removeClass('tutorial__panel--hidden');
            }
        }

        /**
         * When the tutorial is done, make sure their settings are remembered.
         * Since the settings can be altered through the tutorial, make sure
         * the settings fields are set properly.
         *
         * @fires Tutorial#done
         */

    }, {
        key: 'done',
        value: function done() {
            this.settings.set('showTutorial', false);
            this.settings.setFields();
            /**
             * Triggers the tutorial done event
             *
             * @event Tutorial#done
             * @type {object}
             */
            this.trigger('done');
        }

        /**
         * Swaps the image/video when the user selects one of
         * the tutorial options. This is to show the user different
         * image/videos for each option.
         *
         * @param  {Object} e Event object]
         */

    }, {
        key: 'swapImage',
        value: function swapImage(e) {
            var $this = $(e.currentTarget);
            var imageSrc = $this.attr('data-tutorial-image');
            var $video = $this.closest('.tutorial__content').find('.tutorial__image video');
            $video.closest('.tutorial__image').removeClass('tutorial__image--loaded');
            $video.find('source').attr('src', imageSrc);
            $video[0].load();
            $video[0].addEventListener('loadeddata', function () {
                $video.closest('.tutorial__image').addClass('tutorial__image--loaded');
                $video[0].play();
            }, false);
        }

        /**
         * Sets the mode on the application when they check
         * or uncheck a specific radio box.
         *
         * @param {Object} e Event object
         */

    }, {
        key: 'setBeginnerMode',
        value: function setBeginnerMode(e) {
            var $checkbox = $(e.currentTarget);
            var mode = $checkbox.is(':checked') ? PANEL_ZOOM_MODE : PAGE_MODE;
            this.app.setMode(mode);
        }

        /**
         * Toggles whether or not the tutorial is shown or hidden.
         *
         * @param {Object} e Event object
         */

    }, {
        key: 'toggle',
        value: function toggle(e) {
            if (e.value === true) {
                this.show();
            } else {
                this.hide();
            }
        }

        /**
         * Shows the tutorial interface.
         */

    }, {
        key: 'show',
        value: function show() {
            $('.tutorial__panel').addClass('tutorial__panel--hidden').first().removeClass('tutorial__panel--hidden');
            $('.tutorial').removeClass('tutorial--hidden');
        }

        /**
         * Hides the tutorial interface.
         */

    }, {
        key: 'hide',
        value: function hide() {
            $('.tutorial').addClass('tutorial--hidden');
        }
    }]);

    return Tutorial;
}(EventClass);

/**
 * The ViewPort class represents the viewport available to the user
 * and viewing the comic. All pages and panels have to be sized to
 * fit within this viewport. It also handles and dispatches user
 * interaction events.
 *
 * @class
 * @extends EventClass
 * @author  Ryan Burst <ryanburst@gmail.com>
 * @version 0.3.0
 */


var ViewPort = function (_EventClass7) {
    _inherits(ViewPort, _EventClass7);

    /**
     * Initiates the ViewPort class, by setting properties,
     * listening to application and interaction events, and
     * setting up the viewport for use.
     *
     * @constructs ViewPort
     * @param  {Class} app Panelz app instance
     */
    function ViewPort(app) {
        _classCallCheck(this, ViewPort);

        /**
         * Panelz application instance
         * @type {Class}
         */
        var _this7 = _possibleConstructorReturn(this, (ViewPort.__proto__ || Object.getPrototypeOf(ViewPort)).call(this));

        _this7.app = app;
        /**
         * Settings class instance, derived from
         * an application property.
         * @type {Class}
         */
        _this7.settings = app.settings;
        /**
         * jQuery object holding the viewport element
         * @type {Object}
         */
        _this7.$element = $('.viewport');
        /**
         * jQuery object holding the viewport container
         * @todo Switch this to be the container passed in the initial config
         * @type {Object}
         */
        _this7.$container = $(window);
        /**
         * jQuery object holding the horizontal letter box
         * @type {Object}
         */
        _this7.$horizontalLetterBox = $('.letterbox__horizontal');
        /**
         * jQuery object holding the vertical letter box
         * @type {Object}
         */
        _this7.$verticalLetterBox = $('.letterbox__vertical');
        /**
         * The interactable object the user can swipe or perform
         * user interactions on. Should be a HammerJS instance.
         * @type {Object}
         */
        _this7.interactable = false;
        /**
         * Holds the last user event to occur.
         * @type {Object}
         */
        _this7.e = false;
        /**
         * Whether or not the user is currently performing the
         * pinch interaction on the interactable element.
         * @type {Boolean}
         */
        _this7.pinching = false;
        /**
         * Function holding the message timeout.
         * @type {Function}
         */
        _this7.messageTimeout = false;
        /**
         * Minimum x coordinate for the page back tap zone.
         * @type {Number}
         */
        _this7.PAGE_BACK_MIN = 0;
        /**
         * Maximum x coordinate for the page back tap zone.
         * @type {Number}
         */
        _this7.PAGE_BACK_MAX = 0;
        /**
         * Minimum x coordinate for the page forward tap zone.
         * @type {Number}
         */
        _this7.PAGE_FORWARD_MIN = 0;
        /**
         * Maximum x coordinate for the page forward tap zone.
         * @type {Number}
         */
        _this7.PAGE_FORWARD_MAX = 0;
        /**
         * What percentage of the page on the left and right
         * is allocated to a page turn tap zone.
         * @type {Number}
         */
        _this7.PAGE_TURN_THRESHOLD = 0.25;
        /**
         * The style of letterbox to use when showing. This
         * value may change when the user update their settings.
         * @type {String}
         */
        _this7.LETTERBOX_STYLE = _this7.settings.get('letterboxing');
        /**
         * Whether or not to switch the left and right tap zones for
         * moving the book forward and backward. This value may change
         * when the user updates their settings.
         * @type {Boolean}
         */
        _this7.LEFT_HAND_MODE = _this7.settings.get('leftHandMode');

        _this7.setInteractable();
        _this7.setEventListeners();
        _this7.setViewPortSize();
        _this7.setTapThresholds();
        _this7.setLetterBoxStyle();
        return _this7;
    }

    /**
     * Sets the interactable object by initiating the HammerJS library.
     * Enables the relevant touch events and registers them accordingly.
     */


    _createClass(ViewPort, [{
        key: 'setInteractable',
        value: function setInteractable() {
            this.interactable = new Hammer.Manager(this.$element.find('.viewport__interactable')[0]);

            var pan = new Hammer.Pan({ threshold: 20, enable: this.canRecognizePan.bind(this) });
            var pinch = new Hammer.Pinch({ threshold: 0, enable: this.canRecognizePinch.bind(this), domEvents: true });
            var singletap = new Hammer.Tap({ threshold: 2, posThreshold: 150 });
            var doubletap = new Hammer.Tap({ event: 'doubletap', taps: 2, threshold: 2, posThreshold: 150 });
            var swipe = new Hammer.Swipe({ enable: this.canRecognizeSwipe.bind(this) });

            this.interactable.add([pan, doubletap, singletap, swipe, pinch]);

            doubletap.recognizeWith(singletap);

            singletap.requireFailure(doubletap);
            pan.requireFailure(pinch);
        }

        /**
         * Sets event listeners on DOM elements and the application instance.
         */

    }, {
        key: 'setEventListeners',
        value: function setEventListeners() {
            $('body').on('click', '[data-open-pane]', this.onOpenPane);
            $('body').on('click', '.pane__item, .tutorial__menu-item', this.onPaneMenuItemClick);
            $('body').on('click', '[data-skip-to-page]', this.onSkipToPageClick.bind(this));
            $('body').on('click activate', '[data-close]', this.onCloseClick);
            this.$container.on('resize', this.setViewPortSize.bind(this));
            this.app.on('load:book', this.onBookLoaded.bind(this));
            this.settings.on('change:letterboxing', this.onLetterboxSettingsChange.bind(this));
            this.settings.on('change:leftHandMode', this.onLeftHandModeSettingsChange.bind(this));
        }

        /**
         * User wants to open a pane, do so by removing a hidden class.
         *
         * @param {Object} e Event object
         */

    }, {
        key: 'onOpenPane',
        value: function onOpenPane(e) {
            $('.pane--' + $(this).attr('data-open-pane')).removeClass('pane--hidden');
        }

        /**
         * On a pane menu item click, make sure the item is checked/unchecked accordingly
         *
         * @param {Object} e Event object
         */

    }, {
        key: 'onPaneMenuItemClick',
        value: function onPaneMenuItemClick(e) {
            if (!$(e.target).is(':radio, :checkbox, .checkbox__label')) {
                var $input = $(this).find(':radio, :checkbox');
                var checked = $input.is(':radio') ? true : !$input.prop('checked');
                $input.prop('checked', checked).trigger('change');
                $input.closest('.pane--modal').find('[data-close]').trigger('activate');
            }
        }

        /**
         * The skip to page item has been clicked so trigger an app
         * notification event to respond to.
         * @param {Object} e Event object
         * @fires Panelz#user:skipToPage
         */

    }, {
        key: 'onSkipToPageClick',
        value: function onSkipToPageClick(e) {
            var $this = $(e.currentTarget);
            var page = $this.attr('data-skip-to-page');
            $this.closest('.pane').find('[data-close]').trigger('activate');
            /**
             * User skip to page event
             *
             * @event Panelz#user:skipToPage
             * @type {Object}
             * @property {Class} Page instance to skip to
             */
            this.app.trigger('user:skipToPage', page);
        }

        /**
         * User wants to close a pane, add the CSS hidden class to hide it
         * @param {Object} e Event object
         */

    }, {
        key: 'onCloseClick',
        value: function onCloseClick(e) {
            e.preventDefault();
            var $this = $(this);
            $this.closest('.pane').addClass('pane--hidden');
            $this.closest('.pane').find('.pane__content')[0].scrollTop = 0;
        }

        /**
         * The book/comic has been loaded, so we can add the interaction
         * events. All of the interaction events are then passed up
         * to the application for other classes to hook into.
         *
         * @param  {Class} book Book class instance
         */

    }, {
        key: 'onBookLoaded',
        value: function onBookLoaded(book) {
            console.log('Book loaded');
            this.interactable.on('pinchstart', this.passUserEventToApplication.bind(this));
            this.interactable.on('pinch', this.passUserEventToApplication.bind(this));
            this.interactable.on('pinchmove', this.passUserEventToApplication.bind(this));
            this.interactable.on('pinchin', this.passUserEventToApplication.bind(this));
            this.interactable.on('pinchout', this.passUserEventToApplication.bind(this));
            this.interactable.on('pinchend', this.passUserEventToApplication.bind(this));
            this.interactable.on('panstart', this.passUserEventToApplication.bind(this));
            this.interactable.on('pan', this.passUserEventToApplication.bind(this));
            this.interactable.on('panleft', this.passUserEventToApplication.bind(this));
            this.interactable.on('panright', this.passUserEventToApplication.bind(this));
            this.interactable.on('panend', this.passUserEventToApplication.bind(this));
            this.interactable.on('doubletap', this.passUserEventToApplication.bind(this));
            this.interactable.on('tap', this.passUserEventToApplication.bind(this));
            this.interactable.on('swipeleft', this.passUserEventToApplication.bind(this));
            this.interactable.on('swiperight', this.passUserEventToApplication.bind(this));
            // Resize the book
            $(window).on('resize orientationchange', this.onResize.bind(this));
        }

        /**
         * When the letterboxing setting changes, update the
         * letterbox style accordingly.
         *
         * @param  {Object} data Settings event object
         */

    }, {
        key: 'onLetterboxSettingsChange',
        value: function onLetterboxSettingsChange(data) {
            this.LETTERBOX_STYLE = data.value;
            this.setLetterBoxStyle();
        }

        /**
         * When the left hand mode setting changes, update the
         * tap zones/thresholds accordingly.
         *
         * @param  {Object} data Settings event object
         */

    }, {
        key: 'onLeftHandModeSettingsChange',
        value: function onLeftHandModeSettingsChange(data) {
            this.LEFT_HAND_MODE = data.value;
            this.setTapThresholds();
        }

        /**
         * Passes a user interaction event up to the application. Some
         * of the user events have special cases.
         *
         * @param  {Object} data Settings event object
         * @fires  Panelz#user:<interaction>
         * @return {Boolean}
         */

    }, {
        key: 'passUserEventToApplication',
        value: function passUserEventToApplication(e) {
            // Hammer likes to fire pan and pinch events, so set
            // a property which will allow us to disable pan events
            // while the user is performing pinching
            if (e.type === 'pinchstart') {
                this.pinching = true;
            }
            // Hammer is throwing pan events after a pinch end,
            // so add some delay before turning pinching off
            if (e.type === 'pinchend') {
                setTimeout(function () {
                    this.pinching = false;
                }.bind(this), 100);
            }
            // On a tap, we have to figure out where they tapped
            // and trigger the correct event
            if (e.type === 'tap') {
                this.app.trigger('user:tap', e);
                var cmd = this.findTapZone(e.center.x, e.center.y);
                if (cmd === PAGE_FORWARD) {
                    return this.app.trigger('user:pageForward', e);
                } else if (cmd === PAGE_BACK) {
                    return this.app.trigger('user:pageBackward', e);
                } else if (cmd === TOGGLE_MAIN_MENU) {
                    return this.app.trigger('show:menu');
                } else {
                    return true;
                }
            }
            // Translate the swipeleft event
            if (e.type === 'swipeleft') {
                e.type = 'pageForward';
            }
            // Translate the swiperight event
            if (e.type === 'swiperight') {
                e.type = 'pageBackward';
            }

            this.registerUserEvent(e);

            /**
             * User interaction event
             *
             * @event Panelz#user:<interaction>
             * @type {Object}
             * @property {Object} Interaction event
             */
            this.app.trigger('user:' + e.type, e);
        }

        /**
         * Saves a user event to a local property.
         *
         * @param  {Object} e Event Object
         */

    }, {
        key: 'registerUserEvent',
        value: function registerUserEvent(e) {
            this.e = e;
        }

        /**
         * Returns the last user event object recorded.
         *
         * @return {Object}
         */

    }, {
        key: 'getLastUserEvent',
        value: function getLastUserEvent() {
            return this.e;
        }

        /**
         * Recognize the user pinch event only in Page Mode.
         *
         * @return {Boolean}
         */

    }, {
        key: 'canRecognizePinch',
        value: function canRecognizePinch() {
            return this.app.mode === PAGE_MODE;
        }

        /**
         * Recognize the user pan event only when in page mode
         * and if the user is not currently also pinching.
         *
         * @return {Boolean}
         */

    }, {
        key: 'canRecognizePan',
        value: function canRecognizePan() {
            return this.app.mode === PAGE_MODE && !this.pinching;
        }

        /**
         * Recognize the user swipe event only when in panel zoom mode
         *
         * @return {Boolean}
         */

    }, {
        key: 'canRecognizeSwipe',
        value: function canRecognizeSwipe() {
            return this.app.mode === PANEL_ZOOM_MODE;
        }

        /**
         * Sets the view port size to the width and height of the
         * container element.
         */

    }, {
        key: 'setViewPortSize',
        value: function setViewPortSize() {
            this.$element.width(this.$container.outerWidth());
            this.$element.height(this.$container.outerHeight());
        }

        /**
         * Sets where the tap zones are. In normal mode, it uses
         * the tap threshold to calculate a percentage of the screen
         * used for the left and right to be used as forward/back
         * with the leftover center area used as the menu toggle.
         *
         * If left hand mode, switches the left and right zones.
         */

    }, {
        key: 'setTapThresholds',
        value: function setTapThresholds() {
            if (this.LEFT_HAND_MODE) {
                this.PAGE_BACK_MIN = this.getWidth() - this.getWidth() * this.PAGE_TURN_THRESHOLD;
                this.PAGE_BACK_MAX = this.getWidth();
                this.PAGE_FORWARD_MIN = 0;
                this.PAGE_FORWARD_MAX = this.getWidth() * this.PAGE_TURN_THRESHOLD;
            } else {
                this.PAGE_FORWARD_MIN = this.getWidth() - this.getWidth() * this.PAGE_TURN_THRESHOLD;
                this.PAGE_FORWARD_MAX = this.getWidth();
                this.PAGE_BACK_MIN = 0;
                this.PAGE_BACK_MAX = this.getWidth() * this.PAGE_TURN_THRESHOLD;
            }
        }

        /**
         * Figures out what tap zone a pair of x and y coordinates are in.
         * returns the string constant associated with the correct tap zone.
         *
         * @param  {Number} x X coordinate
         * @param  {Number} y Y coordinate
         * @return {String}
         */

    }, {
        key: 'findTapZone',
        value: function findTapZone(x, y) {
            if (x >= this.PAGE_BACK_MIN && x <= this.PAGE_BACK_MAX) {
                return PAGE_BACK;
            }
            if (x >= this.PAGE_FORWARD_MIN && x <= this.PAGE_FORWARD_MAX) {
                return PAGE_FORWARD;
            }
            return TOGGLE_MAIN_MENU;
        }

        /**
         * Sets letterboxing style given leftover width and height to work with.
         * The left over size is divided in half to put letterboxes on both sides.
         * @param {Number}  width   Left over width
         * @param {Number}  height  Left over height
         * @param {Boolean} animate Whether or not to animate the letterboxes
         */

    }, {
        key: 'setLetterBoxing',
        value: function setLetterBoxing(width, height, animate) {
            var horizSize = height > 0 ? height / 2 : 0;
            var vertSize = width > 0 ? width / 2 : 0;
            var speed = this.settings.get('panelTransitions');
            animate = typeof animate === 'undefined' ? true : animate;
            this.$horizontalLetterBox.animate({
                height: horizSize
            }, {
                duration: animate ? speed : 0,
                easing: 'easeOutSine'
            });
            this.$verticalLetterBox.animate({
                width: vertSize
            }, {
                duration: animate ? speed : 0,
                easing: 'easeOutSine'
            });
        }

        /**
         * Sets the letterbox style by setting the opacity.
         */

    }, {
        key: 'setLetterBoxStyle',
        value: function setLetterBoxStyle() {
            var opacity = this.LETTERBOX_STYLE === LETTERBOX_STYLE_NONE ? LETTERBOX_STYLE_NONE_VALUE : this.LETTERBOX_STYLE === LETTERBOX_STYLE_OPAQUE ? LETTERBOX_STYLE_OPAQUE_VALUE : LETTERBOX_STYLE_SOLID_VALUE;

            this.$horizontalLetterBox.css('opacity', opacity);
            this.$verticalLetterBox.css('opacity', opacity);
        }

        /**
         * Gets the width of the viewport.
         *
         * @return {Number}
         */

    }, {
        key: 'getWidth',
        value: function getWidth() {
            return this.$element.outerWidth();
        }

        /**
         * Gets the height of the viewport.
         *
         * @return {Number}
         */

    }, {
        key: 'getHeight',
        value: function getHeight() {
            return this.$element.outerHeight();
        }

        /**
         * Shows a message in the viewport for the user. Disappears
         * after a set or passed in amount of time.
         *
         * @param  {String} text Message to display
         * @param  {Number} time Time to show message in ms
         */

    }, {
        key: 'message',
        value: function message(text, time) {
            var $messageContainer = $('.viewport__message');
            var $message = $('.message__text');

            time = typeof time === 'undefined' ? 3000 : time;

            clearTimeout(this.messageTimeout);

            $message.text(text);
            $messageContainer.removeClass('viewport__message--hide');
            this.messageTimeout = setTimeout(function () {
                clearTimeout(this.messageTimeout);
                $messageContainer.addClass('viewport__message--hide');
            }, time);
        }

        /**
         * On resize, make sure the viewport and tap thresholds have
         * been adjusted to fit the new size of the container.
         *
         * @param {Object} e Event object
         * @fires Panelz#resize
         */

    }, {
        key: 'onResize',
        value: function onResize(e) {
            this.setViewPortSize();
            this.setTapThresholds();
            /**
             * Resize event
             *
             * @event Panelz#resize
             * @type {Object}
             * @property {Object} Resize event
             */
            this.app.trigger('resize', e);
        }
    }]);

    return ViewPort;
}(EventClass);

;

/**
 * jquery-circle-progress - jQuery Plugin to draw animated circular progress bars:
 * {@link http://kottenator.github.io/jquery-circle-progress/}
 *
 * @author Rostyslav Bryzgunov <kottenator@gmail.com>
 * @version 1.2.2
 * @licence MIT
 * @preserve
 */
!function (i) {
    if ("function" == typeof define && define.amd) define(["jquery"], i);else if ("object" == (typeof module === 'undefined' ? 'undefined' : _typeof(module)) && module.exports) {
        var t = require("jquery");i(t), module.exports = t;
    } else i(jQuery);
}(function (i) {
    function t(i) {
        this.init(i);
    }t.prototype = { value: 0, size: 100, startAngle: -Math.PI, thickness: "auto", fill: { gradient: ["#3aeabb", "#fdd250"] }, emptyFill: "rgba(0, 0, 0, .1)", animation: { duration: 1200, easing: "circleProgressEasing" }, animationStartValue: 0, reverse: !1, lineCap: "butt", insertMode: "prepend", constructor: t, el: null, canvas: null, ctx: null, radius: 0, arcFill: null, lastFrameValue: 0, init: function init(t) {
            i.extend(this, t), this.radius = this.size / 2, this.initWidget(), this.initFill(), this.draw(), this.el.trigger("circle-inited");
        }, initWidget: function initWidget() {
            this.canvas || (this.canvas = i("<canvas>")["prepend" == this.insertMode ? "prependTo" : "appendTo"](this.el)[0]);var t = this.canvas;if (t.width = this.size, t.height = this.size, this.ctx = t.getContext("2d"), window.devicePixelRatio > 1) {
                var e = window.devicePixelRatio;t.style.width = t.style.height = this.size + "px", t.width = t.height = this.size * e, this.ctx.scale(e, e);
            }
        }, initFill: function initFill() {
            function t() {
                var t = i("<canvas>")[0];t.width = e.size, t.height = e.size, t.getContext("2d").drawImage(g, 0, 0, r, r), e.arcFill = e.ctx.createPattern(t, "no-repeat"), e.drawFrame(e.lastFrameValue);
            }var e = this,
                a = this.fill,
                n = this.ctx,
                r = this.size;if (!a) throw Error("The fill is not specified!");if ("string" == typeof a && (a = { color: a }), a.color && (this.arcFill = a.color), a.gradient) {
                var s = a.gradient;if (1 == s.length) this.arcFill = s[0];else if (s.length > 1) {
                    for (var l = a.gradientAngle || 0, o = a.gradientDirection || [r / 2 * (1 - Math.cos(l)), r / 2 * (1 + Math.sin(l)), r / 2 * (1 + Math.cos(l)), r / 2 * (1 - Math.sin(l))], h = n.createLinearGradient.apply(n, o), c = 0; c < s.length; c++) {
                        var d = s[c],
                            u = c / (s.length - 1);i.isArray(d) && (u = d[1], d = d[0]), h.addColorStop(u, d);
                    }this.arcFill = h;
                }
            }if (a.image) {
                var g;a.image instanceof Image ? g = a.image : (g = new Image(), g.src = a.image), g.complete ? t() : g.onload = t;
            }
        }, draw: function draw() {
            this.animation ? this.drawAnimated(this.value) : this.drawFrame(this.value);
        }, drawFrame: function drawFrame(i) {
            this.lastFrameValue = i, this.ctx.clearRect(0, 0, this.size, this.size), this.drawEmptyArc(i), this.drawArc(i);
        }, drawArc: function drawArc(i) {
            if (0 !== i) {
                var t = this.ctx,
                    e = this.radius,
                    a = this.getThickness(),
                    n = this.startAngle;t.save(), t.beginPath(), this.reverse ? t.arc(e, e, e - a / 2, n - 2 * Math.PI * i, n) : t.arc(e, e, e - a / 2, n, n + 2 * Math.PI * i), t.lineWidth = a, t.lineCap = this.lineCap, t.strokeStyle = this.arcFill, t.stroke(), t.restore();
            }
        }, drawEmptyArc: function drawEmptyArc(i) {
            var t = this.ctx,
                e = this.radius,
                a = this.getThickness(),
                n = this.startAngle;i < 1 && (t.save(), t.beginPath(), i <= 0 ? t.arc(e, e, e - a / 2, 0, 2 * Math.PI) : this.reverse ? t.arc(e, e, e - a / 2, n, n - 2 * Math.PI * i) : t.arc(e, e, e - a / 2, n + 2 * Math.PI * i, n), t.lineWidth = a, t.strokeStyle = this.emptyFill, t.stroke(), t.restore());
        }, drawAnimated: function drawAnimated(t) {
            var e = this,
                a = this.el,
                n = i(this.canvas);n.stop(!0, !1), a.trigger("circle-animation-start"), n.css({ animationProgress: 0 }).animate({ animationProgress: 1 }, i.extend({}, this.animation, { step: function step(i) {
                    var n = e.animationStartValue * (1 - i) + t * i;e.drawFrame(n), a.trigger("circle-animation-progress", [i, n]);
                } })).promise().always(function () {
                a.trigger("circle-animation-end");
            });
        }, getThickness: function getThickness() {
            return i.isNumeric(this.thickness) ? this.thickness : this.size / 14;
        }, getValue: function getValue() {
            return this.value;
        }, setValue: function setValue(i) {
            this.animation && (this.animationStartValue = this.lastFrameValue), this.value = i, this.draw();
        } }, i.circleProgress = { defaults: t.prototype }, i.easing.circleProgressEasing = function (i) {
        return i < .5 ? (i = 2 * i, .5 * i * i * i) : (i = 2 - 2 * i, 1 - .5 * i * i * i);
    }, i.fn.circleProgress = function (e, a) {
        var n = "circle-progress",
            r = this.data(n);if ("widget" == e) {
            if (!r) throw Error('Calling "widget" method on not initialized instance is forbidden');return r.canvas;
        }if ("value" == e) {
            if (!r) throw Error('Calling "value" method on not initialized instance is forbidden');if ("undefined" == typeof a) return r.getValue();var s = arguments[1];return this.each(function () {
                i(this).data(n).setValue(s);
            });
        }return this.each(function () {
            var a = i(this),
                r = a.data(n),
                s = i.isPlainObject(e) ? e : {};if (r) r.init(s);else {
                var l = i.extend({}, a.data());"string" == typeof l.fill && (l.fill = JSON.parse(l.fill)), "string" == typeof l.animation && (l.animation = JSON.parse(l.animation)), s = i.extend(l, s), s.el = a, r = new t(s), a.data(n, r);
            }
        });
    };
});

var PANELZ_MARKUP = '\n    <div class="tutorial tutorial--hidden">\n        <div class="tutorial__panel">\n            <div class="tutorial__cta">\n                <button class="tutorial__button tutorial__button--skip" data-tutorial-done>Skip</button>\n            </div>\n            <div class="tutorial__content">\n                <div class="heading heading--lg">Welcome to Panelz</div>\n                <div class="heading heading--secondary">Here are some terms to get you started:</div>\n                <p><strong>Page Mode</strong> (default) - View the full page and all of its panels as you read.</p>\n                <p><strong>Panel Zoom</strong> - This mode will guide you along your comic, panel by panel.</p>\n            </div>\n            <div class="tutorial__cta">\n                <button class="tutorial__button tutorial__button--back" style="visibility: hidden">Back</button>\n                <ul class="tutorial__progress">\n                    <li class="tutorial__progress-step tutorial__progress-step--active"></li>\n                    <li class="tutorial__progress-step"></li>\n                    <li class="tutorial__progress-step"></li>\n                    <li class="tutorial__progress-step"></li>\n                    <li class="tutorial__progress-step"></li>\n                </ul>\n                <button class="tutorial__button" data-tutorial-next>Next</button>\n            </div>\n        </div>\n        <div class="tutorial__panel tutorial__panel--hidden">\n            <div class="tutorial__cta">\n                <button class="tutorial__button tutorial__button--skip" data-tutorial-done>Skip</button>\n            </div>\n            <div class="tutorial__content">\n                <div class="tutorial__image">\n                    <video autoplay="autoplay" loop="loop" muted playsinline data-tutorial-image="../dist/images/tutorial-taps.mp4">\n                        <source type="video/mp4" />\n                    </video>\n                </div>\n                <p><strong>Left Tap</strong> - Navigates backwards one panel or page.</p>\n                <p><strong>Right Tap</strong> - Navigates forward one panel or page.</p>\n                <p><strong>Center Tap</strong> - Open or close the menu.</p>\n            </div>\n            <div class="tutorial__cta">\n                <button class="tutorial__button tutorial__button--back" data-tutorial-back>Back</button>\n                <ul class="tutorial__progress">\n                    <li class="tutorial__progress-step"></li>\n                    <li class="tutorial__progress-step tutorial__progress-step--active"></li>\n                    <li class="tutorial__progress-step"></li>\n                    <li class="tutorial__progress-step"></li>\n                    <li class="tutorial__progress-step"></li>\n                </ul>\n                <button class="tutorial__button" data-tutorial-next>Next</button>\n            </div>\n        </div>\n        <div class="tutorial__panel tutorial__panel--hidden">\n            <div class="tutorial__cta">\n                <button class="tutorial__button tutorial__button--skip" data-tutorial-done>Skip</button>\n            </div>\n            <div class="tutorial__content">\n                <div class="tutorial__image">\n                    <video autoplay="autoplay" loop="loop" muted playsinline data-tutorial-image="../dist/images/tutorial-double-taps.mp4">\n                        <source type="video/mp4" />\n                    </video>\n                </div>\n                <p><strong>Double tap</strong> - Switch between Page Mode and Panel Zoom Mode.</p>\n                <p>The panel tapped on will be detected and zoomed on when switching to Panel Zoom mode. This option can be changed in the settings.\n            </div>\n            <div class="tutorial__cta">\n                <button class="tutorial__button tutorial__button--back" data-tutorial-back>Back</button>\n                <ul class="tutorial__progress">\n                    <li class="tutorial__progress-step"></li>\n                    <li class="tutorial__progress-step"></li>\n                    <li class="tutorial__progress-step tutorial__progress-step--active"></li>\n                    <li class="tutorial__progress-step"></li>\n                    <li class="tutorial__progress-step"></li>\n                </ul>\n                <button class="tutorial__button" data-tutorial-next>Next</button>\n            </div>\n        </div>\n        <div class="tutorial__panel tutorial__panel--hidden">\n            <div class="tutorial__cta">\n                <button class="tutorial__button tutorial__button--skip" data-tutorial-done>Skip</button>\n            </div>\n            <div class="tutorial__content">\n                <div class="heading heading--secondary">You can also swipe to navigate!</div>\n                <div class="tutorial__image">\n                    <video autoplay="autoplay" loop="loop" muted playsinline data-tutorial-image="../dist/images/tutorial-swipes.mp4">\n                        <source type="video/mp4" />\n                    </video>\n                </div>\n            </div>\n            <div class="tutorial__cta">\n                <button class="tutorial__button tutorial__button--back" data-tutorial-back>Back</button>\n                <ul class="tutorial__progress">\n                    <li class="tutorial__progress-step"></li>\n                    <li class="tutorial__progress-step"></li>\n                    <li class="tutorial__progress-step"></li>\n                    <li class="tutorial__progress-step tutorial__progress-step--active"></li>\n                    <li class="tutorial__progress-step"></li>\n                </ul>\n                <button class="tutorial__button" data-tutorial-next>Next</button>\n            </div>\n        </div>\n        <div class="tutorial__panel tutorial__panel--hidden">\n            <div class="tutorial__content">\n                <div class="heading heading--secondary">That\'s it!</div>\n                <p>Do you want to take a moment and customize a few Panel Zoom settings?</p>\n                <div class="tutorial__center-cta">\n                    <p><button class="tutorial__button" data-tutorial-next>Customize Settings</button></p>\n                    <p><button class="tutorial__button tutorial__button--link" data-tutorial-done>No thanks, I\'m ready to read!</button></p>\n                </div>\n            </div>\n            <div class="tutorial__cta">\n                <button class="tutorial__button tutorial__button--back" data-tutorial-back>Back</button>\n                <ul class="tutorial__progress">\n                    <li class="tutorial__progress-step"></li>\n                    <li class="tutorial__progress-step"></li>\n                    <li class="tutorial__progress-step"></li>\n                    <li class="tutorial__progress-step"></li>\n                    <li class="tutorial__progress-step tutorial__progress-step--active"></li>\n                </ul>\n                <button class="tutorial__button" data-tutorial-done style="visibility: hidden">Done</button>\n            </div>\n        </div>\n        <div class="tutorial__panel tutorial__panel--hidden">\n            <div class="tutorial__cta">\n                <button class="tutorial__button tutorial__button--skip" data-tutorial-done>Cancel</button>\n            </div>\n            <form class="tutorial__content">\n                <div class="heading heading--secondary heading--secondary-with-helper">Letterboxing</div>\n                <p>Set what style is used when blocking off a panel from the rest of the page.</p>\n                <div class="tutorial__image tutorial__image--small">\n                    <video autoplay="autoplay" loop="loop" muted playsinline>\n                        <source type="video/mp4" />\n                    </video>\n                </div>\n                <ul class="tutorial__menu">\n                    <li class="tutorial__menu-item">\n                        <div class="radio">\n                          <input type="radio" value="no" id="no-letterboxing-tut" name="letterboxing" data-tutorial-image="../dist/images/tutorial-letterboxing-none.mp4"/>\n                          <label for="no-letterboxing-tut" class="radio__label"></label>\n                        </div>\n                        <div class="tutorial__menu-item-text">\n                            No letterboxing\n                        </div>\n                    </li>\n                    <li class="tutorial__menu-item">\n                        <div class="radio">\n                          <input type="radio" value="opaque" id="opaque-letterboxing-tut" name="letterboxing" data-tutorial-image="../dist/images/tutorial-letterboxing-opaque.mp4"/>\n                          <label for="opaque-letterboxing-tut" class="radio__label"></label>\n                        </div>\n                        <div class="tutorial__menu-item-text">\n                            Opaque letterboxing\n                        </div>\n                    </li>\n                    <li class="tutorial__menu-item">\n                        <div class="radio">\n                          <input type="radio" value="solid" id="solid-letterboxing-tut" name="letterboxing" data-tutorial-image="../dist/images/tutorial-letterboxing-solid.mp4"/>\n                          <label for="solid-letterboxing-tut" class="radio__label"></label>\n                        </div>\n                        <div class="tutorial__menu-item-text">\n                            Solid letterboxing (default)\n                        </div>\n                    </li>\n                </ul>\n            </form>\n            <div class="tutorial__cta">\n                <button class="tutorial__button tutorial__button--back" data-tutorial-back>Back</button>\n                <ul class="tutorial__progress">\n                    <li class="tutorial__progress-step tutorial__progress-step--active"></li>\n                    <li class="tutorial__progress-step"></li>\n                    <li class="tutorial__progress-step"></li>\n                </ul>\n                <button class="tutorial__button" data-tutorial-next>Next</button>\n            </div>\n        </div>\n        <div class="tutorial__panel tutorial__panel--hidden">\n            <form class="tutorial__content">\n                <div class="heading heading--secondary">Panel Transitions</div>\n                <div class="tutorial__image tutorial__image--small">\n                    <video autoplay="autoplay" loop="loop" muted playsinline>\n                        <source type="video/mp4" />\n                    </video>\n                </div>\n                <ul class="tutorial__menu">\n                    <li class="tutorial__menu-item">\n                        <div class="radio">\n                            <input type="radio" value="0" id="no-animation-tut" name="panelTransitions" data-tutorial-image="../dist/images/tutorial-animations-none.mp4"/>\n                            <label for="no-animation-tut" class="radio__label"></label>\n                        </div>\n                        <div class="tutorial__menu-item-text">\n                            No animations\n                        </div>\n                    </li>\n                    <li class="tutorial__menu-item">\n                        <div class="radio">\n                            <input type="radio" value="650" id="slow-animation-tut" name="panelTransitions" data-tutorial-image="../dist/images/tutorial-animations-slow.mp4"/>\n                            <label for="slow-animation-tut" class="radio__label"></label>\n                        </div>\n                        <div class="tutorial__menu-item-text">\n                            Slow animations\n                        </div>\n                    </li>\n                    <li class="tutorial__menu-item">\n                        <div class="radio">\n                            <input type="radio" value="250" id="fast-animation-tut" name="panelTransitions" data-tutorial-image="../dist/images/tutorial-animations-fast.mp4"/>\n                            <label for="fast-animation-tut" class="radio__label"></label>\n                        </div>\n                        <div class="tutorial__menu-item-text">\n                            Fast animations (default)\n                        </div>\n                    </li>\n                </ul>\n            </form>\n            <div class="tutorial__cta">\n                <button class="tutorial__button tutorial__button--back" data-tutorial-back>Back</button>\n                <ul class="tutorial__progress">\n                    <li class="tutorial__progress-step"></li>\n                    <li class="tutorial__progress-step tutorial__progress-step--active"></li>\n                    <li class="tutorial__progress-step"></li>\n                </ul>\n                <button class="tutorial__button" data-tutorial-next>Next</button>\n            </div>\n        </div>\n        <div class="tutorial__panel tutorial__panel--hidden">\n            <form class="tutorial__content">\n                <div class="heading heading--secondary">Final Panel Zoom Settings</div>\n                <ul class="tutorial__menu">\n                    <li class="tutorial__menu-item">\n                        <div class="checkbox">\n                            <input type="checkbox" value="true" id="startInPanelZoom-tut" name="startInPanelZoom" />\n                            <label for="startInPanelZoom-tut" class="checkbox__label"></label>\n                        </div>\n                        <div class="tutorial__menu-item-text">\n                            Start new books in Panel Zoom Mode\n                        </div>\n                    </li>\n                    <li class="tutorial__menu-item">\n                        <div class="checkbox">\n                            <input type="checkbox" value="true" id="detectPanelOnDoubleTap-tut" name="detectPanelOnDoubleTap" />\n                            <label for="detectPanelOnDoubleTap-tut" class="checkbox__label"></label>\n                        </div>\n                        <div class="tutorial__menu-item-text">\n                            Detect panel on double tap\n                            <p class="tutorial__menu-helper-text">Zooms to the panel that is double tapped on when switching to Panel Zoom Mode, otherwise defaults to the first panel</p>\n                        </div>\n                    </li>\n                    <li class="tutorial__menu-item">\n                        <div class="checkbox">\n                          <input type="checkbox" value="true" id="showPageOnEnter-tut" name="showPageOnEnter" />\n                          <label for="showPageOnEnter-tut" class="checkbox__label"></label>\n                        </div>\n                        <div class="tutorial__menu-item-text">\n                            Show page on enter\n                        </div>\n                    </li>\n                    <li class="tutorial__menu-item">\n                        <div class="checkbox">\n                            <input type="checkbox" value="true" id="showPageOnExit-tut" name="showPageOnExit" />\n                            <label for="showPageOnExit-tut" class="checkbox__label"></label>\n                        </div>\n                        <div class="tutorial__menu-item-text">\n                            Show page on exit\n                        </div>\n                    </li>\n                </ul>\n            </form>\n            <div class="tutorial__cta">\n                <button class="tutorial__button tutorial__button--back" data-tutorial-back>Back</button style="visibility: hidden">\n                <ul class="tutorial__progress">\n                    <li class="tutorial__progress-step"></li>\n                    <li class="tutorial__progress-step"></li>\n                    <li class="tutorial__progress-step tutorial__progress-step--active"></li>\n                </ul>\n                <button class="tutorial__button" data-tutorial-done>Done</button>\n            </div>\n        </div>\n    </div>\n    <div class="viewport">\n        <div class="viewport__interactable"></div>\n        <div class="viewport__loading loading">\n            <div class="loading__progress"><span data-loaded-size class="loading__size"></span></div>\n            <p>Loading Comic...</p>\n        </div>\n        <div class="letterbox">\n            <div class="letterbox__horizontal letterbox__horizontal--top"></div>\n            <div class="letterbox__horizontal letterbox__horizontal--bottom"></div>\n            <div class="letterbox__vertical letterbox__vertical--left"></div>\n            <div class="letterbox__vertical letterbox__vertical--right"></div>\n        </div>\n        <div class="viewport__message viewport__message--hide message">\n            <div class="message__text"></div>\n        </div>\n        <ul class="viewport__menu viewport__menu--top menu menu--top">\n            <li class="menu__list-item">\n                <div class="menu__text" data-book-title>Unknown Title</div>\n            </li>\n            <li class="menu__list-item">\n                <div class="menu__text">\n                    <span data-page-num>0</span>/<span data-total-pages>0</span>\n                </div>\n            </li>\n        </ul>\n        </ul>\n        <ul class="viewport__menu menu">\n            <li class="menu__list-item">\n                <div href="#" class="menu__option" data-open-pane="pages">\n                    <i class="fa fa-clone fa-flip-horizontal menu__icon" aria-hidden="true"></i>\n                    <span class="menu__label">Pages</span>\n                </div>\n            </li>\n            <li class="menu__list-item">\n                <div class="menu__option menu__option--mode">\n                    Panel<br />Zoom\n                </div>\n            </li>\n            <li class="menu__list-item">\n                <div class="menu__option" data-open-pane="settings">\n                    <i class="fa fa-sliders menu__icon" aria-hidden="true"></i>\n                    <span class="menu__label">Settings</span>\n                </div>\n            </li>\n        </ul>\n        <div class="panes">\n            <div class="panes__pane pane pane--pages pane--hidden">\n                <div class="pane__container">\n                    <div class="pane__header">\n                        <span>Pages</span>\n                        <span class="pane__close" data-close>\n                            <i class="fa fa-times" aria-hidden="true"></i>\n                        </span>\n                    </div>\n                    <div class="pane__content">\n                        <ul class="page-list">\n                            <li class="page-list__page page-list__page--template" data-skip-to-page="">\n                                <img src="" class="page-list__image" />\n                                <span class="page-list__number"></span>\n                            </li>\n                        </ul>\n                    </div>\n                </div>\n            </div>\n            <div class="panes__pane pane pane--settings pane--full pane--hidden">\n                <div class="pane__container">\n                    <div class="pane__header">\n                        <span>Settings</span>\n                        <span class="pane__close" data-close>\n                            <i class="fa fa-times" aria-hidden="true"></i>\n                        </span>\n                    </div>\n                    <div class="pane__content">\n                        <div class="pane__heading">Panel Zoom</div>\n                        <ul class="pane__menu">\n                            <li class="pane__item">\n                                <div class="pane__text">\n                                    <p class="pane__option">Start new books in Panel Zoom Mode</p>\n                                </div>\n                                <div class="checkbox">\n                                  <input type="checkbox" value="true" id="startInPanelZoom" name="startInPanelZoom" />\n                                  <label for="startInPanelZoom" class="checkbox__label"></label>\n                                </div>\n                            </li>\n                            <li class="pane__item" data-open-pane="animations">\n                                <div class="pane__text">\n                                    <p class="pane__option">Animate Transitions</p>\n                                    <p class="pane__helper-text">Animate panel-to-panel transitions in Panel Zoom mode</p>\n                                </div>\n                            </li>\n                            <li class="pane__item" data-open-pane="letterboxing">\n                                <div class="pane__text">\n                                    <p class="pane__option">Letterboxing</p>\n                                    <p class="pane__helper-text">Use bars to mask content outside of the current panel</p>\n                                </div>\n                            </li>\n                            <li class="pane__item">\n                                <div class="pane__text">\n                                    <p class="pane__option">Detect panel on double tap</p>\n                                    <p class="pane__helper-text">Zooms to the panel that is double tapped on when switching to Panel Zoom Mode</p>\n                                </div>\n                                <div class="checkbox">\n                                  <input type="checkbox" value="true" id="detectPanelOnDoubleTap" name="detectPanelOnDoubleTap" />\n                                  <label for="detectPanelOnDoubleTap" class="checkbox__label"></label>\n                                </div>\n                            </li>\n                            <li class="pane__item">\n                                <div class="pane__text">\n                                    <p class="pane__option">Show page on enter</p>\n                                    <p class="pane__helper-text">Show full page on transitioning to a new page</p>\n                                </div>\n                                <div class="checkbox">\n                                  <input type="checkbox" value="true" id="showPageOnEnter" name="showPageOnEnter" />\n                                  <label for="showPageOnEnter" class="checkbox__label"></label>\n                                </div>\n                            </li>\n                            <li class="pane__item">\n                                <div class="pane__text">\n                                    <p class="pane__option">Show page on exit</p>\n                                    <p class="pane__helper-text">Show full page before transitioning to a new page</p>\n                                </div>\n                                <div class="checkbox">\n                                  <input type="checkbox" value="true" id="showPageOnExit" name="showPageOnExit" />\n                                  <label for="showPageOnExit" class="checkbox__label"></label>\n                                </div>\n                            </li>\n                        </ul>\n                        <div class="pane__heading">General</div>\n                        <ul class="pane__menu">\n                            <li class="pane__item">\n                                <div class="pane__text">\n                                    <p class="pane__option">Left-Handed Mode</p>\n                                    <p class="pane__helper-text">Tap the left side of your screen to advance pages or panels</p>\n                                </div>\n                                <div class="checkbox">\n                                  <input type="checkbox" value="true" id="leftHanded" name="leftHandMode" />\n                                  <label for="leftHanded" class="checkbox__label"></label>\n                                </div>\n                            </li>\n                            <li class="pane__item">\n                                <div class="pane__text">\n                                    <p class="pane__option">Page Change Message</p>\n                                    <p class="pane__helper-text">Shows a message when changing pages</p>\n                                </div>\n                                <div class="checkbox">\n                                  <input type="checkbox" value="true" id="showPageChangeMessage" name="showPageChangeMessage" />\n                                  <label for="showPageChangeMessage" class="checkbox__label"></label>\n                                </div>\n                            </li>\n                            <li class="pane__item" data-open-pane="tutorial">\n                                <div class="pane__text">\n                                    <p class="pane__option">Tutorial</p>\n                                    <p class="pane__helper-text">Toggles the tutorial screens on or off</p>\n                                </div>\n                            </li>\n                            <li class="pane__item" data-open-pane="reset">\n                                <div class="pane__text">\n                                    <p class="pane__option">Reset</p>\n                                    <p class="pane__helper-text">Resets all app settings to their defaults</p>\n                                </div>\n                            </li>\n                            <li class="pane__item" data-open-pane="clearData">\n                                <div class="pane__text">\n                                    <p class="pane__option">Clear Data</p>\n                                    <p class="pane__helper-text">Clears all data, including local storage and all user settings</p>\n                                </div>\n                            </li>\n                        </ul>\n                    </div>\n                </div>\n            </div>\n            <div class="panes__pane pane pane--tutorial pane--modal pane--hidden" data-readable="Tutorial">\n                <div class="pane__container">\n                    <div class="pane__header">\n                        <span>Tutorial</span>\n                    </div>\n                    <div class="pane__content">\n                        <ul class="pane__menu">\n                            <li class="pane__item" data-readable="shown">\n                                <div class="pane__text">\n                                    <p class="pane__option">Show</p>\n                                </div>\n                                <div class="radio">\n                                  <input type="radio" value="true" id="show-tutorial" name="showTutorial" />\n                                  <label for="show-tutorial" class="radio__label"></label>\n                                </div>\n                            </li>\n                            <li class="pane__item" data-readable="hidden">\n                                <div class="pane__text">\n                                    <p class="pane__option">Hide</p>\n                                </div>\n                                <div class="radio">\n                                  <input type="radio" value="false" id="hide-tutorial" name="showTutorial" />\n                                  <label for="hide-tutorial" class="radio__label"></label>\n                                </div>\n                            </li>\n                        </ul>\n                        <div class="pane__actions">\n                            <button class="pane__button" data-close>Cancel</button>\n                        </div>\n                    </div>\n                </div>\n            </div>\n            <div class="panes__pane pane pane--letterboxing pane--modal pane--hidden" data-readable="Letterboxing">\n                <div class="pane__container">\n                    <div class="pane__header">\n                        <span>Letterboxing</span>\n                    </div>\n                    <form class="pane__content">\n                        <ul class="pane__menu">\n                            <li class="pane__item" data-readable="none">\n                                <div class="pane__text">\n                                    <p class="pane__option">No letterboxing</p>\n                                </div>\n                                <div class="radio">\n                                  <input type="radio" value="no" id="no-letterboxing" name="letterboxing" />\n                                  <label for="no-letterboxing" class="radio__label"></label>\n                                </div>\n                            </li>\n                            <li class="pane__item" data-readable="opaque">\n                                <div class="pane__text">\n                                    <p class="pane__option">Opaque letterboxing</p>\n                                </div>\n                                <div class="radio">\n                                  <input type="radio" value="opaque" id="opaque-letterboxing" name="letterboxing" />\n                                  <label for="opaque-letterboxing" class="radio__label"></label>\n                                </div>\n                            </li>\n                            <li class="pane__item" data-readable="solid">\n                                <div class="pane__text">\n                                    <p class="pane__option">Solid letterboxing (default)</p>\n                                </div>\n                                <div class="radio">\n                                  <input type="radio" value="solid" id="solid-letterboxing" name="letterboxing"/>\n                                  <label for="solid-letterboxing" class="radio__label"></label>\n                                </div>\n                            </li>\n                        </ul>\n                        <div class="pane__actions">\n                            <button class="pane__button" data-close>Cancel</button>\n                        </div>\n                    </form>\n                </div>\n            </div>\n            <div class="panes__pane pane pane--animations pane--modal pane--hidden" data-readable="Animate Transitions">\n                <div class="pane__container">\n                    <div class="pane__header">\n                        <span>Animate Transitions</span>\n                    </div>\n                    <form class="pane__content">\n                        <ul class="pane__menu">\n                            <li class="pane__item" data-readable="none">\n                                <div class="pane__text">\n                                    <p class="pane__option">No animation</p>\n                                </div>\n                                <div class="radio">\n                                  <input type="radio" value="0" id="no-animation" name="panelTransitions" />\n                                  <label for="no-animation" class="radio__label"></label>\n                                </div>\n                            </li>\n                            <li class="pane__item" data-readable="slow">\n                                <div class="pane__text">\n                                    <p class="pane__option">Slow animations</p>\n                                </div>\n                                <div class="radio">\n                                  <input type="radio" value="650" id="slow-animation" name="panelTransitions" />\n                                  <label for="slow-animation" class="radio__label"></label>\n                                </div>\n                            </li>\n                            <li class="pane__item" data-readable="fast">\n                                <div class="pane__text">\n                                    <p class="pane__option">Fast animations (default)</p>\n                                </div>\n                                <div class="radio">\n                                  <input type="radio" value="250" id="fast-animation" name="panelTransitions" />\n                                  <label for="fast-animation" class="radio__label"></label>\n                                </div>\n                            </li>\n                        </ul>\n                        <div class="pane__actions">\n                            <button class="pane__button" data-close>Cancel</button>\n                        </div>\n                    </form>\n                </div>\n            </div>\n            <div class="panes__pane pane pane--reset pane--modal pane--hidden">\n                <div class="pane__container">\n                    <div class="pane__header">\n                        <span>Reset Settings</span>\n                    </div>\n                    <div class="pane__content">\n                        <p>Are you sure you want to reset to the default settings?</p>\n                        <div class="pane__actions">\n                            <button class="pane__button" data-close>Cancel</button>\n                            <button class="pane__button" data-close data-reset-settings>Reset</button>\n                        </div>\n                    </div>\n                </div>\n            </div>\n            <div class="panes__pane pane pane--clearData pane--modal pane--hidden">\n                <div class="pane__container">\n                    <div class="pane__header">\n                        <span>Clear Data</span>\n                    </div>\n                    <div class="pane__content">\n                        <p>Are you sure you want to clear all application data?</p>\n                        <div class="pane__actions">\n                            <button class="pane__button" data-close>Cancel</button>\n                            <button class="pane__button" data-close data-clear-data>Clear</button>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n';