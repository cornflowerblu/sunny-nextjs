import React, { useEffect } from 'react'
import Link from 'next/link'
import Layout from '../components/layout'



export default function Index({ characters_data, seasons_data, episodes_data }) {
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

  // The main function that shuffles characters, seasons, and episodes
  const refreshPage = () => {
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
          <Link className='title' href={'/shows/1'} >
            <h1 className="display-6 pb-2">Always Sunny Episode Picker</h1>
          </Link>
          <div className="d-flex align-items-center justify-content-center pb-2">
            <img
              src={imageUrl}
              alt={altText}
              decoding="sync"
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

export async function getStaticProps() {

  const characters = await fetch(`https://hasura.rurich.dev/api/rest/v1/show/1/characters`)
  const seasons = await fetch(`https://hasura.rurich.dev/api/rest/v1/show/1/seasons`)
  const episodes = await fetch(`https://hasura.rurich.dev/api/rest/v1/show/1/episodes`)

  const characters_data = await characters.json()
  const seasons_data = await seasons.json()
  const episodes_data = await episodes.json()

  return { props: { characters_data, seasons_data, episodes_data } }
}

Index.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>
}
