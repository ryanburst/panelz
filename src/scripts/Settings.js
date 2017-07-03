/**
 * Handles the various user settings for the user. Keeps
 * track of selections made by the user as well as how
 * those selections are stored (local storage).
 *
 * @class
 * @extends EventClass
 * @author  Ryan Burst <ryanburst@gmail.com>
 * @version 0.3.0
 */
class Settings extends EventClass {
    /**
     * Initializes the settings class with defaults and loads
     * in saved preferences from local storage.
     *
     * @constructs Settings
     * @param  {Class} app      The Panelz class app instance\
     */
    constructor(app) {
        super();

        this.DEFAULTS = {
            /**
             * Left hand mode preference
             * @type {Boolean}
             */
            leftHandMode: false,

            /**
             * Whether or not to start in
             * panel zoom mode
             * @type {Boolean}
             */
            startInPanelZoom: false,

            /**
             * Speed of panel transitions
             * 0|250|650
             * @type {Number}
             */
            panelTransitions: 250,

            /**
             * Letter boxing style
             * solid|opaque|none
             * @type {String}
             */
            letterboxing: 'solid',

            /**
             * Whether or not to detect panels
             * on double tapping
             * @type {Boolean}
             */
            detectPanelOnDoubleTap: true,

            /**
             * Shows a page on enter in panel zoom mode
             * @type {Boolean}
             */
            showPageOnEnter: true,

            /**
             * Shows a page on exit in panel zoom mode
             * @type {Boolean}
             */
            showPageOnExit: true,

            /**
             * Whether or not to show the tutorial
             * @type {Boolean}
             */
            showTutorial: true,

            /**
             * Whether or not to show a panel change
             * message in the viewport
             * @type {Boolean}
             */
            showPageChangeMessage: false
        };

        /**
         * What key to store the users preferences at
         * @type {String}
         */
        this.storageKey = 'panelz_2.0';

        this.app = app;
        this.localSettings = this.getLocalSettings();
        this.loadConfig($.extend({},this.DEFAULTS,this.getUserSettings()));
        this.setFields();
        this.setEventListeners();
    }

    /**
     * Event listeners for listening to changes or whether or not
     * they want to reset or clear their settings.
     */
    setEventListeners() {
        $('[name="'+this.keys().join('"],[name="')+'"]').on('change',this.onFieldChange.bind(this));
        $('body').on('click','[data-reset-settings]',this.reset.bind(this));
        $('body').on('click','[data-clear-data]',this.clear.bind(this));
    }

    /**
     * Loads the settings configuration by looping through
     * the keys and setting them.
     *
     * @param  {Object} config Settings configuration
     */
    loadConfig(config) {
        this.config = {};
        Object.keys(config).forEach(function(setting) {
            this.set(setting,config[setting]);
        }.bind(this));
    }

    /**
     * Loops through all of the settings and sets each
     * field value and whether or not they should each
     * be checked/filled out
     */
    setFields() {
        this.keys().forEach(this.setField.bind(this));
    }

    /**
     * Sets an interface field with the value and status
     * from a given setting value. Assumes that the input
     * shares the same name value as the setting itself.
     *
     * @param {String} setting Which setting to set
     */
    setField(setting) {
        var $fields = $('[name="'+setting+'"]');
        var value = this.get(setting);
        // May be a radio button, so may have several fields
        $fields.each(function(index,field) {
            var $this = $(field);
            var fieldVal = $this.val();
            // If it's a checkbox condition, set the true/value
            // property of the checked field
            if( $this.is(':checkbox') ) {
                $this.prop('checked',!!value);
            // For radios, we need to normalize the field value to turn
            // true/false strings into booleans and string numbers
            // into actual numbers
            } else if( $this.is(':radio') && this.normalizeValue(fieldVal) == value ) {
                $this.prop('checked',true);
            }
        }.bind(this));
    }

    /**
     * Normalizes a value into it's proper type. String numbers
     * are turned into actual integers and true/false strings
     * are turned into true booleans.
     *
     * @param  {Mixed} val Value to normalize
     * @return {Mixed}
     */
    normalizeValue(val) {
        val = isNaN(parseFloat(val)) ? val : parseInt(val);
        val = (val==='false') ? false : val;
        val = (val==='true') ? true : val;

        return val;
    }

