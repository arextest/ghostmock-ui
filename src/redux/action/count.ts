export const add = (count: any) => {
  return (dispatch: any) => {
    (() => {
      console.log("123", count);
      dispatch({
        type: "addCount",
        count,
      });
    })();
  };
};

export const reduce = (count: any) => {
  return (dispatch: any) => {
    (() => {
      dispatch({
        type: "reduceCount",
        count,
      });
    })();
  };
};
