const path = require('path')

module.exports = {
  async redirects() {
    return []
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'public/styles')],
  },
}
