
require(["gitbook", "jQuery"], function(gitbook, $) {
    // Load
    gitbook.events.bind("page.change", function(e, config) {
        console.log(config);
        var cfg = config['page-feedback'];

        function sendToSlack(text) {
            request_data = {
                "channel": cfg['slack-channel'],
                "text": text,
                "username": "Obi-Wan",
                "icon_emoji": ":key:"
            }

            $.post(cfg['slack-webhook'], JSON.stringify(request_data), function(data) {
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