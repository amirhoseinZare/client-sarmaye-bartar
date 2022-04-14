import alertTypes from "../types/alert";

const INITIAL_STATE = [
  {
    time: "time",
    message: "message",
    title: "title",
    read: true,
    type: "type",
    id: `time`,
  },
];

const alertReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case alertTypes.ADD_ALERT: {
      const { time, message, title, type } = action.payload;

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
