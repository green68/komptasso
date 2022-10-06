// @ts-check

/**
 * @typedef {Object} CashItemObject
 * @property {string|number} id
 * @property {Date|string} date
 * @property {string} label
 * @property {string} type
 * @property {string} mvt
 * 
 */

/** @type CashItemObject */
const initDatas = {
    "id": -1,
    "date": new Date(),
    "label": "",
    "type": "",
    "mvt": "",
}

class CashItem {
    /**
     * 
     * @param {CashItemObject} datas 
     */
    constructor(datas = { ...initDatas }) {
        console.log("CashItem: constructor");
        this.id = datas.id || initDatas.id
        this.date = new Date(datas.date) || new Date(initDatas.date)
        this.label = datas.label || initDatas.label
        this.type = datas.type || initDatas.type
        this.mvt = datas.mvt || initDatas.mvt
    }
    /**
     * 
     * @returns {string} String representation of mvt
     * @example "123.00", "-0.01"
     */
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
        return this.type.substring(0,len).padEnd(len," ").toUpperCase()
    }
    getFolio() {
        // if (this.id === -1) return this.folio
        return `C-${this.date.getFullYear()}-${this.id.toString().padStart(3,"0")}`
    }

}

export { CashItem }