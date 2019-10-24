import React from "react"
import ButtonComponent from "./ButtonComponent";

const RegionChoiceItem = ({choice,deleteChoice}) =>
    <li className="list-group-item">
        <div className={"row"}>
            <span className={"col-8 col-sm-10"}>{choice.title}</span>
            <span className={"col-4 col-sm-2 float-right"}>
                <ButtonComponent
                    classes={"btn btn-danger btn-sm text-white"}
                    buttonContent={<i className="fa fa-trash"></i>}
                    onClickEventHandler={() => deleteChoice(choice.id)}/>
            </span>
        </div>
    </li>;

export default RegionChoiceItem;
