const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
module.exports = {
  entry: path.resolve(__dirname, "./src/index.js"),
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "[name].bundle.js",
    publicPath: "",
  },
  devServer: {
    historyApiFallback: true,
    contentBase: path.resolve(__dirname, "./dist"),
    open: true,
    compress: true,
    port: 3000,
    hot: true,
  },
  mode: "development",

  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "./src/index.pug"),
      filename: "index.html",
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: "./css/[name].css",
    }),
  ],
  module: {
    rules: [
      {
        test: /\.html$/,
        use: "html-loader",
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.scss$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: (resourcePath, context) => {
                return path.relative(path.dirname(resourcePath), context) + "/";
              },
            },
          },
          "css-loader",
          "sass-loader",
        ],
      },
      {
        test: /\.(?:|gif|png|jpg|jpeg|svg|)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "./assets/[name].[ext]",
            },
          },
        ],
      },
      {
        test: /\.(eot|woff|ttf)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "fonts/[name].[ext]",
            },
          },
        ],
      },
      {
        test: /\.pug$/,
        use: ["pug-loader"],
      },
    ],
  },
};
