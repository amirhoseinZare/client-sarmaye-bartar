import { Typography, Image, Row, Select } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { setAuth } from '../../../../redux/actions/auth';
import styled from 'styled-components';
import image from '../../../../assets/bitcoin2.png';
import newLogo from '../../../../assets/sgb-logo.png';
import TiketList from './TicketList';
import NewTicket from './NewTicket';

const { Text } = Typography;

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 8rem;
  width: 485px;
  justify-content: center;
  margin: 6rem auto;
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
        <TiketList />
      </StyledDiv>
      <StyledDiv>
        <NewTicket />
      </StyledDiv>
    </Box>
  );
};

export default Ticket;
