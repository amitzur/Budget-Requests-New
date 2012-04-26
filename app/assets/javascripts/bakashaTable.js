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
            var _this = this, $table = $(Handlebars.templates.pniyaTable({}));

            this.append($table).addClass("pniya-table-wrap");

            $table.delegate("input, select, textarea", "change", function() {
                $table.trigger("change.pniya", this);
            });

            $table.delegate("tr.pniya-row:last-child td:last-child input", "keydown", function(e) {
                if (e.keyCode == 9 && !e.shiftKey) {
                    methods.addRow.apply(_this);
                    e.preventDefault();
                }
            });

            $table.delegate("input.diff", "change", function() {
                colorDiff($(this));
            });

            $table.delegate("input", "change", function() {
                var $this = $(this), val = $this.val();
                if (isNaN(Number(val)) && !isValidNumber(val)) {
                    $this.addClass("invalid");
                } else {
                    $this.removeClass("invalid");
                    if (!isNaN(Number(val)))
                        $this.val(addCommasToNumber(val));
                }
            });

            $table.delegate("input.prat", "change", function() {
                var $pratName = $(this).closest("td").next(".prat-name");
                if ($(this).val().trim() != "") {
                    var val = $(this).val()[0] == "0" && $(this).val()[1] == "0" ? $(this).val() : "00" + $(this).val();
                    $.get("/open-budget/" + val, function(data) {
                        $("span.prat-name-value", $pratName).text(data.haavara_name);
                        $("input", $pratName).val(data.haavara_name);
                    });
                }
            });

            this.find(".add-row").bind("click", function() {
                methods.addRow.apply(_this);
            });

            return this;
        },

        addRow: function(options) {
            options || (options = {});
            var rows = this.data("rows");
            if (!rows)
                rows = 1;
            else
                rows++;
            this.data("rows", rows);
            var $newRow = $(Handlebars.templates.row({ pniya_id : settings.id, id: rows })).appendTo(this.find("tbody"));
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
        },

        validate: function() {
            var isValid = true;
            $("input.money", this).each(function() {
                var $input = $(this), val = $input.val();
                if (!isValidNumber(val)) {
                    $input.addClass("invalid");
                    isValid = false;
                }
            });
            return isValid;
        },

        normalizeNumbers: function() {
            $("input.money", this).each(function() {
                $(this).val($(this).val().replace(/,/g, ""));
            });
        }
    };

    $(function() {
        Handlebars.templates.row = Handlebars.compile($("#pniya-row-template").html());
        Handlebars.templates.pniyaTable = Handlebars.compile($("#pniya-table-template").html());
    });

    function colorDiff($input) {
        var val = Number($input.val());
        if (val == 0 || isNaN(val))
            $input.removeClass("positive negative");
        else if (val > 0)
            $input.addClass("positive").removeClass("negative");
        else if (val < 0)
            $input.addClass("negative").removeClass("positive");
    }

    function isValidNumber(str) {
        return str == "" || validNumberRe.test(str);
    }

    function addCommasToNumber(str) {
        return str.replace(addCommasRe, ",");
    }

    var validNumberRe = /^-?\d{1,3}(,\d{3})*(\.\d+)?$/;
    var addCommasRe = /\B(?=(?:\d{3})+(?!\d))/g;

})(jQuery);