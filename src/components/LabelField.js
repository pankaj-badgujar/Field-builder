import React from "react"

const LabelField = () =>
    <div className="row form-group py-2">
        <div className="col-3">
            <label
                className="col-form-label"
                htmlFor="salesRegionInput">
                Label
            </label>
        </div>
        <div className="col-9">
            <input
                className="form-control"
                placeholder="For eg. sales region"
                id="salesRegionInput"/>
        </div>
    </div>;

export default LabelField;
