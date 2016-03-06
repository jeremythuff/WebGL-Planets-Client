var webpack = require('webpack');
var path = require('path');


module.exports = {
	resolve: {
		root: [
			path.resolve('./src/')
		]
	},
  	entry: {
		"planets": ['./src/main.js', './src/game/resources/styles/sass/game.scss']
	},
  	output: { path: __dirname, filename: 'build/[name].js' },
  	module: {
    	loaders: [
			//ES6 Transpiler
	    	{
		        test: /.js?$/,
		        loader: 'babel-loader',
		       	include: [
		        	path.resolve(__dirname, "src")
		      	],
		        query: {
					cacheDirectory: true,
					plugins: [
						'transform-decorators-legacy', 
						'syntax-decorators'
					],
					presets: [
						'es2015', 
						'stage-0'
					]
				}
	    	},
		    // SASS
		    {
		      	test: /\.scss$/,
		      	 loaders: ["style", "css", "sass"]
		    }
    	]
  	},
  	sassLoader: {
    	includePaths: [path.resolve(__dirname, "./src/resources/styles/sass/")]
  	}

};