import webpack from 'webpack';

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
                test: /\.(ts|js)x?$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'ts-loader',
                        options: {
                            transpileOnly: true,
                        },
                    },
                ],
            },
        ],
    },
    plugins: [],
    externals: ['electron'],
};

export default configuration;
