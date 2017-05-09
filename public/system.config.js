SystemJS.config({
    'transpiler': 'plugin-babel',
    'map': {
        //system js files
        'plugin-babel': './systemjs-plugin-babel/plugin-babel.js',
        'systemjs-babel-build': './systemjs-plugin-babel/systemjs-babel-browser.js',

        //app files
        'main': './scripts/main.js',
        'template-loader': './scripts/utils/template-loader.js',
        'puzzle': './scripts/models/puzzle-model.js',
        'player': './scripts/models/player-model.js',
        'requester': './scripts/utils/requester.js',
        'data': './scripts/utils/data.js',
        'puzzle-controller': './scripts/controllers/puzzle-controller.js',
        'map-controller': './scripts/controllers/map-controller.js',
        'user-controller': './scripts/controllers/user-controller.js',
        'validator': './scripts/utils/validator.js',

        //lib files

        'toastr': './bower_components/toastr/toastr.js', 
        // 'navigo':'../node_modules/navigo/lib/navigo.js',

        //unit test files
        'data-tests': './tests/data-tests.js',
        'mocha': "./mocha/mocha.js", 
        'chai': "./chai/chai.js",
        'sinon': "./sinon/pkg/sinon.js",
        'sinon-chai': "./sinon-chai/lib/sinon-chai.js",
         'crypto': "./bower_components/crypto-js/crypto-js.js"
    }
});