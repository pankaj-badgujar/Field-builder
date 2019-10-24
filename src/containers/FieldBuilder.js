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
            newChoice: {title: '', id: -1}
        };
        this.clearFields = this.clearFields.bind(this);
        this.deleteFromChoices = this.deleteFromChoices.bind(this);
        this.addToChoices = this.addToChoices.bind(this);
        this.titleChanged = this.titleChanged.bind(this);
        this.submitForm = this.submitForm.bind(this);
        this.checkFormValuesBeforeSubmission =
            this.checkFormValuesBeforeSubmission.bind(this);
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

    validateChoice(choice) {
        return !this.isChoiceBlank(choice)
            && this.isChoiceLengthLessThanFortyChars(choice)
            && !this.isChoiceDuplicate(choice, true)
            && this.areChoicesLessThanFifty();
    }

    isChoiceLengthLessThanFortyChars(choice) {
        if(choice.title.length > 40){
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

    addToChoices(choice) {
        if (this.validateChoice(choice)) {
            this.setState({
                choices: [choice, ...this.state.choices],
                nextId: this.state.nextId + 1
            });
            return true;
        }
        return false;
    }

    deleteFromChoices = (id) =>
        this.setState({
            choices: this.state.choices.filter(choice => choice.id !== id)
        });

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

    isLabelFieldEmpty() {
        if (this.labelInputRef.value.trim().length < 1) {
            alert('Label field cannot be blank');
            return true;
        }
        return false;
    }


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


    submitForm() {
        this.checkFormValuesBeforeSubmission()
            .then(() =>
                this.formService.postDataToAPI(this.createJsonOfFormValues())
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
                            setRef={this.setRefForLabelInput}/>
                        <TypeField
                            setRefTypeSelect={this.setRefForTypeSelect}
                            setRefCheckbox={this.setRefForRequiredCheckbox}/>
                        <DefaultValueField
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
