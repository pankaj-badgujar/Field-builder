import React from "react";
import Form from "../components/Form";


class FieldBuilder extends React.Component{

    render() {
        return (
            <div className="container mt-4">
                <div className="card">
                    <h5 className="card-header bg-info text-white">Field Builder</h5>
                    <div className="card-body">
                        <Form/>
                    </div>
                </div>
                <br/><br/>
            </div>
        );
    }
}

export default FieldBuilder;
