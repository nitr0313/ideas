import React, {Component} from 'react'
import Notify from "./Notify";
import {TOAST_PROPERTIES} from "../toastProps";
import IdeasService from "../IdeasService";
import ModalForm from "./ModalForEdit";
import IdeaCard from "./IdeaCard"

class IdeasRow extends Component {

    constructor(props) {
        super(props);
        this.invisibleClassName = "col-lg-4 d-none d-lg-block";
        this.visibleClassName = "col-md-6 col-lg-4";
        this.state = {
            'notifies': [],
        };
    }

    getCols = () => {
        return {
            "new_ideas": document.getElementById("new_ideas"),
            "inwork_ideas": document.getElementById("inwork_ideas"),
            "success_ideas": document.getElementById("success_ideas"),
        }
    }

    showToast(type, description) {
        const toastProperties = TOAST_PROPERTIES.find((toast) => toast.title.toLowerCase() === type);
        toastProperties.description = description
        this.setState({notifies: [...this.state.notifies, toastProperties]})
    }

    showNewIdeas = () => {
        let cols = this.getCols();
        cols.new_ideas.className = this.visibleClassName;
        cols.inwork_ideas.className = cols.success_ideas.className = this.invisibleClassName;
        this.showToast('success', 'Показаны новые идеи');
    }

    showInWork = () => {
        let cols = this.getCols();
        cols.inwork_ideas.className = this.visibleClassName;
        cols.success_ideas.className = cols.new_ideas.className = this.invisibleClassName;
        this.showToast('success', 'Показаны идеи в работе');
    }

    showSuccess = () => {
        let cols = this.getCols();
        cols.success_ideas.className = this.visibleClassName;
        cols.inwork_ideas.className = cols.new_ideas.className = this.invisibleClassName;
        this.showToast('success', 'Показаны выполненные');
    }

    render() {
        return (
            <div className="row">
                <div className="row">
                    <div className="col-md-6 d-lg-none d-md-block">
                        <button id="NIdeasBtn" className="btn btn-sm btn-light mx-1 active"
                                onClick={this.showNewIdeas}
                        >Новые идеи
                        </button>
                        <button id="IWIdeasBtn" className="btn btn-sm btn-light mx-1"
                                onClick={this.showInWork}
                        >В работе
                        </button>
                        <button id="SIdeasBtn" className="btn btn-sm btn-light mx-1"
                                onClick={this.showSuccess}
                        >Выполненные
                        </button>
                    </div>
                </div>
                <div id='new_ideas' className={this.visibleClassName}>
                    <span className="self-text-center">Новые идеи</span>
                    < IdeaList data={this.props.state.statusNW}/>
                </div>
                <div id='inwork_ideas' className={this.invisibleClassName}>
                    <span>В работе</span>
                    < IdeaList data={this.props.state.statusIW}/>
                </div>
                <div id='success_ideas' className={this.invisibleClassName}>
                    <span>Выполненные</span>
                    < IdeaList data={this.props.state.statusSC}/>
                </div>
                <Notify toastList={this.state.notifies}
                        position="bottom-center"/>
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

export default IdeasRow