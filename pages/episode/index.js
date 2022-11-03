import EpisodeEntry from '../../components/episode-entry'
import Layout from '../../components/layout'

export default function Episode({ shows }) {
  return <EpisodeEntry shows={shows} />
}

export async function getStaticProps() {
  const res = await fetch(process.env.REST_URL + '/shows', {
    headers: {
      hasura_api_key: process.env.AUTH_HOOK_API_KEY,
    },
  })

  const shows = await res.json()

  return {
    props: shows,
  }
}

Episode.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>
}
