const path = require('path')
const { NODE_ENV = 'production' } = process.env
const nodeExternals = require('webpack-node-externals')
module.exports = {
    entry: './index.ts',
    mode: NODE_ENV,
    target: 'node',
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'index.js',
    },
    resolve: {
        extensions: ['.ts', '.js'],
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [['@babel/preset-typescript']],
                    },
                },
            },
        ],
    },
    externals: [nodeExternals()],
    watch: NODE_ENV === 'development',
}
