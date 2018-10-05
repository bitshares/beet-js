import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import json from 'rollup-plugin-json';

export default {
  input: 'main.js',
  output: {
    file: 'beet.js',
    format: 'iife',
    name: 'Beet'
  },
  plugins: [
    json({
      // All JSON files will be parsed by default,
      // but you can also specifically include/exclude files
      include: 'node_modules/**',

      // for tree-shaking, properties will be declared as
      // variables, using either `var` or `const`
      preferConst: false, // Default: false

      // specify indentation for the generated default export —
      // defaults to '\t'
      indent: '  ',

      // ignores indent and generates the smallest code
      compact: true, // Default: false

      // generate a named export for every property of the JSON object
      namedExports: true // Default: true
    }),
    commonjs({
      include: 'node_modules/**',  // Default: undefined
    }),
    
    resolve({
      
      module: true, // Default: true      
      browser: true,  // Default: false
      jsnext: true,  // Default: false
      main: true,  // Default: true

    })
  ],
  moduleContext: {
    [require.resolve('whatwg-fetch')]: 'window'
  }
};