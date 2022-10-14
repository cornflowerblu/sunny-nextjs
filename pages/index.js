import Layout from "../components/layout"

export default function Index({ data }) {
    return (
        <>
            <div class="mx-auto text-center">
                <h1 class="display-6 pb-2">{data.title}</h1>

                <div class="d-flex align-items-center justify-content-center pb-2">
                    <img src={data.image} alt="It's Always Sunny in Philadelphia Cast Member" />
                </div>
                <div class="recommendation">
                    <p class="fs-5 text-primary shadow p-3 mt-3 bg-body rounded">{data.name} says you should watch <br /> Season {data.season}, Episode {data.episode}.</p>
                    <div class="d-flex flex-row" style={{ marginBottom: "3rem" }}><a class="btn btn-primary btn-lg w-50 mt-3 me-2" href="/">Shuffle</a>
                        <a class="btn btn-outline-primary btn-lg w-50 mt-3 ms-2" href="/details">Details</a>
                    </div>
                </div>
            </div>
        </>
    )
}

export async function getServerSideProps() {
    // Fetch data from external API
    const res = await fetch(`http://localhost:3000`)
    const data = await res.json()

    // Pass data to the page via props
    return { props: { data } }
}

Index.getLayout = function getLayout(page) {
    return (
        <Layout>
            {page}
        </Layout>
    )
}