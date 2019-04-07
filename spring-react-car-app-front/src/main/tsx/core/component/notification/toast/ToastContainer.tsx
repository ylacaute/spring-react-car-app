import React from "react";
import { ToastContainer as ToastifyContainer, toast } from 'react-toastify';
import './ToastContainer.scss';

interface Props {
}

class ToastContainer extends React.Component<Props> {

    render() {
        return (
            <ToastifyContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnHover
            />
        );
    }
}

export default ToastContainer;
