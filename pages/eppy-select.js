import Layout from "../components/layout"

export default function SelectEpisode() {
return(
  <div className="container-fluid">
    <div className="row pb-4">
      <h1 className="display-6 fs-1"> Pick an Episode to Edit</h1>
      <div className="col">
        <form id="selectShow" method="POST">
          <select id="showPicker" class="form-select w-100">
            <option value=""> Select a Show </option>
          </select>
        </form>
      </div>
      <div className="col">
        <form id="selectSeason" method="POST">
          <select id="seasonPicker" className="form-select w-100">
            <option value=""> Select a show to see seasons </option>
          </select>
        </form>
      </div>
      <div className="col">
        <form id="selectEpisode" method="POST">
          <select id="episodePicker" class="form-select w-100">
            <option value=""> Select a show to see episodes</option>
          </select>
        </form>
      </div>
    </div>
    <div className="row">
      <div className="form-group pb-4">
        <h2 className="display-6 fs-2"></h2>
        <label> Episode ID</label>
        <input
          className="form-control"
          type="text"
          name="id"
          id="id"
          value=''
          readonly
          disabled
          style={{cursor: "notAllowed"}}
        ></input>
      </div>
    </div>
  </div>
)}

SelectEpisode.getLayout = function getLayout(page) {
    return (
        <Layout>
            {page}
        </Layout>
    )
}