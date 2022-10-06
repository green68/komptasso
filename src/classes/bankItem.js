// @ts-check

/**
 * @typedef {Object} BankItemObject
 * @property {string|number} id
 * @property {Date|string} date
 * @property {string} label
 * @property {string} type
 * @property {string} mvt
 * @property {string} cheque
 * @property {string} checked
 */

/** @type BankItemObject */
const initDatas = {
    "id": -1,
    "date": new Date(),
    "label": "",
    "type": "",
    "cheque": "",
    "mvt": "",
    "checked": "false"
}

class BankItem {
    /**
     * 
     * @param {BankItemObject} datas 
     */
    constructor(datas = { ...initDatas }) {
        console.log("BankItem: constructor");
        this.id = datas.id || +initDatas.id
        this.date = new Date(datas.date) || new Date(initDatas.date)
        this.label = datas.label || initDatas.label
        this.type = datas.type || initDatas.type
        this.mvt = datas.mvt || initDatas.mvt
        this.cheque = datas.cheque || initDatas.cheque
        this.checked = datas.checked || initDatas.checked
    }
    getMvt() {
        return isNaN(parseFloat(this.mvt)) ? "0.00" : parseFloat(this.mvt).toFixed(2)
    }
    getMvtEuro() {
        return isNaN(parseFloat(this.mvt)) ? "0.00 €" : parseFloat(this.mvt).toFixed(2) + " €"
    }
    getDate() {
        return this.date
    }
    getType() {
        const len = 6
        return this.type.substring(0, len).padEnd(len, " ").toUpperCase()
    }
    getFolio() {
        return `B-${this.date.getFullYear()}-${this.id.toString().padStart(3, "0")}`
    }
    getChecked() {
        return this.checked
    }
    isChecked() {
        return this.checked === "true"
    }

}

export { BankItem }