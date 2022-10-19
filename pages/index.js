import React from "react";
import Layout from "../components/layout"
import { useCookies } from 'react-cookie'

export default function Index({ epData, cookie }) {
    const [cookies, setCookie, removeCookie] = useCookies(['_sunnysession']);

    if (!cookies._sunnysession) {
        setCookie(cookie)
    }

    const [showDetails, setShowDetails] = React.useState(false)
    const onClick = () => showDetails ? setShowDetails(false) : setShowDetails(true)

    const Details = () => {
        return (
            <div>
                <h3 className="display-6 pb-2">{epData.title}</h3>
                <p className="lead fs-4">{epData.description}</p>
            </div>
        )
    }

    return (
        <>
            <div className="mx-auto text-center">
                <h1 className="display-6 pb-2">Always Sunny Episode Picker</h1>
                <div className="d-flex align-items-center justify-content-center pb-2">
                    <img src={epData.character_image} alt="It's Always Sunny in Philadelphia Cast Member" />
                </div>
                <div className="recommendation">
                    <p className="fs-5 text-primary shadow p-3 mt-3 bg-body rounded">{epData.character} says you should watch <br /> Season {epData.season_number}, Episode {epData.episode_number}.</p>
                    <div className="d-flex flex-row" style={{ marginBottom: "3rem" }}><a className="btn btn-primary btn-lg w-50 mt-3 me-2" href="/">Shuffle</a>
                        <a className="btn btn-outline-primary btn-lg w-50 mt-3 ms-2" onClick={onClick}>Details</a>
                    </div>
                    {showDetails ? <Details /> : null}
                </div>
            </div>
        </>
    )
}



export async function getStaticProps({ req }) {

    let epRes;

    if (req) {
        epRes = await fetch('https://sunny.rurich.dev/v2', {
            headers: {
                cookie: req.headers.cookie
            }
        })        
    } else {
        epRes = await fetch('https://sunny.rurich.dev/v2')
    }

    const epData = await epRes.json()
    const cookie = epRes.headers.get('set-cookie')

    return { props: { epData, cookie }, revalidate: 1, fallback: 'blocking' }
}

Index.getLayout = function getLayout(page) {
    return (
        <Layout>
            {page}
        </Layout>
    )
}