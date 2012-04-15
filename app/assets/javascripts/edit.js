// Created by Amit Zur

;(function() {
    var saveInterval, dirty;
    var sid = new Uri(location).getQueryParamValue('sid');
    var storageName = "hasadnaBudgetRequests" + sid;
    var bakasha = localStorage.getItem(storageName);
    bakasha = (bakasha && JSON.parse(bakasha)) || {};

    $(function() {
        fillFields(bakasha);

        $("input, select, textarea").live("change", function() {
            dirty = true;
            toggleSaveButton(false);
        });

        toggleSaveButton(true);

        $(".pniya tr.pniya-row:last-child td:last-child input").live("keypress", function(e) {
            if (e.keyCode == 9 && !e.shiftKey) {
                KsafimApi.addRow($(this).closest(".pniya"));
                e.preventDefault();
            }
        });

        $(".pniya input.diff").live("change", function() {
            colorDiff($(this));
        });

        $(".pniya-table input").live("change", function() {
            var $this = $(this);
            if (isNaN(Number($this.val()))) {
                $this.addClass("invalid");
            } else {
                $this.removeClass("invalid");
            }
        });

        restartSaveInterval();
    });

    KsafimApi.save = function() {
        setBakashaInLocalStorage();
        restartSaveInterval();
    };

    function setBakashaInLocalStorage() {
        console.log("set bakasha in localStorage. dirty=" + dirty);
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

    function colorDiff($input) {
        if ($input.val() > 0)
            $input.addClass("positive").removeClass("negative");
        else if ($input.val() < 0)
            $input.addClass("negative").removeClass("positive");
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
                haavarot: []
            };
            bakasha.pniyot.push(pniyaObj);
            $(".pniya-row", $pniya).each(function() {
                var $haavara = $(this), haavara = {
                    name: $(".prat-name", $haavara).text(),
                    numbers: []
                };
                pniyaObj.haavarot.push(haavara);
                $("input", $haavara).each(function() {
                    haavara.numbers.push($(this).val());
                });
            });
        });
        return bakasha;
    }

    function fillFields(bakasha) {
        $("#bakasha_recv_date").val(bakasha.recv_date);
        $("#bakasha_meeting_reason").val(bakasha.meeting_reason);
        $("#bakasha_description").val(bakasha.description);
        bakasha.pniyot && bakasha.pniyot.forEach(function(pniya) {
            var $pniya = KsafimApi.createPniya({ noAnimation: true });
            $(".mispar-pniya input", $pniya).val(pniya.mispar);
            if (pniya.haavarot && pniya.haavarot.length) {
                KsafimApi.addPniyaTable($pniya);
            }
            pniya.haavarot.forEach(function(haavara) {
                var $haavara = KsafimApi.addRow($pniya);
                var $inputs = $("input", $haavara);
                for (var i= 0, ii=haavara.numbers.length; i < ii; i++) {
                    var $input = $($inputs.get(i));
                    $input.val(haavara.numbers[i]);
                    if ($input.hasClass("diff"))
                        colorDiff($input);
                }
                $("span.prat-name-value", $haavara).text(haavara.name);
		$("td.prat-name input", $haavara).val(haavara.name);
            });
        });
    }
})();
