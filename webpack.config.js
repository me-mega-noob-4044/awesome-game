const path = require("path");

module.exports = {
    entry: path.join(__dirname, "/bundle/main.js"),

    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "dist"),
        publicPath: "/"
    },

    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
                loader: "babel-loader",
                options: {
                    presets: ["@babel/preset-env"]
                },
            },
        }]
    },

    mode: "development",
    devtool: false
};