/**
 * The Menu class handles the center tap popup menu
 * and adds context to a few of the buttons.
 *
 * @class
 * @extends EventClass
 * @author  Ryan Burst <ryanburst@gmail.com>
 * @version 0.3.0
 */
class Menu extends EventClass {
    /**
     * Creates a new Menu instance by establishing the
     * main element as a jQuery object and listening
     * for events on the application instance.
     *
     * @constructs Menu
     * @param {Panelz}   app      Panelz app instance
     * @param {Book}     Book     Book instance
     * @param {Tutorial} Tutorial Tutorial instance
     */
    constructor(app,Book,Tutorial) {
        super();

        this.app = app;
        this.book = Book;
        this.tutorial = Tutorial;
        this.$menu = $('.viewport__menu');

        this.setEventListeners();
        this.onModeChange(this.app.mode);
    }

    /**
     * Listens for user touch events or application mode changes
     */
    setEventListeners() {
        $('body').on('touchend click','.menu__option--mode',this.onModeToggleClick.bind(this));
        $('body').on('touchend',this.onTouchEnd.bind(this));
        this.app.on('change:mode',this.onModeChange.bind(this));
        this.app.on('show:menu',this.show.bind(this));
        this.book.on('load:book',this.setTitleBar.bind(this));
        this.book.on('pageSet',this.onPageSet.bind(this));
        this.tutorial.on('done',this.onTutorialDone.bind(this));
    }

    /**
     * Sets the menu title bar with book data, like the title, current
     * page number, and total number of pages.
     */
    setTitleBar() {
        $('[data-book-title]').text(this.book.title);
        $('[data-total-pages]').text(this.book.pages.length);
        $('[data-page-num]').text(this.book.currentPage.num);
    }

    /**
     * Adds an activation class to a given menu option
     *
     * @param  {String} option Menu option to activate
     */
    activateOption(option) {
        this.$menu.find('.menu__option--' + option).addClass('menu__option--active');
    }

    /**
     * Removes an activation class to a given menu option
     *
     * @param  {String} option Menu option to deactivate
     */
    deactivateOption(option) {
        this.$menu.find('.menu__option--' + option).removeClass('menu__option--active');
    }

    /**
     * Shows the menu by adding an active CSS class. Sometimes
     * multiple events get fired in one interaction, so a --was-shown
     * modifier class has been added in another specific use case. If
     * that class is not present, then we can show the menu.
     */
    show() {
        if( ! this.$menu.hasClass('viewport__menu--was-shown') ) {
            this.$menu.addClass('viewport__menu--active');
        }
    }

    /**
     * Hides the menu by removing the active CSS class.
     * @return {[type]} [description]
     */
    hide() {
        this.$menu.removeClass('viewport__menu--active');
    }

    /**
     * The user has clicked on the mode toggle button, tell the
     * application to switch modes.
     *
     * @param  {Object} e Tap event object
     */
    onModeToggleClick(e) {
        e.preventDefault();
        this.app.switchModes();
    }

    /**
     * The application's mode has been changed. Update the
     * wording of our mode toggle button to maintain context.
     *
     * @param  {String} mode Mode that was switched to
     */
    onModeChange(mode) {
        var readable = this.app.getReadableModeText(mode,true);
        if( mode === PAGE_MODE ) {
            this.$menu.find('.menu__option--mode').html(readable);
        } else {
            this.$menu.find('.menu__option--mode').html(readable);
        }
    }

    /**
     * When a new page has been set, set the current page text
     * to reflect the current page number.
     *
     * @param {Page} page Page instance of the new current page
     */
    onPageSet(page) {
        $('[data-page-num]').text(page.num);
    }

    /**
     * When the tutorial is finished, show the menu and message the
     * user about being able to find the tutorial in the settings menu.
     */
    onTutorialDone() {
        this.show();
        this.app.message('The tutorial is always available in the settings menu at the bottom right.',5000)
    }

    /**
     * Touch events and click events both get fired sometimes. To prevent
     * hiding the menu when we just showed it, add a special class to
     * indicate that it was just shown.
     *
     * @param {Object} e Event object
     */
    onTouchEnd(e) {
        this.$menu.removeClass('viewport__menu--was-shown');
        if( this.$menu.hasClass('viewport__menu--active') ) {
            setTimeout(function() {
                this.$menu.removeClass('viewport__menu--active').addClass('viewport__menu--was-shown');
            }.bind(this),500);
        }
    }
};
