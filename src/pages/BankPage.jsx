// @ts-check
import React from "react"
import { useState } from "react"
import { Alert, Button, Container } from "react-bootstrap"
import { FaPlus } from "react-icons/fa"
import { BankItem } from "../classes/BankItem"
import BankItemCard from "../components/BankItemCard"
import FormBankItem from "../components/Forms/FormBankItem"

/**
 * 
 * @param {{bankDatas: BankItem[], onChange: (datas: BankItem[]) => void}} props
 * @returns 
 */
function BankPage({ bankDatas, onChange }) {

  const [bankItems, setBankItems] = useState(bankDatas.map(item => item))
  
  const [isFormBankShow, setIsFormBankShow] = useState(false)
  // eslint-disable-next-line
  const [bankItem, setBankItem] = useState(new BankItem())


  /** @param {React.MouseEvent<HTMLButtonElement, MouseEvent>} e */
  const handleAddBankItem = (e) => {
    setIsFormBankShow(true)
    console.log("BankPage : handleAddBankItem");
  }

  const handleCloseFormBankItem = () => {
    console.log("BankPage : handleCloseFormBankItem");
    setIsFormBankShow(false)
  }

  /** @param {bankItem} datas */
  const handleChange = (datas) => {
    const temp = [...bankItems]
    console.log("BankPage : handleChange");
    if (datas.id === -1) {
      console.log("BankPage: handleChange create new");
      datas.id = temp.length + 1
      const bankItem = new BankItem(datas)
      temp.push(bankItem)
      setBankItems(temp)
      onChange(temp)
    }
    setIsFormBankShow(false)
  }


  const BankItemsList = () => {

    if (bankItems.length !== 0) {
      return (
        <>
          {bankItems.map(item => <BankItemCard key={item.id} datas={item} />)}
        </>
      )
    }
    return (
        <Alert variant="warning">Pas de données disponible</Alert>
    )
  }

  return (
    <Container className="d-grid overflow-hidden h-100" style={{ gridTemplateRows: "auto 1fr" }}>

      <Container className="d-flex justify-content-between p-3">
        <Container></Container>
        <Container>
          <h2 className="text-center">Banque</h2>

        </Container>
        <Container className="d-flex align-items-center justify-content-end " >
          <Button onClick={(e) => handleAddBankItem(e) } >
            <FaPlus />
          </Button>
        </Container>
      </Container>

      <Container className="my-3 overflow-hidden">
        <Container className="overflow-auto h-100 py-2">
          <BankItemsList />
        </Container>
      </Container>

      {isFormBankShow
        && <FormBankItem
          onClose={ handleCloseFormBankItem }
          onChange={ handleChange }
          datas={ bankItem }
        />}

    </Container>

  )
}

export default BankPage