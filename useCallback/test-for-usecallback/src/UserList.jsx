// import React from "react";

// const User = React.memo(function User({ user, onRemove, onToggle }) {
const User = function User({ user, onRemove, onToggle }) {
  return (
    <div>
      <b
        style={{
          cursor: "pointer",
          color: user.active ? "green" : "black",
        }}
        onClick={() => onToggle(user.id)}
      >
        {user.username}
      </b>
      &nbsp;
      <span>({user.email})</span>
      <button onClick={() => onRemove(user.id)}>삭제</button>
    </div>
  );
};
// });

// const UserList = React.memo(function UserList({ users, onRemove, onToggle }) {
const UserList = ({ users, onRemove, onToggle }) => {
  console.log("UserList rendered...");
  return (
    <div>
      {users.map((user) => (
        <User
          user={user}
          key={user.id}
          onRemove={onRemove}
          onToggle={onToggle}
        />
      ))}
    </div>
  );
};
// });

export default UserList;
