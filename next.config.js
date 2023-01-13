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
}