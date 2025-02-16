const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = [
    {
        // Server-side Configuration (Baraye Express)
        entry: './src/server.tsx',
        target: 'node',
        externals: [nodeExternals()],
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: 'server.js',
        },
        resolve: {
            extensions: ['.ts', '.tsx', '.js', '.jsx', '.png'], // TypeScript ham add shod
        },
        module: {
            rules: [
                {
                    test: /\.(ts|tsx)$/, // ts va tsx ro handle mikone
                    exclude: /node_modules/,
                    use: {
                        loader: 'ts-loader',
                    },
                },
                {
                    test: /\.(png|jpg|jpeg|gif|svg)$/i,
                    type: 'asset/resource',
                },
            ],
        },

    },
    {
        // Client-side Configuration (Baraye React)
        entry: './src/client.tsx',
        output: {
            path: path.resolve(__dirname, 'public'),
            filename: 'client.js',
            publicPath: '/',
        },
        resolve: {
            extensions: ['.ts', '.tsx', '.js', '.jsx', '.png'],
        },
        module: {
            rules: [
                {
                    test: /\.(ts|tsx)$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'ts-loader',
                    },
                },
                {
                    test: /\.(png|jpg|jpeg|gif|svg)$/i,
                    type: 'asset/resource',
                },
                {
                    test: /\.css$/,
                    use: ['style-loader', 'css-loader'],
                },
            ],
        },

    },
];
