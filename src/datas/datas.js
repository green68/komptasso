import { User } from "../classes/User";
import { downloadFile } from "../utilities/Functions";

class Datas {
    constructor() {
        this.user = new User({})
    }
    setUserFromJSON(datas = {}) {
        this.user = new User(datas)
    }
    getUser() {
        return this.user
    }
    getUserFromLocale() {
        this.user = new User(localStorage.getItem('user'))
    }
    saveToLocale(user = null) {
        if(user) this.user = user
        const userString = JSON.stringify(this.user)
        
        localStorage.setItem('user', userString)
    }
    saveToFile(filename = null) {
        if(!filename) {
            const date = (new Date()).toLocaleString('fr-FR').replace(/[/:\s]/ig,'-')
            filename = `kompta-${date}.json`
            console.log(`sauvegarde fichier : ${filename}`);
        }
      
        const datas = JSON.stringify(this.user, null, 3)
        downloadFile(datas, filename, 'text/plain');
    }
    isLocale() {
        const resp = localStorage.getItem('user') ? true : false
        return resp
    }
}

const DatasClass = new Datas()

export {
    DatasClass
}
