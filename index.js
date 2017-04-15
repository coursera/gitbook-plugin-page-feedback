var _ = require('lodash');

var feedbackString;


module.exports = {
    hooks: {
        // called on each book & each language book
        'init': function() {
            var cfg = this.config.get('pluginsConfig.page-feedback'), _this = this;
            elementStyle = 'border: #49c390 2px solid;border-radius: 5px;padding: 5px;margin-left: 10px;color: #49c390;'
            feedbackString = '<strong>Was this helpful?</strong> <span id="page-feedback-buttons"><a id="page-feedback-yes" href="#" style="' + elementStyle + '">Yes, thanks!</a> <a id="page-feedback-no" href="#" style="' + elementStyle + '">Not really</a></span>';
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
                return '<div id="page-feedback" style="margin-top: 25px;">' + block.body + '</div>';
            }
        }
    },

    book: {
        assets: "./book",
        js: [
            "handler.js"
        ]
    }
};
