export const localStorageWrapper = {
    getLocalStorageItem<Type>(key: string): Type | undefined{
        const value = localStorage.getItem(key)
        if(value){
            return JSON.parse(value)
        }
        else{
            return undefined
        }
    },
    setLocalStorageItem<Type>(key: string, value: Type | string | null | undefined){
        localStorage.setItem(key, JSON.stringify(value))
    }
}