import React from "react"

const DefaultValueField = ({setRef,defValueInputChanged}) =>
    <div
        className="row form-group py-2">
        <div
            className="col-3">
            <label
                htmlFor="defaultValueInput"
                className="col-form-label">
                Default Value
            </label>
        </div>
        <div
            className="col-9">
            <input
                ref={setRef}
                onChange={defValueInputChanged}
                type="text"
                className="form-control"
                id="defaultValueInput"
                placeholder="for eg. Asia"/>
        </div>
    </div>;

export default DefaultValueField;
