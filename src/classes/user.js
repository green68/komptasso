import { Years } from "./years";
import { isJSON } from "../utilities/functions";


class User {
    constructor(options = {}) {
        this.name = options.name || null
        this.years = new Years(options.years)
        
        if(isJSON(options)) {
            this.fromJSON(options)
        }
    }
    
    fromJSON(datas) {
        if (!isJSON(datas)) return

        datas = JSON.parse(datas)
        // console.log("datas :",datas);
        // debugger
        for (const [key, value] of Object.entries(datas)) {
            // console.log(key);
            switch (key) {
                case "name":
                    if (value) {
                        this.name = value
                    } else {
                        throw new Error("create user: name not defined")
                    }
                    break;
                case "years":
                    // console.log(value);
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
                    // throw new Error("create user: key not valid")
                    break;
            }
        }
    }

    getLastYear() {
        // getLast() {
        console.log(this.years.length);
        return this.years[this.years.length - 1]
    }

    toJSON() {
        return {
            name: this.name,
            years: this.years.toJSON()
        };
    }

    // toString() {
    //     return "{pour test}"
    // }
}

export { User }