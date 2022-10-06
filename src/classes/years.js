// @ts-check
import { Year } from "./Year"

class Years{
    /**
     * @constructor
     * @param {Array<Year>} datas An Array of Year or [] 
     */
    constructor(datas = []){
        this.datas = datas.map(year => {
            if (!(year instanceof Year)) {
                year = new Year(year)
            }
            return year
        })
        this.datas = this.datas.sort((a,b) => a.id - b.id)
    }
    /**
     * 
     * @returns {Year|null} The last Year or null
     */
    getLast() {
        const year = this.datas[this.datas.length - 1]
        return year
    }
    /**
     * 
     * @param {number} id 
     * @returns {Year|null} The Year that have this id or null
     */
    getYear(id) {
        return this.datas.find(y => y.id === id) || null
    }
    
    toJSON() {
        return this.datas
    }

}

export { Years }