import React from "react"
import RegionChoices from "./RegionChoices";

const RegionChoicesField = () =>
    <div className="row form-group py-2">
        <div className="col-3">
            <label
                className="col-form-label">
                Choices
            </label>
        </div>
        <div className="col-9">
            <RegionChoices/>
        </div>
    </div>;

export default RegionChoicesField
