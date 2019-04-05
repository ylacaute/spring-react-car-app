const path = require("path");
const chalk = require('chalk');
const webpack = require('webpack');
const FriendlyErrorsWebpackPlugin = require("friendly-errors-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const resolve = (dirName) => path.resolve(__dirname, dirName);

const dispKeys = (msg, object) => Object.keys(object).forEach(key =>
    console.log(chalk.blue(`${msg} '${key}': ${object[key]}`)));
const getContextPath = (env) => {
    return (env != null && env.contextPath != null) ? env.contextPath : "";
};

const Paths = {
    src: resolve("src"),
    tsx: resolve("src/main/tsx"),
    template: resolve("src/main/resources/template"),
    static: resolve("src/main/resources/static"),
    externalStatic: resolve("/home/epi/sgoinfre/static"), // external static files (cars images)
    style: {
        sassDir: resolve("src/main/sass"),
        defaultTheme: resolve("src/main/sass/theme/default.scss"),
        darkTheme: resolve("src/main/sass/theme/dark.scss")
    },
    dist: resolve("target/classes/static")
};

module.exports = function(env) {

    const contextPath = getContextPath(env);

    // The external static directory is override for the demo
    if (env && env.externalStatic) {
        Paths.externalStatic = resolve(env.externalStatic);
    }

    const Options = {
        analyzeBundle: env && env.analyze === "true",
    };
    dispKeys("User build path", Paths);
    const cfg = {

        // Directory from where Webpack will search entries
        context: Paths.tsx,

        // Web means "client" (could also be "server" with node)
        target: "web",

        entry: {
            app: "./client.tsx",
            defaultTheme: Paths.style.defaultTheme,
            darkTheme: Paths.style.darkTheme
        },
        output: {
            filename: "[name].bundle.js",
            publicPath: contextPath,
            path: Paths.dist
        },

        // Enable sourcemaps for debugging webpack's output
        devtool: "none", // "cheap-module-eval-source-map", |  "source-map",

        resolve: {
            // Directories where to search to resolve imports (avoid relative imports)
            modules: [Paths.tsx, "node_modules"],

            // Enables users to leave off the extension when importing
            extensions: [".ts", ".tsx", ".js", ".scss"],

            alias: {
                sass: Paths.style.sassDir
            }
        },

        module: {
            //  Makes missing exports an error instead of warning (default: false)
            strictExportPresence: true,

            rules: [{
                oneOf: [
                    {
                        test: /\.tsx$/,
                        exclude: /node_modules/,
                        loader: "awesome-typescript-loader?silent=true"
                    },
                    {
                        test: /\.(png|jpg|gif|ico)$/,
                        use: [
                            {
                                loader: "file-loader",
                                options: {
                                    name: "[path][name].[ext]",
                                    emitFile: true
                                }
                            }
                        ]
                    },
                    {
                        test: /\.(css|scss)$/,
                        use: [
                            // We don't use style-loader cause it generate evil inline styles
                            MiniCssExtractPlugin.loader,
                            //'css-loader',
                            {
                                loader: "css-loader",
                                options: {
                                //     // import: false,
                                      importLoaders: 2,
                                //     // exportOnlyLocals: true,
                                //    minimize: false,
                                     modules: false,
                                     localIdentName: "[local]___[hash:base64:5]"
                                 }
                            },
                            // {
                            //     loader: 'postcss-loader',
                            //     options: { exec: true }
                            // },
                            'resolve-url-loader',
                            {
                                loader: "sass-loader",
                                options: {
                                    includePaths: [
                                        // Allow to include in tsx relative scss
                                        // Sample : @import "core/main";
                                        Paths.style
                                    ]
                                }
                            }
                            // {
                            //     loader: 'sass-static-loader',
                            //     options: {
                            //         //sourceMap: true,
                            //         static: Paths.style + '/core/_main.scss'
                            //     }
                            // }
                        ],
                    },
                    {
                        test: /\.(png|woff|woff2|eot|ttf|svg)$/,
                        loader: 'url-loader?limit=100000'
                    }
                ]
            }]
        },

        performance: {
            hints: false
        },

        plugins: [
            // Friendly-errors-webpack-plugin recognizes certain classes of webpack errors and cleans,
            // aggregates and prioritizes them to provide a better Developer Experience
            new FriendlyErrorsWebpackPlugin(),

            // Copy static directory to the output
            new CopyWebpackPlugin([{
                from: Paths.static,
                to: Paths.dist
            }]),

            new MiniCssExtractPlugin({
                filename: "[name].css",
                chunkFilename: "[id].css"
            }),

            new webpack.DefinePlugin({
                CONTEXT_PATH: JSON.stringify(contextPath),
            }),
        ],

    };

    //if (Options.webPackDevServer) {
        cfg.plugins = cfg.plugins.concat([
            new HtmlWebpackPlugin({
                hash: true,
                title: 'React-SSR',
                filename: 'index.html',
                template: Paths.template + '/index.ejs',
                // Inject JS files generated by webpack after the body
                inject: 'body',
                // Don't inject css into the html to manage them dynamically
                excludeChunks: [ "defaultTheme", "darkTheme"]
            })
        ]);
        cfg.devServer = {
            contentBase: [Paths.static, Paths.externalStatic],
            // Allow to refresh routed pages
            historyApiFallback: true,
            publicPath: contextPath
        };
    //}

    // If true, analyze the build bundle and open the report in the browser
    if (Options.analyzeBundle) {
        cfg.plugins = cfg.plugins.concat(
            new BundleAnalyzerPlugin({
                analyzerMode: 'static'
            })
        );
    }

    // client-specific configurations
    // if (Options.clientBuild) {
    //     cfg.optimization = {
    //         splitChunks: {
    //             cacheGroups: {
    //                 vendor: {
    //                     test: /node_modules/,
    //                     chunks: "initial",
    //                     num: "vendor",
    //                     priority: 10,
    //                     enforce: true
    //                 }
    //             }
    //         }
    //     };
    // }

    return cfg;
};
