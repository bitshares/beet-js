const path = require('path');
const webpack = require('webpack');

const config = module.exports = {
    mode: "production",
    entry: path.resolve('./src/index.js'),
    output: {
        path: path.resolve('./dist'),
        filename: 'beet-js.js', //ignored?
    },
    profile: true
};
