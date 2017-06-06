'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Book = {

    pages: [],

    loaded: 0,

    init: function init(config) {
        this.config = config;
        config.pages.forEach(function (page) {
            page = new Page(page);
            page.on('load', this.onPageLoaded.bind(this));
            this.pages.push(page);
        }.bind(this));
    },

    onPageLoaded: function onPageLoaded(page) {
        this.loaded += 1;
        if (this.loaded === this.pages.length) {
            this.onBookLoaded();
        }
    },

    onBookLoaded: function onBookLoaded() {
        var lastRead = ViewPort.settings.getLocalSetting('page');
        var pageToSet = lastRead ? lastRead : 0;
        this.setCurrentPage(this.pages[pageToSet]);
        this.currentPage.onPageEnterForward();
        this.pages.forEach(function (page, index) {
            page.setLeftPosition(pageToSet);
            if (ViewPort.MODE === ViewPort.PAGE_MODE || this.currentPage.index === index) {
                page.$container.animate({
                    opacity: 1
                }, { duration: 650, easing: 'easeOutSine' });
            }
        }.bind(this));
        this.buildPageIndex();
    },

    buildPageIndex: function buildPageIndex() {
        this.pages.forEach(function (page) {
            var $page = $('.page-list__page--template').clone().removeClass('page-list__page--template');
            $page.attr('data-skip-to-page', page.index + 1);
            $page.find('.page-list__image').attr('src', page.config.src);
            $page.find('.page-list__number').text(page.index + 1);
            $('.page-list').append($page);
        }.bind(this));
    },

    setCurrentPage: function setCurrentPage(page) {
        if (this.currentPage && this.currentPage.panels.length) {
            this.currentPage.currentPanel = false;
        }
        if (ViewPort.MODE === ViewPort.PANEL_ZOOM_MODE && this.currentPage) {
            this.currentPage.$container.animate({
                opacity: 0
            }, { duration: 550, easing: 'easeOutSine' });
        }
        this.currentPage = page;
        if (ViewPort.MODE === ViewPort.PANEL_ZOOM_MODE) {
            this.currentPage.$container.css('left', 0).animate({
                opacity: 1
            }, { duration: 550, easing: 'easeOutSine' });
        }

        ViewPort.settings.remember('page', page.index);
    },

    setForPageMode: function setForPageMode() {
        console.log('Set For Page mode');
        var currentIndex = this.currentPage.index;
        this.pages.forEach(function (page) {
            page.setLeftPosition(currentIndex);
            page.$container.css('opacity', 1);
        }.bind(this));
        this.currentPage.zoomOut();
    },

    setForPanelZoomMode: function setForPanelZoomMode() {
        console.log('Set for Panel Zoom mode');
        this.pages.forEach(function (page) {
            page.$container.css('left', 0).css('opacity', 0);
        }.bind(this));
        this.currentPage.$container.css('opacity', 1);

        if (this.currentPage.panels.length) {
            this.currentPage.onPageEnterForward();
        }
    },

    getNextPage: function getNextPage() {
        return this.pages[this.currentPage.index + 1];
    },

    getPreviousPage: function getPreviousPage() {
        return this.pages[this.currentPage.index - 1];
    },

    snapPagesToCurrent: function snapPagesToCurrent() {
        var amount = -this.currentPage.left;
        this.pages.forEach(function (page) {
            page.snapTo(amount);
        });
    },

    pageForward: function pageForward() {
        ViewPort.$menu.removeClass('viewport__menu--active');
        if (ViewPort.MODE === ViewPort.PANEL_ZOOM_MODE && this.currentPage.panels.length) {
            if (this.currentPage.hasNextPanel()) {
                console.log('Zoom to next panel');
                this.currentPage.zoomToPanel(this.currentPage.getNextPanel());
                return true;
            }
            if (this.currentPage.currentPanel !== false && !this.currentPage.hasNextPanel()) {
                console.log('Zoom out');
                this.currentPage.zoomOut();
                this.currentPage.previousPanel = this.currentPage.getLastPanel();
                if (ViewPort.settings.get('showPageOnExit')) {
                    return true;
                }
            }
        }

        if (this.currentPage.isLast) {
            return false;
        }
        this.currentPage.onPageLeaveFoward();
        this.setCurrentPage(this.getNextPage());
        if (ViewPort.MODE === ViewPort.PAGE_MODE) {
            this.snapPagesToCurrent();
        }
        this.currentPage.onPageEnterForward();
        return true;
    },

    pageBackward: function pageBackward() {
        ViewPort.$menu.removeClass('viewport__menu--active');
        if (ViewPort.MODE === ViewPort.PANEL_ZOOM_MODE && this.currentPage.panels.length) {
            if (this.currentPage.hasPreviousPanel()) {
                console.log('Zoom to last panel');
                this.currentPage.zoomToPanel(this.currentPage.getPreviousPanel());
                return true;
            }
            if (this.currentPage.currentPanel !== false && !this.currentPage.hasPreviousPanel()) {
                console.log('Zoom out');
                this.currentPage.zoomOut();
                this.currentPage.nextPanel = this.currentPage.getFirstPanel();
                if (ViewPort.settings.get('showPageOnEnter')) {
                    return true;
                }
            }
        }

        if (this.currentPage.isFirst) {
            return false;
        }
        this.currentPage.onPageLeaveBackward();
        this.setCurrentPage(this.getPreviousPage());
        if (ViewPort.MODE === ViewPort.PAGE_MODE) {
            this.snapPagesToCurrent();
        }
        this.currentPage.onPageEnterBackward();
    },

    skipToPage: function skipToPage(pageNum) {
        var page = this.pages[pageNum - 1];
        this.currentPage.zoomOut();
        this.setCurrentPage(page);
        this.pages.forEach(function (page) {
            page.setLeftPosition(pageNum - 1);
            page.$container.css('opacity', 1);
        }.bind(this));
        if (ViewPort.MODE === ViewPort.PAGE_MODE) {
            this.setForPageMode();
        } else {
            this.setForPanelZoomMode();
        }
    }

};

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

