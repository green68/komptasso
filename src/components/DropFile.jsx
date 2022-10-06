import { useState } from "react"
import { Form } from "react-bootstrap";
import "./DropFile.css"

/**
 * 
 * @param {{handleDatas: (datas: JSON) => }} props
 * @returns 
 */
const DropFile = ({handleDatas}) => {

  const [fileInput, setFileInput] = useState(null)

  /**
   * 
   * @param {Event} e 
   */
  const handleFileInput = (e) => {
    // console.log(e.target.files[0]);
    if (e.target.files.length > 0) {
      setFileInput(e.target.files[0].name)
      const reader = new FileReader()
      reader.onload = onReaderLoad
      reader.readAsText(e.target.files[0])

    }
  }

  /**
   * 
   * @param {ProgressEvent} e 
   */
  const onReaderLoad = (e) => {
    console.log(e.target.result)
    handleDatas(e.target.result)
  }

  return (

    <>
      <Form.Group controlId="formFile" className="d-flex w-100 justify-content-center">
        <Form.Label className="drop-zone" >
          {!fileInput ? 'Cliquez' : <>
            <div className="drop-zone__thumb" data-label={fileInput}></div>
          </>}
          <Form.Control 
            type="file" 
            className="drop-zone__input"
            onChange={handleFileInput}
          />
        </Form.Label>
      </Form.Group>

      {/* <label className="drop-zone">
        {fileInput ? fileInput : 'Click Me'}
        <input
          type={"file"}
          onChange={handleFileInput}
          style={{ display: "none" }}
        />

      </label> */}
    </>
  )
}

export default DropFile