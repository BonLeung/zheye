module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'http://api.vikingship.xyz/api',
        ws: true,
        changeOrigin: true,
        pathRewrite: { '^/api': '' }
      }
    }
  }
}
