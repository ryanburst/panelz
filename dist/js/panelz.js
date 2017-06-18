'use strict';

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

var Book = function (_EventClass) {
    _inherits(Book, _EventClass);

    function Book(config) {
        _classCallCheck(this, Book);

        var _this = _possibleConstructorReturn(this, (Book.__proto__ || Object.getPrototypeOf(Book)).call(this));

        _this.config = config;
        _this.app = config.app;
        _this.pages = [];
        _this.loaded = 0;
        _this.setEventListeners();
        config.pages.forEach(function (pageConfig) {
            pageConfig.app = this.app;
            var page = new Page(this, pageConfig);
            page.on('load', this.onPageLoaded.bind(this));
            this.pages.push(page);
        }.bind(_this));
        return _this;
    }

    _createClass(Book, [{
        key: 'setEventListeners',
        value: function setEventListeners() {
            this.app.on('change:mode', this.onModeChange.bind(this));
            this.app.on('user:skipToPage', this.skipToPage.bind(this));
            this.app.on('user:panend', this.onPanEnd.bind(this));
            this.app.on('user:pageForward', this.pageForward.bind(this));
            this.app.on('user:pageBackward', this.pageBackward.bind(this));
        }
    }, {
        key: 'onPageLoaded',
        value: function onPageLoaded(page) {
            this.loaded += 1;
            if (this.loaded === this.pages.length) {
                this.onBookLoaded();
            }
        }
    }, {
        key: 'onBookLoaded',
        value: function onBookLoaded() {
            var lastRead = this.app.settings.getLocalSetting('page');
            var pageToSet = lastRead ? lastRead : 0;
            this.setCurrentPage(this.pages[pageToSet]);

            // Zoom to panel on start
            if (this.app.mode === PANEL_ZOOM_MODE && this.currentPage.hasPanels()) {
                var panel = false;
                if (this.app.settings.getLocalSetting('panel') !== false) {
                    this.currentPage.zoomToPanel(this.currentPage.panels[this.app.settings.getLocalSetting('panel')]);
                } else if (!this.currentPage.SHOW_PAGE_ON_ENTER) {
                    console.log('show first');
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
            this.trigger('load:book', this);
        }
    }, {
        key: 'onModeChange',
        value: function onModeChange(mode) {
            if (mode === PAGE_MODE) {
                this.setForPageMode();
            } else {
                this.setForPanelZoomMode();
            }
        }
    }, {
        key: 'onPanEnd',
        value: function onPanEnd(ev) {
            this.pages.forEach(function (page) {
                if (page.shouldBeSetAsCurrent(ev)) {
                    this.setCurrentPage(page);
                }
            }.bind(this));
            this.snapPagesToCurrent();
        }
    }, {
        key: 'buildPageIndex',
        value: function buildPageIndex() {
            this.pages.forEach(function (page) {
                var $page = $('.page-list__page--template').clone().removeClass('page-list__page--template');
                $page.attr('data-skip-to-page', page.index + 1);
                $page.find('.page-list__image').attr('src', page.config.src);
                $page.find('.page-list__number').text(page.index + 1);
                $('.page-list').append($page);
            }.bind(this));
        }
    }, {
        key: 'setCurrentPage',
        value: function setCurrentPage(page) {
            if (this.currentPage && this.currentPage.panels.length) {
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

            this.trigger('pageSet', page);

            this.app.settings.remember('page', page.index);
        }
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
    }, {
        key: 'setForPanelZoomMode',
        value: function setForPanelZoomMode() {
            console.log('Set for Panel Zoom mode');
            this.pages.forEach(function (page) {
                page.$container.css('left', 0).css('opacity', 0);
            }.bind(this));
            this.currentPage.$container.css('opacity', 1);

            if (this.currentPage.panels.length) {
                this.currentPage.zoomToPanel(this.currentPage.getFirstPanel());
            }
        }
    }, {
        key: 'getNextPage',
        value: function getNextPage() {
            return this.pages[this.currentPage.index + 1];
        }
    }, {
        key: 'getPreviousPage',
        value: function getPreviousPage() {
            return this.pages[this.currentPage.index - 1];
        }
    }, {
        key: 'snapPagesToCurrent',
        value: function snapPagesToCurrent() {
            var amount = -this.currentPage.left;
            this.pages.forEach(function (page) {
                page.snapTo(amount);
            });
        }
    }, {
        key: 'pageForward',
        value: function pageForward() {
            if (this.app.mode === PANEL_ZOOM_MODE && this.currentPage.panels.length) {
                if (this.currentPage.hasNextPanel()) {
                    console.log('Zoom to next panel');
                    this.currentPage.zoomToPanel(this.currentPage.getNextPanel());
                    return true;
                }
                if (this.currentPage.currentPanel !== false && !this.currentPage.hasNextPanel()) {
                    console.log('Zoom out');
                    this.currentPage.zoomOut();
                    this.currentPage.previousPanel = this.currentPage.getLastPanel();
                    if (this.app.settings.get('showPageOnExit')) {
                        return true;
                    }
                }
            }

            if (this.currentPage.isLast) {
                return false;
            }

            this.setCurrentPage(this.getNextPage());
            if (this.app.mode === PAGE_MODE) {
                this.snapPagesToCurrent();
            }
            this.currentPage.onPageEnterForward();
            return true;
        }
    }, {
        key: 'pageBackward',
        value: function pageBackward() {
            if (this.app.mode === PANEL_ZOOM_MODE && this.currentPage.panels.length) {
                if (this.currentPage.hasPreviousPanel()) {
                    console.log('Zoom to last panel');
                    this.currentPage.zoomToPanel(this.currentPage.getPreviousPanel());
                    return true;
                }
                if (this.currentPage.currentPanel !== false && !this.currentPage.hasPreviousPanel()) {
                    console.log('Zoom out');
                    this.currentPage.zoomOut();
                    this.currentPage.nextPanel = this.currentPage.getFirstPanel();
                    if (this.app.settings.get('showPageOnEnter')) {
                        return true;
                    }
                }
            }

            if (this.currentPage.isFirst) {
                return false;
            }

            this.setCurrentPage(this.getPreviousPage());
            if (this.app.mode === PAGE_MODE) {
                this.snapPagesToCurrent();
            }
            this.currentPage.onPageEnterBackward();
        }
    }, {
        key: 'skipToPage',
        value: function skipToPage(pageNum) {
            console.log('Skip to', pageNum);
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
    }]);

    return Book;
}(EventClass);

var Menu = function (_EventClass2) {
    _inherits(Menu, _EventClass2);

    function Menu(config) {
        _classCallCheck(this, Menu);

        var _this2 = _possibleConstructorReturn(this, (Menu.__proto__ || Object.getPrototypeOf(Menu)).call(this));

        _this2.app = config.app;
        _this2.$menu = $('.viewport__menu');

        _this2.setEventListeners();

        if (_this2.app.mode === PANEL_ZOOM_MODE) {
            _this2.activateOption('panel-zoom');
        }

        return _this2;
    }

    _createClass(Menu, [{
        key: 'setEventListeners',
        value: function setEventListeners() {
            $('body').on('touchend click', '.menu__option--panel-zoom', this.onPanelZoomToggleClick.bind(this));
            this.app.on('change:mode', this.onModeChange.bind(this));
        }
    }, {
        key: 'activateOption',
        value: function activateOption(option) {
            this.$menu.find('.menu__option--' + option).addClass('menu__option--active');
        }
    }, {
        key: 'deactivateOption',
        value: function deactivateOption(option) {
            this.$menu.find('.menu__option--' + option).removeClass('menu__option--active');
        }
    }, {
        key: 'onPanelZoomToggleClick',
        value: function onPanelZoomToggleClick(e) {
            e.preventDefault();
            this.app.switchModes();
        }
    }, {
        key: 'onModeChange',
        value: function onModeChange(mode) {
            if (mode === PAGE_MODE) {
                this.deactivateOption('panel-zoom');
            } else {
                this.activateOption('panel-zoom');
            }
        }
    }]);

    return Menu;
}(EventClass);

;

var Page = function (_EventClass3) {
    _inherits(Page, _EventClass3);

    function Page(Book, config) {
        _classCallCheck(this, Page);

        var _this3 = _possibleConstructorReturn(this, (Page.__proto__ || Object.getPrototypeOf(Page)).call(this));

        _this3.config = config;
        _this3.app = config.app;
        _this3.book = Book;
        _this3.index = config.index;
        _this3.isFirst = config.isFirst;
        _this3.isLast = config.isLast;
        _this3.isCurrentPage = false;
        _this3.scale = 1;
        _this3.lastScale = 1;
        _this3.panels = [];
        _this3.PANEL_ANIMATION_SPEED = _this3.app.settings.get('panelTransitions');
        _this3.SHOW_PAGE_ON_ENTER = _this3.app.settings.get('showPageOnEnter');
        _this3.SHOW_PAGE_ON_EXIT = _this3.app.settings.get('showPageOnExit');
        _this3.TURN_THRESHHOLD = 30;
        _this3.currentPanel = false;
        _this3.previousPanel = false;
        _this3.nextPanel = false;
        _this3.lastPanelSeen = false;
        _this3.loadSrc(config.src);
        config.panels.forEach(function (panel, index) {
            this.panels.push(new Panel(this, panel, index));
        }.bind(_this3));
        _this3.app.settings.on('change:panelTransitions', function (data) {
            this.PANEL_ANIMATION_SPEED = data.value;
        }.bind(_this3));
        _this3.app.settings.on('change:showPageOnEnter', function (data) {
            this.SHOW_PAGE_ON_ENTER = data.value;
        }.bind(_this3));
        _this3.app.settings.on('change:showPageOnExit', function (data) {
            this.SHOW_PAGE_ON_EXIT = data.value;
        }.bind(_this3));
        _this3.app.on('resize', _this3.setPosition.bind(_this3));
        _this3.book.on('pageSet', function (page) {
            this.isCurrentPage = page.index === this.index;
        }.bind(_this3));
        return _this3;
    }

    _createClass(Page, [{
        key: 'loadSrc',
        value: function loadSrc(src) {
            $('<img src="' + src + '" />').on('load', this.onPageLoaded.bind(this));
        }
    }, {
        key: 'onPageLoaded',
        value: function onPageLoaded(e) {
            this.$container = this.app.addPageMarkupToViewPort($('<div />').addClass('book__page page'));
            this.$element = $(e.currentTarget).addClass('page__image').appendTo(this.$container);
            this.originalWidth = this.$element.width();
            this.originalHeight = this.$element.height();
            this.centerInViewPort();

            this.app.on("user:panstart", function (ev) {
                this.originalLeft = parseInt(this.$container.css("left"), 10);
            }.bind(this));
            this.app.on("user:pan", function (ev) {
                // Stop vertical pan flick
                if (ev.offsetDirection === 8) {
                    return true;
                }
                this.left = this.originalLeft + ev.deltaX;
                this.$container.css({
                    "left": this.left
                });
            }.bind(this));
            this.app.on("user:pinch", function (e) {
                if (!this.isCurrentPage) {
                    return;
                }
                //console.log(e.e);

                this.scale = e.e.scale - (1 - this.lastScale);
                this.$element.css({
                    transform: 'scale(' + this.scale + ')'
                    //width: this.getFullWidth() * e.e.scale,
                    //"margin-left": -this.getLeft() * e.e.scale,
                    //height: this.getFullHeight() * e.e.scale,
                    //"margin-top": -this.getTop() * e.e.scale
                });
            }.bind(this));

            this.app.on("user:pinchend", function (e) {
                //console.log('pinchend',this.scale,this.scale < 1);
                if (this.scale < 1) {
                    this.scale = 1;
                    this.$element.addClass('page__image--transition').css({
                        transform: 'scale(' + this.scale + ')'
                    });
                    setTimeout(function () {
                        this.$element.removeClass('page__image--transition');
                    }.bind(this), 260);
                }
                if (this.scale > 3) {
                    this.scale = 3;
                }
                this.lastScale = this.scale;
            }.bind(this));

            this.trigger('load:page', this);
        }
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
    }, {
        key: 'setPosition',
        value: function setPosition() {
            this.centerInViewPort(false);
            this.setLeftPosition(this.app.book.currentPage.index);
            if (this.app.mode === PANEL_ZOOM_MODE && this.currentPanel) {
                this.zoomToPanel(this.currentPanel, false);
            }
        }
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
                height: height
            }, {
                duration: animate ? this.PANEL_ANIMATION_SPEED : 0,
                easing: 'easeOutSine'
            });
        }
    }, {
        key: 'shouldBeSetAsCurrent',
        value: function shouldBeSetAsCurrent(env) {
            if (this.isFirst && this.left > 0) {
                return true;
            }
            if (this.isLast && this.left < 0) {
                return true;
            }
            if (env.deltaX < 0 && this.left > 0 && this.left < this.getFullWidth() - this.TURN_THRESHHOLD) {
                return true;
            }
            if (env.deltaX > 0 && this.left + this.getFullWidth() > this.TURN_THRESHHOLD && this.left + this.getFullWidth() < this.getFullWidth()) {
                return true;
            }
            return false;
        }
    }, {
        key: 'findPanelWithPos',
        value: function findPanelWithPos(x, y) {
            var panel = false;
            if (this.panels.length) {
                this.panels.forEach(function (panel) {
                    //var convertedX = this.
                }.bind(this));
            }
        }
    }, {
        key: 'snapTo',
        value: function snapTo(amount) {
            this.left = this.left + amount;
            this.$container.animate({
                left: this.left
            }, {
                duration: 250,
                easing: 'easeOutSine'
            });
        }
    }, {
        key: 'setLeftPosition',
        value: function setLeftPosition(offset) {
            if (typeof offset === 'undefined') {
                offset = 0;
            }
            this.left = (this.index - offset) * this.app.getViewPortSize().width;
            this.$container.css('left', this.left);
        }
    }, {
        key: 'hasPanels',
        value: function hasPanels() {
            return this.panels.length !== 0;
        }
    }, {
        key: 'setCurrentPanel',
        value: function setCurrentPanel(panel) {
            this.lastPanelSeen = this.currentPanel;
            this.currentPanel = panel;

            this.nextPanel = panel !== false ? panel.nextPanel !== false ? this.panels[panel.nextPanel] : false : false;

            this.previousPanel = panel !== false ? panel.previousPanel !== false ? this.panels[panel.previousPanel] : false : false;
        }
    }, {
        key: 'getLastPanelSeen',
        value: function getLastPanelSeen() {
            return this.lastPanelSeen;
        }
    }, {
        key: 'hasPreviousPanel',
        value: function hasPreviousPanel() {
            return this.previousPanel !== false;
        }
    }, {
        key: 'getPreviousPanel',
        value: function getPreviousPanel() {
            return this.previousPanel;
        }
    }, {
        key: 'getLastPanel',
        value: function getLastPanel() {
            return this.panels[this.panels.length - 1];
        }
    }, {
        key: 'hasNextPanel',
        value: function hasNextPanel() {
            return this.nextPanel !== false;
        }
    }, {
        key: 'getNextPanel',
        value: function getNextPanel() {
            return this.nextPanel;
        }
    }, {
        key: 'getFirstPanel',
        value: function getFirstPanel() {
            return this.panels.length ? this.panels[0] : false;
        }
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
                top: -top + (viewPortHeight - height) / 2,
                left: -left + (viewPortWidth - width) / 2,
                width: pageWidth,
                height: pageHeight
            }, {
                duration: animate ? this.PANEL_ANIMATION_SPEED : 0,
                easing: 'easeOutSine'
            });

            this.app.setLetterBoxing(viewPortWidth - width, viewPortHeight - height, animate);

            this.setCurrentPanel(panel);
            this.app.settings.remember('panel', panel.index);
        }
    }, {
        key: 'zoomOut',
        value: function zoomOut() {
            this.setCurrentPanel(false);
            this.centerInViewPort(true);
            this.app.setLetterBoxing(0, 0);
            this.app.settings.remember('panel', false);
        }
    }, {
        key: 'getOriginalWidth',
        value: function getOriginalWidth() {
            return this.originalWidth;
        }
    }, {
        key: 'getOriginalHeight',
        value: function getOriginalHeight() {
            return this.originalHeight;
        }
    }, {
        key: 'getTop',
        value: function getTop() {
            return parseInt(this.$element.css('top'));
        }
    }, {
        key: 'getLeft',
        value: function getLeft() {
            return parseInt(this.$element.css('left'));
        }
    }, {
        key: 'getWidth',
        value: function getWidth() {
            return this.$element.width();
        }
    }, {
        key: 'getFullWidth',
        value: function getFullWidth() {
            return this.$container.width();
        }
    }, {
        key: 'getHeight',
        value: function getHeight() {
            return this.$element.height();
        }
    }, {
        key: 'getFullHeight',
        value: function getFullHeight() {
            return this.$container.height();
        }
    }]);

    return Page;
}(EventClass);

