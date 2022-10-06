// @ts-check
import React from "react";
import { useState } from "react"
import { Alert, Button, Container } from "react-bootstrap";
import { FaPlus } from "react-icons/fa";
import { CashItem } from "../classes/CashItem";
import CashItemCard from "../components/CashItemCard";
import FormCashItem from "../components/Forms/FormCashItem";

/**
 * @param {{cashDatas: CashItem[], onChange: (datas: CashItem[]) => void}} props
 */
function CashPage({ cashDatas, onChange }) {

  const [cashItems, setCashItems] = useState(cashDatas.map(item => item))
  const [isFormCashShow, setIsFormCashShow] = useState(false)
  // eslint-disable-next-line
  const [cashItem, setCashItem] = useState(new CashItem())

  /** @param {React.MouseEvent<HTMLButtonElement, MouseEvent>} e */
  const handleAddCashItem = (e) => {
    setIsFormCashShow(true)
    console.log("CashPage : handleAddCashItem");
  }

  const handleCloseFormCashItem = () => {
    console.log("CashPage : handleCloseFormCashItem");
    setIsFormCashShow(false)
  }

  /** @param {CashItem} datas */
  const handleChange = (datas) => {
    const temp = [...cashItems]
    console.log("CashPage: handleChange");
    if (datas.id === -1) {
      console.log("CashPage: handleChange create new");
      datas.id = temp.length + 1
      const cashItem = new CashItem(datas)
      temp.push(cashItem)
      setCashItems(temp)
      onChange(temp)
    }
    setIsFormCashShow(false)
  }

  /**
   * 
   * @returns JSX.Element
   */
  const CashItemsList = () => {

    if (cashItems.length !== 0) {
      return (
        <>
          {cashItems.map(item => <CashItemCard key={item.id} datas={item} />)}
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
          <h2 className="text-center">Caisse</h2>

        </Container>
        <Container className="d-flex align-items-center justify-content-end " >
          <Button onClick={(e) => handleAddCashItem(e)} ><FaPlus /></Button>
        </Container>
      </Container>

      <Container className="my-3 overflow-hidden">
        <Container className="overflow-auto h-100 py-2">
          <CashItemsList />
        </Container>
      </Container>

      {isFormCashShow
        && <FormCashItem
          onClose={handleCloseFormCashItem}
          onChange={handleChange}
          datas={cashItem}
        />}

    </Container>

  )
}

export default CashPage