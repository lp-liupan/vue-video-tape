var path = require('path')
var webpack = require('webpack')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const NODE_ENV = process.env.NODE_ENV;

module.exports = {
  entry: NODE_ENV == 'development' ? './src/main.js' : './src/tape/index.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: '/dist/',
    filename: 'vue-video-tape.js',
    library:'VueVideoTape',
	libraryTarget:'umd',
	umdNamedDefine: true

  },
  externals:{
	recordrtc: {
        commonjs: 'recordrtc',
        commonjs2: 'recordrtc',
        amd: 'recordrtc',
        root: '_'
	},
	'vue-video-player': {
        commonjs: 'vue-video-player',
        commonjs2: 'vue-video-player',
        amd: 'vue-video-player',
        root: '_'
	},
	'videojs-contrib-hls': {
        commonjs: 'videojs-contrib-hls',
        commonjs2: 'videojs-contrib-hls',
        amd: 'videojs-contrib-hls',
        root: '_'
	},
	'video.js/dist/video-js.css': {
        commonjs: 'video.js/dist/video-js.css',
        commonjs2: 'video.js/dist/video-js.css',
        amd: 'video.js/dist/video-js.css',
        root: '_'
	},
	'vue-video-player/src/custom-theme.css': {
        commonjs: 'vue-video-player/src/custom-theme.css',
        commonjs2: 'vue-video-player/src/custom-theme.css',
        amd: 'vue-video-player/src/custom-theme.css',
        root: '_'
	},
	
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          'css-loader'
        ],
      },
      {
        test: /\.scss$/,
        use: [
          'vue-style-loader',
          'css-loader',
          'sass-loader'
        ],
      },
      {
        test: /\.sass$/,
        use: [
          'vue-style-loader',
          'css-loader',
          'sass-loader?indentedSyntax'
        ],
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            // Since sass-loader (weirdly) has SCSS as its default parse mode, we map
            // the "scss" and "sass" values for the lang attribute to the right configs here.
            // other preprocessors should work out of the box, no loader config like this necessary.
            'scss': [
              'vue-style-loader',
              'css-loader',
              'sass-loader'
            ],
            'sass': [
              'vue-style-loader',
              'css-loader',
              'sass-loader?indentedSyntax'
            ]
          }
          // other vue-loader options go here
        }
      },
      {
        test: /\.js$/,
		loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        loader: 'url-loader?limit=100000',
        test: /\.(png|woff|woff2|eot|ttf|svg)$/
      },
      {
        test: /\.(swf|mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader?limit=10000&name=media/[name].[hash:8].[ext]'
      }
    ]
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      'webworkify': 'webworkify-webpack-dropin'
    },
    extensions: ['*', '.js', '.vue', '.json']
  },
  devServer: {
    historyApiFallback: true,
    noInfo: true,
    overlay: true
  },
  performance: {
    hints: false
  },
  devtool: '#eval-source-map',
  plugins:[
		// new BundleAnalyzerPlugin()
  ]
}

if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = '#source-map'
  // http://vue-loader.vuejs.org/en/workflow/production.html
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: false,
      compress: {
        warnings: false
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
	}),
	new webpack.optimize.UglifyJsPlugin({
		compress: {
		  warnings: false
		}
	  })
  ])
}
