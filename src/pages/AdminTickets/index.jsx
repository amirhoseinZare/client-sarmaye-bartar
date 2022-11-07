import { useState, useEffect, useMemo } from "react";
import { Col, Row, message, Modal, Tag } from "antd";
import styled from "styled-components";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { setModal } from "../../redux/actions/modal";
import { TicketApi } from "../../api/index";
import CustomeTable from "../../comps/CustomeTable";
import Edit from "./comps/edit";
import AddUsers from "./comps/add";
import Navbar from "../../comps/Navbar/Navbar";
import classes from "./style.module.scss";
import "./customAntd.scss";
import { ExclamationCircleOutlined, CheckCircleTwoTone, CloseCircleTwoTone, UnorderedListOutlined } from "@ant-design/icons";
import { AiOutlineUserAdd, AiFillEye } from "react-icons/ai";
import { MdContentCopy, MdDelete } from "react-icons/md";
import { BiEdit } from "react-icons/bi";
import { USER_ID_KEY } from "../../core/variables.core";
import Filters from "./comps/filters";
import Ranking from "../../comps/Ranking/Ranking";
import { IoIosAddCircleOutline } from "react-icons/io"
import { displayAccountLevelsEnum } from "../../core/enums"
import { setDefaultEmail } from "../../redux/actions/defaultEmail"
import MenuLayout from "../../layouts/Menu"
import { useSearchParams } from "react-router-dom";
import Details from './comps/details'

/*
  <CheckCircleTwoTone />
*/
const { confirm } = Modal;

const StyledRow = styled(Row)`
  display: flex;
  justify-content: center;
  padding-top: 16px;
  h2 {
    font-size: 13px;
  }
  .icon-button {
    cursor: pointer;
  }
  .tag {
    border-radius: 12px;
  }
  width:calc(100% - 180px);
`;

let copyText = (text) => {
  navigator.clipboard.writeText(text);
  message.success("کپی با موفقیت انجام شد.");
};

