import { useState, useEffect, useMemo } from "react";
import { Col, Row, message, Modal } from "antd";
import styled from "styled-components";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { setModal } from "../../redux/actions/modal";
import { RequestApi } from "../../api/Request.api";
import CustomeTable from "../../comps/CustomeTable";
import Navbar from "../../comps/Navbar/Navbar";
import classes from "./style.module.scss";
import { AiFillEye } from "react-icons/ai";
import { BiEdit } from "react-icons/bi";
import { USER_ID_KEY } from "../../core/variables.core";
import Filters from "./comps/filters";
import MenuLayout from "../../layouts/Menu"
import Edit from "./comps/Edit"

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

function Requests() {
  let user = useSelector((state) => state.user);
  let navigate = useNavigate();
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
        title: "email",
        key: "user_email",
        dataIndex: "user_email",
        render: (user_email) => user_email || "-",
      },
      {
        title: "type",
        key: "type",
        dataIndex: "type",
        render: (type) => type || "-",
      },
      {
        title: "status",
        key: "status",
        dataIndex: "status",
        render: (status) => status || "-",
      },
      
      {
        title: "create time",
        key: "createdAt",
        dataIndex: "createdAt",
        render: (createdAt) => createdAt || "-",
      },
      {
        title: "update",
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
        title: "analyze",
        key: "loginToUserPanel",
        render: (userAdd) => (
          <AiFillEye
            style={{ color: "#16a085" }}
            className={classes["icons"]}
            onClick={() => {
              setUserId(userAdd.userId);
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
  };

  const setUserId = (id) => {
    localStorage.setItem(USER_ID_KEY, id);
  };

  const getUsersData = async () => {
    setState((s) => ({ ...s, loading: true }));

    let response = await RequestApi.gets();

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
    dispatch(
      setModal({
        visible: true,
        title: "ویرایش",
        width: 700,
        children: <Edit data={data} getUsersData={getUsersData}/>,
        closeCallback: () => {
          getUsersData();
        },
      })
    );
  };


  return (
    <div className={classes.users}>
      <Navbar name={user?.display_name} />
      <StyledRow>
        <Col
          xs={22}
          sm={22}
          md={22}
          lg={22}
          xl={22}
          className={classes.titleBox}
        >
          <h2>Requests</h2>
        </Col>
        <Col xs={23} sm={23} md={23} lg={23} xl={23}>
          {/* <Filters setFilter={setFilter} filter={filter} /> */}
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
        
      </StyledRow>
      <MenuLayout />

    </div>
  );
}

export default Requests;
