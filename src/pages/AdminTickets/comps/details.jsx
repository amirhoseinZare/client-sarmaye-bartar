import { Divider, List, Typography } from 'antd';
import styled from 'styled-components';
const data = [
    'Racing car sprays burning fuel into crowd.',
    'Japanese princess to wed commoner.',
    'Australian walks 100km after outback crash.',
    'Man charged over missing wedding girl.',
    'Los Angeles battles huge wildfires.',
];

const StyledList = styled(List)`
    .ant-list-header {
        text-align:left;
    }
    .ant-spin-container {
        .ant-list-items {
            .ant-list-item {
                article {
                    text-align:left;
                    direction:ltr;                    
                }
                text-align:left;
                display: flex;
                justify-content: flex-end;
            }
        }
    }
    .ant-list-footer {
        text-align:left;
    }
`

const Details = ({data:ticketData})=>{
    // {
    //     "role": "user",
    //     "firstBalance": 25000,
    //     "dayBalance": 25431.48,
    //     "percentDays": 0,
    //     "infinitive": true,
    //     "accountType": "RoboForex-Demo",
    //     "mtAccountId": "01c191fe-6b94-4486-ab14-717003546e78",
    //     "platform": "MT4",
    //     "hasFailedDailyLoss": false,
    //     "hasFailedMaxLoss": false,
    //     "type": "secondary",
    //     "_id": "6362a06a8f648c0013a1ec53",
    //     "user_login": "pouriakhosravi1998",
    //     "display_name": "پوریا خسروی\t",
    //     "level": 3,
    //     "accountEmail": "pouriakhosravi1998@yahoo.com"
    // }
    const items = [
        {
            title:'title',
            value:ticketData.title
        },
        {
            title:'description',
            value:ticketData.title
        },
        {
            title:'status',
            value:ticketData.status
        },
        {
            title:'user email',
            value:ticketData.userId.user_email
        },
        {
            title:'user display name',
            value:ticketData.userId.display_name
        },
        {
            title:'status',
            value:ticketData.status
        },

        {
            title:'user email',
            value:ticketData.userId.user_email
        },
        {
            title:'user display name',
            value:ticketData.userId.display_name
        },
        {
            title:'created at',
            value:ticketData.createdAt.replace('Z', '     ').replace('T', ' ')
        },
        {
            title:'',
            value: '================================= account data ================================='
        },
        {
            title: 'first balance',
            value: ticketData.accountId.firstBalance
        },
        {
            title: 'account type',
            value: ticketData.accountId.accountType
        },
        {
            title: 'level',
            value: ticketData.accountId.level
        },
        {
            title: '',
            value: '================================= objectives ================================='
        },
        {
            title: 'max loss',
            value: ticketData.accountId.hasFailedDailyLoss ? 'failed' : 'passed'
        },
        {
            title: 'max daily loss',
            value: ticketData.accountId.hasFailedMaxLoss ? 'failed' : 'passed'
        }
       
       
    ]

    return (
        <>
            <Divider orientation="right">Ticket details</Divider>
            <StyledList
                header={<div></div>}
                footer={<div></div>}
                bordered
                dataSource={items}
                renderItem={(item) => (
                    <List.Item>
                        <Typography>{item.title}{item.title ? ":" : ""} {item.value}</Typography>
                    </List.Item>
                )}
            />
        </>
    )
}

export default Details