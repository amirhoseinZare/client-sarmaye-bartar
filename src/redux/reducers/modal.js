import modalTypes from "../types/modal";

const INITIAL_STATE = {
	visible: false,
	title: "",
	width:500,
	closeCallback:null,
	children:null,
	childProps:null
};

const modalReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case modalTypes.SET_MODAL: {
			const { visible, title,width,closeCallback, children, childProps } = action.payload;

			return {
				visible: visible,
				title: title,
				width:width,
				closeCallback:closeCallback,
				children:children,
				childProps:childProps
			};
		}
		default:
			return state;
	}
};

export default modalReducer;
