/**
 * Created by JetBrains WebStorm.
 * User: amit
 * Date: 3/21/12
 * Time: 10:27 PM
 * To change this template use File | Settings | File Templates.
 */
(function($) {
    window.KsafimApi = {
        createPniya: function(opts) {
            opts || (opts = {});
            var $pniya = $(Handlebars.templates.pniya({ id: pniyaNum, rid: opts.rid }));
            $pniya.data("id", pniyaNum++ );
            if (opts.mode == "edit") {
                $(".start-filling, .enter-number, .question-mark", $pniya).remove();
                $pniya.data("mode", "edit");
            }
            $(".pniyot").append($pniya);
            if (opts.noAnimation) return $pniya;
            $pniya.hide();
            $pniya.fadeIn(800, function() {
                $(this).find("input").focus().bind("keypress", function(e) {
                    if (e.keyCode == 13) {
                        $(this).next("button").click();
                        e.preventDefault();
                    }
                });
            });
            return $pniya;
        },

        enableUntaggedScans: function(toDisabled) {
            var $ul = $("ul.scans.untagged");
            $ul[toDisabled ? "addClass" : "removeClass"]("unlogged");
            if (!toDisabled) {
                $(".click-here, .click-here-connecting").appendTo($ul);
                $ul.removeClass("connecting");
            }
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
        },

        doLogin: function() {
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
                    }, { scope: "email" });
                }
            });
        }
    };


    $(function() {
        createTemplate();
        createWidgets();
        createBindings();
        adjustPdfFrame();
        pniyaNum = $("div[id^=pniya-]").length;
    });

    function createTemplate() {
        Handlebars.templates || ( Handlebars.templates = {} );
        Handlebars.templates.pniya = Handlebars.compile($("#pniya-template").html());
    }

    function createWidgets() {
        $("#bakasha_recv_date").bind("keydown", function(e) { e.preventDefault(); }).datepicker({ defaultDate: new Date(2011, 0, 1) });
    }

    function createBindings() {
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
            var $pniyaTable = $("<div></div>").bakashaTable({ id: $pniya.data("id") || 0 }).appendTo($pniya);
            $pniyaTable.bakashaTable("addRow");
            $this.remove();
            $(".enter-number", $pniya).remove();
            e.preventDefault();
        });

        $("input").live("keypress", function(e) {
            if (e.keyCode == 13) e.preventDefault();
        });

        $(".sign-in").bind("click", KsafimApi.doLogin);

        $(".sign-out").bind("click", function() {
            KsafimApi.signOut();
        });

        $(".mark-unfinalized").bind("click", function() {
            var bakashaId = $(".bakasha-id").val();
            $.ajax({
                type: "put",
                url: "/bakashas/" + bakashaId + ".json",
                contentType: "application/json",
                data: JSON.stringify({ bakasha: { finalized: false } }),
                success: function(data, textStatus) {
                    window.location.reload();
                }
            })
        });
    }

    var pniyaNum;

    function adjustPdfFrame() {
        var $frame = $(".file_frame");
        var info = perform_acrobat_detection();
        if (info.acrobat)
            $frame.css({ width: "100%", display: "block", height: "400px"});
        else
            $frame.css({ width: "0", display: "none", height: "0"});
    }

})(jQuery);
