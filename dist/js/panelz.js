// https://github.com/sroucheray/event-class
const multiChannelSep = /(?:,|\s)+/g;
const channelSep = /:+/g;
const channelsSymbol = Symbol('channels');

class EventClass {
    constructor(){
        this[channelsSymbol] = {};
    }

    _getChannels(channelString){
        return channelString.trim().split(multiChannelSep);
    }

    _getNameSpaces(channel){
        let namespaces = [];
        let splittedChannels = channel.trim().split(channelSep);

        for (let i = splittedChannels.length; i >= 1; i--) {
            namespaces.push(splittedChannels.slice(0, i).join(':'));
        }

        return namespaces;
    }

    trigger(event, data){
        let channels = this._getChannels(event);

        for (let channel of channels){
            let namespaces = this._getNameSpaces(channel);
            for (let namespace of namespaces){
                if(!this[channelsSymbol][namespace]){
                    continue;
                }

                for(let callback of this[channelsSymbol][namespace]){
                    callback.call(this, data);
                }
            }
        }
    }

    on(event, callback){
        let channels = this._getChannels(event);

        for (let channel of channels){
            if(!this[channelsSymbol][channel]){
                this[channelsSymbol][channel] = [];
            }

            this[channelsSymbol][channel].push(callback);
        }
    }

    off(event, callback){
        let channels = this._getChannels(event);

        for (let channel of channels){
            if(!this[channelsSymbol][channel]){
                return;
            }

            let index = this[channelsSymbol][channel].indexOf(callback);

            if(index > -1){
                this[channelsSymbol][channel].splice(index, 1);
            }
        }
    }

    once(event, callback){
        function offCallback(){
            this.off(event, callback);
            this.off(event, offCallback);
        }

        this.on(event, callback);
        this.on(event, offCallback);
    }
}

class Book extends EventClass {

    constructor(config) {
        super();
        this.config = config;
        this.app = config.app;
        this.pages = [];
        this.loaded = 0;
        this.panFrozen = false;
        this.zoomPanAmount = 0;
        this.setEventListeners();
        config.comic.pages.forEach(function(pageConfig,index) {
            pageConfig.app = this.app;
            pageConfig.panels = pageConfig.panels || [];
            var page = new Page(this,pageConfig,index);
            page.on('load',this.onPageLoaded.bind(this));
            this.pages.push(page);
        }.bind(this));
    }

    setEventListeners() {
        this.app.on('change:mode',this.onModeChange.bind(this));
        this.app.on('user:skipToPage',this.skipToPage.bind(this));
        this.app.on('user:panend',this.onPanEnd.bind(this));
        this.app.on('user:pageForward',this.pageForward.bind(this));
        this.app.on('user:pageBackward',this.pageBackward.bind(this));
    }

    onPageLoaded(page) {
        this.loaded += 1;
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
        this.trigger('load:book',this);
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
            $page.find('.page-list__image').attr('src',page.config.src);
            $page.find('.page-list__number').text(page.index+1);
            $('.page-list').append($page);
        }.bind(this));
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
            this.currentPage.zoomToPanel(this.currentPage.getFirstPanel());
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

class Menu extends EventClass {
    constructor(config) {
        super();
        this.app = config.app;
        this.$menu = $('.viewport__menu');

        this.setEventListeners();

        this.onModeChange(this.app.mode);

    }

    setEventListeners() {
        $('body').on('touchend click','.menu__option--mode',this.onModeToggleClick.bind(this));
        this.app.on('change:mode',this.onModeChange.bind(this));
    }

    activateOption(option) {
        this.$menu.find('.menu__option--' + option).addClass('menu__option--active');
    }

    deactivateOption(option) {
        this.$menu.find('.menu__option--' + option).removeClass('menu__option--active');
    }

    onModeToggleClick(e) {
        e.preventDefault();
        this.app.switchModes();
    }

    onModeChange(mode) {
        if( mode === PAGE_MODE ) {
            this.$menu.find('.menu__option--mode').html('Page<br />Mode');
        } else {
            this.$menu.find('.menu__option--mode').html('Panel Zoom<br />Mode');
        }
    }
};

