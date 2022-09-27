import { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import ReactDatePicker, { CalendarContainer } from "react-datepicker";
import { BsBank } from "react-icons/bs";
import Validation from "../Validation";
import fr from "date-fns/locale/fr";
import { isInputValid } from "../../utilities/Functions";

const FormBankItem = ({ onClose, onChange, datas }) => {

    // console.log(datas);
    const fieldsDatas = { ...datas }

    const [fields, setFields] = useState(fieldsDatas)
    const [startDate, setStartDate] = useState(fields.date.value)
    const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
    const [isFormValid, setIsFormValid] = useState(false);

    const updateDatas = () => {
        console.log("updateDatas dans FormBankItem");
        onChange({
            id: fields.id.value,
            date: fields.date.value,
            label: fields.label.value.trim(),
            type: fields.type.value,
            cheque: fields.cheque.value,
            folio: fields.folio.value,
            mvt: fields.mvt.value,
            checked: fields.checked.value
        })
    }

    const handleClose = (e) => {
        console.log("handleClose dans FormBankItem");
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
        // console.log(e.target.id, e.target.value, valid)
        setFields({
            ...fields,
            newFields
        })
        if (
            fields.label.valid
            && fields.date.valid
            && fields.folio.valid
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

    const handleDateChange = (e) => {
        setIsDatePickerOpen(!isDatePickerOpen)
        setStartDate(e)
        const newFields = { ...fields }
        newFields.date.value = startDate
        setFields({
            ...fields,
            newFields
        })
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

                    <Form.Group as={Col} className="mb-3" >
                        <Form.Label >Date :</Form.Label>
                        <Button
                            size="lg"
                            className="btn-date"
                            variant="success"
                            onClick={handleButtonDateClick}
                        >
                            {/* {console.log(startDate.toLocaleDateString())} */}
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

                    <Form.Group as={Col} className="mb-3" >
                        <Form.Label >Folio :</Form.Label>
                        <Form.Control
                            id="folio"
                            className={`input-control
                                ${fields.folio.valid === null ? "" : fields.folio.valid ? "is-valid" : "is-invalid"}
                                `}
                            placeholder="Folio du mouvement"
                            value={fields.folio.value}
                            onChange={handleChange}
                            pattern={"alpha_num"}
                            maxLength={5}
                        />
                    </Form.Group>

                    <Form.Group as={Col} className="mb-3" >
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

                </Row>



                <Row>

                    <Form.Group as={Col} className="mb-3 col-9" >
                        <Form.Label>Montant :</Form.Label>
                        <Form.Control
                            id="mvt"
                            className={`input-control
                                ${fields.mvt.valid === null ? "" : fields.mvt.valid ? "is-valid" : "is-invalid"}
                                `}
                            placeholder="Montant du mouvement"
                            value={fields.mvt.value}
                            onChange={handleChange}
                            pattern={"float"}
                            required
                        />
                    </Form.Group>

                    <Form.Group as={Col} className="mb-3" >
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