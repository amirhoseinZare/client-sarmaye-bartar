import { Table, ConfigProvider } from "antd";
import styled from "styled-components";

const StyledTable = styled(Table)`
  color: rgba(99, 106, 120, 1);
  border-radius: 12px !important;
  border-radius: 10px 8px 8px 10px;
  overflow: hidden;
  margin-bottom:48px;
  .table {
    border-radius: 10px 8px 8px 10px;
  }
  // @media (max-width: 576px) {
  white-space: nowrap;
  .ant-table-rtl {
    overflow-x: scroll;
  }
  // }
  .ant-table-row.ant-table-row-level-0:nth-child(even) .ant-table-cell {
    background-color: #f7f8ff !important;
  }
  .ant-table-row.ant-table-row-level-0:nth-child(odd) .ant-table-cell {
    background-color: #ffffff !important;
  }
  thead tr {
    border: none !important;
  }
  .ant-pagination.ant-pagination-rtl.ant-table-pagination.ant-table-pagination-left {
    justify-content: flex-end;
  }
  .ant-table-thead
    > tr
    > th:not(:last-child):not(.ant-table-selection-column):not(.ant-table-row-expand-icon-cell):not([colspan])::before {
    display: none !important;
  }
  thead tr th {
    background-color: #fff;
    color: rgba(32, 54, 95, 1);
    font-size: 12px;
    text-align: center !important;
  }
  tbody tr td {
    height: 47.63px;
    padding: 0;
    text-align: center;
    color: #636a78;
    font-size: 11px;
  }
  table {
    overflow: hidden;
    table-layout: auto;
    box-shadow: 0 0 20px 0px rgb(191 191 191 / 40%);
    border-radius: 12px;
  }
  ${
    "" /* .ant-spin-nested-loading {
    display: flex !important;
    width: 100% !important;
  } */
  }
  li.ant-pagination-item,
  li.ant-pagination-prev button,
  li.ant-pagination-next button {
    border-radius: 50%;
  }
`;

const CustomTable = ({ columns, rows, pagination, disablePagination=false, ...otherProps }) => {
  const { position = ["bottomCenter"] } = pagination;
  return (
    <ConfigProvider direction="rtl" disablePagination={disablePagination}>
      <StyledTable
        columns={columns}
        dataSource={rows}
        pagination={disablePagination ? false : { ...pagination, position }}
        {...otherProps}
        xScroll="scroll"
      />
    </ConfigProvider>
    
  );
};

export default CustomTable;
