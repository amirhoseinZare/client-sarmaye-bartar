import modalTypes from "../types/confirmModal.type";

const setConfirmModal = (confirmModal) => ({
	type: modalTypes.SET_CONFIRMMODAL,
    payload:confirmModal
});
export {setConfirmModal}