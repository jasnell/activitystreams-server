(function($) {
    var user = {
        id: null,
        create: function() {
            var username = $("#username").val(),
                errorArea = $("#errorInfo");

            if (username === "") {
                errorArea.text("User name cannot be empty.").parent().toggleClass("hidden");
            } else {
                $.ajax({
                    url: "/users/" + username,
                    async: false,
                    type: "POST",
                    success: function(data) {
                        if (data.success) {
                            user.id = data.userID;
                        } else {
                            errorArea.text(data.error).parent().toggleClass("hidden");
                        }
                    },
                    error: function() {
                        errorArea.text("Unexpected error occured.").parent().toggleClass("hidden");
                    }
                });
            }
        }
    };

    $(document).ready(function() {
        var hiddenUsers = $("#hiddenUsers"),
            showAll = $("#showAll"),
            showAllHtml = showAll.html();

        $("#play").click(function() {
            user.create();
            if (user.id) {
                window.location.replace(window.location.origin + "/activitystreams/" + user.id + "?view=true");
            }
            return false;
        });

        showAll.click(function() {
            if (hiddenUsers.hasClass("hidden")) {
                showAll.html("Hide");
            } else {
                showAll.html(showAllHtml);
            }
            hiddenUsers.toggleClass("hidden");
        });
    });
})(jQuery);
