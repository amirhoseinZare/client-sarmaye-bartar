import { useMemo, useState, useEffect } from "react";
import { Steps, Button, message, Row } from "antd";
import Personal from "./comps/personal";
import AccountData from "./comps/accountData";
import Token from "./comps/token";
import styled from "styled-components";

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
  useEffect(() => {
    setCurrent(step);
  }, [step]);

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  console.log("step", step);
  const [current, setCurrent] = useState(step);
  const steps = useMemo(
    () => [
      {
        title: "اطلاعات شخصی کاربر",
        content: <Personal data={data} next={next} closeModal={closeModal} />,
      },
      {
        title: "اطلاعات  اکانت",
        content: (
          <AccountData
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
            data={data}
            prev={prev}
            next={next}
            closeModal={closeModal}
          />
        ),
      },
    ],
    [data, current]
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
        {/* {current === steps.length - 1 && (
                <Button className="prev-button" type="primary" onClick={() => message.success('Processing complete!')}>
                    {t("general.doneStep")}
                </Button>
                )} */}
        {current > 0 && (
          <Button
            className="done-button"
            style={{ margin: "0 8px" }}
            onClick={() => prev()}
          >
            قبلی
          </Button>
        )}
      </div>
    </StyledRow>
  );
};

export default Edit;
