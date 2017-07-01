class Settings extends EventClass {
    constructor(app) {
        super();

        this.DEFAULTS = {
            leftHandMode: false,
            startInPanelZoom: false,
            panelTransitions: 250,
            letterboxing: 'solid',
            detectPanelOnDoubleTap: true,
            showPageOnEnter: true,
            showPageOnExit: true,
            showTutorial: true,
            showPageChangeMessage: false
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
