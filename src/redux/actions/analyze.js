import analyzeTypes from "../types/analyze"

const setAnalyze = (payload)=>({
    type: analyzeTypes.SET_ANALYZE,
    payload: payload
})



export { setAnalyze }