const init = {
  number: 0,
};

export default (state = init, action: any) => {
  console.log("aqwe", action);
  switch (action.type) {
    case "addCount":
      return { ...state, number: action.count + 1 };
    case "reduceCount":
      return { ...state, number: action.count - 1 };
    default:
      return state;
  }
};