var Panel = function () {
    function Panel(page, config, index) {
        _classCallCheck(this, Panel);

        this.page = page;
        this.index = index;
        this.x = config.x;
        this.y = config.y;
        this.nextPanel = this.page.config.panels[index + 1] ? index + 1 : false;
        this.previousPanel = this.page.config.panels[index - 1] ? index - 1 : false;
        this.width = config.width;
        this.height = config.height;
    }

    _createClass(Panel, [{
        key: 'getWidth',
        value: function getWidth() {
            return this.width;
        }
    }, {
        key: 'getHeight',
        value: function getHeight() {
            return this.height;
        }
    }, {
        key: 'getLeftPos',
        value: function getLeftPos() {
            return this.x;
        }
    }, {
        key: 'getTopPos',
        value: function getTopPos() {
            return this.y;
        }
    }]);

    return Panel;
}();

var Settings = function (_EventClass4) {
    _inherits(Settings, _EventClass4);

    function Settings() {
        _classCallCheck(this, Settings);

        var _this4 = _possibleConstructorReturn(this, (Settings.__proto__ || Object.getPrototypeOf(Settings)).call(this));

        _this4.DEFAULTS = {
            leftHandMode: false,
            startInPanelZoom: false,
            panelTransitions: 250,
            letterboxing: 'solid',
            showPageOnEnter: true,
            showPageOnExit: true,
            showTutorial: true
        };

        _this4.config = {};

        _this4.localSettings = _this4.getLocalSettings();
        _this4.loadConfig($.extend({}, _this4.DEFAULTS, _this4.getUserSettings()));
        _this4.setFields();
        _this4.setEventListeners();
        return _this4;
    }

    _createClass(Settings, [{
        key: 'setEventListeners',
        value: function setEventListeners() {
            $('[name="' + this.keys().join('"],[name="') + '"]').on('change', this.onFieldChange.bind(this));
            $('body').on('click', '[data-reset-settings]', this.reset.bind(this));
            $('body').on('click', '[data-clear-data]', this.clear.bind(this));
        }
    }, {
        key: 'loadConfig',
        value: function loadConfig(config) {
            Object.keys(config).forEach(function (setting) {
                this.set(setting, config[setting]);
            }.bind(this));
        }
    }, {
        key: 'setFields',
        value: function setFields() {
            this.keys().forEach(this.setField.bind(this));
        }
    }, {
        key: 'setField',
        value: function setField(setting) {
            var $fields = $('[name="' + setting + '"]');
            var value = this.get(setting);
            $fields.each(function (index, field) {
                var $this = $(field);
                var fieldVal = $this.val();
                if ($this.is(':checkbox')) {
                    $this.prop('checked', !!value);
                } else if ($this.is(':radio') && this.normalizeValue(fieldVal) == value) {
                    $this.prop('checked', true);
                }
            }.bind(this));
        }
    }, {
        key: 'normalizeValue',
        value: function normalizeValue(val) {
            val = isNaN(parseFloat(val)) ? val : parseInt(val);
            val = val === 'false' ? false : val;
            val = val === 'true' ? true : val;

            return val;
        }
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
        }
    }, {
        key: 'reset',
        value: function reset() {
            this.loadConfig(this.DEFAULTS);
            this.setFields();
        }
    }, {
        key: 'clear',
        value: function clear() {
            this.localSettings = {};
            localStorage.removeItem('panelz');
            this.reset();
        }
    }, {
        key: 'get',
        value: function get(setting) {
            return this.config[setting];
        }
    }, {
        key: 'set',
        value: function set(setting, val) {
            var oldVal = this.get(setting);
            this.config[setting] = val;
            this.setUserSettings();
            this.trigger('change:' + setting, {
                setting: setting,
                value: val,
                oldValue: oldVal,
                settings: this.config
            });
        }
    }, {
        key: 'keys',
        value: function keys() {
            return Object.keys(this.config);
        }
    }, {
        key: 'getLocalSettings',
        value: function getLocalSettings() {
            try {
                var localSettings = JSON.parse(localStorage.getItem('panelz'));
                console.log('Local Settings:', localSettings);
                return localSettings ? localSettings : {};
            } catch (Exception) {
                return {};
            }
        }
    }, {
        key: 'setLocalSettings',
        value: function setLocalSettings() {
            localStorage.setItem('panelz', JSON.stringify(this.localSettings));
        }
    }, {
        key: 'remember',
        value: function remember(key, val) {
            this.localSettings[key] = val;
            this.setLocalSettings();
        }
    }, {
        key: 'getLocalSetting',
        value: function getLocalSetting(key) {
            return this.localSettings[key];
        }
    }, {
        key: 'getUserSettings',
        value: function getUserSettings() {
            return this.getLocalSetting('settings') ? this.getLocalSetting('settings') : {};
        }
    }, {
        key: 'setUserSettings',
        value: function setUserSettings() {
            this.remember('settings', this.config);
        }
    }]);

    return Settings;
}(EventClass);

