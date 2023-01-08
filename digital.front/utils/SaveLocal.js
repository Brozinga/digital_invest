import { encryptData, decryptData } from "./Cryptography"

const SECRET = process.env.NEXT_PUBLIC_STORAGE_CRYPTO_SECRET

export const GetStorageType = () => {
    const STORAGE =
        String(process.env.NEXT_PUBLIC_STORAGE_TYPE).toLowerCase() == "localstorage" ?
            localStorage : sessionStorage;

    const CRYPTO_STORAGE =
        String(process.env.NEXT_PUBLIC_STORAGE_CRYPTO_TYPE).toLowerCase() == "localstorage" ?
            localStorage : sessionStorage;

    return {
        STORAGE,
        CRYPTO_STORAGE
    }
}

export const SaveLocalStorage = (item, name) => {
    const { STORAGE } = GetStorageType()
    STORAGE.setItem(JSON.stringify(item), name)
}

export const GetLocalStorage = (name) => {
    const { STORAGE } = GetStorageType()
    let item = STORAGE.getItem(name)

    if (item != null || item != undefined)
        return JSON.parse(item)
}

export const RemoveLocalStorage = (name) => {
    const { STORAGE } = GetStorageType()
    STORAGE.removeItem(name)
}

export const SaveEncryptLocalStorage = (item, name) => {
    const { CRYPTO_STORAGE } = GetStorageType()
    CRYPTO_STORAGE.setItem(name, encryptData(item, SECRET))
}

export const GetEncryptLocalStorage = (name) => {
    const { CRYPTO_STORAGE } = GetStorageType()
    let item = CRYPTO_STORAGE.getItem(name)

    if (item != null || item != undefined)
        return decryptData(item, SECRET)
}

export const RemoveEncryptLocalStorage = (name) => {
    const { CRYPTO_STORAGE } = GetStorageType()
    CRYPTO_STORAGE.removeItem(name)
}