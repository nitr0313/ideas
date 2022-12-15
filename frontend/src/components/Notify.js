import React, {useState, useEffect} from 'react';
import Toast from "react-bootstrap/Toast";
import ToastContainer from 'react-bootstrap/ToastContainer';

const Notify = props => {
    const {toastList, position} = props;
    const [list, setList] = useState(toastList);

    useEffect(() => {
        setList(toastList);
    }, [toastList, list]);

    const deleteToast = id => {
        const index = list.findIndex(e => e.id === id);
        list.splice(index, 1);
        setList([...list]);
    }


    return (
        <ToastContainer position={position} className="p-3">
            {list.map((toast, i) =>
                <Toast key={i} bg={toast.title.toLowerCase()} show={true} delay={3000} onClose={() => deleteToast(toast.id)} autohide>
                    <Toast.Header>
                        <strong className="me-auto">{toast.title}</strong>
                    </Toast.Header>
                    <Toast.Body>{toast.description}</Toast.Body>
                </Toast>)
            }
        </ToastContainer>
    )


}

export default Notify