var Tutorial = function (_EventClass5) {
    _inherits(Tutorial, _EventClass5);

    function Tutorial(settings) {
        _classCallCheck(this, Tutorial);

        var _this5 = _possibleConstructorReturn(this, (Tutorial.__proto__ || Object.getPrototypeOf(Tutorial)).call(this));

        _this5.settings = settings;

        _this5.interactable = new Hammer.Manager($('.tutorial')[0]);
        _this5.interactable.add(new Hammer.Swipe());

        _this5.addEventListeners();

        if (_this5.settings.get('showTutorial')) {
            _this5.show();
        }
        return _this5;
    }

    _createClass(Tutorial, [{
        key: 'addEventListeners',
        value: function addEventListeners() {
            $('body').on('click', '[data-tutorial-next]', this.next.bind(this));
            $('body').on('click', '[data-tutorial-back]', this.back.bind(this));
            $('body').on('click', '[data-tutorial-done]', this.done.bind(this));

            this.settings.on('change:showTutorial', this.toggle.bind(this));

            this.interactable.on('swipeleft', this.next.bind(this));
            this.interactable.on('swiperight', this.back.bind(this));
        }
    }, {
        key: 'next',
        value: function next(e) {
            var $panel = $('.tutorial__panel:not(.tutorial__panel--hidden)');
            if ($panel.next().length) {
                $panel.addClass('tutorial__panel--hidden');
                $panel.next().removeClass('tutorial__panel--hidden');
            }
        }
    }, {
        key: 'back',
        value: function back(e) {
            var $panel = $('.tutorial__panel:not(.tutorial__panel--hidden)');
            if ($panel.prev().length) {
                $panel.addClass('tutorial__panel--hidden');
                $panel.prev().removeClass('tutorial__panel--hidden');
            }
        }
    }, {
        key: 'done',
        value: function done() {
            this.settings.set('showTutorial', false);
            this.settings.setField('showTutorial');
            this.trigger('done');
        }
    }, {
        key: 'toggle',
        value: function toggle(ev) {
            if (ev.value === true) {
                this.show();
            } else {
                this.hide();
            }
        }
    }, {
        key: 'show',
        value: function show() {
            $('.tutorial__panel').addClass('tutorial__panel--hidden').first().removeClass('tutorial__panel--hidden');
            $('.tutorial').removeClass('tutorial--hidden');
        }
    }, {
        key: 'hide',
        value: function hide() {
            $('.tutorial').addClass('tutorial--hidden');
        }
    }]);

    return Tutorial;
}(EventClass);

