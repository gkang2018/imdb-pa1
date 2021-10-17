export const setToken = (token) => {
    if (token.token) {
        window.localStorage.setItem("token", token.token);
    }
}

export const getToken = () => {
    return window.localStorage.getItem("token");
}


export const deleteToken = () => {
    window.localStorage.setItem("token", "")
}