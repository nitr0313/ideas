import React, {useState} from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import IdeasService from "../IdeasService";

const IService = new IdeasService()

function ModalForm(props) {

    let item = props.editItem;
    const onClose = props.onClose;
    const handleSubmitIdeaEditModal = props.handleSubmitIdeaEditModal;
    const show = props.showModal;
    let titleNode;
    let descNode;

    const onSubmit = e => {
        const form = e.currentTarget;
        e.preventDefault();
        let _item = {};
        let method;
        if ((typeof item === "undefined") || (item === null)) {
            method = "createIdea";
        } else {
            method = "updateIdea";
            _item = item;
        }
        _item.title = titleNode.value;
        _item.description = descNode.value;
        IService[method](_item).then(result_data => {
            if (result_data.status >= 400 ) {
                for (let error in result_data.data) {


                }
            }
            handleClose();
            // TODO: Отправить Notify о создании или обновлении!
            return handleSubmitIdeaEditModal(result_data, method === "createIdea");
        })
    };

    const handleClose = () => {
        item = null;
        onClose();
    }

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Редактирование идеи</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form id="modalForm" onSubmit={onSubmit}>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Название</Form.Label>
                            <Form.Control
                                defaultValue={item !== null ? item.title : ""}
                                key="idea_title"
                                type="text"
                                placeholder="title"
                                autoFocus
                                ref={node => (titleNode = node)}
                            />
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlTextarea1"
                        >
                            <Form.Label>Описание</Form.Label>
                            <Form.Control
                                key="idea_desc"
                                as="textarea"
                                defaultValue={item !== null ? item.description : ""}
                                rows={3}
                                ref={node => (descNode = node)}
                            />
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" form="modalForm" type="submit" key="submit">
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalForm