var fs = require('fs'),
    footerString = '',
    hasFooterFile;

module.exports = {
    hooks: {
        // called on each book & each language book
        'init': function() {
            var cfg = this.config.get('pluginsConfig.page-feedback'), _this = this;
            console.log('page feedback init');

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

            footerString = '<strong>test</strong>';

        },
        'page:before': function(page) {
            // append to the website renderer only
            console.log('page before called');
            if (this.output.name !== 'website' || !hasFooterFile) return page;
            page.content = page.content + '\n{% pagefeedback %}' + footerString + '{% pagefeedback %}';
            console.log('page content updated');
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
