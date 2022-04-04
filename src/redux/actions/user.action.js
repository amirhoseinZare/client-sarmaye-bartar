import userTypes from "../types/user.type"

const setUser = (user)=>({
    type: userTypes.SET_USER,
    payload: user
})

export { setUser }