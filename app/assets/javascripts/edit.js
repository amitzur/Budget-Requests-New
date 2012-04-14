// Created by Amit Zur

;(function() {
    $(function() {
        $(".pniya tr:last-child td:last-child input").live("keypress", function(e) {
            if (e.keyCode == 9) {
                KsafimApi.addRow($(this).closest(".pniya"));
                e.preventDefault();
            }
        });

        $(".pniya input.diff").live("change", function() {
            var $this = $(this);
            if ($this.val() > 0)
                $this.addClass("positive").removeClass("negative");
            else if ($this.val() < 0)
                $this.addClass("negative").removeClass("positive");
        });

        $(".pniya-table input").live("change", function() {
            var $this = $(this);
            if (isNaN(Number($this.val()))) {
                $this.addClass("invalid");
            } else {
                $this.removeClass("invalid");
            }
        });
    });
})();