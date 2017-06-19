class Page extends EventClass {
    constructor(Book,config) {
        super();
        this.config = config;
        this.app = config.app;
        this.book = Book;
        this.index = config.index;
        this.isFirst = config.isFirst;
        this.isLast = config.isLast;
        this.isCurrentPage = false;
        this.scale = 1;
        this.lastScale = 1;
        this.leftEdge = true;
        this.rightEdge = true;
        this.zoomPanLeftAmount = 0;
        this.zoomPanRightAmount = 0;
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

            /*var maxLeft = ((this.getWidth() * this.scale) - this.getFullWidth()) / 2;
            var minLeft = maxLeft * -1;
            var deltaX = this.elementOriginalLeft + ev.deltaX;
            var left = Math.min(maxLeft,Math.max(deltaX,minLeft));*/
            var maxTop = ((this.getHeight() * this.scale) - this.getFullHeight()) / 2;
            var minTop = maxTop * -1;
            var deltaY = this.elementOriginalTop + ev.deltaY;
            var top = Math.min(maxTop,Math.max(deltaY,minTop));

            if( this.isCurrentPage && this.scale !== 1 ) {
                this.$element.css( {
                    "margin-top": top
                } );

                /*var leftEdgeBefore = this.leftEdge;
                var rightEdgeBefore = this.rightEdge;
                this.leftEdge = (left==maxLeft) ? true : false;
                this.rightEdge = (left==minLeft) ? true : false;
                if(leftEdgeBefore !== this.leftEdge ) {
                    this.zoomPanRightAmount = this.leftEdge ? deltaX : 0;
                }
                if(rightEdgeBefore !== this.rightEdge ) {
                    console.log('Right Edge change',this.rightEdge);
                    this.zoomPanLeftAmount = this.rightEdge ? deltaX : 0;
                }*/
            } else if(ev.offsetDirection === 8) {
                return true;
            }

            /**/
        }.bind(this));

        // panleft = rightedge = forward
        this.app.on("user:panleft", function(ev) {
            /*if( this.app.book.currentPage.leftEdge || this.app.book.currentPage.rightEdge ) {
                this.left = this.originalLeft + ev.deltaX - this.app.book.currentPage.zoomPanLeftAmount;
                this.$container.css( {
                    "left": this.left
                } );
            }*/
            if( this.isCurrentPage && this.scale !== 1 ) {
                var elLeft = parseInt( this.$element.css( "left" ), 10 )
                var maxLeft = (((this.getWidth() * this.scale) - this.getFullWidth()) / 2) + elLeft;
                var minLeft = maxLeft * -1 - elLeft;
                var deltaX = this.elementOriginalLeft + ev.deltaX;
                var left = Math.min(maxLeft,Math.max(deltaX,minLeft));

                var rightEdgeBefore = this.rightEdge;
                this.rightEdge = (left<=minLeft) ? true : false;
                if(rightEdgeBefore !== this.rightEdge && this.rightEdge ) {
                    this.book.panFrozen = false;
                    this.book.zoomPanAmount = ev.deltaX;
                    console.log('unfreeze pan');
                }

                if(this.book.panFrozen) {
                    this.$element.css( {
                        "margin-left": left
                    } );
                }
            }

            if( ! this.book.panFrozen ) {
                this.left = this.originalLeft + ev.deltaX - this.book.zoomPanAmount;
                this.$container.css( {
                    "left": this.left
                } );

                if( this.isCurrentPage && this.scale !== 1 && this.left < 0 && ! this.rightEdge ) {
                    this.book.panFrozen = true;
                    console.log('Freeze pan');
                }
            }
        }.bind(this));

        // panright = leftedge = back
        this.app.on("user:panright", function(ev) {
            if( this.isCurrentPage && this.scale !== 1 ) {
                var elLeft = parseInt( this.$element.css( "left" ), 10 )
                var maxLeft = (((this.getWidth() * this.scale) - this.getFullWidth()) / 2) + elLeft;
                var minLeft = maxLeft * -1 - elLeft;
                var deltaX = this.elementOriginalLeft + ev.deltaX;
                var left = Math.min(maxLeft,Math.max(deltaX,minLeft));

                var leftEdgeBefore = this.leftEdge;
                this.leftEdge = (left==maxLeft) ? true : false;
                if(leftEdgeBefore !== this.leftEdge && this.leftEdge ) {
                    this.book.panFrozen = false;
                    this.book.zoomPanAmount = ev.deltaX;
                    console.log('unfreeze pan');
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
                    console.log('Freeze pan');
                    this.book.panFrozen = true;
                }
            }


            /*if( this.app.book.currentPage.leftEdge || this.app.book.currentPage.rightEdge ) {
                //console.log('edge reached',ev.deltaX,this.zoomPanRightAmount,ev.deltaX-this.zoomPanRightAmount);
                this.left = this.originalLeft + ev.deltaX - this.app.book.currentPage.zoomPanRightAmount;
                this.$container.css( {
                    "left": this.left
                } );
            }*/
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
            console.log('freeze pan');

            if( this.scale < 1 ) {
                return this.resetScale();
                console.log('unfreeze pan');
            }

            if( this.scale > 3 ) {
                this.magnify(3,true);
                this.lastScale = this.scale;
                return;
            }

            this.lastScale = this.scale;

            /*var maxLeft = ((this.getWidth() * this.scale) - this.getFullWidth()) / 2 + (this.elementOriginalLeft / 2);
            var minLeft = maxLeft * -1;
            var currentLeft = parseInt( this.$element.css( "margin-left" ), 10 );
            if( currentLeft < minLeft || currentLeft > maxLeft) {
                this.$element.css( {
                    "margin-left": currentLeft < minLeft ? minLeft : maxLeft
                } );
            }
            var maxTop = ((this.getHeight() * this.scale) - this.getFullHeight()) / 2;
            var minTop = maxTop * -1;
            var currentTop = parseInt( this.$element.css( "margin-top" ), 10 );
            if( currentTop < minTop || currentTop > maxTop) {
                this.$element.css( {
                    "margin-top": currentTop < minTop ? minTop : maxTop
                } );
            }*/


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
        console.log('unfreeze pan');
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
                if( this.scale !== 1 ) {
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
