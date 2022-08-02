import { combineReducers } from "redux";
import loadingReducer from "./reducers/loading.reducer";
import authReducer from "./reducers/auth";
// import toastReducer from "./reducers/toast.reducer"
import modalReducer from "./reducers/modal";
// import confirmModalReducer from "./reducers/confirmModal.reducer";
import alertReducer from "./reducers/alert";
import defaultEmailReducer from "./reducers/defaultEmail"

const rootReducer = combineReducers({
  // toast:toastReducer,
  modal:modalReducer,
  // confirmModal:confirmModalReducer,
  loading: loadingReducer,
  user: authReducer,
  alert:alertReducer,
  defaultEmail:defaultEmailReducer
});

export default rootReducer;
