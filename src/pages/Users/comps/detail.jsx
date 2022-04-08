import { Space, Col } from "antd";
import styled from "styled-components";

const StyledCol = styled(Col)`
  background-color: #f7f8ff;
  padding: 16px;
  border-radius: 12px;
  box-shadow: 0 0 20px 0px rgb(191 191 191 / 40%);
  .space {
    p {
      display: flex;
      align-items: flex-end;
      line-height: 23px;
      margin-left: 8px;
      svg {
        line-height: 23px;
      }
    }
    width: 100%;
    ${
      "" /* .inner-space {
            display:flex;
            flex-direction:row;
            justify-content:space-between;
            flex-wrap:wrap;
        } */
    }
  }
`;

function Detail({ data }) {
  const {
    name,
    nameEn = "",
    description = "",
    descriptionEn = "",
    icon = null,
  } = data;

  return (
    <StyledCol span={24}>
      <Space className="space" direction="vertical">
        <Space className="inner-space">
          <p>نام تستی 1:{name}</p>
          <p>نام تستی 2:{nameEn}</p>
        </Space>
        <Space className="inner-space">
          <p>نام تستی 3:{description}</p>
        </Space>
        <Space className="inner-space">
          <p>نام تستی 4:{descriptionEn || "-"}</p>
        </Space>
      </Space>
    </StyledCol>
  );
}

export default Detail;
