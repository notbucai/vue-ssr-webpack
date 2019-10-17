const webpack = require('webpack');
const path = require('path');
const Mfs = require("memory-fs");
const fs = require("fs");
const serverConf = require('../config/webpack.common')
const compiler = webpack(serverConf);

function devServer(cb) {
  var mfs = new Mfs();

  compiler.outputFileSystem = mfs;

  compiler.watch({}, async (error, stats) => {
    if (error) return console.log(error);
    stats = stats.toJson();
    stats.errors.forEach(error => console.log(error));
    stats.warnings.forEach(warning => console.log(warning));

    const serverBundlePath = path.join(serverConf.output.path, 'vue-ssr-server-bundle.json');
    const serverBundle = JSON.parse(mfs.readFileSync(serverBundlePath, "utf-8"));
    const template = fs.readFileSync(path.join(__dirname, '../public/index.html'), "utf-8");
    cb && cb(serverBundle, null, template);
  });

}
module.exports = devServer;