const isJSON = datas => {
    try {
        JSON.parse(datas)
        return true
    } catch (error) {
        return false
    }
}

const Pathname = "komptasso/"
const pathTo = menu => Pathname + menu

const downloadFile = (content, fileName, contentType) => {
        var a = document.createElement("a");
        var file = new Blob([content], { type: contentType })
        a.target = '_blank'
        a.href = URL.createObjectURL(file);
        a.download = fileName;
        a.click();
    }

/**
 * 
 * @param {object} obj 
 * @returns {[[key, value]]} //TODO: ???
 */
const objectToArray = (obj) => {
    const datas = []
    for (const [key, value] of Object.entries(obj)) {
        datas.push([key, value])
    }
    return datas
}

const InputPatterns = {
    float: /^[+-]?\d+(\.\d{0,2})?$/i,
    // label:  /^([A-Za-z\d]{1})(([[A-Za-z\d]*|[-_' .]?]*)([A-Za-z\d.]{1}))*$/i,
    pseudo:  /^([a-zA-Z0-9-_]{5,25})$/i,
    alpha_num:  /^([a-zA-Z0-9]*)$/i,
}
/**
 * 
 * @param {HTMLElement} eventTarget 
 * @returns {boolean}
 */
const isInputValid = (eventTarget) => {
    if (eventTarget.minLength && eventTarget.value.trim().length < eventTarget.minLength) return false
    
    if(!eventTarget?.pattern) {

        console.log("Functions : isInputValid => no pattern for :",eventTarget.id);
        if(eventTarget.required && eventTarget.value.trim() === "") return false
        
        return true
    }

    let pattern = InputPatterns[eventTarget.pattern]
    if (pattern) {
        if (!pattern.test(eventTarget.value)) return false

        return true
    }

    // try {
    //     debugger
    //     pattern = new RegExp(eventTarget.pattern, "i")
    //     if (!pattern.test(eventTarget.value)) return false
        
    //     return true
        
    // } catch (error) {
    //     throw new Error("Pattern invalide pour :", eventTarget)
    // }
}
export {
    downloadFile,
    isInputValid,
    isJSON,
    objectToArray,
    pathTo
}