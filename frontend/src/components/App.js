import React, {Component} from "react";
import {createRoot} from 'react-dom/client';


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
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
                this.setState(() => {
                    return {
                        data,
                        loaded: true
                    };
                });
            });
    }
    render() {
        return (
            <ul>
                {this.state.data.map(idea => {
                    return (
                        <li key={idea.id}>
                            { idea.created_at } - { idea.title } - { idea.status }
                            { idea.description }
                        </li>
                    );
                })}
            </ul>
        );
    }
}

export default App;


const container = document.getElementById("app");
const root = createRoot(container);
root.render(<App/>);