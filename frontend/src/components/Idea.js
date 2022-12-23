import React, { Component } from 'react'
import Notify from "./Notify";
import { TOAST_PROPERTIES } from "../toastProps";
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
        this.handleSubmitIdeaEditModal = this.handleSubmitIdeaEditModal.bind(this);
        this.handleDeleteIdea = this.handleDeleteIdea.bind(this);

        this.state = {
            statusNW: [],
            statusIW: [],
            statusSC: [],
            statusAR: [],
            loaded: false,
            placeholder: "Loading",
            notifies: [],
            editItem: null,
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

    update_rows(data, item, is_new_item) {
        if (typeof data === "undefined") {
            this.refresh_data()
            return
        }
        if (is_new_item !== true) {
            for (let i = 0; i < data.length; i++) {
                if (data[i].pk === item.pk) {
                    data[i] = item
                    break;
                }
            }
        } else {
            data.append(item)
        }

        this.setState(() => {
            return {
                [status_name]: data
            }
        })
    }

    handleSubmitIdeaEditModal(item) {
        console.log("handleSubmitIdeaEditModal item=", item)
        if ("pk" in item & typeof item.pk !== "undefined" & item.pk != null) {
            this.updateIdea(item)
        } else {
            this.createIdea(item)
        }
    }

    updateIdea(item) {
        let status_name;
        IService.updateIdea(item).then(result_data => {
            console.log("updateIdea", result_data);
            item = result_data.data;
            status_name = "status" + item.status;
        })
        const data = this.state[status_name];
        this.update_rows(data, item, false);
    }

    createIdea(item) {
        let status_name;
        IService.createIdea(item).then(result_data => {
            console.log("createIdea", result_data);
            item = result_data.data;
            status_name = "status" + item.status;
        })
        const data = this.state[status_name];
        this.update_rows(data, item, true);
    }

    handleCloseModal() {
        this.setState(() => {
            return {
                showModal: false
            }
        })
    }

    handleDeleteIdea(item) {
        IService.deleteIdea(item).then(() => {
            const status_name = "status".concat(item.status);
            const data = this.state[status_name].filter(i => i.pk !== item.pk)
            this.setState(() => {
                return { [status_name]: data }
            })
            // this.sendNotify({ type: "Success", description: "Удалено!}" })
        })
    }

    onCreateIdea(idea) {
        this.setState(() => {
            return {
                editItem: null,
                showModal: true,
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
        this.setState({ notifies: [...this.state.notifies, toastProperties] })
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
        const handleDeleteIdea = this.handleDeleteIdea;
        return (
            <div className="row mt-3">
                <Button variant="primary" onClick={this.onCreateIdea}>
                    !Add new Idea!
                </Button>
                <div className="row mt-3">
                    <div className="col-md-auto d-lg-none d-md-block mt-2 text-center">
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
                <div id="new_ideas" className={this.visibleClassName}>
                    <div className="text-center h4">Новые идеи</div>
                    < IdeaList
                        data={this.state.statusNW}
                        onIdeaChange={this.onEditIdea}
                        handleDeleteIdea={handleDeleteIdea} />
                </div>
                <div id="inwork_ideas" className={this.invisibleClassName}>
                    <div className="text-center h4">В работе</div>
                    < IdeaList
                        data={this.state.statusIW}
                        onIdeaChange={this.onEditIdea}
                        handleDeleteIdea={handleDeleteIdea} />
                </div>
                <div id="success_ideas" className={this.invisibleClassName}>
                    <div className="text-center h4">Выполненные</div>
                    < IdeaList
                        data={this.state.statusSC}
                        onIdeaChange={this.onEditIdea}
                        handleDeleteIdea={handleDeleteIdea} />
                </div>
                <Notify toastList={this.state.notifies}
                    position="bottom-center" />

                <Modal
                    editItem={editItem}
                    showModal={showModal}
                    onClose={onClose}
                    handleSubmitIdeaEditModal={handleSubmitIdeaEditModal}
                />
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
                            onIdeaChange={this.props.onIdeaChange}
                            handleDeleteIdea={this.props.handleDeleteIdea}
                        />
                    );
                })}
            </div>
        )
    }
}

export default IdeasRow