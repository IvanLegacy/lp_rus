const webpackStream = require ('webpack-stream');
const webpack = webpackStream.webpack;

module.exports = (isDevelopment) => {
    return {
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
        plugins: [
            new webpack.ProvidePlugin({
                'window.jQuery': 'jquery',
                'window.$': 'jquery',
                jQuery: 'jquery',
                $: 'jquery',
            }),
        ],
        devtool: isDevelopment ? 'cheap-module-inline-source-map' : false,
        watch: isDevelopment,
    };
};