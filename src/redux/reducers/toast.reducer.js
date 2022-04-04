import ToastTypes from "../types/toast.type";

const INITIAL_STATE = {
  type:"success",
  timeout:3000,
  open:false,
  message:"",
  description:"",
  closeCallback:null,
  icon:null
};

const toastReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ToastTypes.SET_TOAST:{
        const { type, timeout, open, message, closeCallback, description, icon } = action.payload;

        return { 
            type:type||state.type, 
            timeout:timeout||state.timeout, 
            open:open,
            message:message||state.message, 
            description:description||state.description,
            closeCallback:closeCallback||state.closeCallback,
            icon:icon||state.icon
        };
    }
    default:
      return state;
  }
};

export default toastReducer;