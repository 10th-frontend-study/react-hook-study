import { useReducer } from "react";

function reducer(state, action) {
  switch (action.type) {
    case "decrement":
      return state - 1;
    case "increment":
      return state + 1;
    case "reset":
      return 0;
    case "random":
      return Math.floor(Math.random() * 100);
    default:
      throw new Error();
  }
}

function Counter() {
  const [number, dispatch] = useReducer(reducer, 0);

  return (
    <div>
      <h1>Count : {number}</h1>
      <button onClick={() => dispatch({ type: "decrement" })}>-</button>
      <button onClick={() => dispatch({ type: "increment" })}>+</button>
      <button onClick={() => dispatch({ type: "reset" })}>reset</button>
      <button onClick={() => dispatch({ type: "random" })}>random</button>
    </div>
  );
}

export default Counter;
