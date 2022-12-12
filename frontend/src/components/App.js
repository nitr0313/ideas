import React, { Component } from "react";
import { createRoot } from 'react-dom/client';


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
                        return { placeholder: "Something went wrong!" };
                    });
                }
                return response.json();
            })
            .then(data => {
                var statusNW = data.filter(function (entry) { return entry.status === 'NW'; })
                var statusIW = data.filter(function (entry) { return entry.status === 'IW'; })
                var statusSC = data.filter(function (entry) { return entry.status === 'SC'; })
                var statusAR = data.filter(function (entry) { return entry.status === 'AR'; })
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
            <div className="row">
                <div className="col-3">
                    <span className="self-text-center">Новые идеи</span>
                    <div className="list-group">
                        {this.state.statusNW.map(idea => {
                            return (
                                <a href="{idea.id}#" class="list-group-item list-group-item-action mt-2" aria-current="true">
                                    <div class="d-flex w-100 justify-content-between">
                                        <h5 class="mb-1">{idea.title}</h5>
                                        <small>{idea.idea_index}</small>
                                    </div>
                                    {/* <p class="mb-1">{idea.description}</p> */}
                                    <small>{idea.created_at.split(".")[0]}</small>
                                </a>
                            );
                        })}
                    </div>
                </div>
                <div className="col-auto">
                    <span>В работе</span>
                    <div className="list-group">
                        {this.state.statusIW.map(idea => {
                            return (
                                <a href="{idea.id}#" class="list-group-item list-group-item-action mt-2" aria-current="true">
                                    <div class="d-flex w-100 justify-content-between">
                                        <h5 class="mb-1">{idea.title}</h5>
                                        <small>{idea.idea_index}</small>
                                    </div>
                                    <p class="mb-1">{idea.description}</p>
                                    <small>{idea.created_at.split(".")[0]}</small>
                                </a>
                            );
                        })}
                    </div>
                </div>
                <div className="col-3">
                    <span>Выполненные</span>
                    <div className="list-group">
                        {this.state.statusSC.map(idea => {
                            return (
                                <a href="{idea.id}#" class="list-group-item list-group-item-action mt-2" aria-current="true">
                                    <div class="d-flex w-100 justify-content-between">
                                        <h5 class="mb-1">{idea.title}</h5>
                                        {/* <small>3 days ago</small> */}
                                    </div>
                                    <p class="mb-1">{idea.description}</p>
                                    <small>{idea.created_at.split(".")[0]}</small>
                                </a>
                            );
                        })}
                    </div>
                </div>
            </div>
        );
    }
}

export default App;


const container = document.getElementById("app");
const root = createRoot(container);
root.render(<App />);