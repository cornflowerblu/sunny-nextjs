import EpisodeEntry from '../components/episode-entry'
import Layout from '../components/layout'

export default function Episode({ shows }) {
  const handleSubmit = async (event) => {
    event.preventDefault()

    const data = {
      show_id: event.target.show_id.value,
      season_number: event.target.season_number.value,
      episode_number: event.target.episode_number.value,
      title: event.target.title.value,
      description: event.target.description.value,
    }
    const JSONdata = JSON.stringify(data)

    const endpoint = 'http://localhost:3001/episode/new'

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSONdata,
    }

    const response = await fetch(endpoint, options)

    const result = await response.json()
    alert(`It worked submitting: ${result.data}`)
  }
  return <EpisodeEntry handler={handleSubmit} shows={shows} />
}

export async function getServerSideProps() {
  const res = await fetch('http://localhost:3001/episode/v2')

  const shows = await res.json()

  return {
    props: shows,
  }
}

Episode.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>
}
