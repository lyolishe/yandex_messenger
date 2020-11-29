const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const mode = process.env.NODE_ENV || "development";
const isDev = mode === "development";

module.exports = function (path) {
    return {
        entry: ["./src/index.ts"],
        resolve: {
            alias: {
                'handlebars': 'handlebars/dist/handlebars.js'
            },
            extensions: ['.ts', '.js', ".css", ".less"]
        },
        output: {
            path,
            filename: isDev ? 'bundle.js' : "bundle.min.[hash].js"
        },
        mode,
        devtool: isDev ? "inline-source-map" : false,
        devServer: {
            disableHostCheck: true,
            historyApiFallback: true,
            port: 3000
        },
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    loader: "ts-loader",
                    options: {
                        transpileOnly: true
                    }
                },
                {
                    test: /\.less$/,
                    use: [
                        {
                            loader: MiniCssExtractPlugin.loader,
                            options: {
                                publicPath: ''
                            }
                        },
                        {loader: "css-loader", options: {modules: "global"}},
                        {
                            loader: "less-loader",
                            options: {
                                lessOptions: {
                                    javascriptEnabled: true
                                }
                            }
                        }
                    ],
                },
                {
                    test: /\.css$/,
                    use: [
                        {loader: MiniCssExtractPlugin.loader},
                        {loader: "css-loader", options: {modules: "global"}},
                    ],
                },
                {
                    test: /\.(ttf|eot|svg|png|jpg|gif|ico|mp3|pdf|woff|woff2)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                    use: [
                        {
                            loader: 'file-loader',
                        }
                    ]
                }
            ]
        },
        plugins: [
            new MiniCssExtractPlugin({
                filename: isDev ? '[name].css' : '[name].[hash].css',
                chunkFilename: isDev ? '[id].css' : '[id].[hash].css',
            }),
            new HtmlWebpackPlugin({
                template: './static/index.html'
            }),
        ]
    }
}