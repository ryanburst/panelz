/**
 * Class for showing and handling the beginners tutorial that
 * appears in front of loading the comic (unless the reader has
 * turned this option off or completed the tutorial previously)
 *
 * The tutorial shows mp4 videos on repeat as the reader steps
 * through. At the end of the tutorial, the user is asked if
 * they want to customize settings. This is also handled by this
 * class and portion of the interface, as it's another way
 * to introduce the reader to the various options available to them.
 *
 * @class
 * @extends EventClass
 * @author  Ryan Burst <ryanburst@gmail.com>
 * @version 0.3.0
 */
class Tutorial extends EventClass {
    /**
     * Initializes the tutorial class with an interactable interface
     * than can listen to touch events via the HammerJS library.
     *
     * @constructs Tutorial
     * @param  {Class} app      The Panelz class app instance
     * @param  {Class} settings Settings class instance
     */
    constructor(app,settings,config) {
        super();

        this.app = app;
        this.settings = settings;
        this.config = config;

        this.interactable = new Hammer.Manager($('.tutorial')[0]);
        this.interactable.add(new Hammer.Swipe());

        this.addEventListeners();
        this.setImageLocations();

        if( this.settings.get('showTutorial') ) {
            this.show();
        }
    }

    /**
     * Adds the various event listeners needed. Listens for user
     * interactions and settings changes.
     */
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

    /**
     * User has interacted with the tutorial and wants to proceed
     * to the next item in the tutorial. This method also employs
     * hot loading the video of the next panel.
     *
     * @param  {Object} e Event object
     */
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

    /**
     * User has interacted with a tutorial and wants to go back
     * to the previous item in the tutorial.
     *
     * @param  {Object} e Event object
     */
    back(e) {
        var $panel = $('.tutorial__panel:not(.tutorial__panel--hidden)');
        if( $panel.prev().length ) {
            $panel.addClass('tutorial__panel--hidden');
            $panel.prev().removeClass('tutorial__panel--hidden');
        }
    }

    /**
     * When the tutorial is done, make sure their settings are remembered.
     * Since the settings can be altered through the tutorial, make sure
     * the settings fields are set properly.
     *
     * @fires Tutorial#done
     */
    done() {
        this.settings.set('showTutorial',false);
        this.settings.setFields();
        /**
         * Triggers the tutorial done event
         *
         * @event Tutorial#done
         * @type {object}
         */
        this.trigger('done');
    }

    /**
     * Swaps the image/video when the user selects one of
     * the tutorial options. This is to show the user different
     * image/videos for each option.
     *
     * @param  {Object} e Event object]
     */
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

    /**
     * Updates all the image source locations with the configuration
     * option. This allows the installer to put the tutorial images
     * wherever they want.
     */
    setImageLocations() {
        $('[data-tutorial-image]').each( function(index,element) {
            var $image = $(element);
            $image.attr('data-tutorial-image',this.imageUrl($image.attr('data-tutorial-image')));
        }.bind(this));
    }

    /**
     * Sets the mode on the application when they check
     * or uncheck a specific radio box.
     *
     * @param {Object} e Event object
     */
    setBeginnerMode(e) {
        var $checkbox = $(e.currentTarget);
        var mode = $checkbox.is(':checked')
            ? PANEL_ZOOM_MODE
            : PAGE_MODE;
        this.app.setMode(mode);
    }

    /**
     * Toggles whether or not the tutorial is shown or hidden.
     *
     * @param {Object} e Event object
     */
    toggle(e) {
        if(e.value === true) {
            this.show();
        } else {
            this.hide();
        }
    }

    /**
     * Shows the tutorial interface.
     */
    show() {
        $('.tutorial__panel').addClass('tutorial__panel--hidden').first().removeClass('tutorial__panel--hidden');
        $('.tutorial').removeClass('tutorial--hidden');
    }

    /**
     * Hides the tutorial interface.
     */
    hide() {
        $('.tutorial').addClass('tutorial--hidden');
    }

    /**
     * Returns a full image path based on the config value
     * of where the images are stored.
     *
     * @param  {String} image Which image
     * @return {String}
     */
    imageUrl(image) {
        return this.config.imageLocation + image;
    }
}
