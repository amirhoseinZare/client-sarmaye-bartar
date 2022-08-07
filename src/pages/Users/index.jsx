import { useState, useEffect, useMemo, useCallback } from "react";
import { Col, Row, message, Modal, Tag, Dropdown, Menu, ConfigProvider } from "antd";
import styled from "styled-components";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { setModal } from "../../redux/actions/modal";
import { UsersApi } from "../../api/Users.api";
import CustomeTable from "../../comps/CustomeTable";
import Edit from "./comps/edit";
import AddUsers from "./comps/add";
import Navbar from "../../comps/Navbar/Navbar";
import classes from "./style.module.scss";
import "./customAntd.scss";
import { ExclamationCircleOutlined } from "@ant-design/icons";
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
  let user = useSelector((state) => state.user);
  let navigate = useNavigate();
  const addUserDrawdownTracker = async (mtAccountId)=>{
    const call = await UsersApi.sendDrawdownTracker(mtAccountId)
    if(call.success){
      message.success(call.message)
      return
    }
    message.error(call.message)
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
        title: "نام",
        key: "display_name",
        dataIndex: "display_name",
        render: (name) => name || "-",
      },
      {
        title: "ایمیل",
        key: "user_email",
        dataIndex: "",
        render: ({user_email, accountEmail}) => user_email || accountEmail,
      },
      {
        title: "نام کاربری",
        key: "user_login",
        dataIndex: "user_login",
        render: (username) => username || "-",
      },
      {
        title: "بالانس اولیه",
        key: "firstBalance",
        dataIndex: "firstBalance",
        render: (firstBalance) => firstBalance || "-",
      },
      // {
      //   title: "تعداد روز های مجاز ترید",
      //   key: "maxTradeDays",
      //   dataIndex: "maxTradeDays",
      //   render: (maxTradeDays) =>
      //     maxTradeDays || <IoInfiniteSharp className={classes.icons} />,
      // },
      {
        title: "maxLossLimit",
        key: "maxLossLimit",
        dataIndex: "maxLossLimit",
      },
      // {
      //   title: "Profit Target Percent",
      //   key: "percentDays",
      //   dataIndex: "percentDays",
      //   render: (percentDays) =>
      //     percentDays || <IoInfiniteSharp className={classes.icons} />,
      // },
      // {
      //   title: "نامحدود",
      //   key: "infinitive",
      //   dataIndex: "infinitive",
      //   render: (infinitive) =>
      //     infinitive ? (
      //       <AiFillCheckCircle className={classes["check-icon"]} />
      //     ) : (
      //       <AiFillCloseCircle className={classes["close-icon"]} />
      //     ),
      // },
      {
        title: "پلتفرم",
        key: "platform",
        dataIndex: "platform",
        render: (platform) => platform || "-",
      },
      {
        title: "مرحله",
        key: "level",
        dataIndex: "level",
        render: (level) => displayAccountLevelsEnum[level] || "unkonwn",
      },
      {
        title: "نوع اکانت",
        key: "accountType",
        dataIndex: "accountType",
        render: (accountType) => accountType || "-",
      },
      {
        title: "نوع کاربر",
        key: "role",
        dataIndex: "role",
        render: (role) =>
          role === "admin" ? (
            <Tag color="cyan">ادمین</Tag>
          ) : (
            <Tag color="magenta">تریدر</Tag>
          ),
      },
      {
        title: "زمان ثبت نام",
        key: "user_registered",
        dataIndex: "user_registered",
        render: (user_registered) => user_registered || "-",
      },
    
      {
        title: "آیدی",
        key: "mtAccountId",
        dataIndex: "mtAccountId",
        render: (mtAccountId) =>
          mtAccountId ? (
            <MdContentCopy
              className={classes.icons}
              style={{ color: "#38ada9" }}
              onClick={() => copyText(mtAccountId)}
            />
          ) : (
            "-"
          ),
      },
     
      {
        title:"drawdown id",
        key: "trackerId",
        render: ({trackerId, mtAccountId}) => {
          return trackerId ? (
            <MdContentCopy
              className={classes.icons}
              style={{ color: "#38ada9" }}
              onClick={() => copyText(trackerId)}
            />
          ) : (
            <span onClick={() => addUserDrawdownTracker(mtAccountId)}><IoIosAddCircleOutline className={classes.icons}  /></span>
          )
        }
        ,
      },
      {
        title: "حذف",
        key: "delUser",
        render: (userDel) => (
          <MdDelete
            className={classes["close-icon"]}
            onClick={() => openDeleteModal(userDel)}
          />
        ),
      },
      {
        title: "ویرایش",
        key: "editUser",
        render: (userEdit) => {
          return (
            <BiEdit
              style={{ color: "#f9ca24" }}
              className={classes["icons"]}
              onClick={() => openEditModal(userEdit)}
            />
          );
        },
      },
      {
        title: "ورود به پنل کاربر",
        key: "loginToUserPanel",
        render: (userAdd) => (
          <AiFillEye
            style={{ color: "#16a085" }}
            className={classes["icons"]}
            onClick={() => {
              setUserId(userAdd._id);
              navigate("/dashboard");
            }}
          />
        ),
      },
      // {
      //   title:"add account",
      //   key:"add account",
      //   render:(record)=>{
      //     return <span onClick={()=>openAddModal(0, record.user_email)}>
      //       <AiOutlineUserAdd 
      //         className={classes["icons"]}
      //       />
      //     </span>
      //   }
      // }
    ],
    [state.rows]
  );

  const handleTableChange = ({ current, pageSize }, filters, sorter) => {
    setFilter((s) => ({
      ...s,
      pageNumber: current,
      pageSize,
    }));
  };

  const setUserId = (id) => {
    localStorage.setItem(USER_ID_KEY, id);
  };

  const getUsersData = async () => {
    setState((s) => ({ ...s, loading: true }));

    let response = await UsersApi.all(
      filter.pageSize,
      filter.pageNumber,
      filter.user_email
    );

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

  useEffect(() => {
    getUsersData();
  }, [filter]);

  const openEditModal = (data, step = 0) => {
    console.log(data);
    dispatch(
      setModal({
        visible: true,
        title: "ویرایش",
        width: 700,
        children: (
          <Edit
            data={data}
            step={step}
            closeModal={() => {
              dispatch(setModal({ visible: false }));
              getUsersData();
            }}
          />
        ),
        closeCallback: () => {
          getUsersData();
        },
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
        let response = await UsersApi.delUser(data._id);
        if (response.success) {
          message.success(response.message);
          getUsersData();
        } else {
          message.error(response.message);
          getUsersData();
        }
      },
      onCancel() {},
    });
  };

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
          <h2>Users</h2>
        </Col>
        <Col xs={23} sm={23} md={23} lg={23} xl={23}>
          <Filters setFilter={setFilter} filter={filter} />
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
