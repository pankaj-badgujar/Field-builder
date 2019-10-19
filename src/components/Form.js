import React from "react";
import "./RegionChoices.css";
import ChoiceOrderingField from "./ChoiceOrderingField";
import RegionChoicesField from "./RegionChoicesField";
import LabelField from "./LabelField";
import DefaultValueField from "./DefaultValueField";
import TypeField from "./TypeField";
import SubmitCancelSection from "./SubmitCancelSection";

export default class Form extends React.Component {
    render() {
        return (
            <div>
                <form>
                    <LabelField/>
                    <TypeField/>
                    <DefaultValueField/>
                    <RegionChoicesField/>
                    <ChoiceOrderingField/>
                    <SubmitCancelSection/>
                </form>
            </div>
        );
    }

}
