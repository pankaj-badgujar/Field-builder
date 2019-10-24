import React from "react"
import ButtonComponent from "./ButtonComponent";

const AddChoiceForm = ({titleChanged, addChoice, newChoice}) =>

    <div className="row">
        <div
            className="col-md-8 col-12">
            <input
                onChange={titleChanged}
                placeholder="Max. 40 characters"
                className={"form-control " + (newChoice.title.length > 40 ? " text-danger" : "")}
                type="text"/>

        </div>
        <div className="col-md-4 col-12 pt-1">
            <ButtonComponent
                buttonContent={"Add new choice"}
                onClickEventHandler={() => addChoice(newChoice)}
                classes={"btn btn-info btn-sm btn-block"}/>
        </div>
    </div>;


export default AddChoiceForm;
