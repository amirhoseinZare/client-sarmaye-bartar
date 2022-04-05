import authTypes from "../types/auth"

const setAuth = (auth)=>({
    type: authTypes,
    payload: auth
})

export { setAuth }