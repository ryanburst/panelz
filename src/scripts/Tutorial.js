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
