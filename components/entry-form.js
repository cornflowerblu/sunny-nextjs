function EntryForm() {
    return (
        <>
            <h1 className="display-6">Episode Entry /<a className="text-decoration-none" href="/episode/edit"> Edit a Show</a></h1>
            <form className="was-validated" action="/episode/new" method="POST">
                <div className="row">
                    <div className="form-group col-6 mb-3"><label>Select a Show</label>
                        <select className="form-select" name="show_id" id="show_id" required="required">
                            <option value="">Select a Show</option>
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

export default EntryForm