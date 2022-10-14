import alertTypes from "../types/alert"

const setAlert = (alert)=>({
    type: alertTypes.ADD_ALERT,
    payload: alert
})

const readAlert = (alert)=>({
    type: alertTypes.READ_ALERT,
    payload: alert
})

export { 
    setAlert,
    readAlert
}