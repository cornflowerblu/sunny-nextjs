import React, { useEffect } from 'react'
import Layout from '../../components/layout'
import { useRouter } from 'next/router'
import Link from 'next/link'


export default function Index({ characters_data, seasons_data, episodes_data, show_data }) {

  // A small function to generate a random number from anything that has a count
  const getNumber = (max, min) => Math.floor(Math.random() * (max - 0) + min)

  // Set up state
  const [showDetails, setShowDetails] = React.useState(false)
  const [imageUrl, setImageUrl] = React.useState('')
  const [name, setName] = React.useState('')
  const [season, setSeason] = React.useState('')
  const [episode, setEpisode] = React.useState('')
  const [episodeTitle, setEpisodeTitle] = React.useState('')
  const [details, setDetails] = React.useState('')
  const [altText, setAltText] = React.useState('')

  // Router
  const router = useRouter()
  useEffect(() => {
    if (router.query.id > 0) {
      router.push(`/shows/${show_data.show?.slug}`, undefined, { shallow: true })
    }
  }, [router.query])

  // The main function that shuffles characters, seasons, and episodes
  const refreshPage = () => {
    try {
      const characterCount = characters_data.cms_.characters.meta.pagination.total
      const characterNumber = getNumber(characterCount, 0)
      const arr = characters_data.cms_.characters.data[characterNumber].attributes
      setImageUrl(arr.image.data.attributes.url)
      setAltText(arr.image.data.attributes.alternativeText)
      setName(arr.first_name)

      const seasonCount = seasons_data.cms_.seasons.meta.pagination.total
      const seasonNumber = getNumber(seasonCount, 0)
      const seasonArr = seasons_data.cms_.seasons.data[seasonNumber].attributes
      setSeason(seasonArr.season_number)

      const episodeCount = episodes_data.cms_.episodes.meta.pagination.total
      const episodeNumber = getNumber(episodeCount, 0)
      const episodeArr = episodes_data.cms_.episodes.data[episodeNumber].attributes
      setEpisode(episodeArr.episode_number)
      setEpisodeTitle(episodeArr.name)
      setDetails(episodeArr.description)
    } catch (error) {
      return console.log(error)
    }
  }

  // Trigger the first refresh and populate the data
  const [isRefreshed, setRefresh] = React.useState(null)
  useEffect(() => {
    refreshPage()
    setRefresh(true)
  }, [characters_data, seasons_data, episodes_data])

  // Show or hide episode details
  const Details = () => {
    return (
      <div>
        <h3 className="display-6 pb-2">{episodeTitle}</h3>
        <p className="lead fs-4">{details}</p>
      </div>
    )
  }
  const renderDetails = () =>
    showDetails ? setShowDetails(false) : setShowDetails(true)
  if (isRefreshed) {
    return (
      <>
        <div className="mx-auto text-center">
          <Link className='title' href={`/shows/${(show_data.show?.id === 1) ? 2 : 1}`}>
            <h1 className="display-6 pb-2">{(show_data.show?.short_name) ? show_data.show.short_name : show_data.show?.name} Episode Picker</h1>
          </Link>
          <div className="d-flex align-items-center justify-content-center pb-2">
            <img
              src={imageUrl}
              alt={altText}
              decoding="sync"
              fetchPriority="high"
            />
          </div>
          <div className="recommendation">
            <p className="fs-5 text-primary shadow p-3 mt-3 bg-body rounded">
              {name} says you should watch <br /> Season {season}, Episode{' '}
              {episode}.
            </p>
            <div className="d-flex flex-row" style={{ marginBottom: '3rem' }}>
              <a
                className="btn btn-primary btn-lg w-50 mt-3 me-2"
                onClick={refreshPage}
              >
                Shuffle
              </a>
              <a
                className="btn btn-outline-primary btn-lg w-50 mt-3 ms-2"
                onClick={renderDetails}
              >
                Details
              </a>
            </div>
            {showDetails ? <Details /> : null}
          </div>
        </div>
      </>
    )
  }
}

export async function getStaticPaths() {
  const showsData = await fetch('https://hasura.rurich.dev/api/rest/v2/shows')
  const shows = await showsData.json()

  const paths = shows.cms_.shows.data.map((show) => ({ params: { id: show.id } }))

  return {
    paths: paths,
    fallback: 'blocking',
  }
}

export async function getStaticProps({ params }) {

  const show = await fetch(`https://cms.rurich.dev/api/shows/count?${params.id}`)
  const characters = await fetch(`https://hasura.rurich.dev/api/rest/v1/show/${params.id}/characters`)
  const seasons = await fetch(`https://hasura.rurich.dev/api/rest/v1/show/${params.id}/seasons`)
  const episodes = await fetch(`https://hasura.rurich.dev/api/rest/v1/show/${params.id}/episodes`)

  const show_data = await show.json()
  const characters_data = await characters.json()
  const seasons_data = await seasons.json()
  const episodes_data = await episodes.json()

  return { props: { characters_data, seasons_data, episodes_data, show_data } }
}

Index.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>
}
