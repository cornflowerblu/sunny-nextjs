import EpisodeEntry from '../../components/episode-entry'
import Layout from '../../components/layout'

export default function Episode({ shows }) {
  return <EpisodeEntry shows={shows} />
}

export async function getStaticProps() {
  const res = await fetch(process.env.REST_URL + '/shows', {
    headers: {
      'x-hasura-admin-secret': process.env.AUTH_HOOK_API_KEY,
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
