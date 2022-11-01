<div className="container-fluid">
    <div className="row pb-4">
        <h1 className="display-6 fs-1"> Pick an Episode to Edit</h1>
        <div className="col">
            <form id="selectShow" method='POST'>
                <select id="showPicker" class="form-select w-100">
                <option value=""> Select a Show </option>
            </select>
        </form>
    </div>
    <div className="col">
        <form id="selectSeason" method='POST'>
            <select id="seasonPicker" className="form-select w-100">
                <option value=""> Select a show to see seasons </option>
            </select>
        </form>
    </div>
    <div className="col">
        <form id="selectEpisode" method='POST'>
            <select id="episodePicker" class="form-select w-100">
                <option value=""> Select a show to see episodes</option>
            </select>
        </form>
    </div>
</div>
    <div className="row">
        <div class='form-group pb-4'>
            <h2 class="display-6 fs-2"></h2>
                <label> Episode ID</label>
                <input class='form-control' type='text' name='id' id='id' value= {values?.id} readonly disabled style="cursor: not-allowed;"></input>
        </div>
    </div>
</div>