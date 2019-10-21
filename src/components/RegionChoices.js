import React from "react";
import RegionChoiceItem from "./RegionChoiceItem";
import AddChoiceForm from "./AddChoiceForm";

export default class ChoiceList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            choices: [
                {title: 'Africa', id: 1},
                {title: 'South east asia', id: 2},
            ],
        };
        this.deleteFromChoices = this.deleteFromChoices.bind(this);
        this.addToChoices = this.addToChoices.bind(this);
        this.titleChanged = this.titleChanged.bind(this);

    }

    componentDidMount() {
        this.setState({
            nextId : this.state.choices.length + 1
        })
    }

    titleChanged(event) {
        this.setState({
            newChoice: {title: event.target.value, id: this.state.nextId}
        });
    }

    addToChoices() {
        console.log(this.state.newChoice);

        this.setState({
            choices: [this.state.newChoice, ...this.state.choices],
            nextId: this.state.nextId  + 1
        });
    }

    deleteFromChoices = (id) =>
        this.setState({
            choices: this.state.choices.filter(choice => choice.id !== id)
        });

    renderListOfChoices = () =>
        this.state.choices.map(choice =>
            <RegionChoiceItem
                choice={choice}
                key={choice.id}
                deleteChoice={this.deleteFromChoices}/>);

    render() {
        return (
            <div className="card narrow-card">
                <div className="card-header">
                    <AddChoiceForm
                        titleChanged={this.titleChanged}
                        addChoice={this.addToChoices}/>
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
