import React from "react";
import { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import ReactDatePicker, { CalendarContainer } from "react-datepicker";
import { FaPiggyBank } from "react-icons/fa";
import Validation from "../Validation";
import fr from "date-fns/locale/fr";
import { isInputValid } from "../../utilities/Functions";
import InputMvt from "../InputMvt";
// eslint-disable-next-line
import { CashItem } from "../../classes/CashItem";

/**
 * 
 * @param {{onClose: () => void, onChange: (datas: CashItem) => void, datas: cashItem|null}} props 
 */
const FormCashItem = ({ onClose, onChange, datas }) => {

    console.log(datas);
    const fieldsDatas = {
        id: { valid: null, value: datas.id },
        date: { valid: true, value: datas.date },
        label: { valid: null, value: datas.label },
        type: { valid: true, value: datas.type },
        mvt: { valid: null, value: datas.mvt },
    }

    const [fields, setFields] = useState(fieldsDatas)
    const [startDate, setStartDate] = useState(fields.date.value)
    const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
    const [isFormValid, setIsFormValid] = useState(false);

    const updateDatas = () => {
        console.log("FormCashItem: updateDatas");
        onChange({
            id: fields.id.value,
            date: fields.date.value,
            label: fields.label.value.trim(),
            type: fields.type.value,
            mvt: fields.mvt.value,
        })
    }

    const handleClose = (e) => {
        console.log("FormCashItem : handleClose");
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
        const newFields = { ...fields }
        newFields[e.target.id].value = e.target.value
        const valid = isInputValid(e.target)
        newFields[e.target.id].valid = valid
        setFields({ ...newFields })
        if (
            fields.label.valid
            && fields.date.valid
            && fields.type.valid
            && fields.mvt.valid
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
            icon={<FaPiggyBank />}
            title={"Mouvement de caisse"}
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
                            // size="lg"
                            className="btn-date"
                            variant="success"
                            onClick={handleButtonDateClick}
                        >
                            {console.log(startDate.toLocaleDateString())}
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

                    <Form.Group as={Col} className="mb-3 col-lg-3">
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
                            maxLength={6}
                        />

                    </Form.Group>

                    <Form.Group as={Col} className="mb-3 col-lg-6 col-12" >
                        <InputMvt mvt={fields.mvt} handleChange={handleChange} />
                    </Form.Group>

                </Row>

            </Form>
        </Validation>
    )
}

export default FormCashItem