import React from "react";
import { Modal,ConfigProvider } from "antd";
import { setConfirmModal } from "../../redux/actions/confirmModal.action";
import { useSelector, useDispatch } from "react-redux";

const ConfirmModal = ({ children, onCloseCallback }) => {
	const dispatch = useDispatch();
	const cofirmModalState = useSelector((state) => state.confirmModal);
	const {
		visible = false,
		title = "",
		width = 500,
		closeCallback = null,
	} = cofirmModalState;

	const cancelModal = () => {
		dispatch(
			setConfirmModal({
				...cofirmModalState,
				visible: false,
			})
		);
		onCloseCallback(false);
	};
	const okModal = () => {
		dispatch(
			setConfirmModal({
				...cofirmModalState,
				visible: false,
			})
		);
		onCloseCallback(true);
	};

	return (
		<ConfigProvider direction="rtl">
			<Modal
				title={title}
				visible={visible}
				afterClose={closeCallback}
				cancelText="انصراف"
				okText="تایید"
				onCancel={cancelModal}
				onOk={okModal}
				width={width}>
				{children}
			</Modal>
		</ConfigProvider>
	);
};

export default ConfirmModal;
