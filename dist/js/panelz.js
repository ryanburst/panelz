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

var Book = function (_EventClass) {
    _inherits(Book, _EventClass);

    function Book(config) {
        _classCallCheck(this, Book);

        var _this = _possibleConstructorReturn(this, (Book.__proto__ || Object.getPrototypeOf(Book)).call(this));

        _this.config = config;
        _this.app = config.app;
        _this.pages = [];
        _this.loaded = 0;
        _this.isLoaded = false;
        _this.panFrozen = false;
        _this.zoomPanAmount = 0;
        _this.size = config.size;
        _this.loadedSize = 0;
        _this.setEventListeners();
        console.log(_this.config);
        config.comic.pages.forEach(function (pageConfig, index) {
            pageConfig.app = this.app;
            pageConfig.panels = pageConfig.panels || [];
            var page = new Page(this, pageConfig, index);
            page.on('load', this.onPageLoaded.bind(this));
            this.pages.push(page);
        }.bind(_this));
        return _this;
    }

    _createClass(Book, [{
        key: 'getReadableSize',
        value: function getReadableSize(size) {
            var bytes = typeof size !== 'undefined' ? size : this.size;
            var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
            if (bytes == 0) return '0 Byte';
            var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
            return (bytes / Math.pow(1024, i)).toFixed(2) + ' ' + sizes[i];
        }
    }, {
        key: 'setEventListeners',
        value: function setEventListeners() {
            this.app.on('change:mode', this.onModeChange.bind(this));
            this.app.on('user', this.registerUserEvent.bind(this));
            this.app.on('user:skipToPage', this.skipToPage.bind(this));
            this.app.on('user:panend', this.onPanEnd.bind(this));
            this.app.on('user:pageForward', this.pageForward.bind(this));
            this.app.on('user:pageBackward', this.pageBackward.bind(this));
        }
    }, {
        key: 'onPageLoaded',
        value: function onPageLoaded(page) {
            this.loaded += 1;
            this.loadedSize += parseInt(page.size);
            if (this.loaded === this.pages.length) {
                this.onBookLoaded();
            }
        }
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
            setTimeout(function () {
                this.isLoaded = true;
                this.trigger('load:book', this);
                $('.loading').addClass('loading--hidden');
            }.bind(this), 1200);
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
            if (this.panFrozen) {
                return;
            }
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
                $page.find('.page-list__image').attr('src', page.config.url);
                $page.find('.page-list__number').text(page.index + 1);
                $('.page-list').append($page);
            }.bind(this));
        }
    }, {
        key: 'registerUserEvent',
        value: function registerUserEvent(e) {
            this.e = e;
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

            this.app.settings.rememberBookSetting('page', page.index);
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
                page.resetScale();
                page.$container.css('left', 0).css('opacity', 0);
            }.bind(this));
            this.currentPage.$container.css('opacity', 1);

            if (this.currentPage.panels.length) {
                var panel = this.e && this.e.type === "doubletap" && this.app.settings.get('detectPanelOnDoubleTap') ? this.currentPage.findPanelWithPos(this.e.center.x, this.e.center.y) : this.currentPage.getFirstPanel();
                this.currentPage.zoomToPanel(panel);
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
    }, {
        key: 'size',
        get: function get() {
            return this._size;
        },
        set: function set(size) {
            if (!size) {
                size = 0;
                this.config.comic.pages.forEach(function (pageConfig) {
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
    }, {
        key: 'loadedSize',
        get: function get() {
            return this._loadedSize;
        },
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

var Menu = function (_EventClass2) {
    _inherits(Menu, _EventClass2);

    function Menu(config) {
        _classCallCheck(this, Menu);

        var _this2 = _possibleConstructorReturn(this, (Menu.__proto__ || Object.getPrototypeOf(Menu)).call(this));

        _this2.app = config.app;
        _this2.$menu = $('.viewport__menu');

        _this2.setEventListeners();

        _this2.onModeChange(_this2.app.mode);

        return _this2;
    }

    _createClass(Menu, [{
        key: 'setEventListeners',
        value: function setEventListeners() {
            $('body').on('touchend click', '.menu__option--mode', this.onModeToggleClick.bind(this));
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
        key: 'onModeToggleClick',
        value: function onModeToggleClick(e) {
            e.preventDefault();
            this.app.switchModes();
        }
    }, {
        key: 'onModeChange',
        value: function onModeChange(mode) {
            if (mode === PAGE_MODE) {
                this.$menu.find('.menu__option--mode').html('Page<br />Mode');
            } else {
                this.$menu.find('.menu__option--mode').html('Panel Zoom<br />Mode');
            }
        }
    }]);

    return Menu;
}(EventClass);

;

var Page = function (_EventClass3) {
    _inherits(Page, _EventClass3);

    function Page(Book, config, index) {
        _classCallCheck(this, Page);

        var _this3 = _possibleConstructorReturn(this, (Page.__proto__ || Object.getPrototypeOf(Page)).call(this));

        _this3.config = config;
        _this3.app = config.app;
        _this3.book = Book;
        _this3.index = index;
        _this3.isFirst = index === 0;
        _this3.isLast = index === _this3.book.config.comic.pages.length - 1;
        _this3.size = config.size || 0;
        _this3.isCurrentPage = false;
        _this3.scale = 1;
        _this3.lastScale = 1;
        _this3.leftEdge = true;
        _this3.rightEdge = true;
        _this3.panels = [];
        _this3.PANEL_ANIMATION_SPEED = _this3.app.settings.get('panelTransitions');
        _this3.SHOW_PAGE_ON_ENTER = _this3.app.settings.get('showPageOnEnter');
        _this3.SHOW_PAGE_ON_EXIT = _this3.app.settings.get('showPageOnExit');
        _this3.TURN_THRESHHOLD = 30;
        _this3.currentPanel = false;
        _this3.previousPanel = false;
        _this3.nextPanel = false;
        _this3.lastPanelSeen = false;
        _this3.loadSrc(config.url);
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
            /*$.ajax({
                xhr: function() {
                    var xhr = new window.XMLHttpRequest();
                    //Download progress
                    xhr.addEventListener("progress", function(evt){
                        if (evt.lengthComputable) {
                            var percentComplete = evt.loaded / evt.total;
                            //Do something with download progress
                            //console.log(percentComplete);
                        }
                    }, false);
                    return xhr;
                },
                type: 'GET',
                url: src,
                processData: false,
                responseType: 'arraybuffer',
                success: function(data,something,xhr) {
                    var h = xhr.getAllResponseHeaders(),
                                m = h.match( /^Content-Type\:\s*(.*?)$/mi ),
                                mimeType = m[ 1 ] || 'image/png';
                    var blob = new Blob([data],{ type: mimeType });
                    var $image = $("<img />").attr("src", window.URL.createObjectURL(blob)).on('load',this.onPageLoaded.bind(this))
                    $image.trigger('load',{currentTarget: $image[0]});
                }.bind(this)
            });*/
            $("<img />").attr("src", src).on('load', this.onPageLoaded.bind(this));
        }
    }, {
        key: 'onProgress',
        value: function onProgress(e) {
            console.log(e);
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
                this.elementOriginalLeft = parseInt(this.$element.css("margin-left"), 10);
                this.elementOriginalTop = parseInt(this.$element.css("margin-top"), 10);
                if (this.scale == 1) {
                    this.originalLeft = parseInt(this.$container.css("left"), 10);
                }
                this.book.zoomPanAmount = 0;
            }.bind(this));
            this.app.on("user:pan", function (ev) {
                if (this.isCurrentPage && this.scale !== 1) {
                    var maxTop = (this.getHeight() * this.scale - this.getFullHeight()) / 2;
                    var minTop = maxTop * -1;
                    var deltaY = this.elementOriginalTop + ev.deltaY;
                    var top = Math.min(maxTop, Math.max(deltaY, minTop));
                    this.$element.css({
                        "margin-top": top
                    });
                } else if (ev.offsetDirection === 8) {
                    return true;
                }
            }.bind(this));

            // panleft = rightedge = forward
            this.app.on("user:panleft", function (ev) {
                if (this.isCurrentPage && this.scale !== 1) {
                    var elLeft = parseInt(this.$element.css("left"), 10);
                    var maxLeft = (this.getWidth() * this.scale - this.getFullWidth()) / 2;
                    var minLeft = maxLeft * -1;
                    if (this.getWidth() * this.scale < this.getFullWidth()) {
                        maxLeft = 0;
                    }
                    var deltaX = this.elementOriginalLeft + ev.deltaX;
                    var left = Math.min(maxLeft, Math.max(deltaX, minLeft));

                    var rightEdgeBefore = this.rightEdge;
                    this.rightEdge = left <= minLeft ? true : false;
                    if (rightEdgeBefore !== this.rightEdge && this.rightEdge) {
                        this.book.panFrozen = false;
                        this.book.zoomPanAmount = ev.deltaX;
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
                    this.left = this.originalLeft + ev.deltaX - this.book.zoomPanAmount;
                    this.$container.css({
                        "left": this.left
                    });

                    if (this.isCurrentPage && this.scale !== 1 && this.left < 0 && !this.rightEdge) {
                        this.book.panFrozen = true;
                    }
                }
            }.bind(this));

            // panright = leftedge = back
            this.app.on("user:panright", function (ev) {
                if (this.isCurrentPage && this.scale !== 1) {
                    var elLeft = parseInt(this.$element.css("left"), 10);
                    var maxLeft = (this.getWidth() * this.scale - this.getFullWidth()) / 2;
                    var minLeft = maxLeft * -1;
                    if (this.getWidth() * this.scale < this.getFullWidth()) {
                        maxLeft = 0;
                    }
                    var deltaX = this.elementOriginalLeft + ev.deltaX;
                    var left = Math.min(maxLeft, Math.max(deltaX, minLeft));

                    var leftEdgeBefore = this.leftEdge;
                    this.leftEdge = left == maxLeft ? true : false;
                    if (leftEdgeBefore !== this.leftEdge && this.leftEdge) {
                        this.book.panFrozen = false;
                        this.book.zoomPanAmount = ev.deltaX;
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
                    this.left = this.originalLeft + ev.deltaX - this.book.zoomPanAmount;
                    this.$container.css({
                        "left": this.left
                    });
                    if (this.isCurrentPage && this.scale !== 1 && this.left >= 0 && !this.leftEdge) {
                        this.book.panFrozen = true;
                    }
                }
            }.bind(this));

            this.app.on('user:pinchstart', function (e) {
                this.pinchOrigin = e.center;
                this.elementOriginalLeft = parseInt(this.$element.css("margin-left"), 10);
                this.elementOriginalTop = parseInt(this.$element.css("margin-top"), 10);
            }.bind(this));

            this.app.on("user:pinch", function (e) {
                if (!this.isCurrentPage) {
                    return;
                }

                if (this.app.mode !== PAGE_MODE) {
                    this.app.switchModes();
                }
                this.magnify(e.scale * this.lastScale);

                var deltaX = this.pinchOrigin.x - e.center.x;
                var deltaY = this.pinchOrigin.y - e.center.y;
                this.$element.css({
                    "margin-top": -1 * (this.elementOriginalTop - deltaY * e.scale),
                    "margin-left": -1 * (this.elementOriginalLeft - deltaX * e.scale)
                });
            }.bind(this));

            this.app.on("user:pinchend", function (e) {
                if (!this.isCurrentPage) {
                    return;
                }

                //this.pinchOrigin = {};

                this.book.panFrozen = true;

                if (this.scale < 1) {
                    return this.resetScale();
                }

                if (this.scale > 3) {
                    this.magnify(3, true);
                    this.lastScale = this.scale;
                    return;
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
                height: height,
                'margin-left': 0,
                'margin-top': 0
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
                'top': -top + (viewPortHeight - height) / 2,
                'left': -left + (viewPortWidth - width) / 2,
                width: pageWidth,
                height: pageHeight
            }, {
                duration: animate ? this.PANEL_ANIMATION_SPEED : 0,
                easing: 'easeOutSine'
            });

            this.app.setLetterBoxing(viewPortWidth - width, viewPortHeight - height, animate);

            this.setCurrentPanel(panel);
            this.app.settings.rememberBookSetting('panel', panel.index);
        }
    }, {
        key: 'zoomOut',
        value: function zoomOut() {
            this.setCurrentPanel(false);
            this.centerInViewPort(true);
            this.app.setLetterBoxing(0, 0);
            this.app.settings.rememberBookSetting('panel', false);
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

var PAGE_MODE = 'PAGE_MODE';
var PANEL_ZOOM_MODE = 'PANEL_ZOOM_MODE';
var PAGE_BACK = 'PAGE_BACK';
var PAGE_FORWARD = 'PAGE_FORWARD';
var TOGGLE_MAIN_MENU = 'TOGGLE_MAIN_MENU';

var Panelz = function (_EventClass4) {
    _inherits(Panelz, _EventClass4);

    function Panelz(config) {
        _classCallCheck(this, Panelz);

        var _this4 = _possibleConstructorReturn(this, (Panelz.__proto__ || Object.getPrototypeOf(Panelz)).call(this));

        _this4.DEFAULTS = {
            id: false,
            container: '.panelz-creator-container',
            comic: {
                title: false,
                pages: []
            },
            endpoints: {
                get: '/comic/'
            }
        };

        _this4.config = $.extend(true, {}, _this4.DEFAULTS, config);

        _this4.settings = new Settings(_this4);

        if (_this4.config.id) {
            _this4.fetchBookData();
        } else {
            _this4.setupBook();
        }
        return _this4;
    }

    _createClass(Panelz, [{
        key: 'getEndpoint',
        value: function getEndpoint(endpoint) {
            return this.endpoints[endpoint];
        }
    }, {
        key: 'fetchBookData',
        value: function fetchBookData() {
            $.ajax({
                url: this.getEndpoint('get') + this.config.id,
                method: 'GET',
                error: this.onRequestError.bind(this),
                success: this.onBookDataFetched.bind(this)
            });
        }
    }, {
        key: 'onBookDataFetched',
        value: function onBookDataFetched(comic) {
            this.config.comic = comic;

            this.setupBook();
        }
    }, {
        key: 'onRequestError',
        value: function onRequestError() {
            console.log('ERROR FETCHING BOOK DATA!', response);
        }
    }, {
        key: 'setupBook',
        value: function setupBook() {
            this.setInitialMode();

            this.tutorial = new Tutorial(this, this.settings);
            this.menu = new Menu(this.config);
            this.viewport = new ViewPort(this.config);
            this.book = new Book(this.config);

            this.setEventListeners();
        }
    }, {
        key: 'setInitialMode',
        value: function setInitialMode() {
            if (this.settings.getBookSetting('mode')) {
                this.mode = this.settings.getBookSetting('mode');
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
        key: 'getComicId',
        value: function getComicId() {
            return this.config.comic.id;
        }
    }, {
        key: 'switchModes',
        value: function switchModes() {
            var mode = this.mode === PAGE_MODE ? PANEL_ZOOM_MODE : PAGE_MODE;

            this.setMode(mode);

            this.message(this.getReadableModeText());
        }
    }, {
        key: 'setMode',
        value: function setMode(mode) {
            this.mode = mode;
            this.settings.rememberBookSetting('mode', mode);
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

var Settings = function (_EventClass5) {
    _inherits(Settings, _EventClass5);

    function Settings(app) {
        _classCallCheck(this, Settings);

        var _this5 = _possibleConstructorReturn(this, (Settings.__proto__ || Object.getPrototypeOf(Settings)).call(this));

        _this5.DEFAULTS = {
            leftHandMode: false,
            startInPanelZoom: false,
            panelTransitions: 250,
            letterboxing: 'solid',
            detectPanelOnDoubleTap: true,
            showPageOnEnter: true,
            showPageOnExit: true,
            showTutorial: true
        };

        _this5.storageKey = 'panelz_2.0';

        _this5.app = app;
        _this5.config = {};

        _this5.localSettings = _this5.getLocalSettings();
        _this5.loadConfig($.extend({}, _this5.DEFAULTS, _this5.getUserSettings()));
        _this5.setFields();
        _this5.setEventListeners();
        return _this5;
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

            if ($field.closest('.pane__item[data-readable]').length) {
                var readableFieldLabel = $field.closest('.pane__item[data-readable]').attr('data-readable');
                var readableTitle = $field.closest('.pane[data-readable]').attr('data-readable');
                this.app.message(readableTitle + ' set to ' + readableFieldLabel);
            }
        }
    }, {
        key: 'reset',
        value: function reset() {
            this.loadConfig(this.DEFAULTS);
            this.setFields();
            this.app.message('Settings reset');
        }
    }, {
        key: 'clear',
        value: function clear() {
            this.localSettings = {};
            localStorage.removeItem(this.storageKey);
            this.reset();
            this.app.message('Application data cleared');
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
                var localSettings = JSON.parse(localStorage.getItem(this.storageKey));
                console.log('Local Settings:', localSettings);
                return localSettings ? localSettings : {};
            } catch (Exception) {
                return {};
            }
        }
    }, {
        key: 'setLocalSettings',
        value: function setLocalSettings() {
            localStorage.setItem(this.storageKey, JSON.stringify(this.localSettings));
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
        key: 'rememberBookSetting',
        value: function rememberBookSetting(key, val) {
            var books = this.getLocalSetting('comics') || {};
            var bookSettings = books[this.app.getComicId()] || {};
            bookSettings[key] = val;
            books[this.app.getComicId()] = bookSettings;
            this.remember('comics', books);
        }
    }, {
        key: 'getBookSetting',
        value: function getBookSetting(key) {
            var books = this.getLocalSetting('comics') || {};
            var bookSettings = books[this.app.getComicId()] || {};
            return bookSettings[key];
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

var Tutorial = function (_EventClass6) {
    _inherits(Tutorial, _EventClass6);

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
            this.settings.setFields();
            this.trigger('done');
        }
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
    }, {
        key: 'setBeginnerMode',
        value: function setBeginnerMode(e) {
            var $checkbox = $(e.currentTarget);
            var mode = $checkbox.is(':checked') ? PANEL_ZOOM_MODE : PAGE_MODE;
            if (this.app.book.isLoaded) {
                this.app.setMode(mode);
            }
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

var ViewPort = function (_EventClass7) {
    _inherits(ViewPort, _EventClass7);

    function ViewPort(config) {
        _classCallCheck(this, ViewPort);

        var _this7 = _possibleConstructorReturn(this, (ViewPort.__proto__ || Object.getPrototypeOf(ViewPort)).call(this));

        _this7.app = config.app;
        _this7.$element = $('.viewport');
        _this7.$container = $(window);
        _this7.$menu = $('.viewport__menu');
        _this7.$horizontalLetterBox = $('.letterbox__horizontal');
        _this7.$verticalLetterBox = $('.letterbox__vertical');

        _this7.PAGE_TURN_THRESHOLD = 0.25;
        _this7.LETTERBOX_STYLE = _this7.app.settings.get('letterboxing');
        _this7.LEFT_HAND_MODE = _this7.app.settings.get('leftHandMode');

        _this7.setEventListeners();
        _this7.setViewPortSize();
        _this7.setTapThresholds();
        _this7.setLetterBoxStyle();

        _this7.interactable = new Hammer.Manager(_this7.$element.find('.viewport__interactable')[0]);

        var pan = new Hammer.Pan({ threshold: 20, enable: _this7.canRecognizePan.bind(_this7) });
        var pinch = new Hammer.Pinch({ threshold: 0, enable: _this7.canRecognizePinch.bind(_this7), domEvents: true });
        var singletap = new Hammer.Tap({ threshold: 2, posThreshold: 150 });
        var doubletap = new Hammer.Tap({ event: 'doubletap', taps: 2, threshold: 2, posThreshold: 150 });
        var swipe = new Hammer.Swipe({ enable: _this7.canRecognizeSwipe.bind(_this7) });

        _this7.interactable.add([pan, doubletap, singletap, swipe, pinch]);

        //pan.recognizeWith(pinch);
        doubletap.recognizeWith(singletap);

        singletap.requireFailure(doubletap);
        //pan.requireFailure(pinch);


        $('body').on('touchend', function () {
            this.$menu.removeClass('viewport__menu--was-shown');
            if (this.$menu.hasClass('viewport__menu--active')) {
                setTimeout(function () {
                    this.$menu.removeClass('viewport__menu--active').addClass('viewport__menu--was-shown');
                }.bind(this), 500);
            }
        }.bind(_this7));

        _this7.app.tutorial.on('done', _this7.onTutorialDone.bind(_this7));
        _this7.app.on('load:book', _this7.onBookLoaded.bind(_this7));

        $('body').on('click', '[data-open-pane]', function (e) {
            $('.pane--' + $(this).attr('data-open-pane')).removeClass('pane--hidden');
        });
        $('body').on('click', '.pane__item, .tutorial__menu-item', function (e) {
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
        }.bind(_this7));

        $('body').on('click', '[data-close]', function (e) {
            e.preventDefault();
            var $this = $(this);
            $this.closest('.pane').addClass('pane--hidden');
            $this.closest('.pane').find('.pane__content')[0].scrollTop = 0;
        });
        return _this7;
    }

    _createClass(ViewPort, [{
        key: 'onBookLoaded',
        value: function onBookLoaded() {
            console.log('Book loaded');
            this.interactable.on('panstart', function (ev) {
                //this.app.trigger('user:panstart',ev);
            }.bind(this));
            this.interactable.on('pan', function (ev) {
                //this.app.trigger('user:pan',ev);
            }.bind(this));
            this.interactable.on('panleft', function (ev) {
                //this.app.trigger('user:panleft',ev);
            }.bind(this));
            this.interactable.on('panright', function (ev) {
                //this.app.trigger('user:panright',ev);
            }.bind(this));
            this.interactable.on('panend', function (ev) {
                //this.app.trigger('user:panend',ev);
            }.bind(this));
            this.interactable.on('pinch', function (ev) {
                this.app.trigger('user:pinch', ev);
            }.bind(this));
            this.interactable.on('pinchmove', function (ev) {
                this.app.trigger('user:pinchmove', ev);
            }.bind(this));
            this.interactable.on('pinchstart', function (ev) {
                this.app.trigger('user:pinchstart', ev);
            }.bind(this));
            this.interactable.on('pinchin', function (ev) {
                this.app.trigger('user:pinchin', { e: ev });
            }.bind(this));
            this.interactable.on('pinchout', function (ev) {
                this.app.trigger('user:pinchout', { e: ev });
            }.bind(this));
            this.interactable.on('pinchend', function (ev) {
                this.app.trigger('user:pinchend', ev);
            }.bind(this));
            this.interactable.on('doubletap', function (ev) {
                this.app.trigger('user:doubletap', ev);
                this.app.switchModes();
            }.bind(this));
            this.interactable.on("tap", function (ev) {
                this.app.trigger('user:tap', ev);
                var cmd = this.findTapZone(ev.center.x, ev.center.y);
                if (cmd === PAGE_FORWARD) {
                    this.app.trigger('user:pageForward', ev);
                } else if (cmd === PAGE_BACK) {
                    this.app.trigger('user:pageBackward', ev);
                } else if (cmd === TOGGLE_MAIN_MENU) {
                    if (!this.$menu.hasClass('viewport__menu--was-shown')) {
                        this.$menu.addClass('viewport__menu--active');
                    }
                }
            }.bind(this));
            this.interactable.on("swipeleft", function (ev) {
                if (this.app.mode === PANEL_ZOOM_MODE) {
                    this.app.trigger('user:pageForward', ev);
                }
            }.bind(this));
            this.interactable.on("swiperight", function (ev) {
                if (this.app.mode === PANEL_ZOOM_MODE) {
                    this.app.trigger('user:pageBackward', ev);
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
        key: 'canRecognizePinch',
        value: function canRecognizePinch(rec, input) {
            return this.app.mode === PAGE_MODE;
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

var PANELZ_MARKUP = '\n    <div class="tutorial tutorial--hidden">\n        <div class="tutorial__panel">\n            <div class="tutorial__cta">\n                <button class="tutorial__button tutorial__button--skip" data-tutorial-done>Skip</button>\n            </div>\n            <div class="tutorial__content">\n                <div class="heading heading--lg">Welcome to Panelz</div>\n                <div class="heading heading--secondary">Here are some terms to get you started:</div>\n                <p><strong>Page Mode</strong> (default) - View the full page and all of its panels as you read.</p>\n                <p><strong>Panel Zoom</strong> - This mode will guide you along your comic, panel by panel.</p>\n            </div>\n            <div class="tutorial__cta">\n                <button class="tutorial__button tutorial__button--back" style="visibility: hidden">Back</button>\n                <ul class="tutorial__progress">\n                    <li class="tutorial__progress-step tutorial__progress-step--active"></li>\n                    <li class="tutorial__progress-step"></li>\n                    <li class="tutorial__progress-step"></li>\n                    <li class="tutorial__progress-step"></li>\n                    <li class="tutorial__progress-step"></li>\n                </ul>\n                <button class="tutorial__button" data-tutorial-next>Next</button>\n            </div>\n        </div>\n        <div class="tutorial__panel tutorial__panel--hidden">\n            <div class="tutorial__cta">\n                <button class="tutorial__button tutorial__button--skip" data-tutorial-done>Skip</button>\n            </div>\n            <div class="tutorial__content">\n                <div class="tutorial__image">\n                    <video autoplay="autoplay" loop="loop" muted playsinline data-tutorial-image="../dist/images/tutorial-taps.mp4">\n                        <source type="video/mp4" />\n                    </video>\n                </div>\n                <p><strong>Left Tap</strong> - Navigates backwards one panel or page.</p>\n                <p><strong>Right Tap</strong> - Navigates forward one panel or page.</p>\n                <p><strong>Center Tap</strong> - Open or close the menu.</p>\n            </div>\n            <div class="tutorial__cta">\n                <button class="tutorial__button tutorial__button--back" data-tutorial-back>Back</button>\n                <ul class="tutorial__progress">\n                    <li class="tutorial__progress-step"></li>\n                    <li class="tutorial__progress-step tutorial__progress-step--active"></li>\n                    <li class="tutorial__progress-step"></li>\n                    <li class="tutorial__progress-step"></li>\n                    <li class="tutorial__progress-step"></li>\n                </ul>\n                <button class="tutorial__button" data-tutorial-next>Next</button>\n            </div>\n        </div>\n        <div class="tutorial__panel tutorial__panel--hidden">\n            <div class="tutorial__cta">\n                <button class="tutorial__button tutorial__button--skip" data-tutorial-done>Skip</button>\n            </div>\n            <div class="tutorial__content">\n                <div class="tutorial__image">\n                    <video autoplay="autoplay" loop="loop" muted playsinline data-tutorial-image="../dist/images/tutorial-double-taps.mp4">\n                        <source type="video/mp4" />\n                    </video>\n                </div>\n                <p><strong>Double tap</strong> - Switch between Page Mode and Panel Zoom Mode.</p>\n                <p>The panel tapped on will be detected and zoomed on when switching to Panel Zoom mode. This option can be changed in the settings.\n            </div>\n            <div class="tutorial__cta">\n                <button class="tutorial__button tutorial__button--back" data-tutorial-back>Back</button>\n                <ul class="tutorial__progress">\n                    <li class="tutorial__progress-step"></li>\n                    <li class="tutorial__progress-step"></li>\n                    <li class="tutorial__progress-step tutorial__progress-step--active"></li>\n                    <li class="tutorial__progress-step"></li>\n                    <li class="tutorial__progress-step"></li>\n                </ul>\n                <button class="tutorial__button" data-tutorial-next>Next</button>\n            </div>\n        </div>\n        <div class="tutorial__panel tutorial__panel--hidden">\n            <div class="tutorial__cta">\n                <button class="tutorial__button tutorial__button--skip" data-tutorial-done>Skip</button>\n            </div>\n            <div class="tutorial__content">\n                <div class="heading heading--secondary">You can also swipe to navigate!</div>\n                <div class="tutorial__image">\n                    <video autoplay="autoplay" loop="loop" muted playsinline data-tutorial-image="../dist/images/tutorial-swipes.mp4">\n                        <source type="video/mp4" />\n                    </video>\n                </div>\n            </div>\n            <div class="tutorial__cta">\n                <button class="tutorial__button tutorial__button--back" data-tutorial-back>Back</button>\n                <ul class="tutorial__progress">\n                    <li class="tutorial__progress-step"></li>\n                    <li class="tutorial__progress-step"></li>\n                    <li class="tutorial__progress-step"></li>\n                    <li class="tutorial__progress-step tutorial__progress-step--active"></li>\n                    <li class="tutorial__progress-step"></li>\n                </ul>\n                <button class="tutorial__button" data-tutorial-next>Next</button>\n            </div>\n        </div>\n        <div class="tutorial__panel tutorial__panel--hidden">\n            <div class="tutorial__content">\n                <div class="heading heading--secondary">That\'s it!</div>\n                <p>Do you want to take a moment and customize a few Panel Zoom settings?</p>\n                <div class="tutorial__center-cta">\n                    <p><button class="tutorial__button" data-tutorial-next>Customize Settings</button></p>\n                    <p><button class="tutorial__button tutorial__button--link" data-tutorial-done>No thanks, I\'m ready to read!</button></p>\n                </div>\n            </div>\n            <div class="tutorial__cta">\n                <button class="tutorial__button tutorial__button--back" data-tutorial-back>Back</button>\n                <ul class="tutorial__progress">\n                    <li class="tutorial__progress-step"></li>\n                    <li class="tutorial__progress-step"></li>\n                    <li class="tutorial__progress-step"></li>\n                    <li class="tutorial__progress-step"></li>\n                    <li class="tutorial__progress-step tutorial__progress-step--active"></li>\n                </ul>\n                <button class="tutorial__button" data-tutorial-done style="visibility: hidden">Done</button>\n            </div>\n        </div>\n        <div class="tutorial__panel tutorial__panel--hidden">\n            <div class="tutorial__cta">\n                <button class="tutorial__button tutorial__button--skip" data-tutorial-done>Cancel</button>\n            </div>\n            <form class="tutorial__content">\n                <div class="heading heading--secondary heading--secondary-with-helper">Letterboxing</div>\n                <p>Set what style is used when blocking off a panel from the rest of the page.</p>\n                <div class="tutorial__image tutorial__image--small">\n                    <video autoplay="autoplay" loop="loop" muted playsinline>\n                        <source type="video/mp4" />\n                    </video>\n                </div>\n                <ul class="tutorial__menu">\n                    <li class="tutorial__menu-item">\n                        <div class="radio">\n                          <input type="radio" value="no" id="no-letterboxing-tut" name="letterboxing" data-tutorial-image="../dist/images/tutorial-letterboxing-none.mp4"/>\n                          <label for="no-letterboxing-tut" class="radio__label"></label>\n                        </div>\n                        <div class="tutorial__menu-item-text">\n                            No letterboxing\n                        </div>\n                    </li>\n                    <li class="tutorial__menu-item">\n                        <div class="radio">\n                          <input type="radio" value="opaque" id="opaque-letterboxing-tut" name="letterboxing" data-tutorial-image="../dist/images/tutorial-letterboxing-opaque.mp4"/>\n                          <label for="opaque-letterboxing-tut" class="radio__label"></label>\n                        </div>\n                        <div class="tutorial__menu-item-text">\n                            Opaque letterboxing\n                        </div>\n                    </li>\n                    <li class="tutorial__menu-item">\n                        <div class="radio">\n                          <input type="radio" value="solid" id="solid-letterboxing-tut" name="letterboxing" data-tutorial-image="../dist/images/tutorial-letterboxing-solid.mp4"/>\n                          <label for="solid-letterboxing-tut" class="radio__label"></label>\n                        </div>\n                        <div class="tutorial__menu-item-text">\n                            Solid letterboxing (default)\n                        </div>\n                    </li>\n                </ul>\n            </form>\n            <div class="tutorial__cta">\n                <button class="tutorial__button tutorial__button--back" data-tutorial-back>Back</button>\n                <ul class="tutorial__progress">\n                    <li class="tutorial__progress-step tutorial__progress-step--active"></li>\n                    <li class="tutorial__progress-step"></li>\n                    <li class="tutorial__progress-step"></li>\n                </ul>\n                <button class="tutorial__button" data-tutorial-next>Next</button>\n            </div>\n        </div>\n        <div class="tutorial__panel tutorial__panel--hidden">\n            <form class="tutorial__content">\n                <div class="heading heading--secondary">Panel Transitions</div>\n                <div class="tutorial__image tutorial__image--small">\n                    <video autoplay="autoplay" loop="loop" muted playsinline>\n                        <source type="video/mp4" />\n                    </video>\n                </div>\n                <ul class="tutorial__menu">\n                    <li class="tutorial__menu-item">\n                        <div class="radio">\n                            <input type="radio" value="0" id="no-animation-tut" name="panelTransitions" data-tutorial-image="../dist/images/tutorial-animations-none.mp4"/>\n                            <label for="no-animation-tut" class="radio__label"></label>\n                        </div>\n                        <div class="tutorial__menu-item-text">\n                            No animations\n                        </div>\n                    </li>\n                    <li class="tutorial__menu-item">\n                        <div class="radio">\n                            <input type="radio" value="650" id="slow-animation-tut" name="panelTransitions" data-tutorial-image="../dist/images/tutorial-animations-slow.mp4"/>\n                            <label for="slow-animation-tut" class="radio__label"></label>\n                        </div>\n                        <div class="tutorial__menu-item-text">\n                            Slow animations\n                        </div>\n                    </li>\n                    <li class="tutorial__menu-item">\n                        <div class="radio">\n                            <input type="radio" value="250" id="fast-animation-tut" name="panelTransitions" data-tutorial-image="../dist/images/tutorial-animations-fast.mp4"/>\n                            <label for="fast-animation-tut" class="radio__label"></label>\n                        </div>\n                        <div class="tutorial__menu-item-text">\n                            Fast animations (default)\n                        </div>\n                    </li>\n                </ul>\n            </form>\n            <div class="tutorial__cta">\n                <button class="tutorial__button tutorial__button--back" data-tutorial-back>Back</button>\n                <ul class="tutorial__progress">\n                    <li class="tutorial__progress-step"></li>\n                    <li class="tutorial__progress-step tutorial__progress-step--active"></li>\n                    <li class="tutorial__progress-step"></li>\n                </ul>\n                <button class="tutorial__button" data-tutorial-next>Next</button>\n            </div>\n        </div>\n        <div class="tutorial__panel tutorial__panel--hidden">\n            <form class="tutorial__content">\n                <div class="heading heading--secondary">Final Panel Zoom Settings</div>\n                <ul class="tutorial__menu">\n                    <li class="tutorial__menu-item">\n                        <div class="checkbox">\n                            <input type="checkbox" value="true" id="startInPanelZoom-tut" name="startInPanelZoom" />\n                            <label for="startInPanelZoom-tut" class="checkbox__label"></label>\n                        </div>\n                        <div class="tutorial__menu-item-text">\n                            Start new books in Panel Zoom Mode\n                        </div>\n                    </li>\n                    <li class="tutorial__menu-item">\n                        <div class="checkbox">\n                            <input type="checkbox" value="true" id="detectPanelOnDoubleTap-tut" name="detectPanelOnDoubleTap" />\n                            <label for="detectPanelOnDoubleTap-tut" class="checkbox__label"></label>\n                        </div>\n                        <div class="tutorial__menu-item-text">\n                            Detect panel on double tap\n                            <p class="tutorial__menu-helper-text">Zooms to the panel that is double tapped on when switching to Panel Zoom Mode, otherwise defaults to the first panel</p>\n                        </div>\n                    </li>\n                    <li class="tutorial__menu-item">\n                        <div class="checkbox">\n                          <input type="checkbox" value="true" id="showPageOnEnter-tut" name="showPageOnEnter" />\n                          <label for="showPageOnEnter-tut" class="checkbox__label"></label>\n                        </div>\n                        <div class="tutorial__menu-item-text">\n                            Show page on enter\n                        </div>\n                    </li>\n                    <li class="tutorial__menu-item">\n                        <div class="checkbox">\n                            <input type="checkbox" value="true" id="showPageOnExit-tut" name="showPageOnExit" />\n                            <label for="showPageOnExit-tut" class="checkbox__label"></label>\n                        </div>\n                        <div class="tutorial__menu-item-text">\n                            Show page on exit\n                        </div>\n                    </li>\n                </ul>\n            </form>\n            <div class="tutorial__cta">\n                <button class="tutorial__button tutorial__button--back" data-tutorial-back>Back</button style="visibility: hidden">\n                <ul class="tutorial__progress">\n                    <li class="tutorial__progress-step"></li>\n                    <li class="tutorial__progress-step"></li>\n                    <li class="tutorial__progress-step tutorial__progress-step--active"></li>\n                </ul>\n                <button class="tutorial__button" data-tutorial-done>Done</button>\n            </div>\n        </div>\n    </div>\n    <div class="viewport">\n        <div class="viewport__interactable"></div>\n        <div class="viewport__loading loading">\n            <div class="loading__progress"><span data-loaded-size class="loading__size"></span></div>\n            <p>Loading Comic...</p>\n        </div>\n        <div class="letterbox">\n            <div class="letterbox__horizontal letterbox__horizontal--top"></div>\n            <div class="letterbox__horizontal letterbox__horizontal--bottom"></div>\n            <div class="letterbox__vertical letterbox__vertical--left"></div>\n            <div class="letterbox__vertical letterbox__vertical--right"></div>\n        </div>\n        <div class="viewport__message viewport__message--hide message">\n            <div class="message__text">Panel Zoom mode activated.</div>\n        </div>\n        <ul class="viewport__menu menu">\n            <li class="menu__list-item">\n                <div href="#" class="menu__option" data-open-pane="pages">\n                    <i class="fa fa-clone fa-flip-horizontal menu__icon" aria-hidden="true"></i>\n                    <span class="menu__label">Pages</span>\n                </div>\n            </li>\n            <li class="menu__list-item">\n                <div class="menu__option menu__option--mode">\n                    Panel<br />Zoom\n                </div>\n            </li>\n            <li class="menu__list-item">\n                <div class="menu__option" data-open-pane="settings">\n                    <i class="fa fa-sliders menu__icon" aria-hidden="true"></i>\n                    <span class="menu__label">Settings</span>\n                </div>\n            </li>\n        </ul>\n        <div class="panes">\n            <div class="panes__pane pane pane--pages pane--hidden">\n                <div class="pane__container">\n                    <div class="pane__header">\n                        <span>Pages</span>\n                        <span class="pane__close" data-close>\n                            <i class="fa fa-times" aria-hidden="true"></i>\n                        </span>\n                    </div>\n                    <div class="pane__content">\n                        <ul class="page-list">\n                            <li class="page-list__page page-list__page--template" data-skip-to-page="">\n                                <img src="" class="page-list__image" />\n                                <span class="page-list__number"></span>\n                            </li>\n                        </ul>\n                    </div>\n                </div>\n            </div>\n            <div class="panes__pane pane pane--settings pane--full pane--hidden">\n                <div class="pane__container">\n                    <div class="pane__header">\n                        <span>Settings</span>\n                        <span class="pane__close" data-close>\n                            <i class="fa fa-times" aria-hidden="true"></i>\n                        </span>\n                    </div>\n                    <div class="pane__content">\n                        <div class="pane__heading">Panel Zoom</div>\n                        <ul class="pane__menu">\n                            <li class="pane__item">\n                                <div class="pane__text">\n                                    <p class="pane__option">Start new books in Panel Zoom Mode</p>\n                                </div>\n                                <div class="checkbox">\n                                  <input type="checkbox" value="true" id="startInPanelZoom" name="startInPanelZoom" />\n                                  <label for="startInPanelZoom" class="checkbox__label"></label>\n                                </div>\n                            </li>\n                            <li class="pane__item" data-open-pane="animations">\n                                <div class="pane__text">\n                                    <p class="pane__option">Animate Transitions</p>\n                                    <p class="pane__helper-text">Animate panel-to-panel transitions in Panel Zoom mode</p>\n                                </div>\n                            </li>\n                            <li class="pane__item" data-open-pane="letterboxing">\n                                <div class="pane__text">\n                                    <p class="pane__option">Letterboxing</p>\n                                    <p class="pane__helper-text">Use bars to mask content outside of the current panel</p>\n                                </div>\n                            </li>\n                            <li class="pane__item">\n                                <div class="pane__text">\n                                    <p class="pane__option">Detect panel on double tap</p>\n                                    <p class="pane__helper-text">Zooms to the panel that is double tapped on when switching to Panel Zoom Mode</p>\n                                </div>\n                                <div class="checkbox">\n                                  <input type="checkbox" value="true" id="detectPanelOnDoubleTap" name="detectPanelOnDoubleTap" />\n                                  <label for="detectPanelOnDoubleTap" class="checkbox__label"></label>\n                                </div>\n                            </li>\n                            <li class="pane__item">\n                                <div class="pane__text">\n                                    <p class="pane__option">Show page on enter</p>\n                                    <p class="pane__helper-text">Show full page on transitioning to a new page</p>\n                                </div>\n                                <div class="checkbox">\n                                  <input type="checkbox" value="true" id="showPageOnEnter" name="showPageOnEnter" />\n                                  <label for="showPageOnEnter" class="checkbox__label"></label>\n                                </div>\n                            </li>\n                            <li class="pane__item">\n                                <div class="pane__text">\n                                    <p class="pane__option">Show page on exit</p>\n                                    <p class="pane__helper-text">Show full page before transitioning to a new page</p>\n                                </div>\n                                <div class="checkbox">\n                                  <input type="checkbox" value="true" id="showPageOnExit" name="showPageOnExit" />\n                                  <label for="showPageOnExit" class="checkbox__label"></label>\n                                </div>\n                            </li>\n                        </ul>\n                        <div class="pane__heading">General</div>\n                        <ul class="pane__menu">\n                            <li class="pane__item">\n                                <div class="pane__text">\n                                    <p class="pane__option">Left-Handed Mode</p>\n                                    <p class="pane__helper-text">Tap the left side of your screen to advance pages or panels</p>\n                                </div>\n                                <div class="checkbox">\n                                  <input type="checkbox" value="true" id="leftHanded" name="leftHandMode" />\n                                  <label for="leftHanded" class="checkbox__label"></label>\n                                </div>\n                            </li>\n                            <li class="pane__item" data-open-pane="tutorial">\n                                <div class="pane__text">\n                                    <p class="pane__option">Tutorial</p>\n                                    <p class="pane__helper-text">Toggles the tutorial screens on or off</p>\n                                </div>\n                            </li>\n                            <li class="pane__item" data-open-pane="reset">\n                                <div class="pane__text">\n                                    <p class="pane__option">Reset</p>\n                                    <p class="pane__helper-text">Resets all app settings to their defaults</p>\n                                </div>\n                            </li>\n                            <li class="pane__item" data-open-pane="clearData">\n                                <div class="pane__text">\n                                    <p class="pane__option">Clear Data</p>\n                                    <p class="pane__helper-text">Clears all data, including local storage and all user settings</p>\n                                </div>\n                            </li>\n                        </ul>\n                    </div>\n                </div>\n            </div>\n            <div class="panes__pane pane pane--tutorial pane--modal pane--hidden" data-readable="Tutorial">\n                <div class="pane__container">\n                    <div class="pane__header">\n                        <span>Tutorial</span>\n                    </div>\n                    <div class="pane__content">\n                        <ul class="pane__menu">\n                            <li class="pane__item" data-readable="shown">\n                                <div class="pane__text">\n                                    <p class="pane__option">Show</p>\n                                </div>\n                                <div class="radio">\n                                  <input type="radio" value="true" id="show-tutorial" name="showTutorial" />\n                                  <label for="show-tutorial" class="radio__label"></label>\n                                </div>\n                            </li>\n                            <li class="pane__item" data-readable="hidden">\n                                <div class="pane__text">\n                                    <p class="pane__option">Hide</p>\n                                </div>\n                                <div class="radio">\n                                  <input type="radio" value="false" id="hide-tutorial" name="showTutorial" />\n                                  <label for="hide-tutorial" class="radio__label"></label>\n                                </div>\n                            </li>\n                        </ul>\n                        <div class="pane__actions">\n                            <button class="pane__button" data-close>Cancel</button>\n                        </div>\n                    </div>\n                </div>\n            </div>\n            <div class="panes__pane pane pane--letterboxing pane--modal pane--hidden" data-readable="Letterboxing">\n                <div class="pane__container">\n                    <div class="pane__header">\n                        <span>Letterboxing</span>\n                    </div>\n                    <form class="pane__content">\n                        <ul class="pane__menu">\n                            <li class="pane__item" data-readable="none">\n                                <div class="pane__text">\n                                    <p class="pane__option">No letterboxing</p>\n                                </div>\n                                <div class="radio">\n                                  <input type="radio" value="no" id="no-letterboxing" name="letterboxing" />\n                                  <label for="no-letterboxing" class="radio__label"></label>\n                                </div>\n                            </li>\n                            <li class="pane__item" data-readable="opaque">\n                                <div class="pane__text">\n                                    <p class="pane__option">Opaque letterboxing</p>\n                                </div>\n                                <div class="radio">\n                                  <input type="radio" value="opaque" id="opaque-letterboxing" name="letterboxing" />\n                                  <label for="opaque-letterboxing" class="radio__label"></label>\n                                </div>\n                            </li>\n                            <li class="pane__item" data-readable="solid">\n                                <div class="pane__text">\n                                    <p class="pane__option">Solid letterboxing (default)</p>\n                                </div>\n                                <div class="radio">\n                                  <input type="radio" value="solid" id="solid-letterboxing" name="letterboxing"/>\n                                  <label for="solid-letterboxing" class="radio__label"></label>\n                                </div>\n                            </li>\n                        </ul>\n                        <div class="pane__actions">\n                            <button class="pane__button" data-close>Cancel</button>\n                        </div>\n                    </form>\n                </div>\n            </div>\n            <div class="panes__pane pane pane--animations pane--modal pane--hidden" data-readable="Animate Transitions">\n                <div class="pane__container">\n                    <div class="pane__header">\n                        <span>Animate Transitions</span>\n                    </div>\n                    <form class="pane__content">\n                        <ul class="pane__menu">\n                            <li class="pane__item" data-readable="none">\n                                <div class="pane__text">\n                                    <p class="pane__option">No animation</p>\n                                </div>\n                                <div class="radio">\n                                  <input type="radio" value="0" id="no-animation" name="panelTransitions" />\n                                  <label for="no-animation" class="radio__label"></label>\n                                </div>\n                            </li>\n                            <li class="pane__item" data-readable="slow">\n                                <div class="pane__text">\n                                    <p class="pane__option">Slow animations</p>\n                                </div>\n                                <div class="radio">\n                                  <input type="radio" value="650" id="slow-animation" name="panelTransitions" />\n                                  <label for="slow-animation" class="radio__label"></label>\n                                </div>\n                            </li>\n                            <li class="pane__item" data-readable="fast">\n                                <div class="pane__text">\n                                    <p class="pane__option">Fast animations (default)</p>\n                                </div>\n                                <div class="radio">\n                                  <input type="radio" value="250" id="fast-animation" name="panelTransitions" />\n                                  <label for="fast-animation" class="radio__label"></label>\n                                </div>\n                            </li>\n                        </ul>\n                        <div class="pane__actions">\n                            <button class="pane__button" data-close>Cancel</button>\n                        </div>\n                    </form>\n                </div>\n            </div>\n            <div class="panes__pane pane pane--reset pane--modal pane--hidden">\n                <div class="pane__container">\n                    <div class="pane__header">\n                        <span>Reset Settings</span>\n                    </div>\n                    <div class="pane__content">\n                        <p>Are you sure you want to reset to the default settings?</p>\n                        <div class="pane__actions">\n                            <button class="pane__button" data-close>Cancel</button>\n                            <button class="pane__button" data-close data-reset-settings>Reset</button>\n                        </div>\n                    </div>\n                </div>\n            </div>\n            <div class="panes__pane pane pane--clearData pane--modal pane--hidden">\n                <div class="pane__container">\n                    <div class="pane__header">\n                        <span>Clear Data</span>\n                    </div>\n                    <div class="pane__content">\n                        <p>Are you sure you want to clear all application data?</p>\n                        <div class="pane__actions">\n                            <button class="pane__button" data-close>Cancel</button>\n                            <button class="pane__button" data-close data-clear-data>Clear</button>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n';