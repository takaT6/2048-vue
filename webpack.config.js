// https://qiita.com/_ant/items/8dfcec54f6b2280c848b
const { VueLoaderPlugin } = require('vue-loader')
const webpack = require('webpack');
module.exports = {
  //production(本番用)にすると最適化された状態で、
  //development(開発用)に設定すると読みやすいjsが出力される
  mode: "development",

  //sourcemapをスクリプト内に埋め込む
  devtool: 'inline-source-map',

  //エントリーポイントになるjsファイル ※次のパートで作成します
  entry: "./src/index.ts",

  output: {
    //ビルド結果の出力先を指定します
    path: `${__dirname}/dist`,
　　//ビルド結果のjsファイル名を指定します
    filename: "main.js"
  },
  module: {
    rules: [
      {
        //vueのloader設定
        test: /\.vue$/,
        loader: "vue-loader"
      },
      {
        //cssのloader設定
        test: /\.css$/,
        use:[
          "style-loader",
          "css-loader"
        ]
      },
      {
        //typescriptのloaderを設定
        test: /\.ts$/,
        loader: "ts-loader",
        options: {
          //vueをtypescriptとして監視する
          appendTsSuffixTo: [/\.vue$/]
        }
      },
    ]
  },
  resolve: {
    //import文で、.tsを省略できるようにする
    extensions: [".ts", ".js"]
  },
　//vue-loader v15以上を使う場合に必要
  plugins:[
    new VueLoaderPlugin(),
    new webpack.DefinePlugin({
      __VUE_OPTIONS_API__: true,
      __VUE_PROD_DEVTOOLS__: false
    })
  ],

  devServer: {
    static: "dist",
    open: true
  }
}