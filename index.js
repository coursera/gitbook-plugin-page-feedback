var _ = require('lodash');

var feedbackString;


module.exports = {
    hooks: {
        // called on each book & each language book
        'init': function() {
            var cfg = this.config.get('pluginsConfig.page-feedback'), _this = this;
            feedbackString = '<strong>Was this helpful?</strong> <span id="page-feedback-buttons"><a id="page-feedback-yes" href="#" class="page-feedback-button">Yes, thanks!</a> <a id="page-feedback-no" href="#" class="page-feedback-button">Not really</a></span>';
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
                return '<div id="page-feedback" style="margin-top: 15px; padding-top: 15px; padding-bottom: 5px; background: white; border-top: solid #efefef 1px;">' + 
                  block.body + 
                  '<div class="page-feedback-modal">' +
                    '<div class="page-feedback-modal-content">' +
                        '<div class="page-feedback-modal-header">' + 
                          '<strong>Why did you say no?</strong><br/>' + 
                          '<select style="width:100%;" id="page-feedback-type">' + 
                            '<option>missing information</option><option>incorrect information</option><option>poorly organized information</option><option>other</option>' + 
                          '</select><br /><br />' + 
                          '<strong>What can we do to make this page better?</strong><br/>' + 
                          '<textarea placeholder="a few quick ideas to help us improve this page" style="width:100%;padding-bottom:10px;padding-top:10px;border:solid #efefef 1px;" id="page-feedback-ideas"></textarea>' +
                          '<br /><br />' +
                          '<div style="float:right;">' + 
                          '<a id="page-feedback-cancel" href="#" class="page-feedback-button">cancel</a>' +
                          '<a id="page-feedback-send-no" href="#" class="page-feedback-button">send</a>' + 
                          '</div>' + 
                        '</div>' +
                    '</div>' +
                  '</div>';
            }
        }
    },

    book: {
        assets: "./book",
        js: [
            "handler.js"
        ],
        css: [
            "handler.css"
        ],
    }
};
