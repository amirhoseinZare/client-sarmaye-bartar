// packages
import { useState, useEffect, useMemo } from "react";
import { Col, Row, message, Modal, Tag } from "antd";
import styled from "styled-components";

// redux
import { useDispatch, useSelector } from "react-redux";
import { setModal } from "../../redux/actions/modal";

// api
import { UsersApi } from "../../api/Users.api";

// components
import CustomeTable from "../../comps/CustomeTable";
import Edit from "./comps/edit";
import AddUsers from "./comps/add";
import Navbar from "../../comps/Navbar";
// import Filter from "./comps/filters";

// style file
import classes from "./style.module.scss";
import "./customAntd.scss";

// icons
import { IoInfiniteSharp } from "react-icons/io5";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import {
  AiFillCheckCircle,
  AiFillCloseCircle,
  AiOutlineUserAdd,
} from "react-icons/ai";
import { MdContentCopy, MdDelete } from "react-icons/md";
import { BiEdit } from "react-icons/bi";

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
`;

let copyText = (text) => {
  navigator.clipboard.writeText(text);
  message.success("کپی با موفقیت انجام شد.");
};

function Categories() {
  let user = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const [state, setState] = useState({
    rows: [],
    totalCount: 10,
    loading: false,
  });

  useEffect(() => {
    console.log(state);
  }, [state]);

  const [filter, setFilter] = useState({
    pageNumber: 1,
    pageSize: 10,
  });

  const columns = useMemo(
    () => [
      {
        title: "نام",
        dataIndex: "display_name",
        key: "display_name",
        render: (name) => name || "-",
      },
      {
        title: "ایمیل",
        dataIndex: "user_email",
        key: "user_email",
        render: (email) => email || "-",
      },
      {
        title: "نام کاربری",
        dataIndex: "user_login",
        key: "user_login",
        render: (username) => username || "-",
      },
      {
        title: "Equity",
        dataIndex: "equity",
        key: "equity",
        render: (equity) => equity || "-",
      },
      {
        title: "بالانس",
        dataIndex: "balance",
        key: "balance",
        render: (balance) => balance || "-",
      },
      {
        title: "بالانس روز",
        dataIndex: "dayBalance",
        key: "dayBalance",
        render: (dayBalance) => dayBalance || "-",
      },
      {
        title: "بالانس اولیه",
        dataIndex: "firstBalance",
        key: "firstBalance",
        render: (firstBalance) => firstBalance || "-",
      },
      {
        title: "تعداد روز های مجاز ترید",
        dataIndex: "maxTradeDays",
        key: "maxTradeDays",
        render: (maxTradeDays) =>
          maxTradeDays || <IoInfiniteSharp className={classes.icons} />,
      },
      {
        title: "Profit Target Percent",
        dataIndex: "percentDays",
        key: "percentDays",
        render: (percentDays) =>
          percentDays || <IoInfiniteSharp className={classes.icons} />,
      },
      {
        title: "نامحدود",
        dataIndex: "infinitive",
        key: "infinitive",
        render: (infinitive) =>
          infinitive ? (
            <AiFillCheckCircle className={classes["check-icon"]} />
          ) : (
            <AiFillCloseCircle className={classes["close-icon"]} />
          ),
      },
      {
        title: "پلتفرم",
        dataIndex: "platform",
        key: "platform",
        render: (platform) => platform || "-",
      },
      {
        title: "نوع اکانت",
        dataIndex: "accountType",
        key: "accountType",
        render: (accountType) => accountType || "-",
      },
      {
        title: "نوع کاربر",
        dataIndex: "role",
        key: "role",
        render: (role) =>
          role === "admin" ? (
            <Tag color="cyan">ادمین</Tag>
          ) : (
            <Tag color="magenta">تریدر</Tag>
          ),
      },
      {
        title: "زمان ثبت نام",
        dataIndex: "user_registered",
        key: "user_registered",
        render: (user_registered) => user_registered || "-",
      },
      {
        title: "توکن",
        dataIndex: "mtAccessToken",
        key: "mtAccessToken",
        render: (mtAccessToken) =>
          mtAccessToken ? (
            <MdContentCopy
              className={classes.icons}
              style={{ color: "#38ada9" }}
              onClick={() => copyText(mtAccessToken)}
            />
          ) : (
            "-"
          ),
      },
      {
        title: "آیدی",
        dataIndex: "mtAccountId",
        key: "mtAccountId",
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
        title: "حذف",
        key: "delUser",
        render: (user) => (
          <MdDelete
            className={classes["close-icon"]}
            onClick={() => openDeleteModal(user)}
          />
        ),
      },
      {
        title: "ویرایش",
        key: "editUser",
        render: (user) => (
          <BiEdit
            style={{ color: "#f9ca24" }}
            className={classes["icons"]}
            onClick={() => openEditModal(user)}
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
  };

  const getUsersData = async () => {
    setState((s) => ({ ...s, loading: true }));

    let response = await UsersApi.all(filter.pageSize, filter.pageNumber);

    setState((s) => ({ ...s, loading: false }));

    if (!response.success) {
      message.error(response.message);
      return;
    } else {
      setState((s) => ({
        ...s,
        totalCount: response.result.items.length,
        rows: response.result.items,
      }));
    }
  };

  useEffect(() => {
    getUsersData();
  }, [filter]);

  const openEditModal = (data, step = 0) => {
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
            }}
          />
        ),
        closeCallback: () => {
          getUsersData();
        },
      })
    );
  };

  const openAddModal = (step = 0) => {
    dispatch(
      setModal({
        visible: true,
        title: "افزودن کاربر",
        width: 700,
        children: (
          <AddUsers
            closeModal={() => {
              dispatch(setModal({ visible: false }));
            }}
          />
        ),
        closeCallback: () => {
          getUsersData();
        },
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
          <h2>لیست کاربران</h2>
        </Col>
        <Col xs={23} sm={23} md={23} lg={23} xl={23}>
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
          <div className={classes["icon-box"]} onClick={openAddModal}>
            <AiOutlineUserAdd className={classes["add-user-icon"]} />
          </div>
        </Col>
      </StyledRow>
    </div>
  );
}

export default Categories;
