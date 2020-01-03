import './FieldBuilder.css';
import React from "react";
import LabelField from "../components/LabelField";
import TypeField from "../components/TypeField";
import DefaultValueField from "../components/DefaultValueField";
import RegionChoicesField from "../components/RegionChoicesField";
import ChoiceOrderingField from "../components/ChoiceOrderingField";
import SubmitCancelSection from "../components/SubmitCancelSection";
import {dummyData} from "../data/dummyData";
import {dummyData50Choices} from "../data/dummyData50Choices";
import FormService from "../services/FormService";

class FieldBuilder extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            choices: JSON.parse(localStorage.getItem('choices')) || dummyData,
            // choices: dummyData50Choices,
            newChoice: {title: '', id: -1}
        };

        //binding methods
        this.clearFields = this.clearFields.bind(this);
        this.deleteFromChoices = this.deleteFromChoices.bind(this);
        this.addToChoices = this.addToChoices.bind(this);
        this.titleChanged = this.titleChanged.bind(this);
        this.labelInputChanged = this.labelInputChanged.bind(this);
        this.submitForm = this.submitForm.bind(this);
        this.checkFormValuesBeforeSubmission =
            this.checkFormValuesBeforeSubmission.bind(this);

        //getting instance from singleton service
        this.formService = FormService.getInstance();
    }


    componentDidMount() {
        this.setInitialValueForFieldsIfPresent();
        this.setState({
            nextId: this.state.choices.length + 1
        });
    }

    //getting initial values from local storage if present
    setInitialValueForFieldsIfPresent() {
        this.labelInputRef.value = localStorage.getItem('labelInputValue');
        this.defaultValueInputRef.value = localStorage.getItem('defaultValueInput');

        let preselectedType = localStorage.getItem('typeSelectValue');
        if (preselectedType !== null) {
            this.typeSelectRef.value = preselectedType;
        }
    }

    //setting initial values in local storage.
    labelInputChanged(event) {
        localStorage.setItem('labelInputValue', event.target.value)
    }

    defaultValueInputChanged(event) {
        localStorage.setItem('defaultValueInput', event.target.value);
    }

    selectTypeChanged(event) {
        localStorage.setItem('typeSelectValue', event.target.value);
    }

    //method to clear all form fields
    clearFields() {
        this.labelInputRef.value = "";
        this.defaultValueInputRef.value = "";
        this.requiredCheckboxRef.checked = false;
    }

    //setting up references for components.
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


    //method to capture the title of new choice that is to be added.
    titleChanged(event) {
        this.setState({
            newChoice: {title: event.target.value, id: this.state.nextId}
        });
    }

    //validations for new choice before adding to choice list.
    validateChoice(choice) {
        return !this.isChoiceBlank(choice)
            && this.isChoiceLengthLessThanFortyChars(choice)
            && !this.isChoiceDuplicate(choice, true)
            && this.areChoicesLessThanFifty();
    }

    isChoiceLengthLessThanFortyChars(choice) {
        if (choice.title.length > 40) {
            alert("choice cannot be more than 40 characters");
            return false;
        }
        return true;
    }

    areChoicesLessThanFifty() {
        if (this.state.choices.length >= 50) {
            alert("Cannot add more than 50 choices");
            return false;
        }
        return true;
    }

    isChoiceDuplicate(choice, showAlert) {
        if (this.state.choices.find(
            eachChoice => eachChoice.title.toLowerCase() ===
                choice.title.toLowerCase()) !== undefined) {
            if (showAlert) {
                alert("Choice already present in the choice list");
            }
            return true;
        }
        return false;
    }

    isChoiceBlank = choice => {
        if (choice === undefined ||
            choice.title.trim().length < 1) {
            alert("Choice cannot be blank");
            return true;
        }
        return false;
    };

    //method to add new choice to the list of choices.
    addToChoices(choice) {
        if (this.validateChoice(choice)) {
            let newChoiceList = [choice, ...this.state.choices];
            localStorage.setItem('choices',
                JSON.stringify(newChoiceList));

            this.setState({
                choices: newChoiceList,
                nextId: this.state.nextId + 1
            });
            return true;
        }
        return false;
    }

    //method to delete a choice from the list of choices.
    deleteFromChoices = (id) => {
        let newChoiceList = this.state.choices.filter(
            choice => choice.id !== id);
        localStorage.setItem('choices', JSON.stringify(newChoiceList));
        this.setState({
            choices: newChoiceList
        });
    };

    //method to create json object of all form values for posting to api.
    createJsonOfFormValues() {
        return {
            label: this.labelInputRef.value,
            type: this.typeSelectRef.value,
            typeSelectValueRequired: this.requiredCheckboxRef.checked,
            defaultValue: this.defaultValueInputRef.value,
            choices: this.state.choices,
            order: this.orderingRef.value
        }
    }

    //validations on input fields before creating json object.
    checkFormValuesBeforeSubmission = () =>
        new Promise((resolve, reject) => {
            let defaultChoiceEntered = {
                title: this.defaultValueInputRef.value,
                id: this.state.nextId
            };

            if (this.isLabelFieldEmpty()) {
                reject("label field was empty");
            } else {
                if (this.isChoiceDuplicate(defaultChoiceEntered, false)
                    || this.addToChoices(defaultChoiceEntered)) {
                    resolve("form value check successful");
                } else {
                    reject("default value could not be added to choice list");
                }
            }
        });

    isLabelFieldEmpty() {
        if (this.labelInputRef.value.trim().length < 1) {
            alert('Label field cannot be blank');
            return true;
        }
        return false;
    }

    //method to POST the form to the API.
    submitForm() {
        this.checkFormValuesBeforeSubmission()
            .then(() =>
                this.formService.postDataToAPI(
                    this.createJsonOfFormValues())
                    .then(response => console.log(response)))
            .catch(() => console.log("post request not made due to invalid form values"));
    }

    render() {
        return (
            <div className="container mt-4">
                <div className="card">
                    <h5 className="card-header bg-info text-white">Field Builder</h5>
                    <div className="card-body">

                        <LabelField
                            inputChanged={this.labelInputChanged}
                            setRef={this.setRefForLabelInput}/>
                        <TypeField
                            valueRequiredChanged={this.valueRequiredChanged}
                            selectChanged={this.selectTypeChanged}
                            setRefTypeSelect={this.setRefForTypeSelect}
                            setRefCheckbox={this.setRefForRequiredCheckbox}/>
                        <DefaultValueField
                            defValueInputChanged={this.defaultValueInputChanged}
                            setRef={this.setRefForDefaultValue}/>
                        <RegionChoicesField
                            titleChanged={this.titleChanged}
                            newChoice={this.state.newChoice}
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
