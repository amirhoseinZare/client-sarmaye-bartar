import modalTypes from "../types/modal";

const setModal = (modal) => ({
	type: modalTypes.SET_MODAL,
    payload:modal
});
export {setModal}