import React, {Component} from 'react'
import Notify from "./Notify";
import {TOAST_PROPERTIES} from "../toastProps";
import IdeasService from "../IdeasService";
import IdeaCard from "./IdeaCard"
import Modal from "./ModalForEdit"
import Button from 'react-bootstrap/Button';


const IService = new IdeasService();

class IdeasRow extends Component {

    constructor(props) {
        super(props);
        this.invisibleClassName = "col-lg-4 d-none d-lg-block";
        this.visibleClassName = "col-md-6 col-lg-4";
        this.onEditIdea = this.onEditIdea.bind(this);
        this.onCreateIdea = this.onCreateIdea.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
        this.handleCreateIdeaModal = this.handleCreateIdeaModal.bind(this);
        this.handleSubmitIdeaEditModal = this.handleSubmitIdeaEditModal.bind(this);


        this.state = {
            statusNW: [],
            statusIW: [],
            statusSC: [],
            statusAR: [],
            loaded: false,
            placeholder: "Loading",
            notifies: [],
            editItem: {
                id: null,
                title: "",
                description: "",
            },
            showModal: false,
        };
    }

    refresh_data() {
        IService.getIdeas()
            .then(data => {
                let statusNW = [];
                let statusIW = [];
                let statusSC = [];
                let statusAR = [];

                for (let i = 0; i < data.length; i++) {
                    if (data[i].status === 'NW') {
                        statusNW.push(data[i])
                    } else if (data[i].status === 'IW') {
                        statusIW.push(data[i])
                    } else if (data[i].status === 'SC') {
                        statusSC.push(data[i])
                    } else if (data[i].status === 'AR') {
                        statusAR.push(data[i])
                    }
                }
                this.setState(() => {
                        return {
                            statusNW,
                            statusIW,
                            statusSC,
                            statusAR,
                            loaded: true
                        };
                    }
                )
            })
    }

    update_rows(data, item) {
        let is_updated = false;
        for (let i = 0; i < data.length; i++) {
            if (data[i].pk === item.pk) {
                data[i] = item
                is_updated = true;
                break;
            }
        }

        if (is_updated === false) {
            data.append(item)
        }

        this.setState(() => {
            return {
                status_name: data
            }
        })
    }

    handleSubmitIdeaEditModal(item, new_item = false) {
        if (new_item === false) {
            IService.updateIdea(item).then(() => {
                const status_name = "status" + item.status;
                const data = this.state[status_name];
                this.update_rows(data, item);
            })
        } else {
            IService.createIdea(item).then(() => {
                const status_name = "status" + item.status;
                const data = this.state[status_name];
                this.update_rows(data, item);
            })
        }
    }

    handleCreateIdeaModal() {

    }

    handleCloseModal() {
        this.setState(() => {
            return {
                showModal: false
            }
        })
    }


    onCreateIdea(idea) {
        this.setState(() => {
            return {
                showModal: true
            }
        })
    }

    onEditIdea(idea) {
        this.setState(() => {
            return {
                editItem: idea,
                showModal: true
            }
        })
    }

    componentDidMount() {
        this.refresh_data()
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
        const editItem = this.state.editItem;
        const showModal = this.state.showModal;
        const onClose = this.handleCloseModal;
        const handleSubmitIdeaEditModal = this.handleSubmitIdeaEditModal;
        return (
            <div className="row">
                <Button variant="primary" onClick={this.onCreateIdea}>
                    !Add new Idea!
                </Button>
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
                    < IdeaList data={this.state.statusNW} onIdeaChange={this.onEditIdea}/>
                </div>
                <div id='inwork_ideas' className={this.invisibleClassName}>
                    <span>В работе</span>
                    < IdeaList data={this.state.statusIW} onIdeaChange={this.onEditIdea}/>
                </div>
                <div id='success_ideas' className={this.invisibleClassName}>
                    <span>Выполненные</span>
                    < IdeaList data={this.state.statusSC} onIdeaChange={this.onEditIdea}/>
                </div>
                <Notify toastList={this.state.notifies}
                        position="bottom-center"/>

                <Modal
                    editItem={editItem}
                    showModal={showModal}
                    onClose={onClose}
                    handleSubmitIdeaEditModal={handleSubmitIdeaEditModal}/>
            </div>
        )
    }
}


class IdeaList
    extends Component {
    constructor(props) {
        super(props);
    }


    render() {
        return (
            <div className="list-group">
                {this.props.data.map(idea => {
                    return (
                        <IdeaCard
                            key={idea.pk.toString()}
                            idea={idea}
                            onIdeaChange={this.props.onIdeaChange}/>
                    );
                })}
            </div>
        )
    }
}

export default IdeasRow