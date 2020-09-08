import HtmlWebPackPlugin from "html-webpack-plugin";
import WebpackObfuscator from "webpack-obfuscator";
import webpack from "webpack";

const config: webpack.Configuration[] = [
  {
    entry: "./src/main/app.ts",
    name: "electron",
    target: "electron-main",
    module: {
      rules: [
        {
          test: /\.ts?$/,
          use: ["ts-loader"],
          exclude: /node_modules/,
        },
      ],
    },
    resolve: {
      extensions: ["*", ".js", ".ts", ".json"],
    },
    output: {
      path: __dirname + "/build",
      filename: "app.js",
    },
    plugins: [],
  },
  {
    entry: "./src/renderer/index.tsx",
    name: "react",
    target: "electron-renderer",
    module: {
      rules: [
        {
          test: /\.(ts|tsx)$/,
          exclude: /node_modules/,
          loader: "ts-loader",
        },
        {
          test: /\.css$/,
          loaders: ["style-loader", "css-loader"],
        },
      ],
    },
    resolve: {
      extensions: [".ts", ".tsx", ".js", ".jsx", ".json"],
    },
    output: {
      path: __dirname + "/build",
      publicPath: "./",
      filename: "bundle.js",
    },
    devServer: {
      contentBase: __dirname + "/build/",
      compress: true,
      hot: true,
      publicPath: "/",
    },
    plugins: [
      new HtmlWebPackPlugin({
        filename: "index.html",
        template: "./src/renderer/index.html",
      }),
    ],
  },
];

export default config;
