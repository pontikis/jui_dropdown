$(function() {

    // theme switcher ----------------------------------------------------------
    $("#ui-theme-switcher").change(function() {
        var theme_url = $(this).val();
        $("#ui-theme").attr("href", theme_url);
    });

    // demo dropdown 1 ---------------------------------------------------------
    $("#demo_drop1").jui_dropdown({
    });


    // demo dropdown 2 ---------------------------------------------------------
/*    $("#demo_drop2").jui_dropdown({
    });*/

});