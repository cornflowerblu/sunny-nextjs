module.exports = {
  async redirects() {
    return [
      {
        source: '/shows',
        destination: '/shows/1',
        permanent: true,
      },
    ]
  },
}