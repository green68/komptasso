// @ts-check
import React from "react"
import { useState } from "react"
import { Button } from "react-bootstrap"
import { FaFileExport, FaFileImport, FaTrash } from "react-icons/fa"
import DownloadDatas from "../components/DownloadDatas"
import ResetDatas from "../components/ResetDatas"
import UploadDatas from "../components/UploadDatas"
import "./ToolsPage.css"
// eslint-disable-next-line
import { User } from "../classes/User"

/**
 * @param {{handleUpdate: (user: User) => void}} props
 * @returns 
 */
const ToolsPage = ({ handleUpdate }) => {

  const [isShowSaveDatas, setIsShowSaveDatas] = useState(false)
  const [isShowResetDatas, setIsShowResetDatas] = useState(false)
  const [isShowUploadDatas, setIsShowUploadDatas] = useState(false)
  
  return (
    <>
      {isShowResetDatas && <ResetDatas onClose={() => setIsShowResetDatas(false)} onReset={(user) => handleUpdate(user)} />}
      {isShowUploadDatas && <UploadDatas onClose={() => setIsShowUploadDatas(false)} onUpload={(user) => handleUpdate(user)} />}
      {isShowSaveDatas && <DownloadDatas onClose={() => setIsShowSaveDatas(false)} />}
      
      <div className="tools p-3">
        <h1 className="text-center p-2">Outils</h1>
        <div className="container d-flex flex-column align-items-center p-2 gap-4" >
          
          <Button
            size="lg"
            variant={`outline-danger`}
            className="btn-menu btn-tools"
            onClick={(e) => {
              e.currentTarget.blur();
              setIsShowResetDatas(true)
            }}
          >
            {<FaTrash />}
            Effacer les données
          </Button>
          
          <Button
            size="lg"
            variant={`outline-danger`}
            className="btn-menu btn-tools"
            onClick={(e) => {
              e.currentTarget.blur();
              setIsShowUploadDatas(true)
            }}
          >
            {<FaFileImport />}
            Charger des données
          </Button>


          <Button
            size="lg"
            variant={`outline-success`}
            className="btn-menu btn-tools"
            onClick={(e) => {
              e.currentTarget.blur();
              setIsShowSaveDatas(true)
            }}
          >
            {<FaFileExport />}
            Enregistrer les données
          </Button>

        </div>
      </div>
    </>
  )
}

export default ToolsPage
