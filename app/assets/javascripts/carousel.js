$(function() {
    function doCycle() {
        $(".level-1").removeClass("level-1").addClass("level-4-temp");
        $(".level-2").removeClass("level-2").addClass("level-1");
        $(".level-3").removeClass("level-3").addClass("level-2");
        $(".level-4.b").removeClass("level-4 b").addClass("level-3");
        $(".level-4.a").removeClass("a").addClass("b");
        $(".level-4-temp").removeClass("level-4-temp").addClass("level-4 a");
    }

    function getLevel(el) {
        return Number(/level-(\d)/.exec(el.className)[1]);
    }

    function restart() {
        clearInterval(interval);
        interval = setInterval(doCycle, time);
    }

    $(".item").click(function() {
        time = 30000;
        restart();
        var $this = $(this), $item = $this.closest(".item");
        var level = getLevel($item[0]), numOfCycles;
        if (level != 4) {
            numOfCycles = level - 1;
        } else {
            if ($(this).hasClass("a")) {
                numOfCycles = 4;
            } else {
                numOfCycles = 3;
            }
        }
        for (var i= 0, ii = numOfCycles; i < ii; i++) {
            doCycle();
        }
    });

    var interval, time = 15000;
    restart();
});