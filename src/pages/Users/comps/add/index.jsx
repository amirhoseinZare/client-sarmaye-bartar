import { useMemo, useState, useEffect } from "react";
import { Steps, Button, message, Row } from "antd";
import Personal from "./comps/personal";
import AccountData from "./comps/accountData";
import Token from "./comps/token";
import styled from "styled-components";
import { UsersApi } from "../../../../api/Users.api";
import { useSelector } from "react-redux";
import ChangePassword from "./comps/changePassword"

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

const AddUsers = ({ step = 0, closeModal }) => {
  const [userData, setUserData] = useState({});
  const [current, setCurrent] = useState(step);

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

  // add data function
  const addUser = async () => {
    let response = await UsersApi.addUser(userData);
    if (response.success) {
      message.success(response.message);
      setUserData({})
      setCurrent(0);
      closeModal();
    } else {
      message.error(response.message);
    }
  };

  const steps = useMemo(()=>[
    {
      title: "اطلاعات شخصی کاربر",
      content: (
        <Personal setData={setUserData} userState={userData} next={next} />
      ),
    },
    {
      title: "اطلاعات اکانت",
      content: (
        <AccountData
          setData={setUserData}
          userState={userData}
          prev={prev}
          next={next}
        />
      ),
    },
    {
      title: "توکن و آیدی",
      content: (
        <Token
          setData={setUserData}
          userState={userData}
          prev={prev}
          next={next}
        />
      ),
    },
    {
      title: "پسورد",
      content: (
        <ChangePassword
          setData={setUserData}
          userState={userData}
          prev={prev}
          next={next}
        />
      ),
    }
  ], [userData])

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
          <Button className="done-button" type="primary" onClick={addUser}>
            افزودن
          </Button>
        }
      </div>
    </StyledRow>
  );
};

export default AddUsers;
