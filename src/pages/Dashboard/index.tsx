import React, { useEffect, useState, useRef, useReducer } from "react";
import { add, reduce } from "../../redux/action/count";
import { useSelector, useDispatch } from "react-redux";

export default function Home() {
  // console.log()
  const count = useSelector((state: any) => {
    console.log(state, 11111);

    return state.number;
  });
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("123", count);
  });

  return (
    <>
      <span>{count}</span>
      <button onClick={() => dispatch(reduce(count))}>-</button>
      <button onClick={() => dispatch(add(count))}>+</button>
    </>
  );
}