class Page extends EventClass {
    constructor(Book,config,index) {
        super();
        this.config = config;
        this.app = config.app;
        this.book = Book;
        this.index = index;
        this.isFirst = index===0;
        this.isLast = index===this.book.config.comic.pages.length-1;
        this.isCurrentPage = false;
        this.scale = 1;
        this.lastScale = 1;
        this.leftEdge = true;
        this.rightEdge = true;
        this.panels = [];
        this.PANEL_ANIMATION_SPEED = this.app.settings.get('panelTransitions');
        this.SHOW_PAGE_ON_ENTER = this.app.settings.get('showPageOnEnter');
        this.SHOW_PAGE_ON_EXIT = this.app.settings.get('showPageOnExit');
        this.TURN_THRESHHOLD = 30;
        this.currentPanel = false;
        this.previousPanel = false;
        this.nextPanel = false;
        this.lastPanelSeen = false;
        this.loadSrc(config.url);
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
        this.book.on('pageSet',function(page) {
            this.isCurrentPage = (page.index===this.index);
        }.bind(this));
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
            this.elementOriginalLeft = parseInt( this.$element.css( "margin-left" ), 10 );
            this.elementOriginalTop = parseInt( this.$element.css( "margin-top" ), 10 );
            if( this.scale == 1 ) {
                this.originalLeft = parseInt( this.$container.css( "left" ), 10 );
            }
            this.book.zoomPanAmount = 0;
        }.bind(this));
        this.app.on("user:pan", function(ev) {
            if( this.isCurrentPage && this.scale !== 1 ) {
                var maxTop = ((this.getHeight() * this.scale) - this.getFullHeight()) / 2;
                var minTop = maxTop * -1;
                var deltaY = this.elementOriginalTop + ev.deltaY;
                var top = Math.min(maxTop,Math.max(deltaY,minTop));
                this.$element.css( {
                    "margin-top": top
                } );
            } else if(ev.offsetDirection === 8) {
                return true;
            }
        }.bind(this));

        // panleft = rightedge = forward
        this.app.on("user:panleft", function(ev) {
            if( this.isCurrentPage && this.scale !== 1 ) {
                var elLeft = parseInt( this.$element.css( "left" ), 10 )
                var maxLeft = (((this.getWidth() * this.scale) - this.getFullWidth()) / 2);
                var minLeft = maxLeft * -1;
                if( this.getWidth() * this.scale < this.getFullWidth() ) {
                    maxLeft = 0;
                }
                var deltaX = this.elementOriginalLeft + ev.deltaX;
                var left = Math.min(maxLeft,Math.max(deltaX,minLeft));

                var rightEdgeBefore = this.rightEdge;
                this.rightEdge = (left<=minLeft) ? true : false;
                if(rightEdgeBefore !== this.rightEdge && this.rightEdge ) {
                    this.book.panFrozen = false;
                    this.book.zoomPanAmount = ev.deltaX;
                }

                if(this.book.panFrozen) {
                    this.$element.css( {
                        "margin-left": left
                    } );
                }
            } else if( this.book.panFrozen ) {
                // Helps make sure the other pages are set correctly (math isn't quite right)
                this.setLeftPosition(this.book.currentPage.index);
            }

            if( ! this.book.panFrozen ) {
                this.left = this.originalLeft + ev.deltaX - this.book.zoomPanAmount;
                this.$container.css( {
                    "left": this.left
                } );

                if( this.isCurrentPage && this.scale !== 1 && this.left < 0 && ! this.rightEdge ) {
                    this.book.panFrozen = true;
                }
            }
        }.bind(this));

        // panright = leftedge = back
        this.app.on("user:panright", function(ev) {
            if( this.isCurrentPage && this.scale !== 1 ) {
                var elLeft = parseInt( this.$element.css( "left" ), 10 )
                var maxLeft = (((this.getWidth() * this.scale) - this.getFullWidth()) / 2);
                var minLeft = maxLeft * -1;
                if( this.getWidth() * this.scale < this.getFullWidth() ) {
                    maxLeft = 0;
                }
                var deltaX = this.elementOriginalLeft + ev.deltaX;
                var left = Math.min(maxLeft,Math.max(deltaX,minLeft));

                var leftEdgeBefore = this.leftEdge;
                this.leftEdge = (left==maxLeft) ? true : false;
                if(leftEdgeBefore !== this.leftEdge && this.leftEdge ) {
                    this.book.panFrozen = false;
                    this.book.zoomPanAmount = ev.deltaX;
                }

                if(this.book.panFrozen) {
                    this.$element.css( {
                        "margin-left": left
                    } );
                }
            } else if( this.book.panFrozen ) {
                // Helps make sure the other pages are set correctly (math isn't quite right)
                this.setLeftPosition(this.book.currentPage.index);
            }

            if( ! this.book.panFrozen ) {
                this.left = this.originalLeft + ev.deltaX - this.book.zoomPanAmount;
                this.$container.css( {
                    "left": this.left
                } );
                if( this.isCurrentPage && this.scale !== 1 && this.left >=0 && ! this.leftEdge ) {
                    this.book.panFrozen = true;
                }
            }
        }.bind(this));

        this.app.on("user:pinch",function(e) {
            if( ! this.isCurrentPage ) {
                return;
            }
            if(this.app.mode !== PAGE_MODE) {
                this.app.switchModes();
            }
            this.magnify(e.scale - (1-this.lastScale));
        }.bind(this));

        this.app.on("user:pinchend",function(e) {
            if( ! this.isCurrentPage ) {
                return;
            }

            this.book.panFrozen = true;

            if( this.scale < 1 ) {
                return this.resetScale();
            }

            if( this.scale > 3 ) {
                this.magnify(3,true);
                this.lastScale = this.scale;
                return;
            }

            this.lastScale = this.scale;
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
            height: height,
            'margin-left': 0,
            'margin-top': 0
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

    magnify(amount,animate) {
        var animateClass = animate ? 'page__image--transition' : '';

        this.scale = amount;

        this.$element.addClass(animateClass).css({
            transform: 'scale('+this.scale+')'
        });

        if( animate ) {
            setTimeout(function() {
                this.$element.removeClass('page__image--transition');
            }.bind(this),260);
        }
    }

    resetScale(animate) {
        this.magnify(1,animate);
        this.lastScale = 1;
        this.leftEdge = true;
        this.rightEdge = true;
        this.book.panFrozen = false;
        this.$element.css({
            'margin-left': 0,
            'margin-top': 0
        });
    }

    snapTo(amount) {
        this.left = this.left + amount;
        this.originalLeft = this.left;
        this.$container.animate({
            left: this.left
        },{
            duration: 250,
            easing: 'easeOutSine',
            complete: function() {
                if( ! this.isCurrentPage && this.scale !== 1 ) {
                    this.resetScale();
                }
                // Makes sure the left position is correct
                this.setLeftPosition(this.book.currentPage.index);
            }.bind(this)
        });
    }

    setLeftPosition(offset) {
        if( typeof offset === 'undefined' ) {
            offset = 0;
        }
        this.left = (this.index-offset) * this.app.getViewPortSize().width;
        this.originalLeft = this.left;
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
            'top': -top + (viewPortHeight - height) / 2,
            'left': -left + ((viewPortWidth - width) / 2),
            width: pageWidth,
            height: pageHeight
        },{
            duration: animate ? this.PANEL_ANIMATION_SPEED : 0,
            easing: 'easeOutSine'
        });

        this.app.setLetterBoxing(viewPortWidth-width,viewPortHeight-height,animate);

        this.setCurrentPanel(panel);
        this.app.settings.rememberBookSetting('panel',panel.index);
    }

    zoomOut() {
        this.setCurrentPanel(false);
        this.centerInViewPort(true);
        this.app.setLetterBoxing(0,0);
        this.app.settings.rememberBookSetting('panel',false);
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


const PAGE_MODE = 'PAGE_MODE';
const PANEL_ZOOM_MODE = 'PANEL_ZOOM_MODE';
const PAGE_BACK = 'PAGE_BACK';
const PAGE_FORWARD = 'PAGE_FORWARD';
const TOGGLE_MAIN_MENU = 'TOGGLE_MAIN_MENU';

class Panelz extends EventClass {
    constructor(config) {
        super();

        this.DEFAULTS = {
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

        this.config = $.extend(true,{},this.DEFAULTS,config);

        this.settings = new Settings(this);

        if(this.config.id) {
            this.fetchBookData();
        } else {
            this.setupBook();
        }
    }

    set config(config) {
        this.endpoints = config.endpoints;
        this.$container = $(config.container);
        config.app = this;
        this._config = config;
    }

    get config() {
        return this._config;
    }

    set $container($container) {
        this._$container = $container.append(PANELZ_MARKUP);
    }

    get $container() {
        return _$container;
    }

    getEndpoint(endpoint){
        return this.endpoints[endpoint];
    }

    fetchBookData() {
        $.ajax({
            url: this.getEndpoint('get') + this.config.id,
            method: 'GET',
            error: this.onRequestError.bind(this),
            success: this.onBookDataFetched.bind(this)
        });
    }

    onBookDataFetched(comic) {
        this.config.comic = comic;

        this.setupBook();
    }

    onRequestError() {
        console.log('ERROR FETCHING BOOK DATA!',response);
    }

    setupBook() {
        this.setInitialMode();

        this.tutorial = new Tutorial(this.settings);
        this.menu = new Menu(this.config);
        this.viewport = new ViewPort(this.config);
        this.book = new Book(this.config);

        this.setEventListeners();
    }

    setInitialMode() {
        if( this.settings.getBookSetting('mode') ) {
            this.mode = this.settings.getBookSetting('mode');
        } else {
            this.mode = this.settings.get('startInPanelZoom') ? PANEL_ZOOM_MODE : PAGE_MODE;
        }
    }

    setEventListeners() {
        this.book.on('load',this.onBookLoaded.bind(this));
    }

    onBookLoaded(book) {
        this.trigger('load:book',book);
    }

    getComicId() {
        return this.config.comic.id;
    }

    switchModes() {
        var mode = (this.mode === PAGE_MODE)
            ? PANEL_ZOOM_MODE
            : PAGE_MODE;

        this.setMode(mode);

        this.settings.rememberBookSetting('mode',mode);

        this.message(this.getReadableModeText());
    }

    setMode(mode) {
        this.mode = mode;
        this.trigger('change:mode',mode);
    }

    getReadableModeText(mode) {
        if( ! mode ) {
            mode = this.mode;
        }
        return mode.replace(/_/g,' ').toLowerCase().replace(/(?:^|\s)\S/g, function(a) { return a.toUpperCase(); });
    }

    setLetterBoxing(width,height,animate) {
        this.viewport.setLetterBoxing(width,height,animate);
    }

    getViewPortSize() {
        return {
            width: this.viewport.getWidth(),
            height: this.viewport.getHeight()
        }
    }

    addPageMarkupToViewPort($markup) {
        return $markup.appendTo(this.viewport.$element);
    }

    message(message,time) {
        this.viewport.message(message,time);
    }
}

class Settings extends EventClass {
    constructor(app) {
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

        this.storageKey = 'panelz_2.0';

        this.app = app;
        this.config = {};

        this.localSettings = this.getLocalSettings();
        this.loadConfig($.extend({},this.DEFAULTS,this.getUserSettings()));
        this.setFields();
        this.setEventListeners();
    }

    setEventListeners() {
        $('[name="'+this.keys().join('"],[name="')+'"]').on('change',this.onFieldChange.bind(this));
        $('body').on('click','[data-reset-settings]',this.reset.bind(this));
        $('body').on('click','[data-clear-data]',this.clear.bind(this));
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

        if( $field.closest('.pane__item[data-readable]').length ) {
            var readableFieldLabel = $field.closest('.pane__item[data-readable]').attr('data-readable');
            var readableTitle = $field.closest('.pane[data-readable]').attr('data-readable');
            this.app.message(readableTitle + ' set to ' + readableFieldLabel);
        }
    }

    reset() {
        this.loadConfig(this.DEFAULTS);
        this.setFields();
        this.app.message('Settings reset');
    }

    clear() {
        this.localSettings = {};
        localStorage.removeItem(this.storageKey);
        this.reset();
        this.app.message('Application data cleared');
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
            var localSettings = JSON.parse(localStorage.getItem(this.storageKey));
            console.log('Local Settings:',localSettings);
            return localSettings ? localSettings : {};
        } catch( Exception ) {
            return {};
        }
    }

    setLocalSettings() {
        localStorage.setItem(this.storageKey,JSON.stringify(this.localSettings))
    }

    remember(key,val) {
        this.localSettings[key] = val;
        this.setLocalSettings();
    }

    getLocalSetting(key) {
        return this.localSettings[key];
    }

    rememberBookSetting(key,val) {
        var books = this.getLocalSetting('comics') || {};
        var bookSettings = books[this.app.getComicId()] || {};
        bookSettings[key] = val;
        books[this.app.getComicId()] = bookSettings;
        this.remember('comics',books);
    }

    getBookSetting(key) {
        var books = this.getLocalSetting('comics') || {};
        var bookSettings = books[this.app.getComicId()] || {};
        return bookSettings[key];
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
        this.trigger('done');
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

class ViewPort extends EventClass {

    constructor(config) {
        super();
        this.app = config.app;
        this.$element = $('.viewport');
        this.$container = $(window);
        this.$menu = $('.viewport__menu');
        this.$horizontalLetterBox = $('.letterbox__horizontal');
        this.$verticalLetterBox = $('.letterbox__vertical');

        this.PAGE_TURN_THRESHOLD = 0.25;
        this.LETTERBOX_STYLE = this.app.settings.get('letterboxing');
        this.LEFT_HAND_MODE = this.app.settings.get('leftHandMode');

        this.setEventListeners();
        this.setViewPortSize();
        this.setTapThresholds();

        this.interactable = new Hammer.Manager(this.$element.find('.viewport__interactable')[0]);

        var pan = new Hammer.Pan({threshold: 20, enable: this.canRecognizePan.bind(this)});
        var pinch = new Hammer.Pinch({ threshold: 0, enable: this.canRecognizePinch.bind(this), domEvents: true });
        var singletap = new Hammer.Tap({threshold: 2, posThreshold: 150});
        var doubletap = new Hammer.Tap({event: 'doubletap', taps: 2 });
        var swipe = new Hammer.Swipe({enable: this.canRecognizeSwipe.bind(this)});

        this.interactable.add([pan,singletap,doubletap,swipe,pinch]);

        pinch.recognizeWith(pan);

        singletap.requireFailure(doubletap);
        //pan.requireFailure(pinch);


        $('body').on('touchend',function() {
            this.$menu.removeClass('viewport__menu--was-shown');
            if( this.$menu.hasClass('viewport__menu--active') ) {
                setTimeout(function() {
                    this.$menu.removeClass('viewport__menu--active').addClass('viewport__menu--was-shown');
                }.bind(this),500);
            }
        }.bind(this));

        this.app.tutorial.on('done',this.onTutorialDone.bind(this));
        this.app.on('load:book',this.onBookLoaded.bind(this));

        $('body').on('click','[data-open-pane]',function(e) {
            $('.pane--' + $(this).attr('data-open-pane')).removeClass('pane--hidden');
        });
        $('body').on('click','.pane__item',function(e) {
            if( ! $(e.target).is(':radio, :checkbox, .checkbox__label') ) {
                var $input = $(this).find(':radio, :checkbox');
                var checked = $input.is(':radio') ? true : !$input.prop('checked');
                $input.prop('checked',checked).trigger('change');
                $input.closest('.pane--modal').find('[data-close]').trigger('click');
            }
        });

        $('body').on('click', '[data-skip-to-page]', function(e) {
            var $this = $(e.currentTarget);
            var page = $this.attr('data-skip-to-page');
            $this.closest('.pane').find('[data-close]').trigger('click');
            this.app.trigger('user:skipToPage',page);
        }.bind(this));

        $('body').on('click','[data-close]',function(e) {
            var $this = $(this);
            $this.closest('.pane').addClass('pane--hidden');
            $this.closest('.pane').find('.pane__content')[0].scrollTop = 0;
        });
    }

    onBookLoaded() {
        console.log('Book loaded');
        this.interactable.on('panstart',function(ev) {
            this.app.trigger('user:panstart',ev);
        }.bind(this));
        this.interactable.on('pan',function(ev) {
            this.app.trigger('user:pan',ev);
        }.bind(this));
        this.interactable.on('panleft',function(ev) {
            this.app.trigger('user:panleft',ev);
        }.bind(this));
        this.interactable.on('panright',function(ev) {
            this.app.trigger('user:panright',ev);
        }.bind(this));
        this.interactable.on('panend',function(ev) {
            this.app.trigger('user:panend',ev);
        }.bind(this));
        this.interactable.on('pinch',function(ev) {
            this.app.trigger('user:pinch',ev);
        }.bind(this));
        this.interactable.on('pinchin',function(ev) {
            this.app.trigger('user:pinchin',{e:ev});
        }.bind(this));
        this.interactable.on('pinchout',function(ev) {
            this.app.trigger('user:pinchout',{e:ev});
        }.bind(this));
        this.interactable.on('pinchend',function(ev) {
            this.app.trigger('user:pinchend',ev);
        }.bind(this));
        this.interactable.on("tap", function(ev) {
            if( ev.tapCount >= 2 ) {
                return this.app.switchModes();
            }
            var cmd = this.findTapZone(ev.center.x,ev.center.y);
            if( cmd === PAGE_FORWARD ) {
                this.app.trigger('user:pageForward');
            } else if( cmd === PAGE_BACK ) {
                this.app.trigger('user:pageBackward');
            } else if( cmd === TOGGLE_MAIN_MENU ) {
                if( ! this.$menu.hasClass('viewport__menu--was-shown') ) {
                    this.$menu.addClass('viewport__menu--active');
                }
            }
        }.bind(this));
        this.interactable.on("swipeleft", function(ev) {
            if( this.app.mode === PANEL_ZOOM_MODE ) {
                this.app.trigger('user:pageForward');
            }
        }.bind(this));
        this.interactable.on("swiperight", function(ev) {
            if( this.app.mode === PANEL_ZOOM_MODE ) {
                this.app.trigger('user:pageBackward');
            }
        }.bind(this));

        this.app.settings.on('change:letterboxing',function(data){
            this.LETTERBOX_STYLE = data.value;
            this.setLetterBoxStyle();
        }.bind(this));

        this.app.settings.on('change:leftHandMode',function(data){
            this.LEFT_HAND_MODE = data.value;
            this.setTapThresholds();
        }.bind(this));

        $(window).on('resize orientationchange',this.onResize.bind(this));
    }

    onTutorialDone() {
        this.$menu.addClass('viewport__menu--active');
        this.message('The tutorial is always available in the settings menu at the bottom right.',5000)
    }

    canRecognizePinch(rec, input) {
        return this.app.mode === PAGE_MODE;
    }

    canRecognizePan(rec, input) {
        return this.app.mode === PAGE_MODE;
    }

    canRecognizeSwipe(rec, input) {
        return this.app.mode === PANEL_ZOOM_MODE;
    }

    setContainer($container) {
        this.$container = $container;
    }

    setEventListeners() {
        this.$container.on('resize',this.setViewPortSize.bind(this));
    }

    setViewPortSize(e) {
        this.$element.width(this.$container.outerWidth());
        this.$element.height(this.$container.outerHeight());
    }

    setTapThresholds() {
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
    }

    findTapZone(x,y) {
        if( x >= this.PAGE_BACK_MIN && x <= this.PAGE_BACK_MAX) {
            return PAGE_BACK;
        }
        if( x >= this.PAGE_FORWARD_MIN && x <= this.PAGE_FORWARD_MAX) {
            return PAGE_FORWARD;
        }
        return TOGGLE_MAIN_MENU;
    }

    setLetterBoxing(width,height,animate) {
        var horizSize = height > 0 ? height / 2 : 0;
        var vertSize = width > 0 ? width / 2 : 0;
        var speed = this.app.settings.get('panelTransitions');
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
    }

    setLetterBoxStyle() {
        var opacity = (this.LETTERBOX_STYLE === 'no'
            ? 0
            :(this.LETTERBOX_STYLE === 'opaque'
                ? 0.75
                : 1));

        this.$horizontalLetterBox.css('opacity',opacity);
        this.$verticalLetterBox.css('opacity',opacity);
    }

    getWidth() {
        return this.$element.outerWidth();
    }

    getHeight() {
        return this.$element.outerHeight();
    }

    message(text,time) {
        var $messageContainer = $('.viewport__message');
        var $message = $('.message__text');

        time = (typeof time === 'undefined') ? 3000 : time;

        clearTimeout(this.messageTimeout);

        $message.text(text);
        $messageContainer.removeClass('viewport__message--hide');
        this.messageTimeout = setTimeout(function() {
            clearTimeout(this.messageTimeout);
            $messageContainer.addClass('viewport__message--hide');
        },time);
    }

    onResize(e) {
        this.setViewPortSize();
        this.setTapThresholds();
        this.app.trigger('resize',e);
    }
};

const PANELZ_MARKUP = `
    <div class="tutorial tutorial--hidden">
        <div class="tutorial__panel">
            <div class="tutorial__cta">
                <button class="tutorial__button tutorial__button--skip" data-tutorial-done>Skip</button>
            </div>
            <div class="tutorial__content">
                <div class="heading heading--lg">Welcome to Panelz</div>
                <div class="heading heading--secondary">Here are some terms you might not know to get you started:</div>
                <p><strong>Panel Zoom</strong> - This mode will guide you along your comic, panel by panel.</p>
                <p><strong>Page Mode</strong> - View the full page and all of its panels as you read.</p>
            </div>
            <div class="tutorial__cta">
                <button class="tutorial__button tutorial__button--back" style="visibility: hidden">Back</button>
                <ul class="tutorial__progress">
                    <li class="tutorial__progress-step tutorial__progress-step--active"></li>
                    <li class="tutorial__progress-step"></li>
                    <li class="tutorial__progress-step"></li>
                </ul>
                <button class="tutorial__button" data-tutorial-next>Next</button>
            </div>
        </div>
        <div class="tutorial__panel tutorial__panel--hidden">
            <div class="tutorial__cta">
                <button class="tutorial__button tutorial__button--skip" data-tutorial-done>Skip</button>
            </div>
            <div class="tutorial__content">
                <div class="tutorial__image">
                    <img src="../dist/images/tutorial-taps.png" />
                </div>
                <p><strong>Tap Left</strong> - Navigates backwards one panel or page.</p>
                <p><strong>Tap Right</strong> - Navigates forward one panel or page.</p>
                <p><strong>Tap Center</strong> - Open or close the menu options.</p>
                <p><strong>Double Tap (anywhere)</strong> - Switch between page and Panel Zoom mode.</p>
            </div>
            <div class="tutorial__cta">
                <button class="tutorial__button tutorial__button--back" data-tutorial-back>Back</button>
                <ul class="tutorial__progress">
                    <li class="tutorial__progress-step"></li>
                    <li class="tutorial__progress-step tutorial__progress-step--active"></li>
                    <li class="tutorial__progress-step"></li>
                </ul>
                <button class="tutorial__button" data-tutorial-next>Next</button>
            </div>
        </div>
        <div class="tutorial__panel tutorial__panel--hidden">
            <div class="tutorial__content">
                <div class="heading heading--secondary">You can also swipe to navigate!</div>
                <div class="tutorial__image">
                    <img src="../dist/images/tutorial-swipes.png" />
                </div>
                <p><strong>Swipe Left</strong> - Navigates forward one panel or page.</p>
                <p><strong>Swipe Right</strong> - Navigates backward one panel or page.</p>
            </div>
            <div class="tutorial__cta">
                <button class="tutorial__button tutorial__button--back" data-tutorial-back>Back</button>
                <ul class="tutorial__progress">
                    <li class="tutorial__progress-step"></li>
                    <li class="tutorial__progress-step"></li>
                    <li class="tutorial__progress-step tutorial__progress-step--active"></li>
                </ul>
                <button class="tutorial__button" data-tutorial-done>Done</button>
            </div>
        </div>
    </div>
    <div class="viewport">
        <div class="viewport__interactable"></div>
        <div class="letterbox">
            <div class="letterbox__horizontal letterbox__horizontal--top"></div>
            <div class="letterbox__horizontal letterbox__horizontal--bottom"></div>
            <div class="letterbox__vertical letterbox__vertical--left"></div>
            <div class="letterbox__vertical letterbox__vertical--right"></div>
        </div>
        <div class="viewport__message viewport__message--hide message">
            <div class="message__text">Panel Zoom mode activated.</div>
        </div>
        <ul class="viewport__menu menu">
            <li class="menu__list-item">
                <div href="#" class="menu__option" data-open-pane="pages">
                    <i class="fa fa-clone fa-flip-horizontal menu__icon" aria-hidden="true"></i>
                    <span class="menu__label">Pages</span>
                </div>
            </li>
            <li class="menu__list-item">
                <div class="menu__option menu__option--mode">
                    Panel<br />Zoom
                </div>
            </li>
            <li class="menu__list-item">
                <div class="menu__option" data-open-pane="settings">
                    <i class="fa fa-sliders menu__icon" aria-hidden="true"></i>
                    <span class="menu__label">Settings</span>
                </div>
            </li>
        </ul>
        <div class="panes">
            <div class="panes__pane pane pane--pages pane--hidden">
                <div class="pane__container">
                    <div class="pane__header">
                        <span>Pages</span>
                        <span class="pane__close" data-close>
                            <i class="fa fa-times" aria-hidden="true"></i>
                        </span>
                    </div>
                    <div class="pane__content">
                        <ul class="page-list">
                            <li class="page-list__page page-list__page--template" data-skip-to-page="">
                                <img src="" class="page-list__image" />
                                <span class="page-list__number"></span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="panes__pane pane pane--settings pane--full pane--hidden">
                <div class="pane__container">
                    <div class="pane__header">
                        <span>Settings</span>
                        <span class="pane__close" data-close>
                            <i class="fa fa-times" aria-hidden="true"></i>
                        </span>
                    </div>
                    <div class="pane__content">
                        <div class="pane__heading">Panel Zoom</div>
                        <ul class="pane__menu">
                            <li class="pane__item">
                                <div class="pane__text">
                                    <p class="pane__option">Start new books in Panel Zoom Mode</p>
                                </div>
                                <div class="checkbox">
                                  <input type="checkbox" value="true" id="startInPanelZoom" name="startInPanelZoom" />
                                  <label for="startInPanelZoom" class="checkbox__label"></label>
                                </div>
                            </li>
                            <li class="pane__item" data-open-pane="animations">
                                <div class="pane__text">
                                    <p class="pane__option">Animate Transitions</p>
                                    <p class="pane__helper-text">Animate panel-to-panel transitions in Panel Zoom mode</p>
                                </div>
                            </li>
                            <li class="pane__item" data-open-pane="letterboxing">
                                <div class="pane__text">
                                    <p class="pane__option">Letterboxing</p>
                                    <p class="pane__helper-text">Use bars to mask content outside of the current panel</p>
                                </div>
                            </li>
                            <li class="pane__item">
                                <div class="pane__text">
                                    <p class="pane__option">Show page on enter</p>
                                    <p class="pane__helper-text">Show full page on transitioning to a new page</p>
                                </div>
                                <div class="checkbox">
                                  <input type="checkbox" value="true" id="showPageOnEnter" name="showPageOnEnter" />
                                  <label for="showPageOnEnter" class="checkbox__label"></label>
                                </div>
                            </li>
                            <li class="pane__item">
                                <div class="pane__text">
                                    <p class="pane__option">Show page on exit</p>
                                    <p class="pane__helper-text">Show full page before transitioning to a new page</p>
                                </div>
                                <div class="checkbox">
                                  <input type="checkbox" value="true" id="showPageOnExit" name="showPageOnExit" />
                                  <label for="showPageOnExit" class="checkbox__label"></label>
                                </div>
                            </li>
                        </ul>
                        <div class="pane__heading">General</div>
                        <ul class="pane__menu">
                            <li class="pane__item">
                                <div class="pane__text">
                                    <p class="pane__option">Left-Handed Mode</p>
                                    <p class="pane__helper-text">Tap the left side of your screen to advance pages or panels</p>
                                </div>
                                <div class="checkbox">
                                  <input type="checkbox" value="true" id="leftHanded" name="leftHandMode" />
                                  <label for="leftHanded" class="checkbox__label"></label>
                                </div>
                            </li>
                            <li class="pane__item" data-open-pane="tutorial">
                                <div class="pane__text">
                                    <p class="pane__option">Tutorial</p>
                                    <p class="pane__helper-text">Toggles the tutorial screens on or off</p>
                                </div>
                            </li>
                            <li class="pane__item" data-open-pane="reset">
                                <div class="pane__text">
                                    <p class="pane__option">Reset</p>
                                    <p class="pane__helper-text">Resets all app settings to their defaults</p>
                                </div>
                            </li>
                            <li class="pane__item" data-open-pane="clearData">
                                <div class="pane__text">
                                    <p class="pane__option">Clear Data</p>
                                    <p class="pane__helper-text">Clears all data, including local storage and all user settings</p>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="panes__pane pane pane--tutorial pane--modal pane--hidden" data-readable="Tutorial">
                <div class="pane__container">
                    <div class="pane__header">
                        <span>Tutorial</span>
                    </div>
                    <div class="pane__content">
                        <ul class="pane__menu">
                            <li class="pane__item" data-readable="shown">
                                <div class="pane__text">
                                    <p class="pane__option">Show</p>
                                </div>
                                <div class="radio">
                                  <input type="radio" value="true" id="show-tutorial" name="showTutorial" />
                                  <label for="show-tutorial" class="radio__label"></label>
                                </div>
                            </li>
                            <li class="pane__item" data-readable="hidden">
                                <div class="pane__text">
                                    <p class="pane__option">Hide</p>
                                </div>
                                <div class="radio">
                                  <input type="radio" value="false" id="hide-tutorial" name="showTutorial" />
                                  <label for="hide-tutorial" class="radio__label"></label>
                                </div>
                            </li>
                        </ul>
                        <div class="pane__actions">
                            <button class="pane__button" data-close>Cancel</button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="panes__pane pane pane--letterboxing pane--modal pane--hidden" data-readable="Letterboxing">
                <div class="pane__container">
                    <div class="pane__header">
                        <span>Letterboxing</span>
                    </div>
                    <div class="pane__content">
                        <ul class="pane__menu">
                            <li class="pane__item" data-readable="none">
                                <div class="pane__text">
                                    <p class="pane__option">No letterboxing</p>
                                </div>
                                <div class="radio">
                                  <input type="radio" value="no" id="no-letterboxing" name="letterboxing" />
                                  <label for="no-letterboxing" class="radio__label"></label>
                                </div>
                            </li>
                            <li class="pane__item" data-readable="solid">
                                <div class="pane__text">
                                    <p class="pane__option">Solid letterboxing</p>
                                </div>
                                <div class="radio">
                                  <input type="radio" value="solid" id="solid-letterboxing" name="letterboxing"/>
                                  <label for="solid-letterboxing" class="radio__label"></label>
                                </div>
                            </li>
                            <li class="pane__item" data-readable="opaque">
                                <div class="pane__text">
                                    <p class="pane__option">Opaque letterboxing</p>
                                </div>
                                <div class="radio">
                                  <input type="radio" value="opaque" id="opaque-letterboxing" name="letterboxing" />
                                  <label for="opaque-letterboxing" class="radio__label"></label>
                                </div>
                            </li>
                        </ul>
                        <div class="pane__actions">
                            <button class="pane__button" data-close>Cancel</button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="panes__pane pane pane--animations pane--modal pane--hidden" data-readable="Animate Transitions">
                <div class="pane__container">
                    <div class="pane__header">
                        <span>Animate Transitions</span>
                    </div>
                    <div class="pane__content">
                        <ul class="pane__menu">
                            <li class="pane__item" data-readable="none">
                                <div class="pane__text">
                                    <p class="pane__option">No animation</p>
                                </div>
                                <div class="radio">
                                  <input type="radio" value="0" id="no-animation" name="panelTransitions" />
                                  <label for="no-animation" class="radio__label"></label>
                                </div>
                            </li>
                            <li class="pane__item" data-readable="fast">
                                <div class="pane__text">
                                    <p class="pane__option">Fast animations</p>
                                </div>
                                <div class="radio">
                                  <input type="radio" value="250" id="fast-animation" name="panelTransitions" />
                                  <label for="fast-animation" class="radio__label"></label>
                                </div>
                            </li>
                            <li class="pane__item" data-readable="slow">
                                <div class="pane__text">
                                    <p class="pane__option">Slow animations</p>
                                </div>
                                <div class="radio">
                                  <input type="radio" value="650" id="slow-animation" name="panelTransitions" />
                                  <label for="slow-animation" class="radio__label"></label>
                                </div>
                            </li>
                        </ul>
                        <div class="pane__actions">
                            <button class="pane__button" data-close>Cancel</button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="panes__pane pane pane--reset pane--modal pane--hidden">
                <div class="pane__container">
                    <div class="pane__header">
                        <span>Reset Settings</span>
                    </div>
                    <div class="pane__content">
                        <p>Are you sure you want to reset to the default settings?</p>
                        <div class="pane__actions">
                            <button class="pane__button" data-close>Cancel</button>
                            <button class="pane__button" data-close data-reset-settings>Reset</button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="panes__pane pane pane--clearData pane--modal pane--hidden">
                <div class="pane__container">
                    <div class="pane__header">
                        <span>Clear Data</span>
                    </div>
                    <div class="pane__content">
                        <p>Are you sure you want to clear all application data?</p>
                        <div class="pane__actions">
                            <button class="pane__button" data-close>Cancel</button>
                            <button class="pane__button" data-close data-clear-data>Clear</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
`;
