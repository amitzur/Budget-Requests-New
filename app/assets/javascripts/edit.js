(function($) {
    $(function() {
        fillFields(window.bakasha_json.bakasha);

        $(".diff").each(function() {
            var $this = $(this);
            if (Number($this.val()) > 0 ) {
                $this.addClass("positive");
            } else if (Number($this.val()) < 0) {
                $this.addClass("negative");
            }
        });


        $(".money").each(function() {
            $(this).val(addCommasToNumber($(this).val()));
        });

        $(".submit").bind("click", function(e) {
            e.preventDefault();
            var isValid = true;
            $(".pniya-table-wrap").each(function() {
                if (!$(this).bakashaTable("validate"))
                    isValid = false;
            });
            if (isValid == false) {
                $("#dialog-invalid").dialog("open");
            } else {
                $("#dialog-confirm").dialog('open');
            }
        });

        $("#dialog-confirm").dialog({
            resizable: false,
            width: 400,
            modal: true,
            autoOpen: false,
            dialogClass: "dialog-submit-bakasha",
            buttons: {
                "כן": function() {
                    $("input#bakasha_finalized").val(true);
                    $(".pniya-table-wrap").bakashaTable("normalizeNumbers");
                    $( this ).dialog( "close" );
                    $("form.edit_bakasha").submit();
                },
                "לא": function() {
                    $("input#bakasha_finalized").val(false);
                    $(".pniya-table-wrap").bakashaTable("normalizeNumbers");
                    $( this ).dialog( "close" );
                    $("form.edit_bakasha").submit();
                },
                "בטל": function() {
                    $("input#bakasha_finalized").val(false);
                    $( this ).dialog( "close" );
                }
            }
        });

        $("#dialog-invalid").dialog({
            resizable: false,
            width: 500,
            modal: true,
            autoOpen: false,
            dialogClass: "dialog-submit-bakasha",
            buttons: {
                "בסדר, הבנתי": function() {
                    $(this).dialog("close");
                }
            }
        });
    });

    function addCommasToNumber(str) {
        return str.replace(addCommasRe, ",");
    }

    var addCommasRe = /\B(?=(?:\d{3})+(?!\d))/g;

    function fillFields(bakasha) {
        bakasha.pniyas && bakasha.pniyas.forEach(function(pniya, index) {
            var $pniya = KsafimApi.createPniya({ noAnimation: true, mode: "edit", rid: pniya.id });
            $(".mispar-pniya input", $pniya).val(pniya.mispar);
            if (pniya.haavaras && pniya.haavaras.length) {
                var $pniyaTable = $("<div></div>").bakashaTable({ id: index }).appendTo($pniya);
                pniya.haavaras.forEach(function(haavara) {
                    $pniyaTable.bakashaTable("addRow", { value: haavara });
                });
            }
        });
    }
})(jQuery);