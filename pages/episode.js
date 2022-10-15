import Layout from "../components/layout"

export default function Episode({ shows }) {
    const handleSubmit = async (event) => {
        // Stop the form from submitting and refreshing the page.
        event.preventDefault()

        // Get data from the form.
        const data = {
            show_id: event.target.show_id.value,
            season_number: event.target.season_number.value,
            episode_number: event.target.episode_number.value,
            title: event.target.title.value,
            description: event.target.description.value,
        }
        const JSONdata = JSON.stringify(data)

        // API endpoint where we send form data.
        const endpoint = 'http://localhost:3001/episode/new'

        // Form the request for sending data to the server.
        const options = {
            // The method is POST because we are sending data.
            method: 'POST',
            // Tell the server we're sending JSON.
            headers: {
                'Content-Type': 'application/json',
            },
            // Body of the request is the JSON data we created above.
            body: JSONdata,
        }

        // Send the form data to our forms API on Vercel and get a response.
        const response = await fetch(endpoint, options)

        // Get the response data from server as JSON.
        // If server returns the name submitted, that means the form works.
        const result = await response.json()
        alert(`It worked submitting: ${result.data}`)

    }
    return (
        <>
            <h1 className="display-6">Episode Entry /<a className="text-decoration-none" href="/episode/edit"> Edit a Show</a></h1>
            <form className="was-validated" onSubmit={handleSubmit}>
                <div className="row">
                    <div className="form-group col-6 mb-3"><label>Select a Show</label>
                        <select className="form-select" name="show_id" id="show_id" required="required">
                            <option value="">Select a Show</option>
                            {shows.map((show) => (
                                <option key={show.id} value={show.id}>{show.show_name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="row">
                        <div className="form-group col-3 mb-3">
                            <label>Season Number</label>
                            <input className="form-control border-secondary" type="text" name="season_number" required="required" />
                        </div>
                        <div className="form-group col-3">
                            <label>Episode Number</label>
                            <input className="form-control border-secondary" type="text" name="episode_number" required="required" />
                        </div>
                        <div className="form-group col">
                            <label>Title</label>
                            <input className="form-control border-secondary" type="text" name="title" required="required" />
                        </div>
                        <div className="form-group mb-3">
                            <label>Description</label>
                            <input className="form-control border-secondary mb-3" type="text" name="description" required="required" />
                            <input className="btn btn-primary w-25" type="submit" value="Add New Episode" />
                        </div>
                    </div>
                </div>
            </form>
        </>
    )
}

export async function getStaticProps() {
    const res = await fetch('http://localhost:3001/episode/v2')

    const shows = await res.json()

    return {
        props: shows,
        revalidate: 600
    }
}

Episode.getLayout = function getLayout(page) {
    return (
        <Layout>
            {page}
        </Layout>
    )
}