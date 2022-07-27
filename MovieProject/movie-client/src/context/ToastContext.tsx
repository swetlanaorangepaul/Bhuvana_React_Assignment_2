import { string } from "prop-types";
import React, { createContext } from "react";

const contextObj ={
    responseState : 'initial',
    updateResponseState : (responseState:string) => {},
    toastMessage : '',
    updateToastMessage : (toastMessage:string) => {},
    show : false,
    updateShow : (show:boolean) => {}
}

const ToastContext = createContext( contextObj);

export default ToastContext;
