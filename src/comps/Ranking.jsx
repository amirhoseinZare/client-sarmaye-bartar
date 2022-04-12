import { message } from "antd";
import React, { useState, useEffect, useMemo } from "react";
import { RankingApi } from "../api/index";
import CustomTable from "../comps/CustomeTable";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import classes from "../pages/Users/style.module.scss";
import { USER_ID_KEY } from "../core/variables.core";
import { AiFillEye } from "react-icons/ai";
// .ant-table-tbody

const Ranking = () => {
  let user = useSelector((state) => state.user);
  let navigate = useNavigate();

  const [state, setState] = useState({
    rows: [],
    totalCount: 10,
    loading: false,
  });

  const [filter, setFilter] = useState({
    pageNumber: 1,
    pageSize: 10,
  });

  const setUserId = (id) => {
    localStorage.setItem(USER_ID_KEY, id);
  };

  const handleTableChange = ({ current, pageSize }, filters, sorter) => {
    setFilter((s) => ({
      ...s,
      pageNumber: current,
      pageSize,
    }));
  };

  const columnsAdmin = useMemo(
    () => [
      {
        title: "رتبه",
        key: "rank",
        dataIndex: "rank",
        render: (rank) => rank || "-",
      },
      {
        title: "نام",
        key: "display_name",
        dataIndex: "display_name",
        render: (name) => name || "-",
      },
      {
        title: "ایمیل",
        key: "user_email",
        dataIndex: "user_email",
        render: (email) => email || "-",
      },
      {
        title: "Equity",
        key: "equity",
        dataIndex: "equity",
        render: (equity) => equity || "-",
      },
      {
        title: "بالانس",
        key: "balance",
        dataIndex: "balance",
        render: (balance) => balance || "-",
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
    ],
    [state.rows]
  );

  const columnsUser = useMemo(
    () => [
      {
        title: "رتبه",
        key: "rank",
        dataIndex: "rank",
        render: (rank) => rank || "-",
      },
      {
        title: "نام",
        key: "display_name",
        dataIndex: "display_name",
        render: (name) => name || "-",
      },
      {
        title: "Equity",
        key: "equity",
        dataIndex: "equity",
        render: (equity) => equity || "-",
      },
      {
        title: "بالانس",
        key: "balance",
        dataIndex: "balance",
        render: (balance) => balance || "-",
      },
    ],
    [state.rows]
  );

  const getUsersData = async () => {
    setState((s) => ({ ...s, loading: true }));

    let response = await RankingApi.Rank(filter.pageSize, filter.pageNumber);

    setState((s) => ({ ...s, loading: false }));

    // if (!response.success) {
    if (false) {
      message.error(response.message);
      return;
    } else {
      let tempItems = response.items.map((item, index) => {
        return {
          ...item,
          rank: index + 1,
        };
      });

      setState((s) => ({
        ...s,
        totalCount: response.totalCount,
        rows: tempItems,
      }));
    }
  };

  useEffect(() => {
    getUsersData();
  }, [filter]);

  return (
    <CustomTable
      columns={user?.role === "admin" ? columnsAdmin : columnsUser}
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
  );
};

export default Ranking;
