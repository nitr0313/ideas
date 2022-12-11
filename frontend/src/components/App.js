import React, { Component } from "react";
// import { render } from "react-dom";
import { createRoot } from 'react-dom/client';


class App extends Component {
    render() {
        return <h1>Ideas APP</h1>
    }
}

export default App;


const container = document.getElementById("app");
const root = createRoot(container);
root.render(<App />);