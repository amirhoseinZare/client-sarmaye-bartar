import React from "react";
import styled from "styled-components";
import error from "../../assets/error.png";
import { AiOutlineSync } from "react-icons/ai";
class Retry extends React.Component {
	constructor(props) {
		super(props);
		this.state = { hasError: false };
	}

	static getDerivedStateFromError(error) {
		return { hasError: true };
	}

	componentDidCatch(error, errorInfo) {
		console.log(error);
	}

	render() {
		if (this.state.hasError) {
			return (
				<Container>
					<ErrorImg src={error} />
					<Message>لطفا روی ایکون زیر کلیک کنید</Message>
					<Icon onClick={() => window.location.reload()} />
				</Container>
			);
		}

		return this.props.children;
	}
}

const Container = styled.div`
	display: flex;
	align-items: center;
	height: 100vh;
	flex-direction: column;
`;
const ErrorImg = styled.img`
	height: 600px;
	width: 600px;
`;
const Message = styled.h4``;

const Icon = styled(AiOutlineSync)`
	font-size: 30px;
	margin-top: 20px;
  cursor:pointer;
`;

export default Retry;
