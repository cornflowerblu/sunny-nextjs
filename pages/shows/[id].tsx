import React, { useEffect } from 'react'
import Layout from '../../components/layout'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { Show } from '../../types/cms/show'
import { Character } from '../../types/cms/character'
import { Season } from '../../types/cms/season'
import { Episode } from '../../types/cms/episode'
import { GetStaticPaths, GetStaticProps } from 'next'
import styles from './shows.module.scss'


export default function Index({ characters, seasons, episodes, show }: { characters: Character, seasons: Season, episodes: Episode, show: Show }) {

  // A small function to generate a random number from anything that has a count
  const getNumber = (max: number, min: number) => Math.floor(Math.random() * (max - 0) + min)

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
    if (+router.query.id > 0) {
      router.push(`/shows/${show.show?.slug}`, undefined, { shallow: true })
    }
  }, [router.query])

  // The main function that shuffles characters, seasons, and episodes
  const refreshPage = () => {
    try {
      const characterCount = characters.cms_.characters.meta.pagination.total
      const characterNumber = getNumber(characterCount, 0)
      const arr = characters.cms_.characters.data[characterNumber].attributes
      setImageUrl(arr.image.data.attributes.url)
      setAltText(arr.image.data.attributes.alternativeText)
      setName(arr.first_name)

      const seasonCount = seasons.cms_.seasons.meta.pagination.total
      const seasonNumber = getNumber(seasonCount, 0)
      const seasonArr = seasons.cms_.seasons.data[seasonNumber].attributes
      setSeason(seasonArr.season_number)

      const episodeCount = episodes.cms_.episodes.meta.pagination.total
      const episodeNumber = getNumber(episodeCount, 0)
      const episodeArr = episodes.cms_.episodes.data[episodeNumber].attributes
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
  }, [router.query])

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
      <Layout>
        <main className={styles.container}>
          <div className="mx-auto text-center">
            <Link className={styles.title} href={`/shows/${(show.show?.slug === 'always-sunny') ? 'friends' : 'always-sunny'}`}>
              <h1 className="display-6 pb-2">{(show.show?.short_name) ? show.show.short_name : show.show?.name} Episode Picker</h1>
            </Link>
            <div className="d-flex align-items-center justify-content-center pb-2">
              <img
                src={imageUrl}
                alt={altText}
                decoding="sync"
                loading="eager"
                // @ts-ignore
                fetchpriority="high"
              />
            </div>
            <div className={styles.recommendation}>
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
        </main>
      </Layout>
    )
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const showsData = await fetch(`${process.env.NEXT_PUBLIC_HASURA_REST_API}/v2/shows`)
  const shows: Show = await showsData.json()

  const paths = shows.cms_.shows.data.map((show: Show) => ({ params: { id: show.id } }))

  return {
    paths: paths,
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {

  const show: Show = await (await fetch(`${process.env.NEXT_PUBLIC_CMS_REST_API}/shows/count?${params.id}`)).json()
  const characters: Array<Character> = await (await fetch(`${process.env.NEXT_PUBLIC_HASURA_REST_API}/v1/show/${params.id}/characters`)).json()
  const seasons: Array<Season> = await (await fetch(`${process.env.NEXT_PUBLIC_HASURA_REST_API}/v1/show/${params.id}/seasons`)).json()
  const episodes: Array<Episode> = await (await fetch(`${process.env.NEXT_PUBLIC_HASURA_REST_API}/v1/show/${params.id}/episodes`)).json()

  return { props: { characters, seasons, episodes, show } }
}