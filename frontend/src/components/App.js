import React, { Component, StrictMode } from "react";
import { createRoot } from 'react-dom/client';
import IdeasRow from "./Idea";
import IdeasService from "../IdeasService";
import Notify from './Notify';
import ErrorBoundary from "./Debug";
import { useState } from 'react';


const IService = new IdeasService();


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            notifies: [],
        };
    }

    render() {
        return (
            <div>
                <ErrorBoundary>
                    <Notify toastList={this.state.notifies}
                        position="top-end" />
                    <IdeasRow />
                </ErrorBoundary>
            </div>
        );
    }
}

export default App;


const container = document.getElementById("app");
const root = createRoot(container);
root.render(
    <StrictMode>
        <App />
    </StrictMode>
);