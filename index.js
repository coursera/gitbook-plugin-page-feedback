var _ = require('lodash');

var feedbackString;


module.exports = {
    hooks: {
        // called on each book & each language book
        'init': function() {
            var cfg = this.config.get('pluginsConfig.page-feedback'), _this = this;
            elementStyle = 'border: #49c390 2px solid;border-radius: 5px;padding: 5px;margin-left: 10px;color: #49c390;'
            feedbackString = '<strong>Was this helpful?</strong> <a id="page-feedback-yes" href="#" style="' + elementStyle + '">Yes, thanks!</a> <a id="page-feedback-no" href="#" style="' + elementStyle + '">Not really</a>';

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
                $("#page-feedback-yes").text("Thank you for the feedback!");
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
        },
        'page:before': function(page) {
            // append to the website renderer only
            page.content = page.content + '\n{% pagefeedback %}' + feedbackString + '{% endpagefeedback %}';
            return page;
        }
    },

    blocks: {
        'pagefeedback': {
            process: function(block) {
                return '<div id="page-feedback">' + block.body + '</div>';
            }
        }
    },

    website: getHandlerScripts
};
