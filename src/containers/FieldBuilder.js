import './FieldBuilder.css';
import React from "react";
import LabelField from "../components/LabelField";
import TypeField from "../components/TypeField";
import DefaultValueField from "../components/DefaultValueField";
import RegionChoicesField from "../components/RegionChoicesField";
import ChoiceOrderingField from "../components/ChoiceOrderingField";
import SubmitCancelSection from "../components/SubmitCancelSection";
import {dummyData} from "../data/dummyData";


class FieldBuilder extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            choices: dummyData,
            // choices: dummyData50Choices,
        };
        this.clearFields = this.clearFields.bind(this);
        this.deleteFromChoices = this.deleteFromChoices.bind(this);
        this.addToChoices = this.addToChoices.bind(this);
        this.titleChanged = this.titleChanged.bind(this);

        this.setRefForDefaultValue = this.setRefForDefaultValue.bind(this);
        this.setRefForLabelInput = this.setRefForLabelInput.bind(this);
    }

    componentDidMount() {
        this.setState({
            nextId: this.state.choices.length + 1
        })
    }

    clearFields() {
        this.labelInputRef.value = "";
        this.defaultValueInputRef.value = "";
        this.requiredCheckboxRef.checked = false;
    }

    setRefForLabelInput = (ref) =>
        this.labelInputRef = ref;


    setRefForDefaultValue = (ref) =>
        this.defaultValueInputRef = ref;

    setRefForRequiredCheckbox = (ref) =>
        this.requiredCheckboxRef = ref;

    titleChanged(event) {
        this.setState({
            newChoice: {title: event.target.value, id: this.state.nextId}
        });
    }

    validateNewChoice() {
        return !this.isChoiceBlank() && !this.isChoiceDuplicate()
            && this.areChoicesLessThanFifty();
    }

    areChoicesLessThanFifty() {
        if (this.state.choices.length >= 50) {
            alert("Cannot add more than 50 choices");
            return false;
        }
        return true;
    }

    isChoiceDuplicate() {
        if (this.state.choices.find(
            choice => choice.title.toLowerCase() ===
                this.state.newChoice.title.toLowerCase()) !== undefined) {
            alert("Choice already present in the choice list");
            return true;
        }
        return false;
    }

    isChoiceBlank() {
        if (this.state.newChoice === undefined ||
            this.state.newChoice.title.trim().length < 1) {
            alert("Choice cannot be blank");
            return true;
        }
        return false;
    }

    addToChoices() {
        if (this.validateNewChoice()) {
            this.setState({
                choices: [this.state.newChoice, ...this.state.choices],
                nextId: this.state.nextId + 1
            });
        }
    }

    deleteFromChoices = (id) =>
        this.setState({
            choices: this.state.choices.filter(choice => choice.id !== id)
        });

    render() {
        return (
            <div className="container mt-4">
                <div className="card">
                    <h5 className="card-header bg-info text-white">Field Builder</h5>
                    <div className="card-body">
                        <LabelField
                            setRef={this.setRefForLabelInput}/>
                        <TypeField
                            setRef={this.setRefForRequiredCheckbox}/>
                        <DefaultValueField
                            setRef={this.setRefForDefaultValue}/>
                        <RegionChoicesField
                            titleChanged={this.titleChanged}
                            addToChoices={this.addToChoices}
                            choices={this.state.choices}
                            deleteFromChoices={this.deleteFromChoices}
                        />
                        <ChoiceOrderingField/>
                        <SubmitCancelSection
                            clearFields={this.clearFields}/>
                    </div>
                </div>
                <br/><br/>
            </div>
        );
    }
}

export default FieldBuilder;
