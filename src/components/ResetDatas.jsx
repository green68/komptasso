import { useState } from "react";
import { FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { User } from "../classes/User";
import { pathTo } from "../utilities/Functions";
import { Menu } from "../utilities/Constantes";
import Validation from "./Validation";

/**
 * @param {{onClose: () => void, onReset: (user: User) => void}} props 
 * @returns 
 */
const ResetDatas = ({ onClose, onReset }) => {
    let navigate = useNavigate();

    const [isShow, setisShow] = useState(true)

    const resetDatas = () => {
        console.log("resetDatas");
        const newUser = new User()
        onReset(newUser)
        setisShow(false)
        onClose()
        navigate(pathTo(Menu.Home));
    }

    /**
     * 
     * @param {Event} e 
     */
    const handleClose = (e) => {
        console.log("handleClose dans ResetDatas");
        setisShow(false)
        onClose()
    }

    return (
        <>
            <Validation
                show={isShow}
                onClose={handleClose}
                icon={<FaTrash />}
                title={"Effacer les données"}
                color={"danger"}
                callback={resetDatas}
            >
                <p>Cette action effacera toutes les données.</p>
            </Validation>
        </>
    )
}

export { ResetDatas as default }