import React from "react";
import LabelField from "../components/LabelField";
import TypeField from "../components/TypeField";
import DefaultValueField from "../components/DefaultValueField";
import RegionChoicesField from "../components/RegionChoicesField";
import ChoiceOrderingField from "../components/ChoiceOrderingField";
import SubmitCancelSection from "../components/SubmitCancelSection";


class FieldBuilder extends React.Component{

    render() {
        return (
            <div className="container mt-4">
                <div className="card">
                    <h5 className="card-header bg-info text-white">Field Builder</h5>
                    <div className="card-body">
                        <LabelField/>
                        <TypeField/>
                        <DefaultValueField/>
                        <RegionChoicesField/>
                        <ChoiceOrderingField/>
                        <SubmitCancelSection/>
                    </div>
                </div>
                <br/><br/>
            </div>
        );
    }
}

export default FieldBuilder;
