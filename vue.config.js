module.exports = {
  // ...other vue-cli plugin options...
  pwa: {
    name: 'My Gratitude',
    themeColor: '#182C34',
    msTileColor: '#182C34',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: '#182C34',

    // configure the workbox plugin
    workboxPluginMode: 'InjectManifest',
    workboxOptions: {
      // swSrc is required in InjectManifest mode.
      // swSrc: 'dev/sw.js'
      // ...other Workbox options...
    },
    manifestOptions: {
      name: 'Gratitude',
      shortName: 'Gratitude',
      startUrl: '.',
      display: 'standalone',
      themeColor: '182C34'
    }
  }
}
