import { Routes, Route } from "react-router-dom";

/*=== components  */
import ButtonExample from "../../examples/button";
import TableExample from "../../examples/table";
import SelectboxExample from "../../examples/selectbox"
import DatepickerExample from "../../examples/datepicker"
import ToastExample from "../../examples/toast"
import ModalExample from "../../examples/modal"
import ConfirmModalExample from "../../examples/confirmModal"
import RetryExample from "../../examples/retry";
import Retry from "../../comps/Retry";
const Home = ()=>{
    return <div>
        <Retry>
        <Routes>
            <Route path="table" element={<TableExample />} />
            <Route path="button" element={<ButtonExample />} />
            <Route path="selectbox" element={<SelectboxExample />} />
            <Route path="datepicker" element={<DatepickerExample />} />
            <Route path="toast" element={<ToastExample />} />
            <Route path="modal" element={<ModalExample />} />
            <Route path="confirmModal" element={<ConfirmModalExample />} />
            <Route path="retry" element={<RetryExample />} />
        </Routes>
        </Retry>
    </div>
}

export default Home