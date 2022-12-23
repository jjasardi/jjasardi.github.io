function setInList(lst, idx, val) {
    let lstCopy = [...lst]
    lstCopy[idx] = val
    return lstCopy
}

function setInObj(obj, attr, val) {
    let objCopy = { ...obj }
    objCopy[attr] = val
    return objCopy
}

export { setInList, setInObj }