import React from "react"
import AddChoiceForm from "./AddChoiceForm";
import RegionChoiceItem from "./RegionChoiceItem";

const RegionChoicesField = ({titleChanged, addToChoices, deleteFromChoices, choices}) =>
    <div className="row form-group py-2">
        <div className="col-3">
            <label
                className="col-form-label">
                Choices
            </label>
        </div>
        <div className="col-9">
            <div className="card narrow-card">
                <div className="card-header">
                    <AddChoiceForm
                        titleChanged={titleChanged}
                        addChoice={addToChoices}/>
                </div>
                <div className="card-body scroll">
                    <p> Number of choices: {choices.length}</p>
                    <ul className="list-group">
                        {choices.map(choice =>
                            <RegionChoiceItem
                                choice={choice}
                                key={choice.id}
                                deleteChoice={deleteFromChoices}/>)}
                    </ul>
                </div>
            </div>
        </div>
    </div>;

export default RegionChoicesField
