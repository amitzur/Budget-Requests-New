// Created By Amit Zur

;(function($) {
    $.fn.bakashaTable = function(method) {
        // Method calling logic
        if ( methods[method] ) {
            return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
        } else if ( typeof method === 'object' || ! method ) {
            return methods.init.apply( this, arguments );
        } else {
            $.error( 'Method ' +  method + ' does not exist on jQuery.tooltip' );
        }

        return this;
    };

    var settings = {
        id: 0
    };

    var methods = {
        init: function(options) {
            settings = $.extend(settings, options);
            var $table = this;

            this.append(Handlebars.templates.pniyaTable({}));

            this.delegate("input, select, textarea", "change", function() {
                $table.trigger("change.pniya", this);
            });

            this.delegate("tr.pniya-row:last-child td:last-child input", "keypress", function(e) {
                if (e.keyCode == 9 && !e.shiftKey) {
                    $table.addRow();
                    e.preventDefault();
                }
            });

            this.delegate("input.diff", "change", function() {
                colorDiff($(this));
            });

            this.delegate("input", "change", function() {
                var $this = $(this);
                if (isNaN(Number($this.val()))) {
                    $this.addClass("invalid");
                } else {
                    $this.removeClass("invalid");
                }
            });

            this.delegate("input.prat", "change", function() {
                var $pratName = $(this).closest("td").next(".prat-name");
                if ($(this).val().trim() != "") {
                    var val = $(this).val()[0] == "0" && $(this).val()[1] == "0" ? $(this).val() : "00" + $(this).val();
                    $.get("/open-budget/" + val, function(data) {
                        $("span.prat-name-value", $pratName).text(data.haavara_name);
                        $("input", $pratName).val(data.haavara_name);
                    });
                }
            });
        },

        addRow: function(options) {
            options || (options = {});
            if (!rows)
                rows = 1;
            else
                rows++;
            var $newRow = $(Handlebars.templates.row({ pniya_id : settings.id, id: rows })).appendTo(this.children("tbody"));
            $(".prat", $newRow).focus();
            if (options.value) {
                var $inputs = $("input", $newRow);
                for (var i= 0, ii=options.value.numbers.length; i < ii; i++) {
                    var $input = $($inputs.get(i));
                    $input.val(options.value.numbers[i]);
                    if ($input.hasClass("diff"))
                        colorDiff($input);
                }
                $("span.prat-name-value", $newRow).text(options.value.name);
                $("td.prat-name input", $newRow).val(options.value.name);
            }
            return this;
        },

        toJSON: function() {
            var ret = [];
            $(".pniya-row", this).each(function() {
                var $haavara = $(this), haavara = {
                    name: $(".prat-name", $haavara).text(),
                    numbers: []
                };
                ret.push(haavara);
                $("input", $haavara).each(function() {
                    haavara.numbers.push($(this).val());
                });
            });
            return ret;
        }
    };

    var rows;
    $(function() {
        Handlebars.templates.row = Handlebars.compile($("#pniya-row-template").html());
        Handlebars.templates.pniyaTable = Handlebars.compile($("#pniya-table-template").html());
    });

    function colorDiff($input) {
        if ($input.val() > 0)
            $input.addClass("positive").removeClass("negative");
        else if ($input.val() < 0)
            $input.addClass("negative").removeClass("positive");
    }

})(jQuery);