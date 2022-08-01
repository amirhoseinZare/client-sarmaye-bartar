import { useMemo, useState, useEffect } from "react";
import { Steps, Button, message, Row } from "antd";
import Personal from "./comps/personal";
import AccountData from "./comps/accountData";
import Token from "./comps/token";
import ChangePassword from "./comps/changePassword"
import styled from "styled-components";
import { UsersApi } from "../../../../api/Users.api";
import { useSelector } from "react-redux";
import { accountLevels } from "../../../../core/enums"

const { Step } = Steps;

const StyledRow = styled(Row)`
  display: flex;
  flex-direction: column;
  .steps-content {
    min-height: 200px;
    margin-top: 16px;
    border-radius: 8px;
    padding: 8px;
    text-align: center;
    background-color: #fafafa;
    border: 1px dashed #e9e9e9;
    ${"" /* border-radius: 2px; */}
  }

  .steps-action {
    margin-top: 24px;
  }

  .ant-steps-item-title {
    font-size: 12px;
  }

  .next-button {
    border-radius: 12px;
    margin: 0 5px;
  }

  .prev-button {
    border-radius: 12px;
  }

  .done-button {
    border-radius: 12px;
  }
  .ant-steps-item-container {
    display: flex;
    align-items: center;
  }

  .ant-steps-item-icon {
    width: 24px;
    height: 24px;
    line-height: 24px;
  }
`;

const Edit = ({ data, step = 0, closeModal }) => {
  // get user data from redux
  let user = data;

  const [userData, setUserData] = useState({});
  const [ loading, setLoading ] = useState(false)
  // step function
  useEffect(() => {
    setCurrent(step);
  }, [step]);

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  // patch data function
  const patchData = async () => {
    setLoading(true)
    const { accountType, systemAccountType, level,  ...body } = userData
    setLoading(false)
    body.accountType = accountType === "doesNotExist" ? systemAccountType : accountType
    body.role = "user"
    const payload = {
      ...body,
      ...accountLevels[level],
    }
    let response = await UsersApi.patchUser(user._id, payload);
    if (response.success) {
      message.success(response.message);
      closeModal()
      setUserData({})
      setCurrent(0)
    } else {
      message.error(response.message);
    }
  };

  const [current, setCurrent] = useState(step);
  const steps = useMemo(
    () => [
      {
        title: "اطلاعات شخصی کاربر",
        content: (
          <Personal
            userState={userData}
            setData={setUserData}
            data={data}
            next={next}
            closeModal={closeModal}
          />
        ),
      },
      {
        title: "اطلاعات اکانت",
        content: (
          <AccountData
            userState={userData}
            setData={setUserData}
            data={data}
            prev={prev}
            next={next}
            closeModal={closeModal}
          />
        ),
      },
      {
        title: "توکن و آیدی",
        content: (
          <Token
            userState={userData}
            setData={setUserData}
            data={data}
            prev={prev}
            next={next}
            closeModal={closeModal}
          />
        ),
      },
      {
        title:"تغییر پسورد",
        content:(
          <ChangePassword
            userState={userData}
            setData={setUserData}
            data={data}
            prev={prev}
            next={next}
            closeModal={closeModal}
          />
        )
      }
    ],
    [data, current, userData]
  );

  return (
    <StyledRow>
      <Steps current={current}>
        {steps.map((item) => (
          <Step key={item.title} title={item.title} />
        ))}
      </Steps>
      <div className="steps-content">{steps[current].content}</div>
      <div className="steps-action">
        {current < steps.length - 1 && (
          <Button className="next-button" type="primary" onClick={() => next()}>
            بعدی
          </Button>
        )}
        {current > 0 && (
          <Button
            className="prev-button"
            style={{ margin: "0 8px" }}
            onClick={() => prev()}
          >
            قبلی
          </Button>
        )}
        {
          <Button className="done-button" type="primary" onClick={patchData} loading={loading}>
            ثبت
          </Button>
        }
      </div>
    </StyledRow>
  );
};

export default Edit;
