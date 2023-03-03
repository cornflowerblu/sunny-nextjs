const path = require('path')

module.exports = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/shows/1',
        permanent: true,
      },
    ]
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'public/styles')],
  },
}
