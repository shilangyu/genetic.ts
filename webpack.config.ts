import { resolve } from 'path'
import { Configuration } from 'webpack'

export default {
  entry: './dist/genetic.js',
  target: 'web',
  output: {
    filename: 'genetic.web.js',
    path: resolve(__dirname, 'dist'),
    library: 'genetic',
    libraryTarget: 'umd',
  },
  mode: 'production',
} as Configuration
