import { BankItem } from "./BankItem";
import { CashItem } from "./CashItem";

const initDatas = {
    "id": "2022",
    "bank_report": "0.00",
    "cash_report": "0.00",
    "bank_items": [],
    "cash_items": [],
}

class Year {
    constructor(datas = {}) {
        // TODO: revoir si structuredClone() à la place de Object.assign()
        Object.assign(initDatas, datas)
        Object.assign(this, initDatas)
        this.bank_items = this.bank_items.map(element => {
            element = new BankItem(element)
            return element
        });
        this.cash_items = this.cash_items.map(element => {
            element = new CashItem(element)
            return element
        });
    }
    getId() {
        return this.id
    }
    getBankItems() {
        return this.bank_items
    }
    getBankReport() {
        return isNaN(parseFloat(this.bank_report)) ? "0.00" : parseFloat(this.bank_report).toFixed(2)
    }
    getCashReport() {
        return isNaN(parseFloat(this.cash_report)) ? "0.00" : parseFloat(this.cash_report).toFixed(2)
    }
    getCash() {
        const cumul = this.cash_items.reduce((cumul, item) => cumul + (+item.getMvt()), +this.getCashReport())
        return cumul.toFixed(2)
    }
    getBank() {
        const cumul = this.bank_items.reduce((cumul, item) => cumul + (+item.getMvt()), +this.getBankReport())
        return cumul.toFixed(2)
    }
}

export { Year }