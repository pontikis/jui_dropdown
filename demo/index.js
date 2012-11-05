$(function() {

    $("#ui-version").text($.ui.version);

    var elem_switcher = $("#ui-theme-switcher_label" + ", " + "#ui-theme-switcher");
    if($.ui.version < "1.9.00") {
        elem_switcher.hide();
    } else {
        elem_switcher.show();
    }
    // theme switcher ----------------------------------------------------------
    $("#ui-theme-switcher").change(function() {
        var theme_url = $(this).val();
        $("#ui-theme").attr("href", theme_url);
    });

    // demo dropdown 1 ---------------------------------------------------------
    $("#demo_drop1").jui_dropdown({
        launcher_id: 'launcher1',
        launcher_container_id: 'launcher1_container',
        menu_id: 'menu1',
        containerClass: 'container1',
        menuClass: 'menu1',
        onSelect: function(event, data) {
            $("#result").text('index: ' + data.index + ' (id: ' + data.id + ')');
        }
    });


    // demo dropdown 2 ---------------------------------------------------------
    $("#demo_drop2").jui_dropdown({
        launcher_id: 'launcher2',
        launcher_container_id: 'launcher2_container',
        menu_id: 'menu2',
        containerClass: 'container2',
        launcher_is_UI_button: false,
        onSelect: function(event, data) {
            $("#result").text('index: ' + data.index + ' (id: ' + data.id + ')');
        }
    });

    // demo dropdown 2 ---------------------------------------------------------
    $("#demo_drop3").jui_dropdown({
        launcher_id: 'launcher3',
        launcher_container_id: 'launcher3_container',
        menu_id: 'menu3',
        containerClass: 'container3',
        launcherClass: 'launcher3',
        launcherContainerClass: 'launcher3_container',
        launcher_is_UI_button: false,
        toggle_launcher: true,
        onSelect: function(event, data) {
            $("#result").text('index: ' + data.index + ' (id: ' + data.id + ')');
        }
    });


    // demo dropdown 2 ---------------------------------------------------------
    $("#demo_drop4").jui_dropdown({
        launcher_id: 'launcher4',
        launcher_container_id: 'launcher4_container',
        menu_id: 'menu4',
        launcherUIShowText: false,
        launcherUISecondaryIconClass: 'ui-icon-gear',
        menuClass: 'menu4',
        containerClass: 'container4',
        my_position: 'right top',
        at_position: 'right bottom',
        onSelect: function(event, data) {
            $("#result").text('index: ' + data.index + ' (id: ' + data.id + ')');
        }
    });
});