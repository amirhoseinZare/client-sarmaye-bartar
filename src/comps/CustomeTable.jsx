import { Table} from 'antd';
import styled from "styled-components";

const StyledTable = styled(Table)`
  color:rgba(99, 106, 120, 1);
  border-radius:12px !important;
  border-radius: 10px 8px 8px 10px;
  .table {
    border-radius: 10px 8px 8px 10px;
  }
  @media (max-width: 576px) {
        overflow-x: scroll;
  }
  .ant-table-row.ant-table-row-level-0:nth-child(even) .ant-table-cell {
    background-color: #F7F8FF !important;
  }
  .ant-table-row.ant-table-row-level-0:nth-child(odd) .ant-table-cell {
    background-color: #FFFFFF !important;
  }
  thead tr {
    border:none !important;
  }
  .ant-pagination.ant-pagination-rtl.ant-table-pagination.ant-table-pagination-left {
    justify-content:flex-end;
  }
  .ant-table-thead > tr > th:not(:last-child):not(.ant-table-selection-column):not(.ant-table-row-expand-icon-cell):not([colspan])::before {
    display:none !important;
  }
  thead tr th {
    background-color:#fff;
    color: rgba(32, 54, 95, 1);
    font-size: 12px;
    text-align:center !important;
  }
  tbody tr td {
    height:47.63px;
    padding:0;
    text-align:center;
    color: #636A78;
    font-size: 11px;
  }
  table {
    overflow: hidden;
    table-layout: auto;
    box-shadow: 0 0 20px 0px rgb(191 191 191 / 40%);
    border-radius: 12px;
  }
  ${'' /* .ant-spin-nested-loading {
    display: flex !important;
    width: 100% !important;
  } */}
  li.ant-pagination-item,
  li.ant-pagination-prev button,
  li.ant-pagination-next button {
    border-radius:50%;
  }
`

const CustomTable = ({ columns, rows, pagination, ...otherProps }) =>{
    const { position=["bottomRight"] } = pagination
    return (<StyledTable columns={columns} dataSource={rows} pagination={ {...pagination, position} } {...otherProps} />)
}

export default CustomTable