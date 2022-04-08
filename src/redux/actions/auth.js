import authTypes from "../types/auth"

const setAuth = (auth)=>({
    type: authTypes.SET_AUTH,
    payload: auth
})

export { setAuth }