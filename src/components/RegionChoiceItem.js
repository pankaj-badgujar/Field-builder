import React from "react"

const RegionChoiceItem = ({choice,deleteChoice}) =>
    <li className="list-group-item">
        {choice.title}
        <span className="float-right">
            <button
                className="btn btn-danger btn-sm text-white"
                onClick={() => deleteChoice(choice.id)}>
                <i className="fa fa-trash"></i>
            </button>
        </span>
    </li>;

export default RegionChoiceItem;
