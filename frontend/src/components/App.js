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
            statusNW: [],
            statusIW: [],
            statusSC: [],
            statusAR: [],
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
                let statusNW = data.filter(function (entry) {
                    return entry.status === 'NW';
                })
                let statusIW = data.filter(function (entry) {
                    return entry.status === 'IW';
                })
                let statusSC = data.filter(function (entry) {
                    return entry.status === 'SC';
                })
                let statusAR = data.filter(function (entry) {
                    return entry.status === 'AR';
                })
                this.setState(() => {
                    return {
                        statusNW,
                        statusIW,
                        statusSC,
                        statusAR,
                        loaded: true
                    };
                });
            });
    }

    render() {
        return (
            <div>
                <ErrorBoundary>
                    <Notify toastList={this.state.notifies}
                            position="top-end"/>
                    <IdeasRow state={this.state}/>
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