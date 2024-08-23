'use strict';
const path = require('path');

module.exports = {
    devtool: 'inline-source-map',
	entry: {
        'lemmy-helper': './src/ts/index.ts',
        'settings': './src/ts/settings.ts'
    },
	output: {
		filename: '[name].js',
		path: path.resolve(__dirname, './dist')
	},
    module: {
        rules: [
            {
                test: /\.([cm]?ts|tsx)$/,
                loader: 'ts-loader',
            },
        ],
    },
    resolve: {
        extensions: [ '.ts', '.tsx', '.js' ],
        extensionAlias: {
            '.ts': ['.js', '.ts'],
            '.cts': ['.cjs', '.cts'],
            '.mts': ['.mjs', '.mts']
        }
    }
};
