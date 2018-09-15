const webpackStream = require ('webpack-stream');
const webpack = webpackStream.webpack;

module.exports = (isDevelopment) => {
    let plugins = [];

    plugins.push(new webpack.ProvidePlugin({
        $: 'jquery',
        '$': 'jquery',
        jquery: 'jquery',
        jQuery: 'jquery',
        'window.jquery': 'jquery',
        'window.jQuery': 'jquery',
    }));

    if (!isDevelopment) {
        plugins.push(new webpack.optimize.UglifyJsPlugin({
            include: /\.min\.js$/,
            minimize: true
        }));
    }
    return {
        watch: true,
        context: __dirname + '/assets/js',
        entry: {
            main: './main',
        },
        output: {
            path: __dirname + './build/js',
            filename: 'build.min.js',
            library: 'main',
            libraryTarget: 'var',
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /(node_modules|bower_components)/,
                    loader: 'babel-loader',
                    query: {
                        presets: ['es2015'],
                    },
                },
                {
                    test: /\.js$/,
                    loader: 'imports-loader?define=>false',
                },
            ],
        },
        plugins: plugins,
        devtool: isDevelopment ? 'cheap-module-inline-source-map' : false,
        watch: isDevelopment,
    };
};