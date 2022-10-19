import React from "react";
import Layout from "../components/layout"
import { useCookies } from 'react-cookie'

export default function Index({ data }) {
    const getNumber = (max, min) =>
    Math.floor(Math.random() * (max - 1) + min)

    const { first_name, image_url } = data.shows_by_pk.characters_aggregate.nodes[0]

    const [showDetails, setShowDetails] = React.useState(false)
    const [imageUrl, setImageUrl] = React.useState(image_url)
    const [name, setName] = React.useState(first_name)
    const [season, setSeason] = React.useState(false)
    const [episode, setEpisode] = React.useState(false)
    const [title, setTitle] = React.useState(false)
    const [details, setDetails] = React.useState(false)
    
    const onClick = () => showDetails ? setShowDetails(false) : setShowDetails(true)

    const Details = () => {
        return (
            <div>
                <h3 className="display-6 pb-2">{title}</h3>
                <p className="lead fs-4">{details}</p>
            </div>
        )
    }

    const refreshPage = () => {
        const characterCount = data.shows_by_pk.characters_aggregate.aggregate.count
        const characterNumber = getNumber(characterCount, 0)
        const arr = data.shows_by_pk.characters_aggregate.nodes[characterNumber]
        setImageUrl(arr.image_url)
        setName(arr.first_name)

        const seasonCount = data.shows_by_pk.seasons_aggregate.aggregate.count
        const seasonNumber = getNumber(seasonCount, 1)
        const seasonArr = data.shows_by_pk.seasons_aggregate.nodes[seasonNumber]
        setSeason(seasonArr.season_number)
        console.log(seasonArr.id)

        const episodeCount = data.shows_by_pk.seasons_aggregate.nodes[seasonNumber].episodes_aggregate.aggregate.count
        const episodeNumber = getNumber(episodeCount, 1)
        const episodeArr = data.shows_by_pk.seasons_aggregate.nodes[seasonNumber].episodes_aggregate.nodes[episodeNumber]
        setEpisode(episodeArr.episode_number)
        setTitle(episodeArr.title)
        setDetails(episodeArr.description)
        console.log(episodeCount)
      }

    return (
        <>
            <div className="mx-auto text-center">
                <h1 className="display-6 pb-2">Always Sunny Episode Picker</h1>
                <div className="d-flex align-items-center justify-content-center pb-2">
                    <img src={imageUrl} alt="It's Always Sunny in Philadelphia Cast Member" />
                </div>
                <div className="recommendation">
                    <p className="fs-5 text-primary shadow p-3 mt-3 bg-body rounded">{name} says you should watch <br /> Season {season}, Episode {episode}.</p>
                    <div className="d-flex flex-row" style={{ marginBottom: "3rem" }}><a className="btn btn-primary btn-lg w-50 mt-3 me-2" onClick={refreshPage}>Shuffle</a>
                        <a className="btn btn-outline-primary btn-lg w-50 mt-3 ms-2" onClick={onClick}>Details</a>
                    </div>
                    {showDetails ? <Details /> : null}
                </div>
            </div>
        </>
    )
}



export async function getStaticProps() {

    const res = await fetch('http://localhost:8080/api/rest/show/950e38a3-3242-44dc-8585-fd30ced6627e')

    const data = await res.json()

    return { props: { data }, revalidate: 300 }
}

Index.getLayout = function getLayout(page) {
    return (
        <Layout>
            {page}
        </Layout>
    )
}