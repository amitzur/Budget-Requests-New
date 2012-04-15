// Created by Amit Zur

;(function() {
    $(function() {
        var sid = new Uri(location).getQueryParamValue('sid');
        var storageName = "hasadnaBudgetRequests" + sid;
        var bakasha = localStorage.getItem(storageName);
        bakasha = (bakasha && JSON.parse(bakasha)) || {};
        fillFields(bakasha);

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

        setInterval(function() {
            bakasha = buildBakasha();
            localStorage.setItem(storageName, JSON.stringify(bakasha));
        }, 1000);
    });

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
