import { Modal } from 'react-bootstrap';
import { Children,type JSX } from 'react';

type AppModalProps = {
    show: boolean;
    onHide: () => void;
    children :JSX.Element;
    headerText?: string;
}
function AppModal({show,onHide,children,headerText}:AppModalProps) {
    return(
    <Modal show={show} onHide={onHide}>   
        <Modal.Header closeButton>
            <Modal.Title>{headerText ?? ''}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            {children}
           </Modal.Body>
            </Modal>
    );

}
export default AppModal;