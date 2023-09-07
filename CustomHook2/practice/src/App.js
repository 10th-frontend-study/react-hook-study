import { useMemo, useEffect, useState } from "react";
import usePrevious from './hooks/usePrevious'
import './App.css';
import useInput from "./hooks/useInput";

// function getRandomColor() {
//   const colors = ["green", "blue", "purple", "red", "pink"];
//   return colors[Math.floor(Math.random() * colors.length)];
// }

function App() {
  // const [color, setColor] = useState(getRandomColor());
  // const previousColor = usePrevious(color);

  // const handleClick = () => {
  //   function getNewColor() {
  //     const newColor = getRandomColor();
  //     if (color === newColor) {
  //       getNewColor();
  //     } else {
  //       setColor(newColor);
  //     }
  //   }
  //   getNewColor();
  // };

  // useEffect(() => {
  //   if (color === 'blue' && previousColor === 'green') {
  //     alert("하이");
  //   }
  // }, [color]);

  const [data, handleChange] = useInput({
    id : "",
    password : "",
    email : "",
  });
  useEffect( () =>{
    console.log(data);
  }, [data]);

  // const phone = useInput("");
  // const name = useInput("");
  // useEffect( () =>{
  //   console.log(phone , name);
  // }, [phone, name]);

  return (
    <div className="wrap">
      {/* <h1>usePrevious</h1>
      <button onClick={handleClick}>Next</button>
      <div className="content">
        <div className="card">
          <div className="color-div" style={{backgroundColor: previousColor}}></div>
          <p>Previous : {previousColor}</p>
        </div>
        <div className="card">
          <div className="color-div" style={{backgroundColor: color}}></div>
          <p>Current : {color}</p>
        </div>
      </div> */}

      <h1>
        useInput
      </h1>
      <div>
        <div className="input-div">
          <p>아이디</p>
          <input type="text" name="id" value={data.id} onChange={handleChange}></input>
          <p>비밀번호</p>
          <input type="text" name="password" value={data.password} onChange={handleChange}></input>
          <p>이메일</p>
          <input type="text" name="email" value={data.email} onChange={handleChange}></input>
          {/* <p>전화번호</p>
          <input type="text" {...phone}></input>
          <p>이름</p>
          <input type="text" {...name}></input> */}
        </div>
      </div>
      
    </div>
  );
}

export default App;