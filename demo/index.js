$(function() {

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
        containerClass: 'container1'
    });


    // demo dropdown 2 ---------------------------------------------------------
    $("#demo_drop2").jui_dropdown({
        launcher_id: 'launcher2',
        launcher_container_id: 'launcher2_container',
        menu_id: 'menu2',
        containerClass: 'container2',
        launcher_is_UI_button: false
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
        toggle_launcher: true
    });

    // selection result --------------------------------------------------------
    $('[id^="opt_"]').click(function() {
        $("#result").text($(this).attr("id"));
    })

});