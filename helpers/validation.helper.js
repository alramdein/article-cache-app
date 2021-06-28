const validation = {}

validation.isNull = (variable) => {
    if (variable) {
        return false 
    }
    return true
}

module.exports = validation