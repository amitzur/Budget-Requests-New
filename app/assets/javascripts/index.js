(function($) {
    $(function() {
        $("ul.scans.untagged.unlogged").live("click", function() {
            KsafimApi.doLogin();
            $(this).addClass("connecting");
        }).children("li").bind("mouseover", function(e) {
            if (e.currentTarget != e.target) return;
            var $clickHere = $(".click-here"), $this = $(this), $clickHereConnecting = $(".click-here-connecting");
            if (e.type == "mouseover") {
                $clickHere.appendTo($this);
                $clickHereConnecting.appendTo($this);
            }
        });
    });
})(jQuery);
