const path = require( 'path' );
const webpack = require('webpack');


module.exports = {

    // bundling mode
    mode: 'production',
    devtool: 'source-map',
    devServer: {
        static: './dist',
    },

    // entry files
    entry: './src/index.ts',

    // output bundles (location)
    output: {
        path: path.resolve( __dirname, 'dist' ),
        filename: 'main.js',
    },

    // file resolutions
    resolve: {
        extensions: [ '.ts', '.js' ],
        fallback: { 
            'crypto': false,
            //"stream": require.resolve("stream-browserify"),
            "buffer": require.resolve("buffer")
        },
    },

    // loaders
    module: {
        rules: [
            {
                test: /\.tsx?/,
                use: 'ts-loader',
                exclude: /node_modules/,
            }
        ]
    },

    performance: {
        hints: false,
        maxEntrypointSize: 512000,
        maxAssetSize: 512000
    },
    
    experiments: {
        topLevelAwait: true,
    },

    plugins: [
        // Work around for Buffer is undefined:
        // https://github.com/webpack/changelog-v5/issues/10
        new webpack.ProvidePlugin({
            Buffer: ['buffer', 'Buffer'],
        }),
        // new webpack.ProvidePlugin({
        //     process: 'process/browser',
        // }),
    ],
};