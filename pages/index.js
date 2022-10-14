import Layout from "../components/layout"
import { useCookies } from 'react-cookie'
import { NextResponse } from 'next/server'

export default function Index({ data, cookie }) {
    const [cookies, setCookie, removeCookie] = useCookies(['_sunnysession']);

    setCookie(cookie)

    return (
        <>
            <div className="mx-auto text-center">
                <h1 className="display-6 pb-2">{data.title}</h1>

                <div className="d-flex align-items-center justify-content-center pb-2">
                    <img src={data.image} alt="It's Always Sunny in Philadelphia Cast Member" />
                </div>
                <div className="recommendation">
                    <p className="fs-5 text-primary shadow p-3 mt-3 bg-body rounded">{data.name} says you should watch <br /> Season {data.season}, Episode {data.episode}.</p>
                    <div className="d-flex flex-row" style={{ marginBottom: "3rem" }}><a className="btn btn-primary btn-lg w-50 mt-3 me-2" href="/">Shuffle</a>
                        <a className="btn btn-outline-primary btn-lg w-50 mt-3 ms-2" href="/details">Details</a>
                    </div>
                </div>
            </div>
        </>
    )
}

export async function getServerSideProps({ req }) {
    const res = await fetch('http://localhost:3000', {
        headers: {
            cookie: req.headers.cookie
        }
    })
    const data = await res.json()
    const cookie = res.headers.get('set-cookie')

    return { props: { data, cookie } }
}

Index.getLayout = function getLayout(page) {
    return (
        <Layout>
            {page}
        </Layout>
    )
}