import LoadingActionTypes from "../types/loading.type"

const startLoading = ()=>({
    type: LoadingActionTypes.START,
})

const endLoading = ()=>({
    type: LoadingActionTypes.END,
})

export { startLoading ,endLoading }