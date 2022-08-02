import defaultEmailTypes from "../types/defaultEmail"

const setDefaultEmail = (payload)=>({
    type: defaultEmailTypes.SET,
    payload: payload
})

export { setDefaultEmail }