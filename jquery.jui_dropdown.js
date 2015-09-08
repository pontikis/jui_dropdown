/**
 * @fileOverview jQuery plugin, provides a simple dropdown button menu (split button). jQuery UI themes compatible.
 *               <p>License MIT
 *               <br />Copyright 2012 Christos Pontikis <a href="http://pontikis.net">http://pontikis.net</a>
 *               <br />Project page <a href="http://pontikis.net/labs/jui_dropdown">http://pontikis.net/labs/jui_dropdown</a>
 * @version 1.0.5 (15 Apr 2013)
 * @author Christos Pontikis http://pontikis.net
 * @requires jquery (>=1.6), jquery-ui (>=1.8)
 */

/**
 * See <a href="http://jquery.com">http://jquery.com</a>.
 * @name $
 * @class
 * See the jQuery Library  (<a href="http://jquery.com">http://jquery.com</a>) for full details.  This just
 * documents the function and classes that are added to jQuery by this plug-in.
 */

/**
 * See <a href="http://jquery.com">http://jquery.com</a>
 * @name fn
 * @class
 * See the jQuery Library  (<a href="http://jquery.com">http://jquery.com</a>) for full details.  This just
 * documents the function and classes that are added to jQuery by this plug-in.
 * @memberOf $
 */

/** the foolowing is OPTIONAL in case private methods will be documented  */
/**
 * Pseudo-Namespace containing private methods (for documentation purposes)
 * @name _private_methods
 * @namespace
 */

