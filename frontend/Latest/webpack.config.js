const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");
var webpack = require('webpack');

module.exports = {
  entry: ["./App.js"],
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js"
  },
  devServer: {
	contentBase: "./dist"
  },
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
  plugins: [
    new HtmlWebPackPlugin({
      template: "./ExperienceNYCprototypeReact.html",
      filename: "./index.html"
    }),
    new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery"
    })
  ]
};
