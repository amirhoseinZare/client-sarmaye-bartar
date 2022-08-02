import defaultEmailActionTypes from "../types/defaultEmail";

const INITIAL_STATE = ""

const loadingReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case defaultEmailActionTypes.SET:
        return action.payload;
      default:
        return state;
    }
  };
  
  export default loadingReducer;
  