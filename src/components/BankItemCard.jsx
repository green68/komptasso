// @ts-check
import React from "react"
// eslint-disable-next-line
import { BankItem } from "../classes/BankItem"
import {  FaRegSquare, FaRegCheckSquare } from "react-icons/fa"
// import "./BankItemCard.css"

/**
 * @param {{datas: BankItem}} props
 */
const BankItemCard = ({ datas }) => {

    const color = Math.sign(parseFloat(datas.mvt)) === -1 ? "danger" : "success"
    const isChecked = datas.isChecked() 
    const checkedColor = isChecked ? "var(--bs-primary)" : ""

    return (
        <section className={`item-card item-card-${color}`} >
            <div className="bank item-card__title">
                <div>
                    {datas.getDate().toLocaleDateString()}
                </div>
                <div className="text-uppercase">
                    {datas.getFolio()}
                </div>
                <div className="text-uppercase">
                    {datas.type}
                </div>
                <div style={{marginLeft: "auto"}} >
                    {datas.getMvtEuro()}
                </div>
                <div className="d-flex align-items-center" style={{color: `${checkedColor}`}}>
                    {isChecked ? <FaRegCheckSquare/> : <FaRegSquare/>}
                </div>
            </div>
            <div className="item-card__body">
                <span className="text-truncate">
                    {datas.label}
                </span>
            </div>
        </section>
    )
}

export default BankItemCard