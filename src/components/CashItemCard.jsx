// @ts-check
import React from "react";
import { CashItem } from "../classes/CashItem"
// TODO: put in App.css ?
import "./CashItemCard.css"

/**
 * @param {{datas: CashItem}} props
 */
const CashItemCard = ({ datas }) => {

    const color = Math.sign(parseFloat(datas.mvt)) === -1 ? "danger" : "success"

    return (
        <section className={`item-card item-card-${color}`} >
            <div className="item-card__title">
                <div >{ datas.getDate().toLocaleDateString() }</div>
                <div className="text-uppercase" >{datas.getFolio()}</div>
                <div className="text-uppercase">{datas.type}</div>
                <div style={{marginLeft: "auto"}} >{datas.getMvtEuro()}</div>
            </div>
            <div className="item-card__body">
                <span className="text-truncate">
                    {datas.label}
                </span>
            </div>
        </section>
    )
}

export default CashItemCard