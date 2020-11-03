module.exports = {
  // ...other vue-cli plugin options...
  pwa: {
    name: 'Gratitude',
    themeColor: '#0F343C',
    msTileColor: '#0F343C',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: '#0F343C',

    manifestOptions: {
      name: 'Gratitude',
      shortName: 'Gratitude',
      startUrl: '.',
      display: 'standalone',
      themeColor: '182C34',
      background_color: '#0F343C'
    }
  }
}