function Categories() {
  let [searchParams, setSearchParams] = useSearchParams();
  let user = useSelector((state) => state.user);
  let navigate = useNavigate();
  const addUserDrawdownTracker = async (mtAccountId)=>{
    // const call = await UsersApi.sendDrawdownTracker(mtAccountId)
    // if(call.success){
    //   message.success(call.message)
    //   return
    // }
    // message.error(call.message)
  }
  const dispatch = useDispatch();
  const [state, setState] = useState({
    rows: [],
    totalCount: 10,
    loading: false,
  });

  const [filter, setFilter] = useState({
    pageNumber: 1,
    pageSize: 10,
  });

  const columns = useMemo(
    () => [
      {
        title: "عنوان",
        key: "title",
        dataIndex: "title",
        render: (title) => title || "-",
      },
      {
        title: "description",
        key: "description",
        dataIndex: "description",
        render: (description) => description || "-",
      },    
      {
        title: "status",
        key: "status",
        dataIndex: "status",
        render: (status) => status  || '-',
      },
      {
        title: "isReply",
        key: "isReply",
        dataIndex: "isReply",
        render: (isReply) => isReply ? <CheckCircleTwoTone twoToneColor="#52c41a"/> : <CloseCircleTwoTone twoToneColor="#eb2f96"/>,
      },
    
      {
        title: "createdAt",
        key: "createdAt",
        dataIndex: "createdAt",
        render: (createdAt) => createdAt,
      },

      {
        title: "details",
        key: "details",
        dataIndex: "details",
        render: (createdAt) => <UnorderedListOutlined onClick={()=>openDetailModal()}/> ,
      },

      {
        title: "ورود به پنل کاربر",
        key: "accountId",
        dataIndex: "accountId",
        render: (accountId) => (
          <AiFillEye
            style={{ color: "#16a085" }}
            className={classes["icons"]}
            onClick={() => {
              setUserId(accountId._id);
              navigate("/dashboard");
            }}
          />
        ),
      },
    ],
    [state.rows]
  );

  const handleTableChange = ({ current, pageSize }, filters, sorter) => {
    setFilter((s) => ({
      ...s,
      pageNumber: current,
      pageSize,
    }));
    setPageSearchParams({...filter, pageNumber: current,
      pageSize,})
  };

  const setUserId = (id) => {
    localStorage.setItem(USER_ID_KEY, id);
  };

  const getUsersData = async () => {
    setState((s) => ({ ...s, loading: true }));
    let response = await TicketApi.getTickets(filter);
    setState((s) => ({ ...s, loading: false }));

    if (!response.success) {
      message.error(response.message);
      return;
    } else {
      setState((s) => ({
        ...s,
        totalCount: response.result.totalCount,
        rows: response.result.items,
      }));
    }
  };

  const setPageSearchParams = (filter)=>{
    const sanitizedFilters = Object.keys(filter).reduce((acc, cv) => {
      if(filter[cv])
        return { ...acc, [cv]:filter[cv] }
      return { ...acc }
    }, {}) 
    setSearchParams(sanitizedFilters);
  }

  useEffect(() => {
    getUsersData();
    
  }, [filter]);

  const openDetailModal = (data, step = 0) => {
    dispatch(
      setModal({
        visible: true,
        title: "",
        width: 700,
        children: <Details/>,
        // closeCallback: () => {
        //   getUsersData();
        // },
      })
    );
  };

  const openAddModal = (step = 0, defaultEmail="") => {
    dispatch(
      setDefaultEmail(defaultEmail)
    )
    dispatch(
      setModal({
        visible: true,
        title: "افزودن کاربر",
        width: 700,
        children: (
          <AddUsers
            email={defaultEmail}
            closeModal={() => {
              dispatch(setModal({ visible: false }));
              getUsersData();
            }}
          />
        ),
        closeCallback: () => {
          getUsersData();
        }
      })
    );
  };

  const openDeleteModal = (data) => {
    confirm({
      title: <span style={{ color: "#eb4d4b" }}>حذف کاربر</span>,
      content: `کاربر "${data.display_name}" حذف شود؟`,
      icon: <ExclamationCircleOutlined />,
      okText: "بله",
      okType: "danger",
      cancelText: "خیر",
      async onOk() {
        // let response = await UsersApi.delUser(data._id);
        // if (response.success) {
        //   message.success(response.message);
        //   getUsersData();
        // } else {
        //   message.error(response.message);
        //   getUsersData();
        // }
      },
      onCancel() {},
    });
  };

  useEffect(()=>{
    try {
      const urlFilters = JSON.parse('{"' + decodeURI(window.location.search.replace("?", "").replace(/&/g, "\",\"").replace(/=/g,"\":\"")) + '"}')
      const { pageNumber, pageSize, ...others } = urlFilters
      setFilter(s=>({...s, pageNumber:+pageNumber, pageSize:+pageSize,  ...others}))  
    }
    catch(err){
      console.log(err)
    }
  }, [])

  return (
    <div className={classes.users}>
      <Navbar name={user?.display_name} />
      <StyledRow>
        {/* <Filter setFilter={setFilter} filter={filter} search={getUsersData} /> */}
        <Col
          xs={22}
          sm={22}
          md={22}
          lg={22}
          xl={22}
          className={classes.titleBox}
        >
          <h2>Tickets</h2>
        </Col>
        <Col xs={23} sm={23} md={23} lg={23} xl={23}>
          {/* <Filters setFilter={setFilter} setPageSearchParams={setPageSearchParams} filter={filter} /> */}
          <CustomeTable
            columns={columns}
            rows={state.rows}
            pagination={{
              current: filter.pageNumber,
              pageSize: filter.pageSize,
              total: state.totalCount,
              position: ["bottomRight"],
            }}
            onChange={handleTableChange}
            loading={state.loading}
          />
        </Col>
        <Col xs={23} sm={23} md={23} lg={23} xl={23}>
          <div className={classes["icon-box"]} onClick={()=>openAddModal(0, "")}>
            <AiOutlineUserAdd className={classes["add-user-icon"]} />
          </div>
        </Col>
        <Col
          xs={22}
          sm={22}
          md={22}
          lg={22}
          xl={22}
          className={classes.titleBox}
        >
          <h2 style={{ marginTop: "100px" }}>برترین کاربران</h2>
        </Col>
        <Col xs={23} sm={23} md={23} lg={23} xl={23}>
          <Ranking />
        </Col>
      </StyledRow>
      <MenuLayout />

    </div>
  );
}

export default Categories;
