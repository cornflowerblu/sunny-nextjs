import React, { useEffect } from 'react'
import Layout from "../components/layout"

export default function SelectEpisode({shows}) {

console.log(shows)

const [ episodeId, setEpisodeId ] = React.useState(false)
const Episode = () => {
    return (
        <div className="form-group pb-4">
        <h2 className="display-6 fs-2"></h2>
        <label>Episode ID</label>
        <input
          className="form-control"
          type="text"
          name="id"
          id="id"
          value=''
          readOnly
          disabled
          style={{cursor: "notAllowed"}}
        ></input>
      </div>       
    )
}
const showEpisode = () => setEpisodeId(true)

const [show, setShow] = React.useState();
const [season, setSeason] = React.useState();


return(
  <div className="container-fluid">
    <div className="row pb-4">
      <h1 className="display-6 fs-1"> Pick an Episode to Edit</h1>
      <div className="col">
        <form id="selectShow" method="POST">
          <select id="showPicker" className="form-select w-100" onChange={e => setShow(e.currentTarget.value)}>
            <option value=""> Select a Show </option>
            <option value="950e38a3-3242-44dc-8585-fd30ced6627e"> It's Always Sunny in Philadelphia </option>
          </select>
        </form>
      </div>
      <div className="col">
        <form id="selectSeason" method="POST">
          <select id="seasonPicker" className="form-select w-100" onChange={e => setSeason(e.currentTarget.value)}>
            <option value=""> Select a show to see seasons </option>
            {show ? shows.seasons_aggregate.nodes.map((season) => (
                <option key={season.id} value={season.id}>Season: {season.season_number}</option>
                
            )):null}
          </select>
        </form>
      </div>
      <div className="col">
        <form id="selectEpisode" method="POST">
          <select id="episodePicker" className="form-select w-100" onChange={showEpisode} >
            <option value=""> Select a show to see episodes</option>
            {season ? shows.seasons_aggregate.nodes.filter((seasons_aggregate) => seasons_aggregate.id).map(((episode) => (
                <option key={episode.id} value={episode.id}>Episode {episode.episode_number}: {episode.title}</option>)))
            :null}
          </select>
        </form>
      </div>
    </div>
    {episodeId ? <Episode /> : null}
  </div>
)}

export async function getStaticProps() {

    const res = await fetch(process.env.API_URL, {
        headers: {
            "x-hasura-admin-secret": process.env.GRAPHQL_SECRET
        }
    })

    const rawData = await res.json()

    const shows = rawData.shows_by_pk

    return { props: { shows } , revalidate: 300 }
}

SelectEpisode.getLayout = function getLayout(page) {
    return (
        <Layout>
            {page}
        </Layout>
    )
}