import React from "react";
import Layout from "../components/layout"
import { useCookies } from 'react-cookie'

export default function Index({ epData, detData, cookie }) {
    const [cookies, setCookie, removeCookie] = useCookies(['_sunnysession']);
    setCookie(cookie)

    const [showDetails, setShowDetails] = React.useState(false)
    const onClick = () => showDetails ? setShowDetails(false) : setShowDetails(true)

    const Details = () => {
        return (
            <div>
                <h3 className="display-6 pb-2">{detData.title}</h3>
                <p className="lead fs-4">{detData.description}</p>
            </div>
        )
    }

    return (
        <>
            <div className="mx-auto text-center">
                <h1 className="display-6 pb-2">{epData.title}</h1>
                <div className="d-flex align-items-center justify-content-center pb-2">
                    <img src={epData.image} alt="It's Always Sunny in Philadelphia Cast Member" />
                </div>
                <div className="recommendation">
                    <p className="fs-5 text-primary shadow p-3 mt-3 bg-body rounded">{epData.name} says you should watch <br /> Season {epData.season}, Episode {epData.episode}.</p>
                    <div className="d-flex flex-row" style={{ marginBottom: "3rem" }}><a className="btn btn-primary btn-lg w-50 mt-3 me-2" href="/">Shuffle</a>
                        <a className="btn btn-outline-primary btn-lg w-50 mt-3 ms-2" onClick={onClick}>Details</a>
                    </div>
                    {showDetails ? <Details /> : null}
                </div>
            </div>
        </>
    )
}



export async function getServerSideProps({ req }) {
    const epRes = await fetch('http://localhost:3000', {
        headers: {
            cookie: req.headers.cookie
        }
    })
    const epData = await epRes.json()
    const cookie = epRes.headers.get('set-cookie')

    const detRes = await fetch('http://localhost:3000/details', {
        headers: {
            cookie: req.headers.cookie
        }
    })

    const detData = await detRes.json()

    return { props: { epData, detData, cookie } }
}

Index.getLayout = function getLayout(page) {
    return (
        <Layout>
            {page}
        </Layout>
    )
}