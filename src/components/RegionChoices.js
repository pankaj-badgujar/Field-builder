import React from "react";
import RegionChoiceItem from "./RegionChoiceItem";

export default class ChoiceList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            choices: [
                {title: 'Africa', id: 1},
                {title: 'South east asia', id: 2},
            ]
        }
    }

    renderListOfChoices = () =>
        this.state.choices.map(choice =>
            <RegionChoiceItem regionName={choice.title}/>);

    render() {
        return (
            <div className="card narrow-card">
                <div className="card-header">
                    <input
                        className="form-control"
                        type="text"/>
                </div>
                <div className="card-body scroll">
                    <ul className="list-group">
                        <p className="card-text">{this.renderListOfChoices()}</p>
                    </ul>
                </div>
            </div>
        )
    }
}
