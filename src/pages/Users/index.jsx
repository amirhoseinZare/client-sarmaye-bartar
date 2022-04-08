import { useState, useEffect, useMemo } from "react";
import { Col, Row, message, Modal } from "antd";
import styled from "styled-components";
import CustomeTable from "../../comps/CustomeTable";
import { useDispatch, useSelector } from "react-redux";
import { setModal } from "../../redux/actions/modal";
import Detail from "./comps/detail";
import Edit from "./comps/edit";
import Filter from "./comps/filters";
import {
  ExclamationCircleOutlined,
  CheckCircleTwoTone,
  CloseCircleTwoTone,
} from "@ant-design/icons";

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

function Categories() {
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
        dataIndex: "name",
      },
      {
        title: "توضیحات",
        dataIndex: "description",
        render: (description) => description || "-",
      },
      {
        title: "اوردر",
        dataIndex: "order",
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

  const getCategories = async () => {
    // setState((s) => ({ ...s, loading: true }));
    // setState((s) => ({ ...s, loading: false }));
    // if (!call.success) {
    //   message.error(call.message);
    //   return;
    // }
    // setState((s) => ({ ...s, rows: call.result.items }));
    // dispatch(setCategories(call.result.items));
  };

  useEffect(() => {
    getCategories();
  }, [filter]);

  const openDetailModal = (data) => {
    dispatch(
      setModal({
        visible: true,
        title: "توضیحات",
        width: 500,
        children: <Detail data={data} />,
      })
    );
  };

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
          getCategories();
        },
      })
    );
  };

  const openDeleteModal = (data) => {
    confirm({
      title: "تست",
      icon: <ExclamationCircleOutlined />,
      content: 't("category.deleteDescription")',
      okText: 't("general.yes")',
      okType: '"danger"',
      cancelText: 't("general.no")',
      onOk() {},
      onCancel() {},
    });
  };

  return (
    <StyledRow>
      <Filter setFilter={setFilter} filter={filter} search={getCategories} />
      <Col xs={20} sm={20} md={20} lg={20} xl={20}>
        <h2>{'t("category.gridTitle")'}</h2>
      </Col>
      <Col xs={20} sm={20} md={20} lg={20} xl={20}>
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
  );
}

export default Categories;
