var webpack = require('webpack');
var path = require('path');


module.exports = {
  entry: ['./src/main.js', './src/game/resources/styles/sass/game.scss'],
  output: { path: __dirname, filename: 'build/js/build.js' },
  module: {
    loaders: [
		//ES6 Transpiler
	    {
	        test: /.js?$/,
	        loader: 'babel-loader',
	        exclude: /node_modules/,
	        query: {
	          presets: ['es2015']
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