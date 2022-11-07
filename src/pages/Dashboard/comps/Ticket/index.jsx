import { Typography, Image, Row, Select,Col } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { setAuth } from '../../../../redux/actions/auth';
import styled from 'styled-components';
import image from '../../../../assets/bitcoin2.png';
import newLogo from '../../../../assets/sgb-logo.png';
import TiketList from './TicketList';
import NewTicket from './NewTicket';


const { Text } = Typography;

const StyledDiv = styled(Row)`
  width:100%;
  display: flex;
  flex-direction: column;
  margin-top: 8rem;
  justify-content: center;
  margin: 6rem auto;
  align-items:center;
  .ant-col.main-col {
    width: calc((100% / 24)*20);
  }
`;
const Box = styled.div`
  width: 100%;
  display: flex;
`;
const ColumnBox = styled.div`
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;
const Ticket = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const changeCurrentAuth = (newUser) => {
    dispatch(setAuth({ ...newUser, accounts: user.accounts }));
  };

  return (
    <Box>
      <StyledDiv>
        <Col xs={20} className='main-col'>
          <TiketList />
        </Col>
      </StyledDiv>
      {/* <StyledDiv>
        <NewTicket />
      </StyledDiv> */}
    </Box>
  );
};

export default Ticket;
