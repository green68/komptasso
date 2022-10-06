import "react-datepicker/dist/react-datepicker.css";
import "./UserInit.css";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from "react-bootstrap/Modal";
import { useState } from "react";
import { isInputValid } from "../utilities/Functions";
import { FaCog } from "react-icons/fa"
import { User } from "../classes/User";

/**
 * 
 * @param {{show: boolean, handleInit: (user: User) => void}} props 
 * @returns 
 */
const UserInit = ({ show, handleInit }) => {

    const fieldsDatas = {
        name: { valid: null, value: "" },
        date: { valid: true, value: new Date().getFullYear() },
        bank: { valid: null, value: "" },
        cash: { valid: null, value: "" }
    }
    const [fields, setFields] = useState(fieldsDatas)
    const [isValid, setIsValid] = useState(false);

    const handleChange = (e) => {
        let temp = { ...fields }
        temp[e.target.id].value = e.target.value
        const valid = isInputValid(e.target)
        temp[e.target.id].valid = valid
        setFields(temp)
        // validation button
        if (fields.name.valid && fields.bank.valid && fields.cash.valid) {
            setIsValid(true)
        } else {
            setIsValid(false)
        }
    }

    const saveForm = (e) => {
        console.log("UserInit : saveForm => ok");
        const newUser = new User({
            name: fields.name.value,
            years: [
                {
                    id: fields.date.value,
                    bank_report: fields.bank.value,
                    cash_report: fields.cash.value,
                    bank_items: [],
                    cash_items: [],
                }
            ]
        })
        handleInit(newUser)
        setFields(fieldsDatas)
    }

    return (
        <Modal
            show={show}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            style={{'--modal-outline' : `1px solid var(--bs-light)`}}
        >
            <Modal.Header >
                <div className={`modal-icon bg-light`} style={{color: "var(--bs-dark)"}} ><FaCog /></div> 
            </Modal.Header>

            <Modal.Body>
                <Form id="formInit" >

                    <Modal.Title className="pb-4 text-center">Initialisation</Modal.Title>
                    <Form.Group className="mb-3" >
                        <Form.Label>Nom d'utilisateur</Form.Label>
                        <Form.Control
                            id="name"
                            className={`input-control
                                ${fields.name.valid === null ? "" : fields.name.valid ? "is-valid" : "is-invalid"}
                                `}
                            placeholder="Votre nom/peudo"
                            value={fields.name.value}
                            onChange={handleChange}
                            pattern={"pseudo"}
                            required
                            autoFocus
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" >
                        <Form.Label>Année</Form.Label>
                        <Form.Select
                            id="year"
                        >
                            <option>{fields.date.value}</option>
                            <option value="1">{(parseInt(fields.date.value) - 1).toString()}</option>
                            <option value="2">{(parseInt(fields.date.value) - 2).toString()}</option>
                        </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-3" >
                        <Form.Label>Report solde Banque</Form.Label>
                        <Form.Control
                            id="bank"
                            className={fields.bank.valid === null ? "" : fields.bank.valid ? "is-valid" : "is-invalid"}
                            placeholder="0.00"
                            value={fields.bank.value}
                            onChange={handleChange}
                            pattern="float"
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" >
                        <Form.Label>Report solde Caisse</Form.Label>
                        <Form.Control
                            id="cash"
                            className={fields.cash.valid === null ? "" : fields.cash.valid ? "is-valid" : "is-invalid"}
                            placeholder="0.00"
                            value={fields.cash.value}
                            onChange={handleChange}
                            pattern="float"
                            required
                        />
                    </Form.Group>

                </Form>
            </Modal.Body>

            <Modal.Footer>
                <Button form="formInit"
                    variant="success"
                    className={`${isValid ? "" : "disabled"}`}
                    onClick={saveForm}
                >
                    Enregistrer
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export { UserInit as default };