import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
    entry: path.join(__dirname, "/bundle/main.js"),

    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "dist"),
        publicPath: "/"
    },

    module: {
        rules: [{
            test: /\.js$/,
            use: {
                loader: "babel-loader",
                options: {
                    presets: ["@babel/preset-env"]
                },
            },
        }]
    },

    resolve: {
        fallback: {
            "zlib": "browserify-zlib",
            "querystring": "querystring-es3",
            "crypto": "crypto-browserify",
            "fs": false,
            "http": "stream-http",
            "net": false,
            "stream": "stream-browserify",
            "string_decoder": "string_decoder",
            "buffer": "buffer",
            "assert": "assert",
            "vm": "vm-browserify",
            "async_hooks": false
        }
    },

    mode: "development",
    devtool: false
};