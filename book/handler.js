var cfg;

require(["gitbook", "jQuery"], function(gitbook, $) {

    gitbook.events.bind("start", function(e, config) {
        cfg = config['page-feedback'];
    });

    gitbook.events.bind("page.change", function(e) {
        function notify(vote) {
          var title = document.title;
          var href = window.location.href;

          if (cfg['slack-channel']) {
            var text = vote === 1 ? "<" + href + "|" + title + "> is helpful! :bowtie: :balloon:" : "<" + href + "|" + title + "> is *not* helpful! :dizzy_face: :poop:";

            var slack_request_data = {
                "channel": cfg['slack-channel'],
                "text": text,
                "username": "Coursera Gitbooks",
                "icon_emoji": ":page-facing-up:"
            };

            $.post(cfg['google-script-web-deploy-endpoint'], JSON.stringify(slack_request_data), function(data) {
                thanksForFeedback();
            });
          }

          var google_request_data = {
            "vote": vote,
            "url": href,
            "title": title
          };

          $.post(cfg['slack-webhook'], JSON.stringify(google_request_data), function(data) {
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
                notify(1);
            });
        });


        $(function() {
            $("#page-feedback-no").on("click", function(e) {
                notify(0);
            });
        });

    });
});
