import { GetStaticProps } from 'next'
import Link from 'next/link'
import React, { ReactElement, useEffect } from 'react'
import Layout from '../components/layout'
import HomeLayout from '../components/layout.home'
import { WebContent } from '../types/cms/content'
import { Season } from '../types/cms/season'
import { Show } from '../types/cms/show'
import style from './index.module.scss'
import { contentBlock } from '../components/utils/content'
import { NextPageWithLayout } from './_app'

const Index: NextPageWithLayout = ({
  shows,
  seasons,
  content,
}: {
  shows: Show
  seasons: Season
  content: WebContent
}) => {
  const seasonCount = (showId: number) =>
    seasons?.cms_.shows.data.find((show: Show) => show.id == showId).attributes
      .seasons.data.length

  const [random, setRandom] = React.useState(1)
  useEffect(() => {
    const showIds = shows.cms_.shows.data.map((show: Show) => show.id)
    setRandom(Math.floor(Math.random() * showIds.length + 1))
    if (random == 0) setRandom(random + 1)
  }, [shows.cms_.shows.data, random])

  return (
    <main>
      <section className="py-5 text-center container">
        <div className="row py-lg-5">
          <div className="col-lg-6 col-md-8 mx-auto">
            <h1 className="fw-light">{contentBlock(1, { ...content })}</h1>
            <p className="lead text-muted">{contentBlock(2, { ...content })}</p>
            <p>
              <Link
                className="btn btn-primary my-3 py-2 mx-4"
                href={`/shows/${random}`}
              >
                Watch a Random Episode of a Random Show
              </Link>
            </p>
          </div>
        </div>
      </section>

      <h1 className="col-lg-4 col-md-8 text-center mx-auto fw-light py-3">
        Trending Shows
      </h1>
      <div className="album py-5 bg-light">
        <div className={style.container}>
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3 mx-4">
            {shows?.cms_.shows.data.map((show: Show) => {
              return (
                <div className="col" key={show.id}>
                  <div className="card shadow-sm">
                    <div className="card-img-top">
                      <Link href={`/shows/${show.id}`}>
                        <img
                          className={style.cardImage}
                          src={show.attributes.thumbnail.data[0].attributes.url}
                          alt={
                            show.attributes.thumbnail.data[0].attributes
                              .alternativeText
                          }
                          loading="eager"
                          style={{
                            width: '-webkit-fill-available',
                            borderRadius: '6px',
                          }}
                          // @ts-ignore
                          fetchpriority="high"
                        />
                      </Link>
                    </div>
                    <div className="card-body">
                      <p className="card-text">{show.attributes.description}</p>
                      <div className="d-flex justify-content-between align-items-center">
                        <div className="btn-group">
                          <Link href={`/shows/${show.id}`}>
                            <button
                              type="button"
                              className="btn btn-sm btn-outline-secondary"
                            >
                              Shuffle
                            </button>
                          </Link>
                        </div>
                        <small className="text-muted">
                          {seasonCount(show.id)}
                          {seasonCount(show.id) <= 1 ? ' season' : ' seasons'}
                        </small>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </main>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const shows: Array<Show> = await (
    await fetch(`${process.env.NEXT_PUBLIC_HASURA_REST_API}/v2/shows`)
  ).json()

  const seasons: Array<Season> = await (
    await fetch(`${process.env.NEXT_PUBLIC_HASURA_REST_API}/v1/shows/seasons`)
  ).json()

  const content: Array<WebContent> = await (
    await fetch(`${process.env.NEXT_PUBLIC_HASURA_REST_API}/v1/content`)
  ).json()

  return {
    props: { shows, seasons, content },
  }
}

Index.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      <HomeLayout>{page}</HomeLayout>
    </Layout>
  )
}

export default Index
