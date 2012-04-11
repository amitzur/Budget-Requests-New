/**
 * Created by JetBrains WebStorm.
 * User: amit
 * Date: 3/21/12
 * Time: 10:27 PM
 * To change this template use File | Settings | File Templates.
 */
(function($) {
    window.KsafimApi = {
        createPniya: function() {
            var $pniya = $(Template.pniya({ id: pniyaNum++ })).hide();
            $(".pniyot").append($pniya);
            $pniya.fadeIn(800, function() {
                $(this).find("input").focus().bind("keypress", function(e) {
                    if (e.keyCode == 13) {
                        $(this).next("button").click();
                        e.preventDefault();
                    }
                });
            });
        },

        enableUntaggedScans: function(toDisabled) {
            $("ul.scans.untagged")[toDisabled ? "addClass" : "removeClass"]("unlogged");
        },

        getUserData: function() {
            FB.api('/me', function(response) {
                console.log('Good to see you, ' + response.name + '.');
                console.dir(response);
            });
        },

        signIn: function() {
            $("header .connecting").addClass("active");
            $("header .sign-in").addClass("connecting");
            $.getJSON("/users/auth/facebook/callback", function(json) {
                $("header .sign-in").removeClass("connecting");
                $("header .connecting").removeClass("active");
                if (json.status == "failure") {
                    alert("failure: " + json.reason);
                    KsafimApi.changeUser();
                    KsafimApi.enableUntaggedScans(true);
                }
                else {
                    KsafimApi.changeUser(json.extra.raw_info.name);
                    KsafimApi.enableUntaggedScans();
                }
            });
        },

        signOut: function() {
            $("header .disconnecting").addClass("active");
            $("header .sign-out").addClass("connecting");
            $.ajax({
                type: "delete",
                url: "/users/sign_out",
                success: function() {
                    $("header .sign-out").removeClass("connecting");
                    $("header .disconnecting").removeClass("active");
                    KsafimApi.changeUser();
                    KsafimApi.enableUntaggedScans(true);
                }
            });
        },

        changeUser: function(name) {
            if (!name) {
                $("header .user-name").text("");
                $("header .hello-user-actions").removeClass("active");
                $("header .hello-user-actions-guest").addClass("active");
            } else if (typeof name == "string") {
                $("header .user-name").text(name);
                $("header .hello-user-actions").addClass("active");
                $("header .hello-user-actions-guest").removeClass("active");
            }
        }
    }


    $(function() {
        createTemplate();
        createWidgets();
        createBindings();
        adjustPdfFrame();
        pniyaNum = $("div[id^=pniya-]").length;
    });

    function createTemplate() {
        Template = {
            pniya: Handlebars.compile($("#pniya-template").html()),
            pniyaTable: Handlebars.compile($("#pniya-table-template").html()),
            row: Handlebars.compile($("#pniya-row-template").html())
        };
    }

    function createWidgets() {
        $("#bakasha_recv_date").bind("keydown", function(e) { e.preventDefault(); }).datepicker();
    }

    function createBindings() {

        $(".add-row").live("click", function() {
            addRow($(this).closest(".pniya"));
        });

        $("#divider").bind("mousedown", function() {
            console.log("mousedown");
            $(document).bind("mousemove", resizeCol).bind("mouseup", function() {
                $(document).unbind("mousemove", resizeCol).unbind("mouseup", arguments.callee);
            });
        });

        $(".start-filling").live("click", function(e) {
            var $this = $(this), $pniya = $this.closest(".pniya");
            var $input = $this.prev("input");
            var id = $input.val();

            if (id == "" || isNaN(Number(id))) {
                $(".enter-number", $pniya).css("display", "inline");
                e.preventDefault();
                return;
            }
            id = Number(id);

            $input.bind("keypress mousedown", function() { return false; }).addClass("disabled");
            var $pniyaTable = $(Template.pniyaTable({ id: id }));
            $pniya.append($pniyaTable);
            addRow($pniya);
            $this.remove();
            $(".enter-number", $pniya).remove();
            e.preventDefault();
        });

        $("input").live("keypress", function(e) {
            if (e.keyCode == 13) e.preventDefault();
        })

        $("input.prat").live("change", function() {
            var $pratName = $(this).closest("td").next(".prat-name");
            if ($(this).val().trim() != "") {
                var val = $(this).val()[0] == "0" && $(this).val()[1] == "0" ? $(this).val() : "00" + $(this).val();
                $.get("/open-budget/" + val, function(data) {
                    $pratName.text(data.haavara_name);
                });
            }
        });

        $("ul.scans.untagged.unlogged").live("click", doLogin);

        $(".sign-in").bind("click", doLogin);

        $(".sign-out").bind("click", function() {
            KsafimApi.signOut();
        });
    }

    var Template, pniyaNum;

    function resizeCol(e) {
        var distance = window.innerWidth - e.pageX;
        $(".photo").css("width", distance);
        $(".form-wrap").css("right", distance + 8);
    }

    function addRow($pniya) {
        var id = $pniya.attr("id").split("-")[1], row = $pniya.data("rows");
        if (!row) {
            row = 1;
        } else {
            row++;
        }
        $pniya.data("rows", row);
        $(Template.row({ pniya_id : id, id: row })).appendTo($pniya.find(".pniya-table").children("tbody"));
    }

    function adjustPdfFrame() {
        var $frame = $(".file_frame");
        var info = perform_acrobat_detection();
        if (info.acrobat)
            $frame.css({ width: "100%", display: "block", height: "400px"});
        else
            $frame.css({ width: "0", display: "none", height: "0"});
    }



    function doLogin() {
        FB.getLoginStatus(function(response) {
            if (response.status === 'connected') {
                KsafimApi.signIn();
            } else {
                FB.login(function(response) {
                    if (response.authResponse) {
                        KsafimApi.signIn(function() {
                            KsafimApi.changeUser(response.authResponse.name);
                            KsafimApi.enableUntaggedScans();
                        });
                    } else {
                        console.log('User cancelled login or did not fully authorize.');
                    }
                });
            }
        });
    }

})(jQuery);
