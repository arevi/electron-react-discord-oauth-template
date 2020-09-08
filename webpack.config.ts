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
        {
          test: /\.(tsx?|jsx?)$/i,
          exclude: /(node_modules|\.webpack)/,
          enforce: "post",
          use: [
            {
              loader: WebpackObfuscator.loader,
              options: {
                compact: true,
                controlFlowFlattening: true,
                controlFlowFlatteningThreshold: 0.75,
                deadCodeInjection: true,
                deadCodeInjectionThreshold: 1,
                debugProtection: true,
                debugProtectionInterval: true,
                disableConsoleOutput: true,
                domainLock: [],
                identifierNamesGenerator: "hexadecimal",
                identifiersDictionary: [],
                identifiersPrefix: "",
                inputFileName: "",
                log: false,
                numbersToExpressions: true,
                renameGlobals: false,
                renameProperties: false,
                reservedNames: [],
                reservedStrings: [],
                rotateStringArray: true,
                seed: new Date().getTime(),
                selfDefending: true,
                shuffleStringArray: true,
                simplify: true,
                sourceMap: false,
                sourceMapBaseUrl: "",
                sourceMapFileName: "",
                sourceMapMode: "separate",
                splitStrings: true,
                splitStringsChunkLength: 10,
                stringArray: true,
                stringArrayEncoding: ["rc4"],
                stringArrayThreshold: 1,
                target: "node",
                transformObjectKeys: true,
                unicodeEscapeSequence: true,
              },
            },
          ],
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
