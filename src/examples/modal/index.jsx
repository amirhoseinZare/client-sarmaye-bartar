import Modal1 from "../../comps/Modal";
import { useDispatch } from "react-redux";
import { setModal } from "../../redux/actions/modal.action";

const Example = () => {
	const dispatch = useDispatch();
	return (
		<div>
			<button onClick={()=>dispatch(setModal({
				visible:true,
				title:"سلام کصکش",
				width:1000,
				closeCallback:()=>{
					console.log("bye");
				}
			}))}>show modal</button>
			<Modal1>
				<p>صیک کن</p>
			</Modal1>
		</div>
	);
};

export default Example;
