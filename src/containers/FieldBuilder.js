import './FieldBuilder.css';
import React from "react";
import LabelField from "../components/LabelField";
import TypeField from "../components/TypeField";
import DefaultValueField from "../components/DefaultValueField";
import RegionChoicesField from "../components/RegionChoicesField";
import ChoiceOrderingField from "../components/ChoiceOrderingField";
import SubmitCancelSection from "../components/SubmitCancelSection";
import {dummyData} from "../data/dummyData";
import FormService from "../services/FormService";

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
        this.setRefForRequiredCheckbox = this.setRefForRequiredCheckbox.bind(this);
        this.setRefForTypeSelect = this.setRefForTypeSelect.bind(this);
        this.setRefForOrdering = this.setRefForOrdering.bind(this);

        this.submitForm = this.submitForm.bind(this);

        this.formService = FormService.getInstance();

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

    setRefForTypeSelect = (ref) =>
        this.typeSelectRef = ref;

    setRefForOrdering = (ref) =>
        this.orderingRef = ref;

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

    createJsonOfValues() {
        console.log("createJson");
        return {
            label: this.labelInputRef.value,
            type: this.typeSelectRef.value,
            typeSelectValueRequired: this.requiredCheckboxRef.checked,
            defaultValue: this.defaultValueInputRef.value,
            choices: this.state.choices,
            order: this.orderingRef.value
        }

    }

    submitForm() {
        console.log("submit");
        let json = this.createJsonOfValues();
        console.log(json);
        this.formService.postDataToAPI(json)
            .then(res => console.log(res));
    }

    render() {
        return (
            <div className="container mt-4">
                <div className="card">
                    <h5 className="card-header bg-info text-white">Field Builder</h5>
                    <div className="card-body">

                        <LabelField
                            setRef={this.setRefForLabelInput}/>
                        <TypeField
                            setRefTypeSelect={this.setRefForTypeSelect}
                            setRefCheckbox={this.setRefForRequiredCheckbox}/>
                        <DefaultValueField
                            setRef={this.setRefForDefaultValue}/>
                        <RegionChoicesField
                            titleChanged={this.titleChanged}
                            addToChoices={this.addToChoices}
                            choices={this.state.choices}
                            deleteFromChoices={this.deleteFromChoices}
                        />
                        <ChoiceOrderingField
                            setRef={this.setRefForOrdering}/>
                        <SubmitCancelSection
                            submitForm={this.submitForm}
                            clearFields={this.clearFields}/>

                    </div>
                </div>
                <br/><br/>
            </div>
        );
    }
}

export default FieldBuilder;