"use strict";
(function ($)
{

    var pluginName = 'jui_dropdown';

    /* public methods ------------------------------------------------------- */
    var methods = {

        /**
         * @lends $.fn.jui_dropdown
         */
        init: function (options)
        {

            var elem = this;

            return this.each(function ()
            {

                /**
                 * settings and defaults
                 * using $.extend, settings modification will affect elem.data() and vive versa
                 */
                var settings = elem.data(pluginName);
                if (typeof (settings) == 'undefined')
                {
                    var defaults = elem.jui_dropdown('getDefaults');
                    settings = $.extend({}, defaults, options);
                } else
                {
                    settings = $.extend({}, settings, options);
                }
                elem.data(pluginName, settings);

                // bind events
                elem.unbind("onSelect").bind("onSelect", settings.onSelect);
                elem.unbind("onLaunch").bind("onLaunch", settings.onLaunch);

                elem.removeClass().addClass(settings.containerClass);

                var launcher_selector = settings.launcher_selector;
                var launcher_container_selector = settings.launcher_container_selector;
                var menu_selector = settings.menu_selector;
                var elem_launcher = elem.find(launcher_selector);
                var elem_launcher_container = elem.find(launcher_container_selector);
                var elem_menu = elem.find(menu_selector);

                elem_launcher_container.removeClass(settings.launcherContainerClass).addClass(settings.launcherContainerClass);
                elem_launcher.removeClass(settings.launcherClass).addClass(settings.launcherClass);
                elem_menu.removeClass(settings.menuClass).addClass(settings.menuClass);

                /**
                 * Fires the onSelect event.  Here we can check whether the element is 'enabled'
                 * @param {Object} dropdown
                 * @param {Object} item
                 */
                var triggerOnSelect = function (item)
                {
                    if (item.hasClass("disabled"))
                        return;

                    settings.onSelect(null, { // null is the event arg
                        index: parseInt(item.index(menu_selector + " li")) + 1,
                        item: item
                    });
                };

                if (encode_version($.ui.version) < encode_version('1.9.0'))
                {
                    elem_menu.menu().menu('refresh').hide();

                    elem_menu.off('click', "li").on('click', "li", function ()
                    {
                        triggerOnSelect($(this));
                    });
                } else
                {
                    elem_menu.menu({
                        select: function (event, ui)
                        {
                            triggerOnSelect(ui.item);
                        }
                    }).menu('refresh').hide();
                }

                if (settings.launcher_is_UI_button)
                {
                    elem_launcher.button({
                        text: settings.launcherUIShowText,
                        icons: {
                            primary: settings.launcherUIPrimaryIconClass,
                            secondary: settings.launcherUISecondaryIconClass
                        }
                    });
                }

                elem_launcher.off('click').on('click', function()
                {
                    //elem.triggerHandler('onLaunch');
                    settings.onLaunch();

                    var jui_dropdown_current_menu_selector = $(document).data("jui_dropdown_current_menu_selector");
                    if (typeof (jui_dropdown_current_menu_selector) != 'undefined')
                    {
                        elem.find(jui_dropdown_current_menu_selector).hide();
                    }

                    if (!settings.launcher_is_UI_button && settings.toggle_launcher)
                    {
                        elem_launcher.addClass(settings.launcherSelectedClass);
                    }

                    elem_menu.show().position({
                        my: settings.my_position,
                        at: settings.at_position,
                        of: elem_launcher_container
                    });

                    $(document).one("click", function ()
                    {
                        elem_menu.hide();
                        if (!settings.launcher_is_UI_button && settings.toggle_launcher)
                        {
                            elem_launcher.removeClass(settings.launcherSelectedClass);
                        }
                    });

                    $(document).data("jui_dropdown_current_menu_selector", menu_selector);

                    return false;
                });

                elem.off('mouseenter', launcher_selector).on('mouseenter', launcher_selector, function ()
                {
                    if (settings.launchOnMouseEnter)
                    {
                        elem_launcher.trigger('click');
                    }
                });

                elem.off('mouseleave', menu_selector).on('mouseleave', menu_selector, function ()
                {
                    elem_menu.hide();
                });

            });

        },

        /**
         * Get default values
         * Usage: $(element).jui_dropdown('getDefaults');
         * @return {Object}
         */
        getDefaults: function ()
        {
            return {
                launcherContainerClass: 'launcherContainerClass',
                launcherClass: 'launcherClass',
                launcherSelectedClass: 'launcherSelectedClass ui-widget-header ui-corner-all',
                menuClass: 'menuClass',
                launcher_is_UI_button: true,
                launcherUIShowText: true,
                launcherUIPrimaryIconClass: '',
                launcherUISecondaryIconClass: 'ui-icon-triangle-1-s',

                my_position: 'left top',
                at_position: 'left bottom',
                toggle_launcher: false,

                launchOnMouseEnter: false,

                onSelect: function ()
                {
                }
            };
        },

        /**
         * Get any option set to plugin using its name (as string)
         * Usage: $(element).jui_dropdown('getOption', some_option);
         * @param opt
         * @return {*}
         */
        getOption: function (opt)
        {
            var elem = this;
            return elem.data(pluginName)[opt];
        },

        /**
         * Get all options
         * Usage: $(element).jui_dropdown('getAllOptions');
         * @return {*}
         */
        getAllOptions: function ()
        {
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
        setOption: function (opt, val, reinit)
        {
            var elem = this;
            elem.data(pluginName)[opt] = val;
            if (reinit)
            {
                elem.jui_dropdown('init');
            }
        },

        /**
         * Refresh plugin
         * Usage: $(element).jui_dropdown('refresh');
         * @return {*|jQuery}
         */
        refresh: function ()
        {
            var elem = this;
            elem.jui_dropdown();
        },

        /**
         * Destroy plugin
         * Usage: $(element).jui_dropdown('destroy');
         * @return {*|jQuery}
         */
        destroy: function ()
        {
            return $(this).each(function ()
            {
                var $this = $(this);

                $this.removeData(pluginName);
            });
        }
    };

    /* private methods ------------------------------------------------------ */
    /** the foolowing is OPTIONAL in case private methods will be documented  */

    /**
     * @lends _private_methods
     */


    /**
     * Add leading zeros
     * @param {Number} n
     * @param {Number} totalDigits
     * @return {String}
     */
    var PadDigits = function (n, totalDigits)
    {
        var ns = n.toString();
        var pd = '';
        if (totalDigits > ns.length)
        {
            for (var i = 0; i < (totalDigits - ns.length) ; i++)
            {
                pd += '0';
            }
        }
        return pd + ns;
    };


    /**
     * Encode version string (e.g 1.8.23 -> 010823, 1.10.0 -> 011000)
     * @param version
     * @return {String}
     */
    var encode_version = function (version)
    {
        var version_encoded = '';
        var a_version = version.split(".");
        var a_version_len = a_version.length;
        for (var i = 0; i < a_version_len; i++)
        {
            version_encoded += PadDigits(a_version[i], 2);
        }
        return version_encoded;
    };

    /**
     * jui_dropdown
     *
     * @class jui_dropdown
     * @memberOf $.fn
     */
    $.fn.jui_dropdown = function (method)
    {

        if (this.size() != 1)
        {
            var err_msg = 'You must use this plugin (' + pluginName + ') with a unique element (at once)';
            this.html('<span style="color: red;">' + 'ERROR: ' + err_msg + '</span>');
            $.error(err_msg);
        }

        // Method calling logic
        if (methods[method])
        {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method)
        {
            return methods.init.apply(this, arguments);
        } else
        {
            $.error('Method ' + method + ' does not exist on jQuery.' + pluginName);
        }

    };

})(jQuery);