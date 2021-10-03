import webpack from 'webpack';
const ConditionalLoader = require.resolve('webpack-conditional-loader');
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');

const configuration: webpack.Configuration = {
    entry: './src/index.tsx',
    output: {
        path: `${__dirname}/../app__manager/src/assets/sst/`,
        filename: 'renderer.js',
    },
    devtool: 'inline-source-map',
    node: {
        __dirname: false,
        __filename: false,
    },
    resolve: {
        extensions: ['*', '.js', '.jsx', '.ts', '.tsx'],
    },
    module: {
        rules: [
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                use: [
                    {
                        loader: ImageMinimizerPlugin.loader,
                        options: {
                            filter: (source: any) => {
                                // The `source` argument is a `Buffer` of source file
                                // The `sourcePath` argument is an absolute path to source
                                if (source.byteLength < 8192) {
                                    return false;
                                }

                                return true;
                            },
                        },
                    },
                ],
                enforce: 'pre',
            },
            {
                test: /\.(jpeg|jpg|png|svg?)(\?[a-z0-9=&.]+)?$/,
                type: 'asset/inline',
            },
            {
                test: /\.(ttf|otf|eot|woff(2)?)(\?[a-z0-9=&.]+)?$/,
                type: 'asset/inline',
            },
            {
                test: /\.(ts|js)x?$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'ts-loader',
                        options: {
                            transpileOnly: true,
                        },
                    },
                    {
                        loader: 'ifdef-loader',
                        options: {
                            env: 'PRODUCTION',
                        },
                    },
                    {
                        loader: ConditionalLoader,
                    },
                ],
            },
        ],
    },
    plugins: [],
    externals: ['electron'],
};

export default configuration;
