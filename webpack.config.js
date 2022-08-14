import path from 'path';
import webpack from 'webpack';

const config = {
    mode: "production",
    output: {
      path: path.resolve('./dist'),
      filename: 'beet-js.js',
    },
    optimization: {
      minimize: true,
      minimizer: [() => ({ terserOptions: { mangle: false } })]
    },
    profile: true
};

export default config;
