// Parcel v2 の設定ファイル例
const { defineConfig } = require('@parcel/config-default');

module.exports = defineConfig({
  filePath: require.resolve('@parcel/config-default'),
  reporters: [
    "@parcel/reporter-cli",
    "@parcel/reporter-dev-server"
  ],
  distDir: 'public/assets'
});
