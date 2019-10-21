import React from "react"

const AddChoiceForm = ({titleChanged,addChoice}) =>

        <div className="row">
            <div className="col-md-8 col-12">
                <input
                    onChange={titleChanged}
                    placeholder="Max. 40 characters"
                    className="form-control"
                    type="text"/>
            </div>
            <div className="col-md-4 col-12 pt-1">
                <button
                    onClick={() => addChoice()}
                    className="btn btn-info btn-sm btn-block">
                    Add new choice
                </button>
            </div>
        </div>;


export default AddChoiceForm;
