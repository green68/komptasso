import { useEffect } from "react";
import { useState } from "react";
import { Form, InputGroup, ToggleButton } from "react-bootstrap";
import { FaMinus, FaPlus } from "react-icons/fa";


const InputMvt = ({ mvt, handleChange }) => {

    const [checked, setChecked] = useState(Math.sign(mvt) === -1)

    const handleChangeValue = (e) => {
        const value = e.currentTarget.value
        e.currentTarget.value = checked ? "-" + value : value
        handleChange(e)
    }

    useEffect(() => {
        const value = mvt.value.replace("-", "")
        mvt.value = checked ? "-" + value : value
    }, [checked, mvt])

    const myClass = mvt.valid === null ? "" : mvt.valid ? "is-valid" : "is-invalid"
    const valueUnsign = mvt.value.replace("-", "")

    return (
        <>
            <Form.Label>Montant :</Form.Label>
            <InputGroup>
                <Form.Control
                    id="mvt"
                    className={`input-control ${myClass}`}
                    placeholder="Montant du mouvement"
                    value={valueUnsign}
                    onChange={handleChangeValue}
                    pattern={"float"}
                    required
                />
                <ToggleButton
                    style={{  minWidth: "2.5rem" }}
                    id="toggle-check"
                    type="checkbox"
                    variant={checked ? "danger" : "success"}
                    checked={checked}
                    value="1"
                    onChange={(e) => {setChecked(e.currentTarget.checked)}}
                    tabIndex="-1"
                >
                    {checked ? <FaMinus/> : <FaPlus/>}
                </ToggleButton>
            </InputGroup>
        </>
    )
}

export default InputMvt