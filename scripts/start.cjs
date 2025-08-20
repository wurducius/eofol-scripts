const Webpack = require("webpack")
const WebpackDevServer = require("webpack-dev-server")
const { error, getArgv, logEofolScript, primary, PATH } = require("./impl/util.cjs")
const ConfigCompile = require("../config-compile.cjs")
const path = require("path")
const getWebpackConfig = require(path.join(PATH.CWD, "webpack", "webpack.config.cjs")).default

const argAnalyze = getArgv({ short: "-a", long: "--analyze" })

const webpackConfig = getWebpackConfig({ analyze: argAnalyze })

const compiler = Webpack(webpackConfig)
const devServerOptions = { ...webpackConfig.devServer, open: ConfigCompile.OPEN, port: ConfigCompile.PORT }
const server = new WebpackDevServer(devServerOptions, compiler)

const runServer = async () => {
  console.log(primary("Starting dev server @ http://localhost:8080"))
  await server.startCallback((err) => {
    if (err) {
      console.log(error(`Compilation error: ${err.message}`))
    }
  })
}

logEofolScript("start")
if (ConfigCompile.VERBOSE_COMPILE) {
  console.log(primary("Starting server..."))
}
if (ConfigCompile.CLEAR_SCREEN) {
  console.clear()
}

runServer()
