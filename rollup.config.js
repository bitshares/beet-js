import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';

export default {
  input: 'main.js',
  output: {
    file: 'bitshares-companion.js',
    format: 'iife',
    name: 'BTSCompanion'
  },
  plugins: [
    resolve({
      
      module: true, // Default: true      
      browser: true,  // Default: false
    }),
    commonjs()
  ],
  moduleContext: {
    [require.resolve('whatwg-fetch')]: 'window'
  }
};