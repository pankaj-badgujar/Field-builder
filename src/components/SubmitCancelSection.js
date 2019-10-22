import React from "react"
import "./SubmitCancelSection";

const SubmitCancelSection = ({clearFields, submitForm}) =>
    <div className="row form-group">
        <div className="col-3"></div>
        <div className="col-9">
            <button
                onClick={() => submitForm()}
                className="btn btn-success mr-md-3 mr-1">
                Save changes
            </button>
            <button
                className="btn btn-danger mx-md-3 ml-1">Cancel
            </button>
            <button
                onClick={clearFields}
                className="btn btn-warning ml-md-3 mt-1 d-none d-sm-inline">
                Clear Form
            </button>
            <button
                onClick={clearFields}
                className="btn btn-warning ml-md-3 mt-1 btn-block d-block d-sm-none">
                Clear Form
            </button>

        </div>
    </div>;

export default SubmitCancelSection;
