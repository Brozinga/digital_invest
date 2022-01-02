import { encryptData, decryptData } from "./Cryptography"

const SECRET = 'c1da54786b5111ec90d60242ac12000338975f0c77014ef18f6dc614617f01df'

export const SaveLocalStorage = (item, name) => {
    localStorage.setItem(JSON.stringify(item), name)
}

export const GetLocalStorage = (name) => {
    let item = localStorage.getItem(name)

    if (item != null || item != undefined)
        return JSON.parse(item)
}

export const RemoveLocalStorage = (name) => {
    localStorage.removeItem(name)
}

export const SaveEncryptLocalStorage = (item, name) => {
    localStorage.setItem(name, encryptData(item, SECRET))
}

export const GetEncryptLocalStorage = (name) => {
    let item = localStorage.getItem(name)

    if (item != null || item != undefined)
        return  decryptData(item, SECRET)
}

export const RemoveEncryptLocalStorage = (name) => {
    localStorage.remove(name)
}