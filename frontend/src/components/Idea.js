import React, {Component} from 'react'


class IdeasRow extends Component {

    render() {
        return (
            <div className="row">
                <div className="col-3">
                    <span className="self-text-center">Новые идеи</span>
                    < IdeaList data={this.props.state.statusNW}/>
                </div>
                <div className="col-auto">
                    <span>В работе</span>
                    < IdeaList data={this.props.state.statusIW}/>
                </div>
                <div className="col-3">
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

    render() {
        return (
            <a href="#" className="list-group-item list-group-item-action mt-2 ml-5" aria-current="true">
                <div className="d-flex w-100 justify-content-between">
                    <h5 className="mb-1">{this.props.idea.title}</h5>
                    <small>{this.props.idea.idea_index}</small>
                </div>
                <p className="mb-1">{this.props.idea.description}</p>
                <small>{this.props.idea.created_at.split(".")[0]}</small>
            </a>
        )
    }
}

export default IdeasRow