import { useSelector, useDispatch } from "react-redux"
import { Radio } from 'antd';
import { setAuth } from '../../redux/actions/auth'
// import {TradingViewStockChartWidget} from 'react-tradingview-components'
import { useEffect, useState } from "react"
import { AdvancedChart } from "react-tradingview-embed";

const Charts = ()=>{
    const user = useSelector(store=>store.user)
    const dispatch = useDispatch()
    const [value, setValue] = useState('GBPUSD');

    const changeCurrentAuth = (newUser)=>{
        dispatch(setAuth({...newUser, accounts:user.accounts }))
    }

    const symbols = ['GBPUSD', 'EURUSD', 'XAUUSD', 'DJ30']
    const optionsWithDisabled = [
        { label: 'DJ30', value: 'DJ30' },
        { label: 'XAUUSD', value: 'XAUUSD' },
        { label: 'EURUSD', value: 'EURUSD' },
        { label: 'GBPUSD', value: 'GBPUSD' },
    ];

    const onChange = ({ target: { value } }) => {
        setValue(value);
    };

    return <div 
        id="charts-container"
        style={{
            textAlign: 'center',
            direction: 'rtl',
            overflow: 'scroll'
        }}
    >
        <article className="radio-container">
            <Radio.Group
                options={optionsWithDisabled}
                onChange={onChange}
                value={value}
                optionType="button"
                buttonStyle="solid"
            />
        </article>
        
        <article>
            <AdvancedChart 
                widgetProps={{
                    theme: "dark", 
                    symbol:value, 
                    hide_top_toolbar:true, 
                    hide_side_toolbar:true, 
                    enable_publishing:false, 
                    allow_symbol_change:false, 
                    save_image:false
                }} 
            />
        </article>

    </div>
}

export default Charts