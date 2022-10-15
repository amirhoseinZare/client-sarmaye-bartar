import { Table, ConfigProvider } from 'antd';
import styled from 'styled-components';

const StyledTable = styled(Table)`
  color: rgba(99, 106, 120, 1);
  overflow: hidden;
  margin-bottom: 48px;

  // @media (max-width: 576px) {
  white-space: nowrap;
  .ant-table-rtl {
    overflow-x: scroll;
  }
  // }
  .ant-table-row.ant-table-row-level-0:nth-child(even) .ant-table-cell {
    background-color: #10141b !important;
  }
  .ant-table-row.ant-table-row-level-0:nth-child(odd) .ant-table-cell {
    background-color: #10141b !important;
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
    background-color: #10141b;
    color: #F5F5F5;
    font-size: 12px;
    text-align: center !important;
    border-bottom: rgba(245, 245, 245, 0.47) solid 0.5px;
  }
  tbody tr td {
    height: 47.63px;
    padding: 0;
    text-align: center;
    color: #f5f5f5;
    font-size: 11px;
    border-bottom: rgba(245, 245, 245, 0.47) solid 0.5px;
  }
  table {
    overflow: hidden;
    table-layout: auto;
    box-shadow: 0 0 20px 0px rgb(191 191 191 / 40%);
  }
  ${
    '' /* .ant-spin-nested-loading {
    display: flex !important;
    width: 100% !important;
  } */
  }
  li.ant-pagination-item,
  li.ant-pagination-prev button,
  li.ant-pagination-next button {
    // border-radius: 50%;
  }
`;

const CustomTable = ({
  columns,
  rows,
  pagination,
  disablePagination = false,
  color,
  ...otherProps
}) => {
  const { position = ['bottomCenter'] } = pagination;
  return (
    <ConfigProvider direction="rtl" disablePagination={disablePagination}>
      <StyledTable
        columns={columns}
        dataSource={rows}
        pagination={disablePagination ? false : { ...pagination, position }}
        {...otherProps}
        color={color}
        xScroll="scroll"
      />
    </ConfigProvider>
  );
};
export default CustomTable;
