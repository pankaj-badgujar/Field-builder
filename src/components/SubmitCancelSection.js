import React from "react"
import "./SubmitCancelSection";
import ButtonComponent from "./ButtonComponent";

const SubmitCancelSection = ({clearFields, submitForm}) =>
    <div className="row form-group">
        <div className="col-3 "></div>

        <span className="col-9">
            <ButtonComponent

                buttonContent={"Save changes"}
                onClickEventHandler={() => submitForm()}
                classes={"btn btn-success my-2 mr-2"}
                displayStyle={"inline-block"}/>
            <ButtonComponent

                classes={"btn btn-danger my-2 mr-2"}
                buttonContent={"Cancel"}
                displayStyle={"inline-block"}/>

            <ButtonComponent

                onClickEventHandler={clearFields}
                classes={"btn btn-warning my-2"}
                buttonContent={"Clear Form"}
                displayStyle={"inline-block"}/>
        </span>

    </div>;

export default SubmitCancelSection;
