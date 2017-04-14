var fs = require('fs'),
    footerString = '',
    hasFooterFile;

module.exports = {
    hooks: {
        // called on each book & each language book
        'init': function() {
            var cfg = this.config.get('pluginsConfig.page-feedback'), _this = this;

            // try {
            //     fs.statSync(this.resolve(cfg.filename));
            // } catch (e) {
            //     hasFooterFile = false;
            //     return;
            // }

            // hasFooterFile = true;

            // this.readFileAsString(cfg.filename)
            //     .then(function (data) { return _this.renderBlock('markdown',data); }, this.log.error)
            //     .then(function(html) { footerString = html; }, this.log.error);

            footerString = 'Was this helpful?<br/><a>Yes, thanks!</a> <a>Not really</a>';

        },
        'page:before': function(page) {
            // append to the website renderer only
            page.content = page.content + '\n{% pagefeedback %}' + footerString + '{% endpagefeedback %}';
            return page;
        }
    },

    blocks: {
        'pagefeedback': {
            process: function(block) {
                // TODO - maybe add some hr here
                console.log('process block inside page feedback');
                return '<div id="page-feedback">' + block.body + '</div>';
            }
        }
    }
};