var ViewPort = function (_EventClass6) {
    _inherits(ViewPort, _EventClass6);

    function ViewPort(config) {
        _classCallCheck(this, ViewPort);

        var _this6 = _possibleConstructorReturn(this, (ViewPort.__proto__ || Object.getPrototypeOf(ViewPort)).call(this));

        _this6.app = config.app;
        _this6.$element = $('.viewport');
        _this6.$container = $(window);
        _this6.$menu = $('.viewport__menu');
        _this6.$horizontalLetterBox = $('.letterbox__horizontal');
        _this6.$verticalLetterBox = $('.letterbox__vertical');

        _this6.PAGE_TURN_THRESHOLD = 0.25;
        _this6.LETTERBOX_STYLE = _this6.app.settings.get('letterboxing');
        _this6.LEFT_HAND_MODE = _this6.app.settings.get('leftHandMode');

        _this6.setEventListeners();
        _this6.setViewPortSize();
        _this6.setTapThresholds();

        _this6.interactable = new Hammer.Manager(_this6.$element.find('.viewport__interactable')[0]);

        //var pan = new Hammer.Pan({threshold: 20, enable: this.canRecognizePan.bind(this)});
        var pinch = new Hammer.Pinch({ threshold: 0, enable: true, domEvents: true });
        //var singletap = new Hammer.Tap({threshold: 2, posThreshold: 150});
        //var doubletap = new Hammer.Tap({event: 'doubletap', taps: 2 });
        //var swipe = new Hammer.Swipe({enable: this.canRecognizeSwipe.bind(this)});

        _this6.interactable.add([/*pan,singletap,doubletap,swipe,*/pinch]);

        //singletap.requireFailure(doubletap);
        //pan.requireFailure(pinch);

        _this6.interactable.get('pinch').set({ enable: true });

        $('body').on('touchend', function () {
            this.$menu.removeClass('viewport__menu--was-shown');
            if (this.$menu.hasClass('viewport__menu--active')) {
                setTimeout(function () {
                    this.$menu.removeClass('viewport__menu--active').addClass('viewport__menu--was-shown');
                }.bind(this), 500);
            }
        }.bind(_this6));

        _this6.app.tutorial.on('done', _this6.onTutorialDone.bind(_this6));
        _this6.app.on('load:book', _this6.onBookLoaded.bind(_this6));

        $('body').on('click', '[data-open-pane]', function (e) {
            $('.pane--' + $(this).attr('data-open-pane')).removeClass('pane--hidden');
        });
        $('body').on('click', '.pane__item', function (e) {
            if (!$(e.target).is(':radio, :checkbox, .checkbox__label')) {
                var $input = $(this).find(':radio, :checkbox');
                var checked = $input.is(':radio') ? true : !$input.prop('checked');
                $input.prop('checked', checked).trigger('change');
                $input.closest('.pane--modal').find('[data-close]').trigger('click');
            }
        });

        $('body').on('click', '[data-skip-to-page]', function (e) {
            var $this = $(e.currentTarget);
            var page = $this.attr('data-skip-to-page');
            $this.closest('.pane').find('[data-close]').trigger('click');
            this.app.trigger('user:skipToPage', page);
        }.bind(_this6));

        $('body').on('click', '[data-close]', function (e) {
            var $this = $(this);
            $this.closest('.pane').addClass('pane--hidden');
            $this.closest('.pane').find('.pane__content')[0].scrollTop = 0;
        });
        return _this6;
    }

    _createClass(ViewPort, [{
        key: 'onBookLoaded',
        value: function onBookLoaded() {
            console.log('Book loaded');
            this.interactable.on('panstart', function (ev) {
                this.app.trigger('user:panstart', ev);
            }.bind(this));
            this.interactable.on('pan', function (ev) {
                this.app.trigger('user:pan', ev);
            }.bind(this));
            this.interactable.on('panend', function (ev) {
                this.app.trigger('user:panend', ev);
            }.bind(this));
            this.interactable.on('pinch', function (ev) {
                this.app.trigger('user:pinch', { e: ev });
            }.bind(this));
            this.interactable.on('pinchin', function (ev) {
                this.app.trigger('user:pinchin', { e: ev });
            }.bind(this));
            this.interactable.on('pinchout', function (ev) {
                this.app.trigger('user:pinchout', { e: ev });
            }.bind(this));
            this.interactable.on('pinchend', function (ev) {
                this.app.trigger('user:pinchend', { e: ev });
            }.bind(this));
            this.interactable.on("tap", function (ev) {
                if (ev.tapCount >= 2) {
                    return this.app.switchModes();
                }
                var cmd = this.findTapZone(ev.center.x, ev.center.y);
                if (cmd === PAGE_FORWARD) {
                    this.app.trigger('user:pageForward');
                } else if (cmd === PAGE_BACK) {
                    this.app.trigger('user:pageBackward');
                } else if (cmd === TOGGLE_MAIN_MENU) {
                    if (!this.$menu.hasClass('viewport__menu--was-shown')) {
                        this.$menu.addClass('viewport__menu--active');
                    }
                }
            }.bind(this));
            this.interactable.on("swipeleft", function (ev) {
                if (this.app.mode === PANEL_ZOOM_MODE) {
                    this.app.trigger('user:pageForward');
                }
            }.bind(this));
            this.interactable.on("swiperight", function (ev) {
                if (this.app.mode === PANEL_ZOOM_MODE) {
                    this.app.trigger('user:pageBackward');
                }
            }.bind(this));

            this.app.settings.on('change:letterboxing', function (data) {
                this.LETTERBOX_STYLE = data.value;
                this.setLetterBoxStyle();
            }.bind(this));

            this.app.settings.on('change:leftHandMode', function (data) {
                this.LEFT_HAND_MODE = data.value;
                this.setTapThresholds();
            }.bind(this));

            $(window).on('resize orientationchange', this.onResize.bind(this));
        }
    }, {
        key: 'onTutorialDone',
        value: function onTutorialDone() {
            this.$menu.addClass('viewport__menu--active');
            this.message('The tutorial is always available in the settings menu at the bottom right.', 5000);
        }
    }, {
        key: 'canRecognizePan',
        value: function canRecognizePan(rec, input) {
            return this.app.mode === PAGE_MODE;
        }
    }, {
        key: 'canRecognizeSwipe',
        value: function canRecognizeSwipe(rec, input) {
            return this.app.mode === PANEL_ZOOM_MODE;
        }
    }, {
        key: 'setContainer',
        value: function setContainer($container) {
            this.$container = $container;
        }
    }, {
        key: 'setEventListeners',
        value: function setEventListeners() {
            this.$container.on('resize', this.setViewPortSize.bind(this));
        }
    }, {
        key: 'setViewPortSize',
        value: function setViewPortSize(e) {
            this.$element.width(this.$container.outerWidth());
            this.$element.height(this.$container.outerHeight());
        }
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
    }, {
        key: 'setLetterBoxing',
        value: function setLetterBoxing(width, height, animate) {
            var horizSize = height > 0 ? height / 2 : 0;
            var vertSize = width > 0 ? width / 2 : 0;
            var speed = this.app.settings.get('panelTransitions');
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
    }, {
        key: 'setLetterBoxStyle',
        value: function setLetterBoxStyle() {
            var opacity = this.LETTERBOX_STYLE === 'no' ? 0 : this.LETTERBOX_STYLE === 'opaque' ? 0.75 : 1;

            this.$horizontalLetterBox.css('opacity', opacity);
            this.$verticalLetterBox.css('opacity', opacity);
        }
    }, {
        key: 'getWidth',
        value: function getWidth() {
            return this.$element.outerWidth();
        }
    }, {
        key: 'getHeight',
        value: function getHeight() {
            return this.$element.outerHeight();
        }
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
    }, {
        key: 'onResize',
        value: function onResize(e) {
            this.setViewPortSize();
            this.setTapThresholds();
            this.app.trigger('resize', e);
        }
    }]);

    return ViewPort;
}(EventClass);

;

var PANELZ_MARKUP = '\n    <div class="tutorial tutorial--hidden">\n        <div class="tutorial__panel">\n            <div class="tutorial__cta">\n                <button class="tutorial__button tutorial__button--skip" data-tutorial-done>Skip</button>\n            </div>\n            <div class="tutorial__content">\n                <div class="heading heading--lg">Welcome to Panelz</div>\n                <div class="heading heading--secondary">Here are some terms you might not know to get you started:</div>\n                <p><strong>Panel Zoom</strong> - This mode will guide you along your comic, panel by panel.</p>\n                <p><strong>Page Mode</strong> - View the full page and all of its panels as you read.</p>\n            </div>\n            <div class="tutorial__cta">\n                <button class="tutorial__button tutorial__button--back" style="visibility: hidden">Back</button>\n                <ul class="tutorial__progress">\n                    <li class="tutorial__progress-step tutorial__progress-step--active"></li>\n                    <li class="tutorial__progress-step"></li>\n                    <li class="tutorial__progress-step"></li>\n                </ul>\n                <button class="tutorial__button" data-tutorial-next>Next</button>\n            </div>\n        </div>\n        <div class="tutorial__panel tutorial__panel--hidden">\n            <div class="tutorial__cta">\n                <button class="tutorial__button tutorial__button--skip" data-tutorial-done>Skip</button>\n            </div>\n            <div class="tutorial__content">\n                <div class="tutorial__image">\n                    <img src="../dist/images/tutorial-taps.png" />\n                </div>\n                <p><strong>Tap Left</strong> - Navigates backwards one panel or page.</p>\n                <p><strong>Tap Right</strong> - Navigates forward one panel or page.</p>\n                <p><strong>Tap Center</strong> - Open or close the menu options.</p>\n                <p><strong>Double Tap (anywhere)</strong> - Switch between page and Panel Zoom mode.</p>\n            </div>\n            <div class="tutorial__cta">\n                <button class="tutorial__button tutorial__button--back" data-tutorial-back>Back</button>\n                <ul class="tutorial__progress">\n                    <li class="tutorial__progress-step"></li>\n                    <li class="tutorial__progress-step tutorial__progress-step--active"></li>\n                    <li class="tutorial__progress-step"></li>\n                </ul>\n                <button class="tutorial__button" data-tutorial-next>Next</button>\n            </div>\n        </div>\n        <div class="tutorial__panel tutorial__panel--hidden">\n            <div class="tutorial__content">\n                <div class="heading heading--secondary">You can also swipe to navigate!</div>\n                <div class="tutorial__image">\n                    <img src="../dist/images/tutorial-swipes.png" />\n                </div>\n                <p><strong>Swipe Left</strong> - Navigates forward one panel or page.</p>\n                <p><strong>Swipe Right</strong> - Navigates backward one panel or page.</p>\n            </div>\n            <div class="tutorial__cta">\n                <button class="tutorial__button tutorial__button--back" data-tutorial-back>Back</button>\n                <ul class="tutorial__progress">\n                    <li class="tutorial__progress-step"></li>\n                    <li class="tutorial__progress-step"></li>\n                    <li class="tutorial__progress-step tutorial__progress-step--active"></li>\n                </ul>\n                <button class="tutorial__button" data-tutorial-done>Done</button>\n            </div>\n        </div>\n    </div>\n    <div class="viewport">\n        <div class="viewport__interactable"></div>\n        <div class="letterbox">\n            <div class="letterbox__horizontal letterbox__horizontal--top"></div>\n            <div class="letterbox__horizontal letterbox__horizontal--bottom"></div>\n            <div class="letterbox__vertical letterbox__vertical--left"></div>\n            <div class="letterbox__vertical letterbox__vertical--right"></div>\n        </div>\n        <div class="viewport__message viewport__message--hide message">\n            <div class="message__text">Panel Zoom mode activated.</div>\n        </div>\n        <ul class="viewport__menu menu">\n            <li class="menu__list-item">\n                <div href="#" class="menu__option" data-open-pane="pages">\n                    <i class="fa fa-clone fa-flip-horizontal menu__icon" aria-hidden="true"></i>\n                    <span class="menu__label">Pages</span>\n                </div>\n            </li>\n            <li class="menu__list-item">\n                <div class="menu__option menu__option--panel-zoom">\n                    Panel<br />Zoom\n                </div>\n            </li>\n            <li class="menu__list-item">\n                <div class="menu__option" data-open-pane="settings">\n                    <i class="fa fa-sliders menu__icon" aria-hidden="true"></i>\n                    <span class="menu__label">Settings</span>\n                </div>\n            </li>\n        </ul>\n        <div class="panes">\n            <div class="panes__pane pane pane--pages pane--hidden">\n                <div class="pane__container">\n                    <div class="pane__header">\n                        <span>Pages</span>\n                        <span class="pane__close" data-close>\n                            <i class="fa fa-times" aria-hidden="true"></i>\n                        </span>\n                    </div>\n                    <div class="pane__content">\n                        <ul class="page-list">\n                            <li class="page-list__page page-list__page--template" data-skip-to-page="">\n                                <img src="" class="page-list__image" />\n                                <span class="page-list__number"></span>\n                            </li>\n                        </ul>\n                    </div>\n                </div>\n            </div>\n            <div class="panes__pane pane pane--settings pane--full pane--hidden">\n                <div class="pane__container">\n                    <div class="pane__header">\n                        <span>Settings</span>\n                        <span class="pane__close" data-close>\n                            <i class="fa fa-times" aria-hidden="true"></i>\n                        </span>\n                    </div>\n                    <div class="pane__content">\n                        <div class="pane__heading">Panel Zoom</div>\n                        <ul class="pane__menu">\n                            <li class="pane__item">\n                                <div class="pane__text">\n                                    <p class="pane__option">Start new books in Panel Zoom Mode</p>\n                                </div>\n                                <div class="checkbox">\n                                  <input type="checkbox" value="true" id="startInPanelZoom" name="startInPanelZoom" />\n                                  <label for="startInPanelZoom" class="checkbox__label"></label>\n                                </div>\n                            </li>\n                            <li class="pane__item" data-open-pane="animations">\n                                <div class="pane__text">\n                                    <p class="pane__option">Animate Transitions</p>\n                                    <p class="pane__helper-text">Animate panel-to-panel transitions in Panel Zoom mode</p>\n                                </div>\n                            </li>\n                            <li class="pane__item" data-open-pane="letterboxing">\n                                <div class="pane__text">\n                                    <p class="pane__option">Letterboxing</p>\n                                    <p class="pane__helper-text">Use bars to mask content outside of the current panel</p>\n                                </div>\n                            </li>\n                            <li class="pane__item">\n                                <div class="pane__text">\n                                    <p class="pane__option">Show page on enter</p>\n                                    <p class="pane__helper-text">Show full page on transitioning to a new page</p>\n                                </div>\n                                <div class="checkbox">\n                                  <input type="checkbox" value="true" id="showPageOnEnter" name="showPageOnEnter" />\n                                  <label for="showPageOnEnter" class="checkbox__label"></label>\n                                </div>\n                            </li>\n                            <li class="pane__item">\n                                <div class="pane__text">\n                                    <p class="pane__option">Show page on exit</p>\n                                    <p class="pane__helper-text">Show full page before transitioning to a new page</p>\n                                </div>\n                                <div class="checkbox">\n                                  <input type="checkbox" value="true" id="showPageOnExit" name="showPageOnExit" />\n                                  <label for="showPageOnExit" class="checkbox__label"></label>\n                                </div>\n                            </li>\n                        </ul>\n                        <div class="pane__heading">General</div>\n                        <ul class="pane__menu">\n                            <li class="pane__item">\n                                <div class="pane__text">\n                                    <p class="pane__option">Left-Handed Mode</p>\n                                    <p class="pane__helper-text">Tap the left side of your screen to advance pages or panels</p>\n                                </div>\n                                <div class="checkbox">\n                                  <input type="checkbox" value="true" id="leftHanded" name="leftHandMode" />\n                                  <label for="leftHanded" class="checkbox__label"></label>\n                                </div>\n                            </li>\n                            <li class="pane__item" data-open-pane="tutorial">\n                                <div class="pane__text">\n                                    <p class="pane__option">Tutorial</p>\n                                    <p class="pane__helper-text">Toggles the tutorial screens on or off</p>\n                                </div>\n                            </li>\n                            <li class="pane__item" data-open-pane="reset">\n                                <div class="pane__text">\n                                    <p class="pane__option">Reset</p>\n                                    <p class="pane__helper-text">Resets all app settings to their defaults</p>\n                                </div>\n                            </li>\n                            <li class="pane__item" data-open-pane="clearData">\n                                <div class="pane__text">\n                                    <p class="pane__option">Clear Data</p>\n                                    <p class="pane__helper-text">Clears all data, including local storage and all user settings</p>\n                                </div>\n                            </li>\n                        </ul>\n                    </div>\n                </div>\n            </div>\n            <div class="panes__pane pane pane--tutorial pane--modal pane--hidden">\n                <div class="pane__container">\n                    <div class="pane__header">\n                        <span>Tutorial</span>\n                    </div>\n                    <div class="pane__content">\n                        <ul class="pane__menu">\n                            <li class="pane__item">\n                                <div class="pane__text">\n                                    <p class="pane__option">Show</p>\n                                </div>\n                                <div class="radio">\n                                  <input type="radio" value="true" id="show-tutorial" name="showTutorial" />\n                                  <label for="show-tutorial" class="radio__label"></label>\n                                </div>\n                            </li>\n                            <li class="pane__item">\n                                <div class="pane__text">\n                                    <p class="pane__option">Hide</p>\n                                </div>\n                                <div class="radio">\n                                  <input type="radio" value="false" id="hide-tutorial" name="showTutorial" />\n                                  <label for="hide-tutorial" class="radio__label"></label>\n                                </div>\n                            </li>\n                        </ul>\n                        <div class="pane__actions">\n                            <button class="pane__button" data-close>Cancel</button>\n                        </div>\n                    </div>\n                </div>\n            </div>\n            <div class="panes__pane pane pane--letterboxing pane--modal pane--hidden">\n                <div class="pane__container">\n                    <div class="pane__header">\n                        <span>Letterboxing</span>\n                    </div>\n                    <div class="pane__content">\n                        <ul class="pane__menu">\n                            <li class="pane__item">\n                                <div class="pane__text">\n                                    <p class="pane__option">No letterboxing</p>\n                                </div>\n                                <div class="radio">\n                                  <input type="radio" value="no" id="no-letterboxing" name="letterboxing" />\n                                  <label for="no-letterboxing" class="radio__label"></label>\n                                </div>\n                            </li>\n                            <li class="pane__item">\n                                <div class="pane__text">\n                                    <p class="pane__option">Solid letterboxing</p>\n                                </div>\n                                <div class="radio">\n                                  <input type="radio" value="solid" id="solid-letterboxing" name="letterboxing"/>\n                                  <label for="solid-letterboxing" class="radio__label"></label>\n                                </div>\n                            </li>\n                            <li class="pane__item">\n                                <div class="pane__text">\n                                    <p class="pane__option">Opaque letterboxing</p>\n                                </div>\n                                <div class="radio">\n                                  <input type="radio" value="opaque" id="opaque-letterboxing" name="letterboxing" />\n                                  <label for="opaque-letterboxing" class="radio__label"></label>\n                                </div>\n                            </li>\n                        </ul>\n                        <div class="pane__actions">\n                            <button class="pane__button" data-close>Cancel</button>\n                        </div>\n                    </div>\n                </div>\n            </div>\n            <div class="panes__pane pane pane--animations pane--modal pane--hidden">\n                <div class="pane__container">\n                    <div class="pane__header">\n                        <span>Animate Transitions</span>\n                    </div>\n                    <div class="pane__content">\n                        <ul class="pane__menu">\n                            <li class="pane__item">\n                                <div class="pane__text">\n                                    <p class="pane__option">No animation</p>\n                                </div>\n                                <div class="radio">\n                                  <input type="radio" value="0" id="no-animation" name="panelTransitions" />\n                                  <label for="no-animation" class="radio__label"></label>\n                                </div>\n                            </li>\n                            <li class="pane__item">\n                                <div class="pane__text">\n                                    <p class="pane__option">Fast animations</p>\n                                </div>\n                                <div class="radio">\n                                  <input type="radio" value="250" id="fast-animation" name="panelTransitions" />\n                                  <label for="fast-animation" class="radio__label"></label>\n                                </div>\n                            </li>\n                            <li class="pane__item">\n                                <div class="pane__text">\n                                    <p class="pane__option">Slow animations</p>\n                                </div>\n                                <div class="radio">\n                                  <input type="radio" value="650" id="slow-animation" name="panelTransitions" />\n                                  <label for="slow-animation" class="radio__label"></label>\n                                </div>\n                            </li>\n                        </ul>\n                        <div class="pane__actions">\n                            <button class="pane__button" data-close>Cancel</button>\n                        </div>\n                    </div>\n                </div>\n            </div>\n            <div class="panes__pane pane pane--reset pane--modal pane--hidden">\n                <div class="pane__container">\n                    <div class="pane__header">\n                        <span>Reset Settings</span>\n                    </div>\n                    <div class="pane__content">\n                        <p>Are you sure you want to reset to the default settings?</p>\n                        <div class="pane__actions">\n                            <button class="pane__button" data-close>Cancel</button>\n                            <button class="pane__button" data-close data-reset-settings>Reset</button>\n                        </div>\n                    </div>\n                </div>\n            </div>\n            <div class="panes__pane pane pane--clearData pane--modal pane--hidden">\n                <div class="pane__container">\n                    <div class="pane__header">\n                        <span>Clear Data</span>\n                    </div>\n                    <div class="pane__content">\n                        <p>Are you sure you want to clear all application data?</p>\n                        <div class="pane__actions">\n                            <button class="pane__button" data-close>Cancel</button>\n                            <button class="pane__button" data-close data-clear-data>Clear</button>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n';

var PAGE_MODE = 'PAGE_MODE';
var PANEL_ZOOM_MODE = 'PANEL_ZOOM_MODE';
var PAGE_BACK = 'PAGE_BACK';
var PAGE_FORWARD = 'PAGE_FORWARD';
var TOGGLE_MAIN_MENU = 'TOGGLE_MAIN_MENU';

var Panelz = function (_EventClass7) {
    _inherits(Panelz, _EventClass7);

    function Panelz(config) {
        _classCallCheck(this, Panelz);

        var _this7 = _possibleConstructorReturn(this, (Panelz.__proto__ || Object.getPrototypeOf(Panelz)).call(this));

        _this7.config = config;

        _this7.settings = new Settings();
        _this7.setInitialMode();

        _this7.tutorial = new Tutorial(_this7.settings);
        _this7.menu = new Menu(_this7.config);
        _this7.viewport = new ViewPort(_this7.config);
        _this7.book = new Book(_this7.config);

        _this7.setEventListeners();
        return _this7;
    }

    _createClass(Panelz, [{
        key: 'setInitialMode',
        value: function setInitialMode() {
            if (this.settings.getLocalSetting('mode')) {
                this.mode = this.settings.getLocalSetting('mode');
            } else {
                this.mode = this.settings.get('startInPanelZoom') ? PANEL_ZOOM_MODE : PAGE_MODE;
            }
        }
    }, {
        key: 'setEventListeners',
        value: function setEventListeners() {
            this.book.on('load', this.onBookLoaded.bind(this));
        }
    }, {
        key: 'onBookLoaded',
        value: function onBookLoaded(book) {
            this.trigger('load:book', book);
        }
    }, {
        key: 'switchModes',
        value: function switchModes() {
            var mode = this.mode === PAGE_MODE ? PANEL_ZOOM_MODE : PAGE_MODE;

            // Current page has panels, but they're not zoomed into one, and about to switch into page mode.
            // OR
            // The page has no panels, which means no zooming at all.
            // ---
            // Message the user to make sure they know the page switch was successful
            var messageUser = this.book.currentPage.hasPanels() && !this.book.currentPage.currentPanel && mode === PAGE_MODE || !this.book.currentPage.hasPanels();

            this.setMode(mode);

            if (messageUser) {
                this.viewport.message(this.getReadableModeText());
            }

            this.settings.remember('mode', mode);
        }
    }, {
        key: 'setMode',
        value: function setMode(mode) {
            this.mode = mode;
            this.trigger('change:mode', mode);
        }
    }, {
        key: 'getReadableModeText',
        value: function getReadableModeText(mode) {
            if (!mode) {
                mode = this.mode;
            }
            return mode.replace(/_/g, ' ').toLowerCase().replace(/(?:^|\s)\S/g, function (a) {
                return a.toUpperCase();
            });
        }
    }, {
        key: 'setLetterBoxing',
        value: function setLetterBoxing(width, height, animate) {
            this.viewport.setLetterBoxing(width, height, animate);
        }
    }, {
        key: 'getViewPortSize',
        value: function getViewPortSize() {
            return {
                width: this.viewport.getWidth(),
                height: this.viewport.getHeight()
            };
        }
    }, {
        key: 'addPageMarkupToViewPort',
        value: function addPageMarkupToViewPort($markup) {
            return $markup.appendTo(this.viewport.$element);
        }
    }, {
        key: 'config',
        set: function set(config) {
            this.$container = $(config.container);
            config.app = this;
            this._config = config;
        },
        get: function get() {
            return this._config;
        }
    }, {
        key: '$container',
        set: function set($container) {
            this._$container = $container.append(PANELZ_MARKUP);
        },
        get: function get() {
            return _$container;
        }
    }]);

    return Panelz;
}(EventClass);