var Menu = {
    init: function() {
        this.$menu = $('.menu');
        this.$menu.on('click','.menu__option--panel-zoom',this.onPanelZoomToggleClick.bind(this));
        $('body').on('click','[data-open-pane]',function() {
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
    },

    activateOption: function(option) {
        this.$menu.find('.menu__option--' + option).addClass('menu__option--active');
    },

    deactivateOption: function(option) {
        this.$menu.find('.menu__option--' + option).removeClass('menu__option--active');
    },

    onPanelZoomToggleClick: function(e) {
        ViewPort.switchModes();
    }
};
