import analyzeTypes from "../types/analyze";

const INITIAL_STATE = {
  accountType: "",
  balance: 0,
  dayBalance: 0,
  display_name: "",
  endTradeDay: "",
  equity: 0,
  firstBalance: 0,
  infinitive: false,
  maxTradeDays: 0,
  percentDays: 0,
  platform: "",
  role: "",
  startTradeDay: "",
  tradeDaysCount: 0,
  user_email: "",
  user_login: "",
  user_nicename: "",
  _id: "",
  isAuth:false,
  mtAccountId:"",
  level:"",
  metaUsername:""
};

const analyzeReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case analyzeTypes.SET_ANALYZE: {
      const {
        accountType,
        balance,
        dayBalance,
        display_name,
        endTradeDay,
        equity,
        firstBalance,
        infinitive,
        maxTradeDays,
        percentDays,
        platform,
        role,
        startTradeDay,
        tradeDaysCount,
        user_email,
        user_login,
        user_nicename,
        _id,
        mtAccountId,
        level,
        status,
        metaUsername
      } = action.payload;

      return {
        ...state,
        accountType,
        balance,
        dayBalance,
        display_name,
        endTradeDay,
        equity,
        firstBalance,
        infinitive,
        maxTradeDays,
        percentDays,
        platform,
        role,
        startTradeDay,
        tradeDaysCount,
        user_email,
        user_login,
        user_nicename,
        _id,
        isAuth:true,
        mtAccountId,
        level,
        status,
        metaUsername
      };
    }
    default:
      return state;
  }
};

export default analyzeReducer;
