$(document).ready(function() {
    var PanelsApp = {
        init: function() {
            ViewPort.init();
            Menu.init();
            Book.init({
                pages: [
                    {
                        src: "/panelz/read/images/tmnt-01-01.png",
                        index: 0,
                        isFirst: true,
                        isLast: false,
                        panels: []
                    },
                    {
                        src: "/panelz/read/images/tmnt-01-02.png",
                        index: 1,
                        isFirst: false,
                        isLast: false,
                        panels: [
                            {
                                x: 40,
                                y: 90,
                                width: 626,
                                height: 442
                            },
                            {
                                x: 324,
                                y: 222,
                                width: 626,
                                height: 442
                            },
                            {
                                x: 0,
                                y: 0,
                                width: 954,
                                height: 776
                            },
                            {
                                x: 0,
                                y: 775,
                                width: 453,
                                height: 372
                            },
                            {
                                x: 456,
                                y: 808,
                                width: 495,
                                height: 344
                            },
                            {
                                x: 16,
                                y: 1154,
                                width: 550,
                                height: 298
                            },
                            {
                                x: 392,
                                y: 1154,
                                width: 556,
                                height: 298
                            }
                        ]
                    },
                    {
                        src: "/panelz/read/images/tmnt-01-03.png",
                        index: 2,
                        isFirst: false,
                        isLast: false,
                        panels: [
                            {
                                x: 0,
                                y: 0,
                                width: 510,
                                height: 340
                            },
                            {
                                x: 278,
                                y: 334,
                                width: 503,
                                height: 335
                            },
                            {
                                x: 20,
                                y: 20,
                                width: 1878,
                                height: 1436
                            }
                        ]
                    },
                    {
                        src: "/panelz/read/images/tmnt-01-04.png",
                        index: 3,
                        isFirst: false,
                        isLast: true,
                        panels: [
                            {
                                x: 75,
                                y: 0,
                                width: 713,
                                height: 175
                            },
                            {
                                x: 108,
                                y: 196,
                                width: 713,
                                height: 277
                            },
                            {
                                x: 790,
                                y: 258,
                                width: 161,
                                height: 390
                            },
                            {
                                x: 124,
                                y: 500,
                                width: 735,
                                height: 286
                            },
                            {
                                x: 30,
                                y: 820,
                                width: 480,
                                height: 640
                            },
                            {
                                x: 538,
                                y: 800,
                                width: 410,
                                height: 665
                            }
                        ]
                    }
                ]
            });
            $('[data-close]').on('click',function() {
                var $this = $(this);
                $this.closest('.pane').addClass('pane--hidden');
                $this.closest('.pane').find('.pane__content')[0].scrollTop = 0;
            });
        }
    };
    var Menu = {
        $menu: $('.menu'),

        init: function() {
            this.$menu.on('click','.menu__option--panel-zoom',this.onPanelZoomToggleClick.bind(this));
            $('[data-open-pane]').on('click',function() {
                $('.pane--' + $(this).attr('data-open-pane')).removeClass('pane--hidden');
            });
            $('.pane__item').on('click',function(e) {
                if( ! $(e.target).is(':radio, :checkbox, .checkbox__label') ) {
                    var $input = $(this).find(':radio, :checkbox');
                    var checked = $input.is(':radio') ? true : !$input.prop('checked');
                    $input.prop('checked',checked).trigger('change');
                    $input.closest('.pane--modal').find('[data-close]').trigger('click');
                }
            });
        },

        activateOption: function(option) {
            this.$menu.find('.menu__option--' + option).addClass('menu__option--active');
        },

        deactivateOption: function(option) {
            this.$menu.find('.menu__option--' + option).removeClass('menu__option--active');
        },

        onPanelZoomToggleClick: function(e) {
            ViewPort.switchModes();
        }
    }
    class Settings extends EventClass {
        constructor() {
            super();

            this.DEFAULTS = {
                leftHandMode: false,
                startInPanelZoom: false,
                panelTransitions: 250,
                letterboxing: 'solid',
                showPageOnEnter: true,
                showPageOnExit: true,
                showTutorial: true
            };

            this.config = {};

            this.localSettings = this.getLocalSettings();
            this.loadConfig($.extend({},this.DEFAULTS,this.getUserSettings()));
            this.setFields();
            this.setEventListeners();
        }

        setEventListeners() {
            $('[name="'+this.keys().join('"],[name="')+'"]').on('change',this.onFieldChange.bind(this));
            $('[data-reset-settings]').on('click',this.reset.bind(this));
            $('[data-clear-data]').on('click',this.clear.bind(this));
        }

        loadConfig(config) {
            Object.keys(config).forEach(function(setting) {
                this.set(setting,config[setting]);
            }.bind(this));
        }

        setFields() {
            this.keys().forEach(this.setField.bind(this));
        }

        setField(setting) {
            var $fields = $('[name="'+setting+'"]');
            var value = this.get(setting);
            $fields.each(function(index,field) {
                var $this = $(field);
                var fieldVal = $this.val();
                if( $this.is(':checkbox') ) {
                    $this.prop('checked',!!value);
                } else if( $this.is(':radio') && this.normalizeValue(fieldVal) == value ) {
                    $this.prop('checked',true);
                }
            }.bind(this));
        }

        normalizeValue(val) {
            val = isNaN(parseFloat(val)) ? val : parseInt(val);
            val = (val==='false') ? false : val;
            val = (val==='true') ? true : val;

            return val;
        }

        onFieldChange(e) {
            var $field = $(e.currentTarget);
            var val = $field.val();
            var name = $field.attr('name');

            if( $field.is(':checkbox') ) {
                val = $field.is(':checked');
            }

            this.set(name,this.normalizeValue(val));
        }

        reset() {
            this.loadConfig(this.DEFAULTS);
            this.setFields();
        }

        clear() {
            this.localSettings = {};
            localStorage.removeItem('panelz');
            this.reset();
        }

        get(setting) {
            return this.config[setting];
        }

        set(setting,val) {
            var oldVal = this.get(setting);
            this.config[setting] = val;
            this.setUserSettings();
            this.trigger('change:' + setting,{
                setting: setting,
                value: val,
                oldValue: oldVal,
                settings: this.config
            });
        }

        keys() {
            return Object.keys(this.config);
        }

        getLocalSettings() {
            try {
                var localSettings = JSON.parse(localStorage.getItem('panelz'));
                console.log('Local Settings:',localSettings);
                return localSettings ? localSettings : {};
            } catch( Exception ) {
                return {};
            }
        }

        setLocalSettings() {
            localStorage.setItem('panelz',JSON.stringify(this.localSettings))
        }

        remember(key,val) {
            this.localSettings[key] = val;
            this.setLocalSettings();
        }

        getLocalSetting(key) {
            return this.localSettings[key];
        }

        getUserSettings() {
            return this.getLocalSetting('settings') ? this.getLocalSetting('settings') : {};
        }

        setUserSettings() {
            this.remember('settings',this.config);
        }
    }
    class Tutorial extends EventClass {
        constructor(settings) {
            super();
            this.settings = settings;

            this.interactable = new Hammer.Manager($('.tutorial')[0]);
            this.interactable.add(new Hammer.Swipe());

            this.addEventListeners();

            if( this.settings.get('showTutorial') ) {
                this.show();
            }
        }

        addEventListeners() {
            $('body').on('click','[data-tutorial-next]',this.next.bind(this));
            $('body').on('click','[data-tutorial-back]',this.back.bind(this));
            $('body').on('click','[data-tutorial-done]',this.done.bind(this));

            this.settings.on('change:showTutorial',this.toggle.bind(this));

            this.interactable.on('swipeleft',this.next.bind(this));
            this.interactable.on('swiperight',this.back.bind(this));
        }

        next(e) {
            var $panel = $('.tutorial__panel:not(.tutorial__panel--hidden)');
            if( $panel.next().length ) {
                $panel.addClass('tutorial__panel--hidden');
                $panel.next().removeClass('tutorial__panel--hidden');
            }

        }

        back(e) {
            var $panel = $('.tutorial__panel:not(.tutorial__panel--hidden)');
            if( $panel.prev().length ) {
                $panel.addClass('tutorial__panel--hidden');
                $panel.prev().removeClass('tutorial__panel--hidden');
            }
        }

        done() {
            this.settings.set('showTutorial',false);
            this.settings.setField('showTutorial');
        }

        toggle(ev) {
            if(ev.value === true) {
                this.show();
            } else {
                this.hide();
            }
        }

        show() {
            $('.tutorial__panel').addClass('tutorial__panel--hidden').first().removeClass('tutorial__panel--hidden');
            $('.tutorial').removeClass('tutorial--hidden');
        }

        hide() {
            $('.tutorial').addClass('tutorial--hidden');
        }
    }
    var ViewPort = {

        $element: $('.viewport'),

        $container: $(window),

        $menu: $('.viewport__menu'),

        $horizontalLetterBox: $('.letterbox__horizontal'),

        $verticalLetterBox: $('.letterbox__vertical'),

        init: function() {
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

            if(this.MODE === this.PANEL_ZOOM_MODE) {
                Menu.activateOption('panel-zoom');
            }

            this.interactable = new Hammer.Manager(this.$element.find('.viewport__interactable')[0]);

            var pan = new Hammer.Pan({threshold: 20, enable: this.canRecognizePan.bind(this)});
            var pinch = new Hammer.Pinch({ threshold: 0 });
            var singletap = new Hammer.Tap({threshold: 2, posThreshold: 150});
            var doubletap = new Hammer.Tap({event: 'doubletap', taps: 2 });
            var swipe = new Hammer.Swipe({enable: this.canRecognizeSwipe.bind(this)});

            this.interactable.add([pan,singletap,doubletap,swipe]);

            //pinch.recognizeWith(pan);
            singletap.requireFailure(doubletap);

            $('body').on('touchend',function() {
                ViewPort.$menu.removeClass('viewport__menu--was-shown');
                if( ViewPort.$menu.hasClass('viewport__menu--active') ) {
                    ViewPort.$menu.removeClass('viewport__menu--active').addClass('viewport__menu--was-shown');
                }
            });

            $('body').on('click', '[data-skip-to-page]', function(e) {
                var $this = $(e.currentTarget);
                var page = $this.attr('data-skip-to-page');
                $this.closest('.pane').find('[data-close]').trigger('click');
                Book.skipToPage(page);
            }.bind(this));

            this.interactable.on('panend',function(ev) {
                var newPage = false;
                Book.pages.forEach(function(page) {
                    if(page.shouldBeSetAsCurrent(ev)) {
                        Book.setCurrentPage(page);
                    }
                });
                Book.snapPagesToCurrent();
            });
            this.interactable.on("tap", function(ev) {
                if( ev.tapCount >= 2 ) {
                    return ViewPort.switchModes();
                }
                var cmd = ViewPort.findTapZone(ev.center.x,ev.center.y);
                if( cmd === ViewPort.cmds.PAGE_FORWARD ) {
                    return Book.pageForward();
                }
                if( cmd === ViewPort.cmds.PAGE_BACK ) {
                    return Book.pageBackward();
                }
                if( cmd === ViewPort.cmds.TOGGLE_MAIN_MENU ) {
                    if( ! ViewPort.$menu.hasClass('viewport__menu--was-shown') ) {
                        ViewPort.$menu.addClass('viewport__menu--active');
                    }
                }
            });
            this.interactable.on("swipeleft", function(ev) {
                if( this.MODE === this.PANEL_ZOOM_MODE ) {
                    Book.pageForward();
                }
            });
            this.interactable.on("swiperight", function(ev) {
                if( this.MODE === this.PANEL_ZOOM_MODE ) {
                    Book.pageBackward();
                }
            });

            this.settings.on('change:letterboxing',function(data){
                this.LETTERBOX_STYLE = data.value;
                this.setLetterBoxStyle();
            }.bind(this));

            this.settings.on('change:leftHandMode',function(data){
                this.LEFT_HAND_MODE = data.value;
                this.setTapThresholds();
            }.bind(this));

            $(window).on('resize orientationchange',this.onResize.bind(this));
        },

        getInitalMode: function() {
            if( this.settings.getLocalSetting('mode') ) {
                return this.settings.getLocalSetting('mode');
            }
            return this.settings.get('startInPanelZoom') ? this.PANEL_ZOOM_MODE : this.PAGE_MODE;
        },

        canRecognizePan: function(rec, input) {
            return this.MODE === this.PAGE_MODE;
        },

        canRecognizeSwipe: function(rec, input) {
            return this.MODE === this.PANEL_ZOOM_MODE;
        },

        setContainer: function($container) {
            this.$container = $container;
        },

        switchModes: function() {
            var mode = (this.MODE === this.PAGE_MODE)
                ? this.PANEL_ZOOM_MODE
                : this.PAGE_MODE;
            this.setMode(mode);
            this.settings.remember('mode',mode);
        },

        setMode: function(mode) {
            this.MODE = mode;
            if( mode === ViewPort.PAGE_MODE ) {
                Book.setForPageMode();
                Menu.deactivateOption('panel-zoom');
                this.message('Page mode activated.');
            } else {
                Book.setForPanelZoomMode();
                Menu.activateOption('panel-zoom');
                this.message('Panel Zoom mode activated.');
            }
        },

        setEventListeners: function() {
            this.$container.on('resize',this.setViewPortSize.bind(this));
        },

        setViewPortSize: function(e) {
            this.$element.width(this.$container.outerWidth());
            this.$element.height(this.$container.outerHeight());
        },

        setTapThresholds: function() {
            if(this.LEFT_HAND_MODE) {
                this.PAGE_BACK_MIN = this.getWidth() - (this.getWidth() * this.PAGE_TURN_THRESHOLD);
                this.PAGE_BACK_MAX = this.getWidth();
                this.PAGE_FORWARD_MIN = 0;
                this.PAGE_FORWARD_MAX = this.getWidth() * this.PAGE_TURN_THRESHOLD;
            } else {
                this.PAGE_FORWARD_MIN = this.getWidth() - (this.getWidth() * this.PAGE_TURN_THRESHOLD);
                this.PAGE_FORWARD_MAX = this.getWidth();
                this.PAGE_BACK_MIN = 0;
                this.PAGE_BACK_MAX = this.getWidth() * this.PAGE_TURN_THRESHOLD;
            }
        },

        findTapZone: function(x,y) {
            if( x >= this.PAGE_BACK_MIN && x <= this.PAGE_BACK_MAX) {
                return this.cmds.PAGE_BACK;
            }
            if( x >= this.PAGE_FORWARD_MIN && x <= this.PAGE_FORWARD_MAX) {
                return this.cmds.PAGE_FORWARD;
            }
            return this.cmds.TOGGLE_MAIN_MENU;
        },

        setLetterBoxing: function(height,width,animate) {
            var horizSize = height > 0 ? height / 2 : 0;
            var vertSize = width > 0 ? width / 2 : 0;
            var speed = this.settings.get('panelTransitions');
            animate = typeof animate === 'undefined' ? true : animate;
            this.$horizontalLetterBox.animate({
                height: horizSize
            },{
                duration: animate ? speed : 0,
                easing: 'easeOutSine'
            });
            this.$verticalLetterBox.animate({
                width: vertSize
            },{
                duration: animate ? speed : 0,
                easing: 'easeOutSine'
            });
        },

        setLetterBoxStyle: function() {
            var opacity = (this.LETTERBOX_STYLE === 'no'
                ? 0
                :(this.LETTERBOX_STYLE === 'opaque'
                    ? 0.75
                    : 1));

            this.$horizontalLetterBox.css('opacity',opacity);
            this.$verticalLetterBox.css('opacity',opacity);
        },

        getWidth: function() {
            return this.$element.outerWidth();
        },

        getHeight: function() {
            return this.$element.outerHeight();
        },

        message: function(text) {
            /*var $messageContainer = $('.viewport__message');
            var $message = $('.message__text');
            $message.text(text);
            $messageContainer.removeClass('viewport__message--hide');
            setTimeout(function() {
                $messageContainer.addClass('viewport__message--hide');
            },3000);*/
        },

        onResize: function(e) {
            this.setViewPortSize();
            this.setTapThresholds();
            Book.pages.forEach(function(page) {
                page.centerInViewPort(false);
                page.setLeftPosition(Book.currentPage.index);
                if( ViewPort.MODE === ViewPort.PANEL_ZOOM_MODE && page.currentPanel ) {
                    page.zoomToPanel(page.currentPanel,false);
                }
            }.bind(this));
        }
    };

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

    PanelsApp.init();
});
