import { useEffect, useState } from "react";
import { Button, Col, FloatingLabel, Form, Modal, Row } from "react-bootstrap";
import ReactDatePicker, { CalendarContainer } from "react-datepicker";
import { FaPiggyBank } from "react-icons/fa";
import Validation from "../Validation";
import fr from "date-fns/locale/fr";
import { isInputValid } from "../../utilities/Functions";

const FormCashItem = ({ onClose, onChange }) => {

    const [startDate, setStartDate] = useState(new Date())
    const fieldsDatas = {
        id: { valid: null, value: -1 },
        date: { valid: true, value: startDate },
        label: { valid: null, value: "" },
        type: { valid: true, value: "" },
        folio: { valid: true, value: "" },
        mvt: { valid: null, value: "0.00" },
    }

    const [fields, setFields] = useState(fieldsDatas)
    // const [isShow, setisShow] = useState(true)
    const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
    const [isFormValid, setIsFormValid] = useState(false);

    const updateDatas = () => {
        console.log("updateDatas dans FormCashItem");
        debugger
        onChange({
            id: fields.id.value,
            date: fields.date.value,
            label: fields.label.value,
            type: fields.type.value,
            folio: fields.folio.value,
            mvt: fields.mvt.value,
        })
        // setisShow(false)
        // onClose()
        // navigate(pathTo(Menu.Home));
    }

    const handleClose = (e) => {
        console.log("handleClose dans FormCashItem");
        // setisShow(false)
        onClose()
    }


    const handleButtonDateClick = (e) => {
        // console.log(e)
        // debugger
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
        console.log(e.target.id, e.target.value, valid)
        setFields({
            ...fields,
            newFields
        })
        if (
            fields.label.valid
            && fields.date.valid
            && fields.folio.valid
            && fields.type.valid
            && fields.mvt.valid
        ) {
            setIsFormValid(true)
        } else {
            setIsFormValid(false)
        }
        // debugger
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
        <>
            {/* {console.log(`startDate: ${startDate}`)} */}
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
                            className={`input-control
                                    ${fields.label.valid === null ? "" : fields.label.valid ? "is-valid" : "is-invalid"}
                                    `}
                            placeholder="Libellé du mouvement"
                            value={fields.label.value}
                            onChange={handleChange}
                            pattern={"label"}
                            maxLength={80}
                            required

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
                    </Row>



                    <Row>
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
                                autoFocus={true}
                            />

                        </Form.Group>

                        <Form.Group as={Col} className="mb-3" >
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
                    </Row>

                </Form>
            </Validation>
        </>
    )
}

export default FormCashItem