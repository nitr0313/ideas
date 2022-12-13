import React, {Component} from "react";
import {createRoot} from 'react-dom/client';
import IdeasRow from "./Idea";


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            statusNW: [],
            statusIW: [],
            statusSC: [],
            statusAR: [],
            loaded: false,
            placeholder: "Loading"
        };
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
            <IdeasRow state={this.state}/>
        );
    }
}

export default App;


const container = document.getElementById("app");
const root = createRoot(container);
root.render(
    <App/>
);