var cfg;

require(["gitbook", "jQuery"], function(gitbook, $) {

    gitbook.events.bind("start", function(e, config) {
        cfg = config['page-feedback'];
    });

    gitbook.events.bind("page.change", function(e) {

        function closeModals() {
          $(".page-feedback-modal").hide();
        }

        function openModals() {
          $(".page-feedback-modal").show();
          $("#page-feedback-type").focus();
        }

        function notify(vote) {
          notifyGoogle(vote);
          notifySlack(vote);
        }

        function notifySlack(vote) {
          var title = document.title;
          var href = window.location.href;
          var type = vote === 1 ? '' : $("#page-feedback-type").val();
          var ideas = vote === 1 ? '' : $("#page-feedback-ideas").val();

          if (cfg['slack-channel']) {
            var text;

            if (vote === 1) {
              text = "someone :heart_eyes: \"<" + href + "|" + title + ">\"!";
            } else {
              text = "someone left feedback for \"<" + href + "|" + title + ">\"\n\n_" + type + "_ \n" + ideas;
            }

            var slack_request_data = {
                "channel": cfg['slack-channel'],
                "text": text
            };

            $.post(cfg['slack-webhook'], JSON.stringify(slack_request_data), function(data) {
            });
          }
        }

        function notifyGoogle(vote) {
          var title = document.title;
          var href = window.location.href;
          var type = vote === 1 ? '' : $("#page-feedback-type").val();
          var ideas = vote === 1 ? '' : $("#page-feedback-ideas").val();

          var google_request_data = {
            "vote": vote,
            "url": href,
            "title": title,
            "type": type,
            "ideas": ideas
          };

          $.ajax({
            url: cfg['google-script-web-deploy-endpoint'],
            dataType: 'jsonp',
            data: google_request_data
          });

          thanksForFeedback();
        }


        function thanksForFeedback() {
            $("#page-feedback-buttons").html('<span class="page-feedback-button">Thank you</span>')
            $("#page-feedback-yes").hide();
            $("#page-feedback-no").hide();
            closeModals();
        }


        $(function() {
            $("#page-feedback-yes").on("click", function(e) {
                e.stopPropagation();
                e.preventDefault(); 
                notify(1);
            });

            $("#page-feedback-send-no").on("click", function(e) {
                e.stopPropagation();
                e.preventDefault(); 
                notify(0);
            });

            $("#page-feedback-no").on("click", function(e) {
                e.stopPropagation();
                e.preventDefault(); 
                openModals();
            });

            $("#page-feedback-cancel").on("click", function(e) {
              e.stopPropagation();
              e.preventDefault(); 
              closeModals();
            });
        });
    });
});
