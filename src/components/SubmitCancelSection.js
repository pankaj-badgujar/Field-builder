import React from "react"

const SubmitCancelSection = () =>
    <div className="row form-group">
        <div className="col-3"></div>
        <div className="col-9">
            <button
                className="btn btn-success mr-md-3 mr-1">
                Save changes
            </button>
             or
            <button
                className="text-danger ml-md-3 ml-1">Cancel</button>
        </div>
    </div>;

export default SubmitCancelSection;
