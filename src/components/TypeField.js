import React from "react"

const TypeField = ({setRefTypeSelect,setRefCheckbox}) =>
    <div
        className="row form-group py-2">
        <div
            className="col-3">
            <label
                htmlFor="typeSelect"
                className="col-form-label">
                Type
            </label>
        </div>
        <div
            className="col-9 col-md-4">
            <select
                ref={setRefTypeSelect}
                id="typeSelect"
                className="custom-select">
                <option>Multi-select</option>
                <option>single-select</option>
            </select>
        </div>
        <div className="col-3 d-md-none"></div>

        <div className="col-9 col-md-5">
            <label
                className="col-form-label"
                htmlFor="valueRequiredCheckbox">

                <input
                    ref={setRefCheckbox}
                    className="mr-3"
                    type="checkbox"
                    id="valueRequiredCheckbox"/>
                A value is required
            </label>
        </div>
    </div>;

export default TypeField;
