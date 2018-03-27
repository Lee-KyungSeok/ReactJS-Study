const webpack = require('webpack');

module.exports = {
    // 주를 이루는 JavaScript 파일(엔트리 포인트)
    entry: ['react-hot-loader/patch','./src/index.js'],

    // 파일 출력 설정
    output: {
        path: __dirname + '/public/', // 출력 파일 디렉토리 이름
        filename: 'bundle.js'         // 출력 파일 이름
    },

    devServer: {
        hot: true,
        inline: true,
        host: '0.0.0.0',
        port: 4000,
        contentBase: __dirname + '/public/',
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                options: {
                    cacheDirectory: true,
                    presets: ['env', 'react'],
                    plugins: ["react-hot-loader/babel"]
                }
            }
        ]
    },

    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ]
};