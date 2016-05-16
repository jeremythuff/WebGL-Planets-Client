var webpack = require('webpack');
var path = require('path');


module.exports = {
	resolve: {
		root: [
			path.resolve('./src/')
		]
	},
  	entry: {
		"planets": ['./src/main.js'],
		"lib": ['./src/game/resources/styles/sass/game.scss'],
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
	    	//JSON
	    	{ 
	    		test: /\.json$/, 
	    		loader: 'json'
	    	},
	    	// FONTS
	    	{
				test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
				loader: "url?limit=10000&mimetype=application/font-woff"
			}, 
			{
				test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
				loader: "url?limit=10000&mimetype=application/font-woff"
			}, 
			{
				test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
				loader: "url?limit=10000&mimetype=application/octet-stream"
			}, 
			{
				test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
				loader: "file"
			}, 
			{
				test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
				loader: "url?limit=10000&mimetype=image/svg+xml"
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
  	},
  	node: {
  		net: 'empty',
  		tls: 'empty',
	  	fs: "empty",
	  	dgram: "empty",
		module: "empty",
		child_process: "empty"
	}
};