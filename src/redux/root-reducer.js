import { combineReducers } from "redux";
import loadingReducer from "./reducers/loading.reducer";
import authReducer from "./reducers/auth";
// import toastReducer from "./reducers/toast.reducer"
// import modalReducer from "./reducers/modal.reducer";
// import confirmModalReducer from "./reducers/confirmModal.reducer";

const rootReducer = combineReducers({
  // toast:toastReducer,
  // modal:modalReducer,
  // confirmModal:confirmModalReducer,
  loading: loadingReducer,
  user: authReducer,
});

export default rootReducer;
