import { useState } from "react";
import { Container } from "react-bootstrap";
import { FaFileDownload, FaFileExport } from "react-icons/fa";
import { DatasClass } from "../datas/datas";
import Validation from "./Validation";

const DownloadDatas = ({onClose}) => {
    const [isShow, setisShow] = useState(true)

    const saveToFile = () => {
        console.log("saveDatas");
        DatasClass.saveToFile()
        setisShow(false)
        onClose()
    }

    const handleClose = (e) => {
        console.log("handleClose dans DownloadDatas");
        setisShow(false)
        onClose()
    }
    
    return (
        <>
            <Validation 
                show={isShow} 
                onClose={handleClose} 
                icon={<FaFileExport/>}
                title={"Enregistrer les données"}
                color={"success"}
                callback={saveToFile}
            >
                <Container className="d-flex">
                    <p>Cette action enregistrera les données actuelles dans un fichier au format JSON.</p>    

                </Container>
            </Validation>

        </>
    )
}

export { DownloadDatas as default }