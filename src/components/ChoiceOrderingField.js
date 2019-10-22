import React from "react"

const ChoiceOrderingField = ({setRef}) =>
        <div className="row form-group py-1">
            <div className="col-3">
                <label>Order</label>
            </div>
            <div
                className="col-9">
                <select
                    ref={setRef}
                    className="custom-select">
                    <option>Display Choices in Alphabetical order</option>
                </select>
            </div>
        </div>;

export default ChoiceOrderingField;

