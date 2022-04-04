import modalTypes from "../types/confirmModal.type";

const INITIAL_STATE = {
	visible: false,
	title: "",
	width:500,
	closeCallback:null,
};

const confirmModalReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case modalTypes.SET_CONFIRMMODAL: {
			const { visible, title,width,closeCallback } = action.payload;

			return {
				visible: visible,
				title: title,
				width:width,
				closeCallback:closeCallback
			};
		}
		default:
			return state;
	}
};

export default confirmModalReducer;
