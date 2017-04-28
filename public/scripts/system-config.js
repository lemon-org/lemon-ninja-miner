SystemJS.config({
    transpiler: 'plugin-babel',
    map: {
        //system js files
        'plugin-babel': '../../node_modules/systemjs-plugin-babel/plugin-babel.js',
        'systemjs-babel-build': '../../node_modules/systemjs-plugin-babel/systemjs-babel-browser.js',

        //app files
        'main': './main.js',
        'template-loder':'./template-loader.js',

        //lib files
        'jquery': '../bower_components/jquery/dist/jquery.js',
       
    }
});
System.import('main');