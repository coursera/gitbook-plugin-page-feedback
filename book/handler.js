
require(["gitbook"], function(gitbook) {
    // Load
    gitbook.events.bind("page.change", function(e, config) {

        function sendToSlack(text) {
            request_data = {
                "channel": "docs-feedback",
                "text": text,
                "username": "Obi-Wan",
                "icon_emoji": ":key:"
            }

            $.post("https://hooks.slack.com/services/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", JSON.stringify(request_data), function(data) {
                console.log("success", data);
                thanksForFeedback();
            });
        }


        function thanksForFeedback() {
            elementStyle = 'border: #ffbd44 2px solid;border-radius: 5px;padding: 5px;margin-left: 10px;color: #ffbd44;'
            $("#page-feedback-buttons").html('<span style="' + elementStyle + '">Thank you</span>')
            $("#page-feedback-yes").hide();
            $("#page-feedback-no").hide();
        }



        $(function() {
            $("#page-feedback-yes").on("click", function(e) {
                console.log('page feedback yes!');
                sendToSlack("Someone thinks <" + window.location.href + "|" + document.title + "> is helpful, yay! :raised_hands:");
            });
        });


        $(function() {
            $("#page-feedback-no").on("click", function(e) {
                console.log('page feedback no!');
                sendToSlack("Someone thinks <" + window.location.href + "|" + document.title + "> is not helpful, oops! :dizzy_face:");
            });
        });

    });

    // Notify pageview
    gitbook.events.bind("page.change", function() {
        //
    });
});