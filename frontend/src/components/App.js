import React, {Component} from "react";
import {createRoot} from 'react-dom/client';
import IdeasRow from "./Idea";
import IdeasService from "../IdeasService";
import Notify from './Notify';
import ErrorBoundary from "./Debug";
import { useState } from 'react';
import {TOAST_PROPERTIES} from "../toastProps";

const IService = new IdeasService();


const testList = [
    {
        id: 1,
        title: 'Success',
        description: 'This is a success toast component',
    },
    {
        id: 2,
        title: 'Danger',
        description: 'This is an error toast component',
    },
];


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

    showToast(type) {
        const toastProperties = TOAST_PROPERTIES.find((toast) => toast.title.toLowerCase() === type);
        toastProperties.description = "ПРИВЕТ"
        this.setState({notifies: [...this.state.notifies, toastProperties]})
    }

    componentDidMount() {
        fetch("api/v1/ideas/")
            .then(response => {
                if (response.status > 400) {
                    return this.setState(() => {
                        return {placeholder: "Something went wrong!"};
                    });
                }
                return response.json();
            })
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
                    {/*<button onClick={() => this.showToast('warning')}>ПОКАЗАТЬ НОТИФАЙ</button>*/}
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