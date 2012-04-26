// Created by Amit Zur

;(function() {
    var saveInterval, dirty;
    var sid = new Uri(location).getQueryParamValue('sid');
    var storageName = "hasadnaBudgetRequests" + sid;
    var bakasha = localStorage.getItem(storageName);
    bakasha = (bakasha && JSON.parse(bakasha)) || {};

    $(function() {
        fillFields(bakasha);

        // bind this when create pniya
        $(".pniya-table").live("change", function() {
            dirty = true;
            toggleSaveButton(false);
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
                    $("form#new_bakasha").submit();
                },
                "לא": function() {
                    $("input#bakasha_finalized").val(false);
                    $(".pniya-table-wrap").bakashaTable("normalizeNumbers");
                    $( this ).dialog( "close" );
                    $("form#new_bakasha").submit();
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
        })

        toggleSaveButton(true);
        restartSaveInterval();
    });

    KsafimApi.save = function() {
        setBakashaInLocalStorage();
        restartSaveInterval();
    };

    function setBakashaInLocalStorage() {
        if (dirty) {
            bakasha = buildBakasha();
            localStorage.setItem(storageName, JSON.stringify(bakasha));
            toggleSaveButton(true);
            dirty = false;
        }
    }

    function restartSaveInterval() {
        clearInterval(saveInterval);
        saveInterval = setInterval(setBakashaInLocalStorage, 10000);
    }

    function toggleSaveButton(toDisabled) {
        var $button = $(".save-button button");
        if (!toDisabled) {
            $button.removeAttr("disabled").removeClass("saved");
        } else {
            $button.attr("disabled", true).addClass("saved");
        }
    }

    function buildBakasha() {
        var bakasha = {
            recv_date: $("#bakasha_recv_date").val(),
            meeting_reason: $("#bakasha_meeting_reason").val(),
            description: $("#bakasha_description").val(),
            pniyot: []
        };
        $(".pniya").each(function() {
            var $pniya = $(this);
            var pniyaObj = {
                mispar: $('.mispar-pniya input', $pniya).val(),
                haavarot: $(".pniya-table-wrap", $pniya).bakashaTable("toJSON")
            };
            bakasha.pniyot.push(pniyaObj);
        });
        return bakasha;
    }

    function fillFields(bakasha) {
        $("#bakasha_recv_date").val(bakasha.recv_date);
        $("#bakasha_meeting_reason").val(bakasha.meeting_reason);
        $("#bakasha_description").val(bakasha.description);
        bakasha.pniyot && bakasha.pniyot.forEach(function(pniya, index) {
            var $pniya = KsafimApi.createPniya({ noAnimation: true });
            $(".mispar-pniya input", $pniya).val(pniya.mispar);
            if (pniya.haavarot && pniya.haavarot.length) {
                var $pniyaTable = $("<div></div>").bakashaTable({ id: index }).appendTo($pniya);
                pniya.haavarot.forEach(function(haavara) {
                    $pniyaTable.bakashaTable("addRow", { value: haavara });
                });
            }
        });
    }
})();
