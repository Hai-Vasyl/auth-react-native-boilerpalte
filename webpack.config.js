const path = require("path")
const nodeExternals = require("webpack-node-externals")
const { CleanWebpackPlugin } = require("clean-webpack-plugin")

const config = {
  target: "node",
  mode: "development",
  entry: "./src/index.ts",
  output: {
    filename: "server.js",
    path: path.resolve(__dirname, "dist"),
  },
  externals: [nodeExternals()],
  resolve: {
    extensions: [".js", ".json", ".ts"],
  },
  module: {
    rules: [
      {
        test: /\.(js|ts)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },
  plugins: [new CleanWebpackPlugin()],
}

module.exports = config
