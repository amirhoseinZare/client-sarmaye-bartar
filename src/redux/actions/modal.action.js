import modalTypes from "../types/modal.type";

const setModal = (modal) => ({
	type: modalTypes.SET_MODAL,
    payload:modal
});
export {setModal}