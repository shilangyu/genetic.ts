import * as path from 'path'
import { Configuration } from 'webpack'

const config: Configuration = {
	entry: './dist/Genetic.js',
	target: 'web',
	output: {
		filename: 'Genetic.web.js',
		path: path.resolve(__dirname, 'dist'),
		library: 'genetic',
		libraryTarget: 'umd'
	},
	mode: 'production'
}

export default config
