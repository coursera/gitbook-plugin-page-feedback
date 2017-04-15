var cfg;

require(["gitbook", "jQuery"], function(gitbook, $) {

    gitbook.events.bind("start", function(e, config) {
        cfg = config['page-feedback'];
    });

    gitbook.events.bind("page.change", function(e) {
        console.log('page has changed inside handler');

        function sendToSlack(text) {
            request_data = {
                "channel": cfg['slack-channel'],
                "text": text,
                "username": "Obi-Wan",
                "icon_emoji": ":scales:"
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
                sendToSlack("<" + window.location.href + "|" + document.title + "> is helpful! :bowtie: :balloon:");
            });
        });


        $(function() {
            $("#page-feedback-no").on("click", function(e) {
                console.log('page feedback no!');
                sendToSlack("<" + window.location.href + "|" + document.title + "> is *not* helpful! :dizzy_face: :poop:");
            });
        });

    });
});