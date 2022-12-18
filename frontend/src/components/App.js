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
            loaded: false,
            placeholder: "Loading",
            notifies: [],
        };
    }

    componentDidMount() {
        IService.getIdeas()
            .then(data => {
                this.setState(() => {
                    return {
                        data: data,
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