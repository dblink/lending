const path = require('path');
const deleteFolderFile = require('./deleteFile').deleteFolderFile;
const targetPath = path.resolve(__dirname, 'dist');
//覆盖前删除
deleteFolderFile(targetPath);

module.exports = {
    mode: "production", //production|development
    entry: {
        index:"./enter.tsx"
    },

    output: {
        filename: "[name].bundle.js",
        chunkFilename: '[name].[chunkhash:8].js',
        path: targetPath
    },

    // Enable sourcemaps for debugging webpack's output.
    //devtool: "source-map",
    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: [".ts", ".tsx", ".js", ".json"]
    },

    module: {
        rules: [
            // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
            { test: /\.tsx?$/,
                loader: "awesome-typescript-loader"
            },

            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            //{ enforce: "pre", test: /\.js$/, use: "source-map-loader" },
            {
                enforce: "pre", test: /\.js$/,
                use: "source-map-loader"
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"]
            },
            //sass
            {
                test: /\.scss$/,
                use:  ['style-loader','css-loader',  {loader: 'sass-loader',
                    options:{
                        includePaths: ['./node_modules']
                    }
                }]
            },
            {
                test: /\.(png)|(jpg)|(gif)$/,
                use: "url-loader?limit=8129&name=./img/[hash:8].[name].[ext]" //注意图片路径
            },
        ]
    }

    // When importing a module whose path matches one of the following, just
    // assume a corresponding global variable exists and use that instead.
    // This is important because it allows us to avoid bundling all of our
    // dependencies, which allows browsers to cache those libraries between builds.
    /*,externals: {
        "react": "React",
        "react-dom": "ReactDOM"
    },
    /*optimization: {
        splitChunks: {
            // include all types of chunks
            chunks: 'all'
        }
    }*/
};