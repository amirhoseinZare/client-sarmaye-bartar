import React from "react";
import { Modal } from "antd";
import { setModal } from "../../redux/actions/modal.action";
import { useSelector, useDispatch } from "react-redux";

const Modal1 = ({ children }) => {
	const dispatch = useDispatch();
	const modalState = useSelector((state) => state.modal);
	const {
		visible = false,
		title = "",
		width=500,
		closeCallback=null
	} = modalState;


	const closeModal = () => {
		dispatch(
			setModal({
				...modalState,
				visible: false,
			})
		);
	};

	return (
		<Modal title={title} visible={visible} afterClose={closeCallback} onCancel={closeModal} footer={null} width={width}  >
			{children}
		</Modal>
	);
};

export default Modal1;
