import { Typography, Image, Row, Col, Grid, Input } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import { setAuth } from '../../redux/actions/auth';
import styled from 'styled-components';
import image from '../../assets/bitcoin2.png';
const { Title, Text } = Typography;

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 8rem;
  width: 485px;
  justify-content: center;
  margin: 10rem auto;
`;
const Box = styled.div`
  background: #10141b;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin-top: 3rem;
`;
const ColumnBox = styled.div`
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;
const Profile = () => {
  const user = useSelector((store) => store.user);
  console.log(user);
  const dispatch = useDispatch();
  const changeCurrentAuth = (newUser) => {
    dispatch(setAuth({ ...newUser, accounts: user.accounts }));
  };
  return (
    <StyledDiv>
      <Row style={{ justifyContent: 'flex-end' }} xs={23} sm={23} md={8} lg={8}>
        <ColumnBox>
          <Text style={{ color: '#F5F5F5', fontSize: '28px' }} strong>
            {user?.display_name}
          </Text>
          <Text style={{ color: '#F5F5F5', fontSize: '20px' }} strong>
            {`${user?.user_login}@`}{' '}
          </Text>
        </ColumnBox>

        <Image preview={false} width={100} height={100} src={image} />
      </Row>
      <Box>
        <ColumnBox>
          <Text style={{ color: '#515151' }}>Full name</Text>
          <Text style={{ color: '#F5F5F5' }} strong>
            {user?.display_name}
          </Text>
        </ColumnBox>
        <ColumnBox>
          <Text style={{ color: '#515151' }}>Username</Text>
          <Text style={{ color: '#F5F5F5' }} strong>
            {`${user?.user_login}@`}
          </Text>
        </ColumnBox>
        <ColumnBox>
          <Text style={{ color: '#515151' }}>Email</Text>
          <Text style={{ color: '#F5F5F5' }} strong>
            {user?.user_email}
          </Text>
        </ColumnBox>
      </Box>
    </StyledDiv>
  );
};

export default Profile;
