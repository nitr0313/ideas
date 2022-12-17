import React, {Component} from "react";
import {createRoot} from 'react-dom/client';
import IdeasRow from "./Idea";
import IdeasService from "../IdeasService";
import Notify from './Notify';
import ErrorBoundary from "./Debug";
import {useState} from 'react';
import {TOAST_PROPERTIES} from "../toastProps";

const IService = new IdeasService();


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            // statusNW: [],
            // statusIW: [],
            // statusSC: [],
            // statusAR: [],
            loaded: false,
            placeholder: "Loading",
            notifies: [],
        };
    }

    // showToast(type) {
    //     const toastProperties = TOAST_PROPERTIES.find((toast) => toast.title.toLowerCase() === type);
    //     toastProperties.description = "ПРИВЕТ"
    //     this.setState({notifies: [...this.state.notifies, toastProperties]})
    // }

    componentDidMount() {
        IService.getIdeas()
            .then(data => {
                console.log(data);

                this.setState(() => {
                    return {
                        data: data,
                        loaded: true
                    };
                });
            });
        console.log(this.state);

    }

    render() {
        return (
            <div>
                <ErrorBoundary>
                    <Notify toastList={this.state.notifies}
                            position="top-end"/>
                    <IdeasRow data={this.state.data}/>
                </ErrorBoundary>
            </div>
        );
    }
}

export default App;


const container = document.getElementById("app");
const root = createRoot(container);
root.render(
    <App/>
);