import fr from "date-fns/locale/fr";
import React, { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import ReactDatePicker, { CalendarContainer } from "react-datepicker";
import { BsBank } from "react-icons/bs";
// eslint-disable-next-line
import { BankItem } from "../../classes/BankItem";
import { isInputValid } from "../../utilities/Functions";
import InputMvt from "../InputMvt";
import Validation from "../Validation";

/**
 * 
 * @param {{onClose: () => void, onChange: (datas: BankItem) => void, datas: bankItem|null}} props 
 */
const FormBankItem = ({ onClose, onChange, datas }) => {

    const [fields, setFields] = useState({
        id: { valid: null, value: datas.id },
        date: { valid: true, value: datas.date },
        label: { valid: null, value: datas.label },
        type: { valid: true, value: datas.type },
        mvt: { valid: null, value: datas.mvt },
        cheque: { valid: true, value: datas.cheque },
        checked: { valid: true, value: datas.checked },
    })
    const [startDate, setStartDate] = useState(fields.date.value)
    const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
    const [isFormValid, setIsFormValid] = useState(false);

    const updateDatas = () => {
        console.log("FormBankItem : updateDatas");
        onChange({
            id: fields.id.value,
            date: fields.date.value,
            label: fields.label.value.trim(),
            type: fields.type.value,
            cheque: fields.cheque.value,
            mvt: fields.mvt.value,
            checked: fields.checked.value
        })
    }

    const handleClose = (e) => {
        console.log("FormBankItem : handleClose");
        onClose()
    }

    const handleButtonDateClick = (e) => {
        e.preventDefault()
        setIsDatePickerOpen(!isDatePickerOpen)
    }

    /**
     * 
     * @param {MouseEvent} e 
     */
    const handleChange = (e) => {
        if (e.target.id === "checked") {
            e.target.value = e.target.checked
        }
        const newFields = { ...fields }
        newFields[e.target.id].value = e.target.value
        const valid = isInputValid(e.target)
        newFields[e.target.id].valid = valid
        setFields({ ...newFields })
        if (
            fields.label.valid
            && fields.date.valid
            && fields.type.valid
            && fields.cheque.valid
            && fields.mvt.valid
            && fields.checked.valid
        ) {
            setIsFormValid(true)
        } else {
            setIsFormValid(false)
        }
    }

    /**
     * 
     * @param {Date} newDate
     */
    const handleDateChange = (newDate) => {
        setIsDatePickerOpen(!isDatePickerOpen)
        setStartDate(newDate)
        const newFields = { ...fields }
        newFields.date.value = newDate
        setFields({ ...newFields })
    }

    return (
        <Validation
            show={true}
            onClose={handleClose}
            icon={<BsBank />}
            title={"Mouvement de banque"}
            style={{ '--modal-outline-color': `var(--bs-light` }}
            color={"light"}
            callback={updateDatas}
            isButtonDisabled={!isFormValid}
        >
            <Form >
                <Form.Group className="mb-3" >
                    <Form.Label >Libellé :</Form.Label>
                    <Form.Control
                        id="label"
                        className={
                            `input-control 
                            ${fields.label.valid === null ? "" : fields.label.valid ? "is-valid" : "is-invalid"}
                                    `
                        }
                        placeholder="Libellé du mouvement"
                        value={fields.label.value}
                        onChange={handleChange}
                        minLength={5}
                        maxLength={255}
                        required
                        autoFocus
                    />
                </Form.Group>

                <Row className="mb3">

                    <Form.Group as={Col} className="mb-3 col-lg-3" >
                        <Form.Label >Date :</Form.Label>
                        <Button
                            size="lg"
                            className="btn-date"
                            variant="success"
                            onClick={handleButtonDateClick}
                        >
                            {startDate.toLocaleDateString()}
                        </Button>
                        {isDatePickerOpen && (
                            <CalendarContainer className="date-picker" >
                                <ReactDatePicker
                                    locale={fr}
                                    dateFormat={"dd/MM/yyyy"}
                                    selected={startDate}
                                    onChange={handleDateChange}
                                    inline
                                />
                            </CalendarContainer>

                        )}
                    </Form.Group>

                    <Form.Group as={Col} className="mb-3 col-lg-3" >
                        <Form.Label >Type :</Form.Label>
                        <Form.Control
                            id="type"
                            label="Type du mouvement"
                            className={`input-control
                                    ${fields.type.valid === null ? "" : fields.type.valid ? "is-valid" : "is-invalid"}
                                    `}
                            placeholder="Type du mouvement"
                            value={fields.type.value}
                            onChange={handleChange}
                            pattern={"alpha_num"}
                            maxLength={5}

                        />

                    </Form.Group>

                    <Form.Group as={Col} className="mb-3  col-lg-6 col-8" >
                        <InputMvt mvt={fields.mvt} handleChange={handleChange} />
                    </Form.Group>

                    <Form.Group as={Col} className="mb-3 col-3" >
                        <Form.Label>Vérifié :</Form.Label>
                        <Form.Check
                            id="checked"
                            type="switch"
                            value={fields.checked.value}
                            checked={fields.checked.value === "true"}
                            onChange={handleChange}
                        />
                    </Form.Group>

                </Row>

            </Form>
        </Validation>
    )
}

export default FormBankItem