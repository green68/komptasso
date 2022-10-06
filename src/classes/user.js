// @ts-check
import { Years } from "./Years";
import { isJSON } from "../utilities/Functions";
// eslint-disable-next-line
import { Year } from "./Year";

/**
 * @typedef {Object} UserObject
 * @property {string|null} name
 * @property {Year[]} years
 */

/** @type UserObject */
const initUser = {
    "name": null,
    "years": []
}

class User {
    /** 
     * @param {UserObject} options 
     */
    constructor(options = initUser) {
        this.name = options.name || null
        this.years = new Years(options.years)
        
        if(isJSON(options)) {
            this.fromJSON(options)
        }
    }
    
    fromJSON(datas) {
        if (!isJSON(datas)) return

        datas = JSON.parse(datas)
        for (const [key, value] of Object.entries(datas)) {
            switch (key) {
                case "name":
                    if (value) {
                        this.name = value
                    } else {
                        this.name = null
                        console.log("create user: name not defined")
                    }
                    break;
                case "years":
                    if (value && Array.isArray(value)) {
                        this.years = new Years(value)
                    } else if(value && value instanceof Object) {
                        console.log("***object years");
                        this.years = new Years(value.datas)
                    } else {
                        throw new Error("create user: years must be an array")
                    }
                    break
                default:
                    this[key] = value
                    console.log(`new key ${key}: ${value}`);
                    break;
            }
        }
    }
    
    getYears() {
        return this.years
    }

    toJSON() {
        return {
            name: this.name,
            years: this.years.toJSON()
        };
    }

}

export { User }