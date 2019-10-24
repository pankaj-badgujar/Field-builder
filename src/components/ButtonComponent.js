import React from "react"

const ButtonComponent = ({buttonContent,onClickEventHandler,classes,displayStyle}) =>
    <div
        style = {{display: displayStyle}}>
        <button
            className={classes}
            onClick={onClickEventHandler}>
            {buttonContent}
        </button>
    </div>;

export default ButtonComponent;
