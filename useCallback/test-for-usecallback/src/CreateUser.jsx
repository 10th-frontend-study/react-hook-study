import React from "react";

const CreateUser = React.memo(function CreateUser({
  username,
  email,
  onChange,
  onCreate,
}) {
  // const CreateUser = ({ username, email, onChange, onCreate }) => {
  console.log("Createuser rendered...");
  return (
    <div>
      <input
        name="username"
        placeholder="계정명"
        onChange={onChange}
        value={username}
      />
      <input
        name="email"
        placeholder="이메일"
        onChange={onChange}
        value={email}
      />
      <button onClick={onCreate}>등록</button>
    </div>
  );
  // };
});

export default CreateUser;
