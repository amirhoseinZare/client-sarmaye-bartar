import authTypes from "../types/auth";

const INITIAL_STATE = {
    name:"",
    familyName:"",
    nationalCode:"",
    email:"",
};

const authReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case authTypes.SET_AUTH:{
        const { name, familyName, nationalCode, email } = action.payload;

        return { 
            ...state, name, familyName, nationalCode, email
        };
    }
    default:
      return state;
  }
};

export default authReducer;