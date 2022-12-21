import React, {useState} from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import IdeasService from "../IdeasService";

function ModalForm(props) {

    const item = props.editItem;
    const onClose = props.onClose;
    const handleSubmitIdeaEditModal = props.handleSubmitIdeaEditModal;
    const show = props.showModal;
    let titleNode;
    let descNode;

    const onSubmit = e => {
        e.preventDefault();
        let is_update;
        let _item = {description: "", id: null, title: ""};
        if (typeof item !== 'undefined') {
            _item = item;
            _item.title = titleNode.value;
            _item.description = descNode.value;
        } else {
            // Новый элеммент!
            _item.title = titleNode.value;
            _item.description = descNode.value;
        }
        handleClose();
        return handleSubmitIdeaEditModal(_item)
    };

    const handleClose = () => onClose();

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
                                defaultValue={item.title}
                                key="idea_title"
                                type="text"
                                placeholder="title"
                                autoFocus
                                ref={node => (titleNode = node)}
                            />
                        </Form.Group>
                        <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlTextarea1"
                        >
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                key="idea_desc"
                                as="textarea"
                                defaultValue={item.description}
                                rows={3}
                                ref={node => (descNode = node)}
                            />
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