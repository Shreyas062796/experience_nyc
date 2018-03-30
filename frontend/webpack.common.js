const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
var webpack = require('webpack');

module.exports = {
  entry: {
    app: './App.js'
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./ExperienceNYCprototypeReact.html",
      filename: "./index.html"
    }),
    new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery"
    })
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
	  {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader"
          }
        ]
      },
	  {
            test: /\.(png|jp(e*)g|svg)$/,  
            use: [{
                loader: 'url-loader',
                options: { 
                    limit: 8000, // Convert images < 8kb to base64 strings
                    name: 'Images/[hash]-[name].[ext]'
                } 
            }]
       },
	  { test: /\.css$/,
		use: ['style-loader', 'css-loader'],
	  },
	  {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 80000,
              mimetype: "application/font-woff"
            }
          }
        ]
      },
      {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: [
          {
            loader: "file-loader"
          }
        ]
      }
    ]
  },
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "bundle.js",
	publicPath: './'
  }
};