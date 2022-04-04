import toastTypes from "../types/toast.type"

const setToast = (toast)=>({
    type: toastTypes.SET_TOAST,
    payload: toast
})

export { setToast }