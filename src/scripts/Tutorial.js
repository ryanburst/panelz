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
        $('body').on('change activate','[data-tutorial-image]',this.swapImage.bind(this));

        this.settings.on('change:showTutorial',this.toggle.bind(this));

        this.interactable.on('swipeleft',this.next.bind(this));
        this.interactable.on('swiperight',this.back.bind(this));
    }

    next(e) {
        var $panel = $('.tutorial__panel:not(.tutorial__panel--hidden)');
        if( $panel.next().length ) {
            $panel.addClass('tutorial__panel--hidden');
            var $nextPanel = $panel.next();
            if( $nextPanel.find('[data-tutorial-image]').length ) {
                $nextPanel.find('[data-tutorial-image]:checked').trigger('activate');
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
        $this.closest('.tutorial__content').find('.tutorial__image img').attr('src',imageSrc);
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
