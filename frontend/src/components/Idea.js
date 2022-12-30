import React, {Component} from 'react'
import Notify from "./Notify";
import {TOAST_PROPERTIES} from "../toastProps";
import IdeasService from "../IdeasService";
import IdeaCard from "./IdeaCard"
import Modal from "./ModalForEdit"
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';


const IService = new IdeasService();

class IdeasRow extends Component {

    constructor(props) {
        super(props);
        this.invisibleClassName = "col-lg-4 d-none d-lg-block";
        this.visibleClassName = "col-md-12 col-lg-4";
        this.onEditIdea = this.onEditIdea.bind(this);
        this.onCreateIdea = this.onCreateIdea.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
        this.handleSubmitIdeaEditModal = this.handleSubmitIdeaEditModal.bind(this);
        this.handleDeleteIdea = this.handleDeleteIdea.bind(this);
        this.onIdeaIndexChange = this.onIdeaIndexChange.bind(this);
        this.onIdeaStatusChange = this.onIdeaStatusChange.bind(this);

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


    /*
    * Хендлер Сохранения изменений (ререндер списка идей) из модального окна.
    * запускается из ModalForEdit.
    * @param {} idea - {pk: int, title: str, description: str, idea_index: int...}
    * @param {bool} new_item - {Показывает передается новый элемент или такой уже есть в списке}
     */
    handleSubmitIdeaEditModal(item, isNewItem) {
        console.log("handleSubmitIdeaEditModal item=", item)
        const statusName = "status".concat(item.status);
        const data = this.state[statusName];
        if (isNewItem === false) {
            for (let i = 0; i < data.length; i++) {
                if (data[i].pk === item.pk) {
                    data[i] = item
                    break;
                }
            }
        } else {
            data.push(item)
        }
        data.sort(function (a, b) {
            if (a.idea_index < b.idea_index) {
                return 1;
            }
            if (a.idea_index > b.idea_index) {
                return -1;
            }
        });
        this.setState(() => {
            return {
                [statusName]: data
            }
        })
    }


    /*
    * Хендлер закрытия модальногго окна
    * запускается из ModalForEdit
     */
    handleCloseModal() {
        this.setState(() => {
            return {
                showModal: false
            }
        })
    }


    /*
    * Удаление идеи через сервис IdeasService
    * запускается из IdeaCard
    * @param {} idea - {pk: int, title: str, description: str, idea_index: int...}
     */
    handleDeleteIdea(item) {
        IService.deleteIdea(item).then(() => {
            const status_name = "status".concat(item.status);
            const data = this.state[status_name].filter(i => i.pk !== item.pk)
            this.setState(() => {
                return {[status_name]: data}
            })
        })
    }

    onIdeaIndexChange(item) {
        IService.updateIdea(item).then(() => {
            this.handleSubmitIdeaEditModal(item, false);
        })
    }


    /*
    * Изменение статуса идеи
    * @param {} idea - {pk: int, title: str, description: str, idea_index: int...}
    * @param {string} oldStatus - Старый статус для удаления идеи из старого столбца
     */
    onIdeaStatusChange(item, oldStatus) {
        IService.updateIdea(item).then(() => {
            const status_name = "status".concat(oldStatus);
            const data = this.state[status_name].filter(i => i.pk !== item.pk)
            this.setState(() => {
                return {[status_name]: data}
            })
            this.handleSubmitIdeaEditModal(item, true);
        })
    }


    /*
    * Изменение состояния для запуска
    * пустого модального окна для
    * создания идеи
    * запускается из IdeaCard
    * @param
    */
    onCreateIdea() {
        this.setState(() => {
            return {
                editItem: null,
                showModal: true,
            }
        })
    }


    /*
    * Изменение состояния для запуска
    * модального окна с данными для
    * редактирования
    * запускается из IdeaCard
    * @param {} idea - {pk: int, title: str, description: str, idea_index: int...}
    */
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
        const handleDeleteIdea = this.handleDeleteIdea;
        const onIdeaStatusChange = this.onIdeaStatusChange;
        return (
            <div className="row mt-3">
                <Button variant="primary" onClick={this.onCreateIdea}>
                    !Add new Idea!
                </Button>
                <div className="row mt-3">
                    <div className="d-lg-none d-md-block text-center">
                        <ListGroup key='sm' horizontal='sm'>
                            <ListGroup.Item action href="#1" onClick={this.showNewIdeas}>Новые идеи</ListGroup.Item>
                            <ListGroup.Item action href="#2" onClick={this.showInWork}>В работе</ListGroup.Item>
                            <ListGroup.Item action href="#3" onClick={this.showSuccess}>Выполненные</ListGroup.Item>
                        </ListGroup>
                    </div>
                </div>
                <div id="new_ideas" className={this.visibleClassName}>
                    <div className="text-center h4">Новые идеи</div>
                    < IdeaList
                        data={this.state.statusNW}
                        onIdeaChange={this.onEditIdea}
                        onIdeaIndexChange={this.onIdeaIndexChange}
                        handleDeleteIdea={handleDeleteIdea}
                        onIdeaStatusChange={onIdeaStatusChange}
                    />
                </div>
                <div id="inwork_ideas" className={this.invisibleClassName}>
                    <div className="text-center h4">В работе</div>
                    < IdeaList
                        data={this.state.statusIW}
                        onIdeaChange={this.onEditIdea}
                        onIdeaIndexChange={this.onIdeaIndexChange}
                        handleDeleteIdea={handleDeleteIdea}
                        onIdeaStatusChange={onIdeaStatusChange}

                    />
                </div>
                <div id="success_ideas" className={this.invisibleClassName}>
                    <div className="text-center h4">Выполненные</div>
                    < IdeaList
                        data={this.state.statusSC}
                        onIdeaChange={this.onEditIdea}
                        onIdeaIndexChange={this.onIdeaIndexChange}
                        handleDeleteIdea={handleDeleteIdea}
                        onIdeaStatusChange={onIdeaStatusChange}
                    />
                </div>
                <Notify toastList={this.state.notifies}
                        position="bottom-center"/>
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
            <div className="list-group ideas-list">
                {this.props.data.map(idea => {
                    return (
                        <IdeaCard
                            key={idea.pk.toString()}
                            idea={idea}
                            onIdeaChange={this.props.onIdeaChange}
                            onIdeaIndexChange={this.props.onIdeaIndexChange}
                            handleDeleteIdea={this.props.handleDeleteIdea}
                            onIdeaStatusChange={this.props.onIdeaStatusChange}
                        />
                    );
                })}
            </div>
        )
    }
}

export default IdeasRow