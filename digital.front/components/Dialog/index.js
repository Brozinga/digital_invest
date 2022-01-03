import React from 'react'
import { Modal, Button } from 'react-bootstrap'

export default function Dialog({ title, message, show, setShow, handleNot, handleYes, yesText, noText, size="md" }) {

    const handleClose = () => setShow(false);

    return (
        <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
            className="dialog"
            centered
            size={size}
        >
            {title ?
                <Modal.Header>
                    <Modal.Title>{title}</Modal.Title>
                </Modal.Header>
                : null
            }
            {message ?
                <Modal.Body>
                    {message}
                </Modal.Body>
                : null
            }
            <Modal.Footer>
                <Button variant="primary" onClick={handleYes}>
                    {yesText}
                </Button>
                <Button variant="secondary" onClick={handleNot}>
                    {noText}
                </Button>
            </Modal.Footer>
        </Modal>
    )
}
