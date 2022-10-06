import { Button, CloseButton, Modal } from "react-bootstrap"
import "./Validation.css"

/**
 * 
 * @param {{
 *  show: boolean,
 *  onClose: () => void,
 *  icon: IconType,
 *  title: string,
 *  color: string,
 *  callback: () => void,
 *  isButtonDisabled: boolean,
 *  children: JSX.Element
 * }} props 
 * @returns 
 */
const Validation = ({ show, onClose, icon, title, color, callback, isButtonDisabled = false, children }) => {

    return (
        <Modal
            show={show}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            style={{'--modal-outline-color' : `var(--bs-${color})`}}
        >
            <Modal.Header >
                <div className={`modal-icon`}>{icon}</div> 
                {/* <div className={`modal-icon bg-${color}`}>{icon}</div>  */}
                <CloseButton variant="white" onClick={onClose}/>
            </Modal.Header>

            <Modal.Body className="">
                <h1 className={`pb-4 text-${color} text-center`} >{title}</h1>
                {children}
            </Modal.Body>

            <Modal.Footer className="pt-4">
                <Button
                    variant={color}
                    onClick={() => callback()}
                    disabled = {isButtonDisabled ? 'disabled' : ''}
                >
                    Valider
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export {Validation as default}
