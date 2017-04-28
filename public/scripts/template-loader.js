var templateLoader = (function() {
    let cache = {};

    function get(templateName) {

        let promise = new Promise((resolve, reject) => {
            if (cache[templateName]) {
                resolve(cache[templateName]);
                return;
            }
            $.get(`../templates/${templateName}.handlebars`, (template) => {
                const compiledTemplate = Handlebars.compile(template);
                cache[templateName] = compiledTemplate;
                resolve(compiledTemplate);
            })
        });

        return promise;
    }

    return {
        get
    }
})();