    /**
     * When a field is changed, set the settings accordingly.
     * If the field has a certain attribute, message the user
     * that the setting has changed.
     *
     * @param  {Object} e Event object
     */
    onFieldChange(e) {
        var $field = $(e.currentTarget);
        var val = $field.val();
        var name = $field.attr('name');

        if( $field.is(':checkbox') ) {
            val = $field.is(':checked');
        }

        this.set(name,this.normalizeValue(val));

        // If the field has a data-readable attribute, we can message the
        // user with the human readable string of the field
        if( $field.closest('.pane__item[data-readable]').length ) {
            var readableFieldLabel = $field.closest('.pane__item[data-readable]').attr('data-readable');
            var readableTitle = $field.closest('.pane[data-readable]').attr('data-readable');
            this.app.message(readableTitle + ' set to ' + readableFieldLabel);
        }
    }

    /**
     * Resets all the settings and messages the user.
     */
    reset() {
        this.loadConfig(this.DEFAULTS);
        this.setFields();
        this.app.message('Settings reset');
    }

    /**
     * Clears all the settings, including all of the
     * settings for every comic they have viewed.
     */
    clear() {
        this.localSettings = {};
        localStorage.removeItem(this.storageKey);
        this.reset();
        this.app.message('Application data cleared');
    }

    /**
     * Gets a specific setting
     *
     * @param  {String} setting Which setting to grab
     * @return {Mixed}
     */
    get(setting) {
        return this.config[setting];
    }

    /**
     * Sets a setting. Triggers a change event in the
     * settings, making sure to send out the old values
     * as well as the new value.
     *
     * @param {String} setting Setting to set
     * @param {Mixed} val      What value to set the setting to
     * @fires Settings#change:<setting>
     */
    set(setting,val) {
        var oldVal = this.get(setting);
        this.config[setting] = val;
        this.setUserSettings();
        /**
         * Setting event
         *
         * @event Settings#change:<setting>
         * @type {Object}
         * @property {Object} setting, what setting was changed
         */
        this.trigger('change:' + setting,{
            setting: setting,
            value: val,
            oldValue: oldVal,
            settings: this.config
        });
    }

    /**
     * Returns all the configuration keys
     *
     * @return {Array} Array of configuration keys
     */
    keys() {
        return Object.keys(this.config);
    }

    /**
     * Gets the settings saved via local storage. If the pull
     * from local storage fails for some reason catch the
     * exception and return an empty object.
     *
     * @return {Object} Local settings object
     */
    getLocalSettings() {
        try {
            var localSettings = JSON.parse(localStorage.getItem(this.storageKey));
            console.log('Local Settings:',localSettings);
            return localSettings ? localSettings : {};
        } catch( Exception ) {
            return {};
        }
    }

    /**
     * Sets local storage with the local settings object
     */
    setLocalSettings() {
        localStorage.setItem(this.storageKey,JSON.stringify(this.localSettings))
    }

    /**
     * Remembers a setting in local storage. Triggers a
     * save of the entire local settings object.
     *
     * @param  {String} key Setting to set
     * @param  {Mixed}  val What to set the value to
     */
    remember(key,val) {
        this.localSettings[key] = val;
        this.setLocalSettings();
    }

    /**
     * Gets a local setting via a given key.
     *
     * @param  {String} key Setting to grab
     * @return {Mixed}
     */
    getLocalSetting(key) {
        return this.localSettings[key];
    }

    /**
     * Gets all the book specific settings.
     *
     * @param {Boolean} allBooks Return all books or just this one
     * @return {Object}
     */
    getBookSettings(allBooks) {
        var books = this.getLocalSetting('comics') || {};
        return allBooks ? books : books[this.app.getComicId()] || {};
    }

    /**
     * Remembers a setting specific to the current comic/book.
     *
     * @param  {String} key Setting to set
     * @param  {Mixed}  val Value to set for setting
     */
    rememberBookSetting(key,val) {
        var books = this.getBookSettings(true);
        var bookSettings = books[this.app.getComicId()] || {};
        bookSettings[key] = val;
        books[this.app.getComicId()] = bookSettings;
        this.remember('comics',books);
    }

    /**
     * Gets a book/comic specific setting
     *
     * @param  {String} key Setting to get
     * @return {Mixed}
     */
    getBookSetting(key) {
        return this.getBookSettings()[key];
    }

    /**
     * Gets all the user settings.
     *
     * @return {Object}
     */
    getUserSettings() {
        return this.getLocalSetting('settings') ? this.getLocalSetting('settings') : {};
    }

    /**
     * Set user preferences by remembering them
     * to local storage.
     */
    setUserSettings() {
        this.remember('settings',this.config);
    }
}
