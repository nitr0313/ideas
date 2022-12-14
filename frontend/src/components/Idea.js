import React, {Component} from 'react'


class IdeasRow extends Component {

    showNewIdeas = () => {
        let new_ideas = document.getElementById("new_ideas")
        let inwork_ideas = document.getElementById("inwork_ideas")
        let success_ideas = document.getElementById("success_ideas")
        new_ideas.className = "col-md-6 col-lg-4"
        inwork_ideas.className = success_ideas.className = "col-lg-4 d-none d-lg-block"
        // success_ideas.className = "col-lg-4 d-none d-lg-block"
    }

    showInWork = () => {
        let new_ideas = document.getElementById("new_ideas")
        let inwork_ideas = document.getElementById("inwork_ideas")
        let success_ideas = document.getElementById("success_ideas")
        new_ideas.className = success_ideas.className = "col-lg-4 d-none d-lg-block"
        inwork_ideas.className = "col-md-6 col-lg-4"
        // success_ideas.className = "col-lg-4 d-none d-lg-block"
    }

    showSuccess = () => {
        let new_ideas = document.getElementById("new_ideas")
        let inwork_ideas = document.getElementById("inwork_ideas")
        let success_ideas = document.getElementById("success_ideas")
        new_ideas.className = inwork_ideas.className = "col-lg-4 d-none d-lg-block"
        // inwork_ideas.className = "col-lg-4 d-none d-lg-block"
        success_ideas.className = "col-md-6 col-lg-4"
    }

    render() {
        return (
            <div className="row">
                <div className="row">
                    <div className="col-md-6 d-lg-none d-md-block">
                        <button className="btn btn-sm btn-success mx-1"
                        onClick={this.showNewIdeas}
                        >Новые идеи</button>
                        <button className="btn btn-sm btn-success mx-1"
                                onClick={this.showInWork}
                        >В работе</button>
                        <button className="btn btn-sm btn-success mx-1"
                                onClick={this.showSuccess}
                        >Выполненные</button>
                    </div>
                </div>
                <div id='new_ideas' className="col-md-6 col-lg-4">
                    <span className="self-text-center">Новые идеи</span>
                    < IdeaList data={this.props.state.statusNW}/>
                </div>
                <div id='inwork_ideas' className="col-lg-4 d-none d-lg-block">
                    <span>В работе</span>
                    < IdeaList data={this.props.state.statusIW}/>
                </div>
                <div id='success_ideas' className="col-lg-4 d-none d-lg-block">
                    <span>Выполненные</span>
                    < IdeaList data={this.props.state.statusSC}/>
                </div>
            </div>
        )
    }
}


class IdeaList extends Component {

    render() {
        return (
            <div className="list-group">
                {this.props.data.map(idea => {
                    return (
                        <IdeaCard key={idea.pk.toString()} idea={idea}/>
                    );
                })}
            </div>
        )
    }
}


class IdeaCard extends Component {
    idea = {'idea_index': 0, 'title': '', 'created_at': '', 'description': ''}

    handleDelete = (item) => {
        alert("delete" + JSON.stringify(
            item
        ))
    }

    handleArchive = (item) => {
        alert("archive" + JSON.stringify(
            item
        ))
    }

    handleEdit = (item) => {
        alert("edit" + JSON.stringify(
            item
        ))
    }

    render() {
        return (
            <a href="#" className="list-group-item list-group-item-action mt-2 ml-5" aria-current="true">
                <div className="d-flex w-100 justify-content-between">
                    <h5 className="mb-1">{this.props.idea.title}</h5>
                    <small>{this.props.idea.idea_index}</small>
                </div>
                <p className="mb-1">{this.props.idea.description}</p>
                <div className="d-flex w-100 justify-content-between">
                    <small style={{fontSize: '0.550em'}}>{this.props.idea.created_at.split(".")[0]}</small>
                    <div className="btn-group">
                        <button type="button" className="btn btn-sm btn-outline-success"
                                onClick={() => this.handleEdit(this.props.idea)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                 className="bi bi-pencil-square" viewBox="0 0 16 16">
                                <path
                                    d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                                <path fillRule="evenodd"
                                      d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                            </svg>
                            <span className="visually-hidden">Edit</span>
                        </button>

                        <button type="button" className="btn btn-sm btn-outline-primary"
                                onClick={() => this.handleArchive(this.props.idea)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                 className="bi bi-file-earmark-zip" viewBox="0 0 16 16">
                                <path
                                    d="M5 7.5a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v.938l.4 1.599a1 1 0 0 1-.416 1.074l-.93.62a1 1 0 0 1-1.11 0l-.929-.62a1 1 0 0 1-.415-1.074L5 8.438V7.5zm2 0H6v.938a1 1 0 0 1-.03.243l-.4 1.598.93.62.929-.62-.4-1.598A1 1 0 0 1 7 8.438V7.5z"/>
                                <path
                                    d="M14 4.5V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h5.5L14 4.5zm-3 0A1.5 1.5 0 0 1 9.5 3V1h-2v1h-1v1h1v1h-1v1h1v1H6V5H5V4h1V3H5V2h1V1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4.5h-2z"/>
                            </svg>
                            <span className="visually-hidden">Archive</span>
                        </button>

                        <button type="button" className="btn btn-sm btn-outline-danger"
                                onClick={() => this.handleDelete(this.props.idea)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                 className="bi bi-trash" viewBox="0 0 16 16">
                                <path
                                    d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"></path>
                                <path fillRule="evenodd"
                                      d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"></path>
                            </svg>
                            <span className="visually-hidden">Delete</span>
                        </button>
                    </div>
                </div>
            </a>
        )
    }
}

export default IdeasRow