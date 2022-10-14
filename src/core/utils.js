import {
    AiOutlinePlus,
    AiOutlineEdit,
    AiOutlineDelete,
    AiOutlineFilter,
    AiOutlineAlert,
    AiOutlineCheckCircle,
    AiOutlineInfoCircle,
    AiOutlineExclamationCircle,
    AiOutlineCloseCircle
} from "react-icons/ai"

export const chooseIcon = (icon)=>{
    switch(icon) {
        case "add":
            return <AiOutlinePlus />;
        case "edit":
            return <AiOutlineEdit />;
        case "delete":
            return <AiOutlineDelete />;
        case "filter":
            return <AiOutlineFilter />;
        case "success":
        case "ok":
            return <AiOutlineCheckCircle />;
        case "alert":
            return <AiOutlineAlert />;
        case "info":
            return <AiOutlineInfoCircle/>;
        case "warning":
            return <AiOutlineExclamationCircle/>;
        case "danger":
        case "error":
            return <AiOutlineCloseCircle/>;
        default :
            return icon;
    }
}