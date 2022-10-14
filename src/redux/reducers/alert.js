import alertTypes from "../types/alert";

const INITIAL_STATE = [
  // {
  //   time: "time",
  //   message: "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است",
  //   title: "پیام اول",
  //   read: true,
  //   type: "type",
  //   id: `1`,
  // },
  // {
  //   time: "time",
  //   message: "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است",
  //   title:"پیام دوم",
  //   read: true,
  //   type: "type",
  //   id: `2`,
  // },
];

const alertReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case alertTypes.ADD_ALERT: {
      const { time, message, title, type } = action.payload;
      if(state.length==10)
        state.shift()
      return [
        ...state,
        {
          time: time,
          message: message,
          title: title,
          read: true,
          type,
          id: `${time}`,
        },
      ];
    }
    case alertTypes.READ_ALERT: {
      const { id } = action.payload;
      const newAlerts = state.filter((alert) => alert.id !== id);
      return [...newAlerts];
    }
    default:
      return state;
  }
};

export default alertReducer;
