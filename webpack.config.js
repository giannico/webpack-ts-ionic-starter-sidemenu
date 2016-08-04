'use strict';
var path = require('path');

// Modules
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');

/**
 * Env
 * Get npm lifecycle event to identify the environment
 */
var ENV = process.env.npm_lifecycle_event;
var isProd = ENV === 'build';

module.exports = function makeWebpackConfig () {
    /**
     * Reference: http://webpack.github.io/docs/configuration.html
     */
    var config = {};

    /**
     * Reference: http://webpack.github.io/docs/configuration.html#entry
     * Separate build assets for the application and vendor files
     */
    config.entry = {
        app: './www/app/app.ts',
        vendor: ['./www/vendor/index.ts'] // https://github.com/webpack/webpack/issues/300
    };

    /**
     * Reference: http://webpack.github.io/docs/configuration.html#output
     */
    config.output = {
        // Absolute output directory
        path: __dirname + '/dist',

        // Output path from the view of the page
        // Uses webpack-dev-server in development
        publicPath: isProd ? '/' : 'http://localhost:8080/',

        // Filename format for entry points (chunkhash added in build mode)
        filename: isProd ? '[name].[chunkhash].js' : '[name].bundle.js',

        // Filename for non-entry points
        // Only adds chunkhash in build mode
        chunkFilename: isProd ? '[name].[chunkhash].js' : '[name].bundle.js'
    };

  /**
   * Reference: http://webpack.github.io/docs/configuration.html#resolve-extensions
   */

  var ionicJsPath = path.join(__dirname, 'node_modules/ionic-angular/release/ionic.js');
  var ionicCssPath = path.join(__dirname, 'node_modules/ionic-angular/release/ionic.js');

  config.resolve = {
      extensions: ['', '.ts', '.js', '.json'],
      alias: {
          'ionic-js$': path.join(__dirname, 'node_modules/ionic-angular/release/js/ionic.js'),
          'ionic-css$': path.join(__dirname, 'node_modules/ionic-angular/release/css/ionic.css'),
          'ionic-angular': path.join(__dirname, 'node_modules/ionic-angular/release/js/ionic-angular.js')
      }
  };

    /**
     * Reference: http://webpack.github.io/docs/configuration.html#devtool
     * Type of sourcemap to use per build type
     */
    if (isProd) {
        config.devtool = 'source-map';
    } else {
        config.devtool = 'eval-source-map';
    }

    /**
     * Loaders
     * Reference: http://webpack.github.io/docs/configuration.html#module-loaders
     * List: http://webpack.github.io/docs/list-of-loaders.html
     * This handles most of the magic responsible for converting modules
     */
    config.module = {
        preLoaders: [],
        loaders: [{
            // ts-loader
            // Reference: https://github.com/TypeStrong/ts-loader
            // Transpile .ts files using TypeScript
            //
            // ng-annotate-loader
            // Reference: https://github.com/TypeStrong/ts-loader
            // Runs ng-annotate on source files
            test: /\.ts$/,
            loaders: ['ng-annotate?add=true', 'ts-loader'],
            exclude: /node_modules/
        }, {
            // css-loader
            // Reference: https://github.com/webpack/css-loader
            // Allow loading css through js
            test: /\.css$/,
            // Reference: https://github.com/webpack/extract-text-webpack-plugin
            // Extract css files
            //
            // Reference: https://github.com/webpack/style-loader
            // Use style-loader in development.
            loader: ExtractTextPlugin.extract('style', 'css?sourceMap')
        }, {
            // html-loader
            // Reference: https://github.com/webpack/raw-loader
            // Allow loading html through js
            test: /\.html$/,
            loader: 'raw'
        },
        {
            test: /\.(png|jpg)$/,
            loader: 'file?name=img/[name].[ext]'
        },
        {
            test: [/ionicons\.svg/, /ionicons\.eot/, /ionicons\.ttf/, /ionicons\.woff/],
            loader: 'file?name=fonts/[name].[ext]'
        }]
    };

    /**
     * Plugins
     * Reference: http://webpack.github.io/docs/configuration.html#plugins
     * List: http://webpack.github.io/docs/list-of-plugins.html
     */
    config.plugins = [];

    config.plugins.push(
        // Reference: https://github.com/ampedandwired/html-webpack-plugin
        // Render index.html with injected generated assets
        new HtmlWebpackPlugin({
            template: './www/index.html',
            inject: 'head'
        }),

        // Reference: https://github.com/webpack/extract-text-webpack-plugin
        // Extract css files
        // Disabled when not in build mode
        new ExtractTextPlugin('[name].[chunkhash].css'),

        // Reference: http://webpack.github.io/docs/list-of-plugins.html#uglifyjsplugin
        // Minify all javascript, switch loaders to minimizing mode
        // Code is minified even in development mode, to help identify any issues during
        // development time.
        new webpack.optimize.UglifyJsPlugin(),

        // Reference: https://webpack.github.io/docs/list-of-plugins.html#commonschunkplugin
        // Generates an extra output file which contains common modules (vendor in this case)
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor'
        })
    );

    // Add build specific plugins
    if (isProd) {
        config.plugins.push(
            // Reference: http://webpack.github.io/docs/list-of-plugins.html#noerrorsplugin
            // Only emit files when there are no errors
            new webpack.NoErrorsPlugin(),

            // Reference: http://webpack.github.io/docs/list-of-plugins.html#dedupeplugin
            // Dedupe modules in the output
            new webpack.optimize.DedupePlugin(),

            // Copy assets from the public folder
            // Reference: https://github.com/kevlened/copy-webpack-plugin
            new CopyWebpackPlugin([{
                from: __dirname + '/www'
            }])
        );
    }

    /**
     * Dev server configuration
     * Reference: http://webpack.github.io/docs/configuration.html#devserver
     * Reference: http://webpack.github.io/docs/webpack-dev-server.html
     */
    config.devServer = {
        contentBase: './www',
        stats: 'minimal'
    };

    return config;
}();