import ConfirmModal from "../../comps/ConfirmModal";
import { useDispatch } from "react-redux";
import { setConfirmModal } from "../../redux/actions/confirmModal.action";

const Example = () => {
	const dispatch = useDispatch();
    const closeCallback = (data)=>{
        console.log(data);
    }
	return (
		<div>
			<button onClick={()=>dispatch(setConfirmModal({
				visible:true,
				title:"سلام کصکش",
				width:1000,
				closeCallback:()=>{
					console.log("bye");
				}
			}))}>show modal</button>
			<ConfirmModal onCloseCallback={closeCallback}>
				<p>صیک کن</p>
			</ConfirmModal>
		</div>
	);
};

export default Example;
