import React, {Component, StrictMode} from "react";
import {createRoot} from 'react-dom/client';
import IdeasRow from "./Idea";
import IdeasService from "../IdeasService";
import Notify from './Notify';
import ErrorBoundary from "./Debug";
import {Container} from 'react-bootstrap';


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
                    <Container>
                        <IdeasRow/>
                    </Container>
                    <Notify toastList={this.state.notifies}
                            position="top-end"/>
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
        <App/>
    </StrictMode>
);