const fs = require("node:fs")
const webpack = require("webpack")
const { PATH } = require("./util.cjs")
const ConfigCompile = require("../../config-compile.cjs")
const path = require("path")
const getWebpackConfig = require(path.join(PATH.CWD, "webpack", "webpack.config.cjs")).default

const productionOptions = { mode: "production", sourceMap: false }

const touch = (path) => {
  if (!fs.existsSync(path)) {
    fs.mkdirSync(path, { recursive: true })
  }
}

const touchBuildDirs = () => {
  const paths = [
    PATH.assetsPath,
    PATH.jsPath,
    PATH.cssPath,
    PATH.mediaPath,
    PATH.fontsPath,
    PATH.imagesPath,
    PATH.iconsPath,
  ]
  paths.forEach((path) => {
    touch(path)
  })
}

const buildWebpack = (onSuccess, onError, args) => {
  const webpackConfig = getWebpackConfig({ ...productionOptions, ...args })
  return webpack(webpackConfig, (err, stats) => {
    if (err || stats.hasErrors()) {
      if (onError) {
        onError(err)
      }
      if (ConfigCompile.VERBOSE_COMPILE) {
        console.log(stats.errors)
      }
    } else if (onSuccess) {
      onSuccess()
    }
  })
}

module.exports = { touch, touchBuildDirs, buildWebpack }
