class Page extends EventClass {
    constructor(Book,config,index) {
        super();
        this.config = config;
        this.app = config.app;
        this.book = Book;
        this.index = index;
        this.isFirst = index===0;
        this.isLast = index===this.book.config.comic.pages.length-1;
        this.size = config.size || 0;
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
        $("<img />").attr("src", src).on('load',this.onPageLoaded.bind(this));
    }

    onProgress(e) {
        console.log(e);
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
        this.app.on('user:pinchmove',function(e) {

        }.bind(this));
        this.app.on('user:pinchstart',function(e) {
            this.pinchOrigin = e.center;
            e.deltaX = this.pinchOrigin.x - e.center.x;
            e.deltaY = this.pinchOrigin.y - e.center.y;
            if( e.deltaX > 0 || e.deltaY > 0 ) {
                this.app.trigger('user:pan',e);
            }
        }.bind(this));

        this.app.on("user:pinch",function(e) {
            if( ! this.isCurrentPage ) {
                return;
            }
            e.deltaX = this.pinchOrigin.x - e.center.x;
            e.deltaY = this.pinchOrigin.y - e.center.y;
            if( e.deltaX > 0 ) {
                this.app.trigger('user:pan' + (this.pinchOrigin.x > e.center.x ? 'right' : 'left'),e);
            }
            var left = parseInt(this.$element.css('margin-left'));
            var top = parseInt(this.$element.css('margin-top'));

            if(this.app.mode !== PAGE_MODE) {
                this.app.switchModes();
            }
            this.magnify(e.scale * this.lastScale);
        }.bind(this));

        this.app.on("user:pinchend",function(e) {
            if( ! this.isCurrentPage ) {
                return;
            }

            this.pinchOrigin = {};

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
        var found = false;
        if(this.panels.length) {
            var left = this.getLeft();
            var top = this.getTop();
            this.panels.forEach(function(panel) {
                var convertedX = left + (panel.x * this.getWidth() / this.getOriginalWidth());
                var convertedY = top + (panel.y * this.getHeight() / this.getOriginalHeight());
                var convertedXMax = left + convertedX + (panel.width * this.getWidth() / this.getOriginalWidth());
                var convertedYMax = top + convertedY + (panel.height * this.getHeight() / this.getOriginalHeight());
                if( ! found && x > convertedX && x <= convertedXMax && y > convertedY && y <= convertedYMax ) {
                    found = panel;
                }
            }.bind(this));
        }
        return found;
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
