import Link from 'next/link'
import React from 'react'

function EpisodeEntry({ shows }) {
  const [episode, setEpisode] = React.useState(false)
  const [data, setData] = React.useState({
    show_id: '',
    season_number: '',
    episode_number: '',
    title: '',
    description: '',
  })

  const handleSubmit = async (event) => {
    event.preventDefault()

    const JSONdata = JSON.stringify(data)

    const endpoint = 'http://localhost:3001/episode/new'

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSONdata,
    }

    const response = await fetch(endpoint, options)

    setEpisode(await await response.json())
    const newEpisode = episode?.data

    if (newEpisode) {
      alert('Success!')
      event.target.reset()
    } else {
      console.log('Error, got this response:', episode, 'for episode.')
      alert('Error!')
    }
  }

  const handleChange = async (event) => {
    setData({
      ...data,
      [event.target.name]: event.target.value,
    })
  }

  const EpisodeTitle = () => {
    return (
      <h1 className="display-6">
        Episode Entry /
        <Link href={'/episode/update'}>
          <a className="text-decoration-none"> Edit a Show</a>
        </Link>
      </h1>
    )
  }

  const EpisodeEntryTitle = () => {
    if (typeof window == 'undefined') {
      return <EpisodeTitle />
    }
    if (window.location.href.includes('/episode/update')) {
      return (
        <h1 className="display-6">
          <Link href={'/episode'}>
            <a className="text-decoration-none"> Episode Entry </a>
          </Link>
          / Edit a show
        </h1>
      )
    } else {
      return <EpisodeTitle />
    }
  }

  return (
    <>
      <EpisodeEntryTitle />
      <form className="was-validated" onSubmit={handleSubmit}>
        <div className="row">
          <div className="form-group col-6 mb-3">
            <label>Select a Show</label>
            <select
              className="form-select"
              name="show_id"
              id="show_id"
              required="required"
              value={data.show_id}
              onChange={handleChange}
            >
              <option value="">Select a Show</option>
              {shows.map((show) => (
                <option key={show.id} value={show.id}>
                  {show.show_name}
                </option>
              ))}
            </select>
          </div>
          <div className="row">
            <div className="form-group col-3 mb-3">
              <label>Season Number</label>
              <input
                className="form-control border-secondary"
                type="text"
                name="season_number"
                required="required"
                value={data.season_number}
                onChange={handleChange}
              />
            </div>
            <div className="form-group col-3">
              <label>Episode Number</label>
              <input
                className="form-control border-secondary"
                type="text"
                name="episode_number"
                required="required"
                value={data.episode_number}
                onChange={handleChange}
              />
            </div>
            <div className="form-group col">
              <label>Title</label>
              <input
                className="form-control border-secondary"
                type="text"
                name="title"
                required="required"
                value={data.title}
                onChange={handleChange}
              />
            </div>
            <div className="form-group mb-3">
              <label>Description</label>
              <input
                className="form-control border-secondary mb-3"
                type="text"
                name="description"
                required="required"
                value={data.description}
                onChange={handleChange}
              />
              <input
                className="btn btn-primary w-25"
                type="submit"
                value="Add New Episode"
              />
            </div>
          </div>
        </div>
      </form>
    </>
  )
}

export default EpisodeEntry
