class manageToken{
    static createToken = async (value) => {
        localStorage.setItem('token', value)
    }
    
    static getToken = async () => {
        let token = localStorage.getItem('token')
        return token
    }

    static removeToken = async () => {
        localStorage.removeItem('token')
    }
    
}


export const getToken = async () => {
    return localStorage.getItem('token')
}
export default manageToken