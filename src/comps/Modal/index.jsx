import React from "react";
import { Modal } from "antd";
import { setModal } from "../../redux/actions/modal";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";

const StyledModal = styled(Modal)`
	.ant-modal-content {
		border-radius: 12px !important;
		overflow:hidden;
	}
`

const CustomeModal = ({ props }) => {
	const dispatch = useDispatch();
	const modalState = useSelector((state) => state.modal);
	const {
		visible = false,
		title = "",
		width=500,
		closeCallback=null,
		icon="",
		children=null
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
		<StyledModal title={title} visible={visible} afterClose={closeCallback} onCancel={closeModal} footer={null} width={width} {...props}>
			{children}
		</StyledModal>
	);
};

export default CustomeModal;
