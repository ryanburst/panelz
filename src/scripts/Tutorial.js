class Tutorial extends EventClass {
    constructor(app,settings) {
        super();

        this.app = app;
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
        $('body').on('change activate','[data-tutorial-image]',this.swapImage.bind(this));
        $('body').on('change','.tutorial [name="startInPanelZoom"]',this.setBeginnerMode.bind(this));

        this.settings.on('change:showTutorial',this.toggle.bind(this));

        this.interactable.on('swipeleft',this.next.bind(this));
        this.interactable.on('swiperight',this.back.bind(this));
    }

    next(e) {
        var $panel = $('.tutorial__panel:not(.tutorial__panel--hidden)');
        if( $panel.next().length ) {
            $panel.addClass('tutorial__panel--hidden');
            var $nextPanel = $panel.next();
            var $imageLoader = $nextPanel.find('[data-tutorial-image]');
            if( $imageLoader.length ) {
                if( $imageLoader.is('video') ) {
                    this.swapImage({currentTarget:$imageLoader[0]});
                } else {
                    $nextPanel.find('[data-tutorial-image]:checked').trigger('activate');
                }
            }
            $nextPanel.removeClass('tutorial__panel--hidden');
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
        this.settings.setFields();
        this.trigger('done');
    }

    swapImage(e) {
        var $this = $(e.currentTarget);
        var imageSrc = $this.attr('data-tutorial-image');
        var $video = $this.closest('.tutorial__content').find('.tutorial__image video');
        $video.closest('.tutorial__image').removeClass('tutorial__image--loaded');
        $video.find('source').attr('src',imageSrc);
        $video[0].load();
        $video[0].addEventListener('loadeddata', function() {
            $video.closest('.tutorial__image').addClass('tutorial__image--loaded');
            $video[0].play();
        }, false);

    }

    setBeginnerMode(e) {
        var $checkbox = $(e.currentTarget);
        var mode = $checkbox.is(':checked')
            ? PANEL_ZOOM_MODE
            : PAGE_MODE;
        if( this.app.book.isLoaded ) {
            this.app.setMode(mode);
        }
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
