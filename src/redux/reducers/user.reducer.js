import userTypes from "../types/user.type";

const INITIAL_STATE = {
    name:"",
    familyName:"",
    nationalCode:"",
    email:"",
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case userTypes.SET_USER:{
        const { name, familyName, nationalCode, email } = action.payload;

        return { 
            ...state, name, familyName, nationalCode, email
        };
    }
    default:
      return state;
  }
};

export default userReducer;