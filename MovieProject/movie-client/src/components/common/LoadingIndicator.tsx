import React from "react";
import Spinner from "react-bootstrap/esm/Spinner";

type Props ={
    size: 'small' | 'medium' | 'large',
    message: string
};
const sizemap ={
    small: {
        width: '1.5rem',
        height: '1.4rem'
    },medium: {
        width: '2rem',
        height: '2rem'
    },large: {
        width: '4rem',
        height: '4rem'
    }
}
const LoadingIndicator = ({ size, message } : Props) => {

    return(
        <div className="d-flex flex-column align-items-center my-5">
            <Spinner animation="border" role="status" style={sizemap[size]}>
                <span className="visually-hidden">{message}</span>
            </Spinner>
            <span className="my-2">{message}</span>
        </div>
        
    );
}

LoadingIndicator.defauttProps ={
    size: "medium",
    message: "Loading..."
};
export default LoadingIndicator;