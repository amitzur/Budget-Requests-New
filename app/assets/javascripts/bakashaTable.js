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

    var methods = {
        init: function(options) {
            options || (options = {});
            var _this = this, $table = $(Handlebars.templates.pniyaTable({}));
            _this.data("id", options.id || 0);

            this.append($table).addClass("pniya-table-wrap");

            $table.delegate("input, select, textarea", "change", function() {
                $table.trigger("change.pniya", this);
            });

            $table.delegate("input", "focus", function() {
                var newVal = $(this).prev("input").val(), oldVal = $(this).val();
                if (newVal && !oldVal) $(this).val(newVal);
            });

            $table.delegate("tr.pniya-row:last-child td:last-child input", "keydown", function(e) {
                if (e.keyCode == 9 && !e.shiftKey) {
                    methods.addRow.apply(_this);
                    e.preventDefault();
                }
            });

            $table.delegate("input.money", "change", function() {
                var $this = $(this), val = $this.val();
                if (isNaN(Number(val)) && !isValidNumber(val)) {
                    $this.addClass("invalid");
                } else {
                    $this.removeClass("invalid");
                    if (!isNaN(Number(val)))
                        $this.val(addCommasToNumber(val));
                }
            });

            $table.delegate("input.diff", "change", function() {
                colorDiff($(this));
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
            var pniya_id = this.data("id");
            var $newRow = $(Handlebars.templates.row({ pniya_id : pniya_id, id: rows })).appendTo(this.find("tbody"));
            $(".prat", $newRow).focus();
            if (options.value) {
                for (var field in options.value) {
                    if (options.value.hasOwnProperty(field)) {
                        var $input = $("input[name*='" + field + "']", $newRow);
                        if ($input.length === 0) continue;
                        $input[0].value = options.value[field];
                        if ($input.hasClass("diff"))
                            colorDiff($input);
                    }
                }

                $("span.prat-name-value", $newRow).text(options.value["prat_name"]);
                $("td.prat-name input", $newRow).val(options.value["prat_name"]);
            }
            return this;
        },

        toJSON: function() {
            var ret = [];
            $(".pniya-row", this).each(function() {
                var $haavara = $(this), haavara = {};
                $("input", $haavara).each(function() {
                    var name = $(this).attr("name");
                    name = name.substring(name.lastIndexOf("["), name.length - 1);
                    haavara[name] = $(this).val();
                });
                haavara["prat_name"] = $(".prat-name-value", $haavara).text();
                ret.push(haavara);
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
        if (!isValidNumber($input.val())) {
            $input.removeClass("positive negative").addClass("invalid");
            return;
        }
        var val = Number($input.val().replace(/,/g, ""));
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

    var fields = ["prat", "prat_name", "hotsaa_to", "hotsaa_from", "hotsaa_mut_from", "hotsaa_mut_to", "harshaa_to", "harshaa_from", "ska_to", "ska_from", "diff_hotsaa", "diff_hotsaa_mut", "diff_harshaa", "diff_ska"];

})(jQuery);