import IdeasService from "../IdeasService";
import {Component} from "react";
import {useDispatch} from "react-redux";
import {TOAST_PROPERTIES} from "../toastProps";


class IdeaCard extends Component {
    idea = {'idea_index': 0, 'title': '', 'created_at': '', 'description': ''}
    statuses = [
        'NW', 'IW', 'SC'
    ]

    constructor(props) {
        super(props);
        this.display = true;
        this.service = new IdeasService();
        this.handleEdit = this.handleEdit.bind(this);
        this.changeIndexHandler = this.changeIndexHandler.bind(this);
    }


    sendNotify = (props) => {
        const toastProperties = TOAST_PROPERTIES.find((toast) => toast.title.toLowerCase() === props.type);
        toastProperties.description = props.description;
        const dispatch = useDispatch();
        dispatch({type: "ADD_NOTIFY", payload: toastProperties})
    }

    handleArchive = (idea) => {
        const oldStatus = idea.status;
        idea.status = 'AR';
        this.props.onIdeaStatusChange(idea, oldStatus);
    }

    changeIndexHandler = (item, count) => {
        item.idea_index += count
        this.props.onIdeaIndexChange(item);
    }

    handleEdit = (item) => {
        this.props.onIdeaChange(item);
    }

    handleDelete = (item) => {
        this.props.handleDeleteIdea(item);

    }

    leftButtonClick = (idea) => {
        let status_index = this.statuses.findIndex(el => el === idea.status);
        if (status_index === -1) {
            throw new Error(`Не верный статус!!! $this.statuses`);
        }
        if (status_index === 0) {
            console.log("Влево двигаться нельзя")
        } else {
            const oldStatus = idea.status;
            idea.status = this.statuses[status_index - 1];
            this.props.onIdeaStatusChange(idea, oldStatus);
        }

    }

    rightButtonClick = (idea) => {
        let status_index = this.statuses.findIndex(el => el === idea.status);
        if (status_index === -1) {
            throw new Error(`Не верный статус!!! $this.statuses`);
        }
        if (status_index === 2) {
            console.log("Вправо двигаться нельзя")
        } else {
            const oldStatus = idea.status;
            idea.status = this.statuses[status_index + 1];
            this.props.onIdeaStatusChange(idea, oldStatus);
        }
    }

    dragOverHandler = (e) => {
        e.preventDefault()
        if (e.target.className === 'list-group-item list-group-item-action mt-2 ml-5') {
            e.target.style.margin = '0px 0px 20px 0px';
        }
        if (e.target.parentNode.className === 'list-group-item list-group-item-action mt-2 ml-5') {
            e.target.parentNode.style.margin = '0px 0px 20px 0px';
        }
    }

    dragLeaveHandler(e) {
        e.preventDefault()
        if (e.target.className === 'list-group-item list-group-item-action mt-2 ml-5') {
            e.target.style.margin = '0px 0px 0px 0px';
        }
        if (e.target.parentNode.className === 'list-group-item list-group-item-action mt-2 ml-5') {
            e.target.parentNode.style.margin = '0px 0px 0px 0px';
        }
    }

    dragStartHandler(e, idea) {
        e.dataTransfer.setData('idea', JSON.stringify(idea))
    }

    dragEndHandler(e, idea) {
        e.preventDefault()
        if (e.target.className === 'list-group-item list-group-item-action mt-2 ml-5') {
            e.target.style.margin = '0px 0px 0px 0px';
        }
        if (e.target.parentNode.className === 'list-group-item list-group-item-action mt-2 ml-5') {
            e.target.parentNode.style.margin = '0px 0px 0px 0px';
        }
    }

    dropHandler(e, idea) {
        e.preventDefault()
        if (e.target.className === 'list-group-item list-group-item-action mt-2 ml-5') {
            e.target.style.margin = '0px 0px 0px 0px';
        }
        if (e.target.parentNode.className === 'list-group-item list-group-item-action mt-2 ml-5') {
            e.target.parentNode.style.margin = '0px 0px 0px 0px';
        }
        const draggedIdea = JSON.parse(e.dataTransfer.getData('idea'))
        const oldStatus = draggedIdea.status
        if (oldStatus === idea.status) {
            // На будущее возможно изменение индекса важности )
            return
        }
        draggedIdea.status = idea.status
        this.props.onIdeaStatusChange(draggedIdea, oldStatus);
    }

    render() {
        const idea = this.props.idea;
        return (
            <div id={`idea_${idea.pk.toString()}`}
                 style={{display: this.display}} className="list-group-item list-group-item-action mt-2 ml-5"
                 aria-current="true" draggable={true}
                 onDragOver={(e) => this.dragOverHandler(e)}
                 onDragLeave={(e) => this.dragLeaveHandler(e)}
                 onDragStart={(e) => this.dragStartHandler(e, idea)}
                 onDragEnd={(e) => this.dragEndHandler(e)}
                 onDrop={(e) => this.dropHandler(e, idea)}
            >
                <div className="d-flex w-100 justify-content-between">
                    <h5 className="mb-1">{idea.title}</h5>
                </div>
                <p className="mb-1">{idea.description.substring(0, 40)}...</p>
                <div className="d-flex w-100 justify-content-between">
                    <small style={{fontSize: '0.550em'}}>{idea.created_at.split(".")[0]}</small>
                    <div className="btn-group">
                        <button type="button" className="btn btn-sm btn-outline-success"
                                onClick={() => this.handleEdit(idea)}>
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
                                onClick={() => this.handleArchive(idea)}>
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
                                onClick={() => this.handleDelete(idea)}>
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
                <div className="d-flex w-100 justify-content-between p-2">
                    <div className="arrow disabled" onClick={() => {
                        this.leftButtonClick(idea)
                    }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor"
                             className="bi bi-arrow-left-square" viewBox="0 0 16 16">
                            <path fillRule="evenodd"
                                  d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm11.5 5.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z"/>
                        </svg>
                    </div>
                    <div>
                        <div className="btn-group">
                            <button type="button" className="btn btn-sm btn-secondary"
                                    onClick={() => this.changeIndexHandler(idea, -1)}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                     className="bi bi-dash-circle" viewBox="0 0 16 16">
                                    <path
                                        d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"></path>
                                    <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z"></path>
                                </svg>
                            </button>
                            <button type="button" className="btn btn-sm text-bg-secondary">
                                {idea.idea_index}
                            </button>
                            <button type="button" className="btn btn-sm btn-secondary"
                                    onClick={() => this.changeIndexHandler(idea, 1)}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                     className="bi bi-plus-circle" viewBox="0 0 16 16">
                                    <path
                                        d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"></path>
                                    <path
                                        d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"></path>
                                </svg>
                            </button>
                        </div>
                    </div>
                    <div className="arrow" onClick={() => {
                        this.rightButtonClick(idea)
                    }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor"
                             className="bi bi-arrow-right-square" viewBox="0 0 16 16">
                            <path fillRule="evenodd"
                                  d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z"/>
                        </svg>
                    </div>
                </div>
            </div>
        )
    }

}

export default IdeaCard