var Menu = {
    $menu: $('.menu'),

    init: function init() {
        this.$menu.on('click', '.menu__option--panel-zoom', this.onPanelZoomToggleClick.bind(this));
        $('[data-open-pane]').on('click', function () {
            $('.pane--' + $(this).attr('data-open-pane')).removeClass('pane--hidden');
        });
        $('.pane__item').on('click', function (e) {
            if (!$(e.target).is(':radio, :checkbox, .checkbox__label')) {
                var $input = $(this).find(':radio, :checkbox');
                var checked = $input.is(':radio') ? true : !$input.prop('checked');
                $input.prop('checked', checked).trigger('change');
                $input.closest('.pane--modal').find('[data-close]').trigger('click');
            }
        });
    },

    activateOption: function activateOption(option) {
        this.$menu.find('.menu__option--' + option).addClass('menu__option--active');
    },

    deactivateOption: function deactivateOption(option) {
        this.$menu.find('.menu__option--' + option).removeClass('menu__option--active');
    },

    onPanelZoomToggleClick: function onPanelZoomToggleClick(e) {
        ViewPort.switchModes();
    }
};

var Page = function (_EventClass) {
    _inherits(Page, _EventClass);

    function Page(config) {
        _classCallCheck(this, Page);

        var _this = _possibleConstructorReturn(this, (Page.__proto__ || Object.getPrototypeOf(Page)).call(this));

        _this.config = config;
        _this.index = config.index;
        _this.isFirst = config.isFirst;
        _this.isLast = config.isLast;
        _this.panels = [];
        _this.PANEL_ANIMATION_SPEED = ViewPort.settings.get('panelTransitions');
        _this.SHOW_PAGE_ON_ENTER = ViewPort.settings.get('showPageOnEnter');
        _this.SHOW_PAGE_ON_EXIT = ViewPort.settings.get('showPageOnExit');
        _this.TURN_THRESHHOLD = 30;
        _this.currentPanel = false;
        _this.previousPanel = false;
        _this.nextPanel = false;
        _this.lastPanelSeen = false;
        _this.loadSrc(config.src);
        config.panels.forEach(function (panel, index) {
            this.panels.push(new Panel(this, panel, index));
        }.bind(_this));
        ViewPort.settings.on('change:panelTransitions', function (data) {
            this.PANEL_ANIMATION_SPEED = data.value;
        }.bind(_this));
        ViewPort.settings.on('change:showPageOnEnter', function (data) {
            this.SHOW_PAGE_ON_ENTER = data.value;
        }.bind(_this));
        ViewPort.settings.on('change:showPageOnExit', function (data) {
            this.SHOW_PAGE_ON_EXIT = data.value;
        }.bind(_this));
        return _this;
    }

    _createClass(Page, [{
        key: 'loadSrc',
        value: function loadSrc(src) {
            $('<img src="' + src + '" />').on('load', this.onPageLoaded.bind(this));
        }
    }, {
        key: 'onPageLoaded',
        value: function onPageLoaded(e) {
            this.$container = $('<div />').addClass('book__page page').appendTo(ViewPort.$element);
            this.$element = $(e.currentTarget).addClass('page__image').appendTo(this.$container);
            this.originalWidth = this.$element.width();
            this.originalHeight = this.$element.height();
            this.centerInViewPort();

            ViewPort.interactable.on("panstart", function (ev) {
                this.originalLeft = parseInt(this.$container.css("left"), 10);
            }.bind(this));
            ViewPort.interactable.on("pan", function (ev) {
                // Stop vertical pan flick
                if (ev.offsetDirection === 8) {
                    return true;
                }
                this.left = this.originalLeft + ev.deltaX;
                this.$container.css({
                    "left": this.left
                });
            }.bind(this));
            ViewPort.interactable.on("pinch", function (env) {
                console.log(env);
            });

            this.trigger('load:page', this);
        }
    }, {
        key: 'onPageEnterForward',
        value: function onPageEnterForward() {
            if (ViewPort.MODE === ViewPort.PANEL_ZOOM_MODE && this.panels.length) {
                this.nextPanel = this.getFirstPanel();
                this.previousPanel = this.getPreviousPanel();
                if (!this.SHOW_PAGE_ON_ENTER || this.nextPanel.index !== 0) {
                    this.zoomToPanel(this.nextPanel);
                }
            }
        }
    }, {
        key: 'onPageLeaveFoward',
        value: function onPageLeaveFoward() {}
    }, {
        key: 'onPageEnterBackward',
        value: function onPageEnterBackward() {
            if (ViewPort.MODE === ViewPort.PANEL_ZOOM_MODE && this.panels.length) {
                this.previousPanel = this.getLastPanel();
                this.nextPanel = this.getNextPanel();
                if (!this.SHOW_PAGE_ON_EXIT) {
                    this.zoomToPanel(this.previousPanel);
                }
            }
        }
    }, {
        key: 'onPageLeaveBackward',
        value: function onPageLeaveBackward() {}
    }, {
        key: 'centerInViewPort',
        value: function centerInViewPort(animate) {
            var width = ViewPort.getWidth();
            var height = this.getOriginalHeight() * ViewPort.getWidth() / this.getOriginalWidth();

            if (height > ViewPort.getHeight()) {
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
            this.left = (this.index - offset) * ViewPort.getWidth();
            this.$container.css('left', this.left);
        }
    }, {
        key: 'setCurrentPanel',
        value: function setCurrentPanel(panel) {
            this.lastPanelSeen = this.currentPanel;
            this.currentPanel = panel;
        }
    }, {
        key: 'setNextPanel',
        value: function setNextPanel() {
            this.nextPanel = this.currentPanel !== false ? this.currentPanel.nextPanel !== false ? this.panels[this.currentPanel.nextPanel] : false : false;
        }
    }, {
        key: 'setPreviousPanel',
        value: function setPreviousPanel() {
            this.previousPanel = this.currentPanel !== false ? this.currentPanel.previousPanel !== false ? this.panels[this.currentPanel.previousPanel] : false : false;
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
            if (ViewPort.settings.getLocalSetting('panel')) {
                return this.panels[ViewPort.settings.getLocalSetting('panel')];
            }
            return this.panels.length ? this.panels[0] : false;
        }
    }, {
        key: 'zoomToPanel',
        value: function zoomToPanel(panel, animate) {
            var width = panel.getWidth() >= panel.getHeight() ? ViewPort.getWidth() : panel.getWidth() * ViewPort.getHeight() / panel.getHeight();
            var height = panel.getHeight() > panel.getWidth() ? ViewPort.getHeight() : panel.getHeight() * ViewPort.getWidth() / panel.getWidth();

            if (width > ViewPort.getWidth()) {
                width = ViewPort.getWidth();
                height = panel.getHeight() * ViewPort.getWidth() / panel.getWidth();
            }

            if (height > ViewPort.getHeight()) {
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
                left: -left + (ViewPort.getWidth() - width) / 2,
                width: pageWidth,
                height: pageHeight
            }, {
                duration: animate ? this.PANEL_ANIMATION_SPEED : 0,
                easing: 'easeOutSine'
            });

            ViewPort.setLetterBoxing(ViewPort.getHeight() - height, ViewPort.getWidth() - width, animate);

            this.setCurrentPanel(panel);
            this.setNextPanel();
            this.setPreviousPanel();
            ViewPort.settings.remember('panel', panel.index);
        }
    }, {
        key: 'zoomOut',
        value: function zoomOut() {
            this.setCurrentPanel(false);
            this.centerInViewPort(true);
            this.setCurrentPanel(false);
            ViewPort.setLetterBoxing(0, 0);
            ViewPort.settings.remember('panel', false);
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

var Panelz = function (_EventClass2) {
    _inherits(Panelz, _EventClass2);

    function Panelz(config) {
        _classCallCheck(this, Panelz);

        var _this2 = _possibleConstructorReturn(this, (Panelz.__proto__ || Object.getPrototypeOf(Panelz)).call(this));

        ViewPort.init();
        Menu.init();
        Book.init(config);
        return _this2;
    }

    return Panelz;
}(EventClass);

var Settings = function (_EventClass3) {
    _inherits(Settings, _EventClass3);

    function Settings() {
        _classCallCheck(this, Settings);

        var _this3 = _possibleConstructorReturn(this, (Settings.__proto__ || Object.getPrototypeOf(Settings)).call(this));

        _this3.DEFAULTS = {
            leftHandMode: false,
            startInPanelZoom: false,
            panelTransitions: 250,
            letterboxing: 'solid',
            showPageOnEnter: true,
            showPageOnExit: true,
            showTutorial: true
        };

        _this3.config = {};

        _this3.localSettings = _this3.getLocalSettings();
        _this3.loadConfig($.extend({}, _this3.DEFAULTS, _this3.getUserSettings()));
        _this3.setFields();
        _this3.setEventListeners();
        return _this3;
    }

    _createClass(Settings, [{
        key: 'setEventListeners',
        value: function setEventListeners() {
            $('[name="' + this.keys().join('"],[name="') + '"]').on('change', this.onFieldChange.bind(this));
            $('[data-reset-settings]').on('click', this.reset.bind(this));
            $('[data-clear-data]').on('click', this.clear.bind(this));
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

var Tutorial = function (_EventClass4) {
    _inherits(Tutorial, _EventClass4);

    function Tutorial(settings) {
        _classCallCheck(this, Tutorial);

        var _this4 = _possibleConstructorReturn(this, (Tutorial.__proto__ || Object.getPrototypeOf(Tutorial)).call(this));

        _this4.settings = settings;

        _this4.interactable = new Hammer.Manager($('.tutorial')[0]);
        _this4.interactable.add(new Hammer.Swipe());

        _this4.addEventListeners();

        if (_this4.settings.get('showTutorial')) {
            _this4.show();
        }
        return _this4;
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

var ViewPort = {

    $element: $('.viewport'),

    $container: $(window),

    $menu: $('.viewport__menu'),

    $horizontalLetterBox: $('.letterbox__horizontal'),

    $verticalLetterBox: $('.letterbox__vertical'),

    init: function init() {
        this.settings = new Settings();
        this.tutorial = new Tutorial(this.settings);

        this.PAGE_MODE = 'PAGE_MODE';
        this.PANEL_ZOOM_MODE = 'PANEL_ZOOM_MODE';
        this.MODE = this.getInitalMode();
        this.PAGE_TURN_THRESHOLD = 0.25;
        this.LETTERBOX_STYLE = this.settings.get('letterboxing');
        this.LEFT_HAND_MODE = this.settings.get('leftHandMode');
        this.cmds = {};
        this.cmds.PAGE_BACK = 'PAGE_BACK';
        this.cmds.PAGE_FORWARD = 'PAGE_FORWARD';
        this.cmds.TOGGLE_MAIN_MENU = 'TOGGLE_MAIN_MENU';

        this.setEventListeners();
        this.setViewPortSize();
        this.setTapThresholds();

        if (this.MODE === this.PANEL_ZOOM_MODE) {
            Menu.activateOption('panel-zoom');
        }

        this.interactable = new Hammer.Manager(this.$element.find('.viewport__interactable')[0]);

        var pan = new Hammer.Pan({ threshold: 20, enable: this.canRecognizePan.bind(this) });
        var pinch = new Hammer.Pinch({ threshold: 0 });
        var singletap = new Hammer.Tap({ threshold: 2, posThreshold: 150 });
        var doubletap = new Hammer.Tap({ event: 'doubletap', taps: 2 });
        var swipe = new Hammer.Swipe({ enable: this.canRecognizeSwipe.bind(this) });

        this.interactable.add([pan, singletap, doubletap, swipe]);

        //pinch.recognizeWith(pan);
        singletap.requireFailure(doubletap);

        $('body').on('touchend', function () {
            ViewPort.$menu.removeClass('viewport__menu--was-shown');
            if (ViewPort.$menu.hasClass('viewport__menu--active')) {
                ViewPort.$menu.removeClass('viewport__menu--active').addClass('viewport__menu--was-shown');
            }
        });

        $('body').on('click', '[data-skip-to-page]', function (e) {
            var $this = $(e.currentTarget);
            var page = $this.attr('data-skip-to-page');
            $this.closest('.pane').find('[data-close]').trigger('click');
            Book.skipToPage(page);
        }.bind(this));

        $('[data-close]').on('click', function () {
            var $this = $(this);
            $this.closest('.pane').addClass('pane--hidden');
            $this.closest('.pane').find('.pane__content')[0].scrollTop = 0;
        });

        this.interactable.on('panend', function (ev) {
            var newPage = false;
            Book.pages.forEach(function (page) {
                if (page.shouldBeSetAsCurrent(ev)) {
                    Book.setCurrentPage(page);
                }
            });
            Book.snapPagesToCurrent();
        });
        this.interactable.on("tap", function (ev) {
            if (ev.tapCount >= 2) {
                return ViewPort.switchModes();
            }
            var cmd = ViewPort.findTapZone(ev.center.x, ev.center.y);
            if (cmd === ViewPort.cmds.PAGE_FORWARD) {
                return Book.pageForward();
            }
            if (cmd === ViewPort.cmds.PAGE_BACK) {
                return Book.pageBackward();
            }
            if (cmd === ViewPort.cmds.TOGGLE_MAIN_MENU) {
                if (!ViewPort.$menu.hasClass('viewport__menu--was-shown')) {
                    ViewPort.$menu.addClass('viewport__menu--active');
                }
            }
        });
        this.interactable.on("swipeleft", function (ev) {
            if (this.MODE === this.PANEL_ZOOM_MODE) {
                Book.pageForward();
            }
        });
        this.interactable.on("swiperight", function (ev) {
            if (this.MODE === this.PANEL_ZOOM_MODE) {
                Book.pageBackward();
            }
        });

        this.settings.on('change:letterboxing', function (data) {
            this.LETTERBOX_STYLE = data.value;
            this.setLetterBoxStyle();
        }.bind(this));

        this.settings.on('change:leftHandMode', function (data) {
            this.LEFT_HAND_MODE = data.value;
            this.setTapThresholds();
        }.bind(this));

        $(window).on('resize orientationchange', this.onResize.bind(this));
    },

    getInitalMode: function getInitalMode() {
        if (this.settings.getLocalSetting('mode')) {
            return this.settings.getLocalSetting('mode');
        }
        return this.settings.get('startInPanelZoom') ? this.PANEL_ZOOM_MODE : this.PAGE_MODE;
    },

    canRecognizePan: function canRecognizePan(rec, input) {
        return this.MODE === this.PAGE_MODE;
    },

    canRecognizeSwipe: function canRecognizeSwipe(rec, input) {
        return this.MODE === this.PANEL_ZOOM_MODE;
    },

    setContainer: function setContainer($container) {
        this.$container = $container;
    },

    switchModes: function switchModes() {
        var mode = this.MODE === this.PAGE_MODE ? this.PANEL_ZOOM_MODE : this.PAGE_MODE;
        this.setMode(mode);
        this.settings.remember('mode', mode);
    },

    setMode: function setMode(mode) {
        this.MODE = mode;
        if (mode === ViewPort.PAGE_MODE) {
            Book.setForPageMode();
            Menu.deactivateOption('panel-zoom');
            this.message('Page mode activated.');
        } else {
            Book.setForPanelZoomMode();
            Menu.activateOption('panel-zoom');
            this.message('Panel Zoom mode activated.');
        }
    },

    setEventListeners: function setEventListeners() {
        this.$container.on('resize', this.setViewPortSize.bind(this));
    },

    setViewPortSize: function setViewPortSize(e) {
        this.$element.width(this.$container.outerWidth());
        this.$element.height(this.$container.outerHeight());
    },

    setTapThresholds: function setTapThresholds() {
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
    },

    findTapZone: function findTapZone(x, y) {
        if (x >= this.PAGE_BACK_MIN && x <= this.PAGE_BACK_MAX) {
            return this.cmds.PAGE_BACK;
        }
        if (x >= this.PAGE_FORWARD_MIN && x <= this.PAGE_FORWARD_MAX) {
            return this.cmds.PAGE_FORWARD;
        }
        return this.cmds.TOGGLE_MAIN_MENU;
    },

    setLetterBoxing: function setLetterBoxing(height, width, animate) {
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
    },

    setLetterBoxStyle: function setLetterBoxStyle() {
        var opacity = this.LETTERBOX_STYLE === 'no' ? 0 : this.LETTERBOX_STYLE === 'opaque' ? 0.75 : 1;

        this.$horizontalLetterBox.css('opacity', opacity);
        this.$verticalLetterBox.css('opacity', opacity);
    },

    getWidth: function getWidth() {
        return this.$element.outerWidth();
    },

    getHeight: function getHeight() {
        return this.$element.outerHeight();
    },

    message: function message(text) {
        /*var $messageContainer = $('.viewport__message');
        var $message = $('.message__text');
        $message.text(text);
        $messageContainer.removeClass('viewport__message--hide');
        setTimeout(function() {
            $messageContainer.addClass('viewport__message--hide');
        },3000);*/
    },

    onResize: function onResize(e) {
        this.setViewPortSize();
        this.setTapThresholds();
        Book.pages.forEach(function (page) {
            page.centerInViewPort(false);
            page.setLeftPosition(Book.currentPage.index);
            if (ViewPort.MODE === ViewPort.PANEL_ZOOM_MODE && page.currentPanel) {
                page.zoomToPanel(page.currentPanel, false);
            }
        }.bind(this));
    }
};