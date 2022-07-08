import authTypes from "../types/auth";

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
  mtAccountId:""
};

const authReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case authTypes.SET_AUTH: {
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
        mtAccountId
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
        mtAccountId
      };
    }
    default:
      return state;
  }
};

export default authReducer;
