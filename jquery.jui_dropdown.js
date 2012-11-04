/**
 * jquery plugin creates a simple dropdown menu
 * Copyright 2012 Christos Pontikis http://pontikis.net
 * Project page https://github.com/pontikis/jui_dropdown
 * License MIT
 */
"use strict";
(function($) {

    var pluginName = 'jui_dropdown';

    /* public methods ------------------------------------------------------- */
    var methods = {

        /**
         * @constructor
         * @param options
         * @return {*}
         */
        init: function(options) {

            var elem = this;

            return this.each(function() {

                /**
                 * settings and defaults
                 * using $.extend, settings modification will affect elem.data() and vive versa
                 */
                var settings = elem.data(pluginName);
                if(typeof(settings) == 'undefined') {
                    var defaults = elem.jui_dropdown('getDefaults');
                    settings = $.extend({}, defaults, options);
                } else {
                    settings = $.extend({}, settings, options);
                }
                elem.data(pluginName, settings);

                var container_id = elem.attr("id");

                // simple validation
                //validate_input(container_id);

                // bind events
                //elem.unbind("onCustomEvent1").bind("onCustomEvent1", settings.onCustomEvent1);


            });

        },

        /**
         * Get default values
         * Usage: $(element).jui_dropdown('getDefaults');
         * @return {Object}
         */
        getDefaults: function() {
            var defaults = {
                opt1: 1,
                opt2: 'opt2_value',

                onCustomEvent1: function() {
                }
            };
            return defaults;
        },

        /**
         * Get any option set to plugin using its name (as string)
         * Usage: $(element).jui_dropdown('getOption', some_option);
         * @param opt
         * @return {*}
         */
        getOption: function(opt) {
            var elem = this;
            return elem.data(pluginName)[opt];
        },

        /**
         * Get all options
         * Usage: $(element).jui_dropdown('getAllOptions');
         * @return {*}
         */
        getAllOptions: function() {
            var elem = this;
            return elem.data(pluginName);
        },

        /**
         * Set option
         * Usage: $(element).jui_dropdown('setOption', 'oprion_name',  'oprion_value',  reinit);
         * @param opt
         * @param val
         * @param reinit
         */
        setOption: function(opt, val, reinit) {
            var elem = this;
            elem.data(pluginName)[opt] = val;
            if(reinit) {
                elem.jui_dropdown('init');
            }
        },

        /**
         * Refresh plugin
         * Usage: $(element).jui_dropdown('refresh');
         * @return {*|jQuery}
         */
        refresh: function() {
            var elem = this;
            elem.jui_dropdown();
        },

        /**
         * Destroy plugin
         * Usage: $(element).jui_dropdown('destroy');
         * @param options
         * @return {*|jQuery}
         */
        destroy: function(options) {
            return $(this).each(function() {
                var $this = $(this);

                $this.removeData(pluginName);
            });
        }
    };

    /* private methods ------------------------------------------------------ */

    /**
     * Validate input values
     * @param container_id
     */
    var validate_input = function(container_id) {

    }


    $.fn.jui_dropdown = function(method) {

        // OPTIONAL
        if(this.size() != 1) {
            var err_msg = 'You must use this plugin with a unique element (at once)';
            this.html('<span style="color: red;">' + 'ERROR: ' + err_msg + '</span>');
            $.error(err_msg);
        }

        // Method calling logic
        if(methods[method]) {
            return methods[ method ].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if(typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error('Method ' + method + ' does not exist on jQuery.' + pluginName);
        }

    };

})(jQuery);