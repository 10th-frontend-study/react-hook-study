# ._.) useCallback()을 알아보자

<br/>

## 목차
* [useCallback이란]()
  * [기본 사용법]()
  * [사용 예시]()
  * [주의할 점]()
* [React.memo 를 사용한 컴포넌트 리렌더링 방지]()
  * [기본 사용법]()
  * [사용 예시]()

<br/><br/>

# useCallback()이란

`useCallback`은 `useMemo`와 비슷한데, 특정 `결과값`을 재사용하는 `useMemo()`와 달리 특정 `함수`를 재사용하기 위한 훅이다.

- 성능 개선을 위한 훅 `useMemo`, `useCallback`

<br/>

## 기본 사용법

```java
const onSave = useCallback(() => {
    console.log(name);
  }, [name]);//name이 변경될 때에만 함수 재생성.
```

<br/>

## 사용 예시

useCallback을 사용하지 않은 경우와 사용한 경우를 코드로 비교해보자.

<br/>

### 📍 유저를 생성/삭제/관리 하는 코드 (useCallback 無)

**App.js**

```jsx
// user를 생성하는 onCreate 함수
const onCreate = () => {

	// user 오브젝트 생성
  const user = {
    id: nextId.current,
    username,
    email
  };

	// 유저리스트에 생성한 유저 추가
  setUsers(users.concat(user));

	// input 청소
  setInputs({
    username: '',
    email: ''
  });

	// 다음 user id값 업데이트
  nextId.current += 1;
};

// 해당 id를 가진 user를 삭제하는 함수
const onRemove = id => {
  // user.id 가 id 인 것을 제거한 배열을 새로 생성(list.filter 메서드)
  setUsers(users.filter(user => user.id !== id));
};

// 해당 id의 active 속성을 토글시켜주는 함수 (true/false)
const onToggle = id => {
  setUsers(
    users.map(user =>
      user.id === id ? { ...user, active: !user.active } : user
    )
  );
};
```


![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/edcb3eea-faf5-458b-97e3-9ebb2d6f1f8c/Untitled.png)

위의 `onCreate`, `onRemove`, `onToggle` 함수는 컴포넌트가 리렌더링 될 때마다 새로 만들어진다. 

이제 useCallback을 사용해서 함수를 새로 만들지 않고 재사용되도록 해보자.

<br/>

### 📍 유저를 생성/삭제/관리 하는 코드 (useCallback 有)

```jsx
import React, { useRef, useState, useMemo, useCallback } from 'react';
import UserList from './UserList';
import CreateUser from './CreateUser';

function countActiveUsers(users) {
  console.log('활성 사용자 수를 세는중...');
  return users.filter(user => user.active).length;
}

function App() {
  const [inputs, setInputs] = useState({
    username: '',
    email: ''
  });
  const { username, email } = inputs;
  const onChange = useCallback( // useCallback 사용
    e => {
      const { name, value } = e.target;
      setInputs({
        ...inputs,
        [name]: value
      });
    },
    [inputs]
  );
  const [users, setUsers] = useState([
    {
      id: 1,
      username: 'velopert',
      email: 'public.velopert@gmail.com',
      active: true
    },
    {
      id: 2,
      username: 'tester',
      email: 'tester@example.com',
      active: false
    },
    {
      id: 3,
      username: 'liz',
      email: 'liz@example.com',
      active: false
    }
  ]);

  const nextId = useRef(4);
  const onCreate = useCallback(() => { // useCallback 사용
    const user = {
      id: nextId.current,
      username,
      email
    };
    setUsers(users.concat(user));

    setInputs({
      username: '',
      email: ''
    });
    nextId.current += 1;
  }, [users, username, email]);

  const onRemove = useCallback( // useCallback 사용
    id => {
      setUsers(users.filter(user => user.id !== id));
    },
    [users]
  );
  const onToggle = useCallback( // useCallback 사용
    id => {
      setUsers(
        users.map(user =>
          user.id === id ? { ...user, active: !user.active } : user
        )
      );
    },
    [users]
  );
  const count = useMemo(() => countActiveUsers(users), [users]);
  return (
    <>
      <CreateUser
        username={username}
        email={email}
        onChange={onChange}
        onCreate={onCreate}
      />
      <UserList users={users} onRemove={onRemove} onToggle={onToggle} />
      <div>활성사용자 수 : {count}</div>
    </>
  );
}

export default App;
```

<br/>

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/edcb3eea-faf5-458b-97e3-9ebb2d6f1f8c/Untitled.png)

- 사실, `useCallback` 은 `useMemo` 를 기반으로 만들어짐
- 함수를 위해서 사용 할 때 더욱 편하게 해준 것일 뿐
- 아래는 `useMemo`를 사용해서 `useCallback`을 만든 경우

```jsx
const onToggle = useMemo(
  () => () => {
    /* ... */
  },
  [users]
);
```

<br/>

### 📌 주의할 점

useCallback은 매번 같은 함수를 다시 생성하는 것을 막음으로써 재사용을 가능하게 도와줄 뿐, 바로 이뤄낼 수 있는 눈에 띄는 최적화는 없다. 컴포넌트 렌더링 최적화 작업을 해주어야만 성능이 최적화 된다.

<br/><br/>

# ****React.memo 를 사용한 컴포넌트 리렌더링 방지****

input에 값을 입력할 때, 등록 버튼 누를때, 삭제 버튼 누를 때 모든 컴포넌트가 새로 만들어진다. props에 변화가 있을 때에만 컴포넌트가 새로 만들어지도록 해보자.

<br/>

## React.memo

- 컴포넌트의 props에 변화가 없을 때 리렌더링을 방지해줌
- 컴포넌트를 렌더하고 결과를 메모리에 저장함 (메모이제이션)
- 다음 렌더가 시작되기 전 memo()는 props와 새로운 props를 얕은 비교 를 함
- 값이 같다면 메모리에 저장되어있는 결과물을 재사용하고 렌더링 건너뜀

<br/>

## 기본 사용법

```jsx
import { memo } from 'react';

const SomeComponent = memo(function SomeComponent(props) {
  // ...
});
```

<br/>

### 사용 예시

```jsx
const Greeting = memo(function Greeting({ name }) {
  return <h1>Hello, {name}!</h1>;
});

export default Greeting;
```

<br/>

### **CreateUser.js**

```jsx
import React from 'react';

const CreateUser = ({ username, email, onChange, onCreate }) => {
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
};

export default React.memo(CreateUser);
```

<br/>

### **UserList.js**

```jsx
import React from 'react';

const User = React.memo(function User({ user, onRemove, onToggle }) {
  return (
    <div>
      <b
        style={{
          cursor: 'pointer',
          color: user.active ? 'green' : 'black'
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
});

function UserList({ users, onRemove, onToggle }) {
  return (
    <div>
      {users.map(user => (
        <User
          user={user}
          key={user.id}
          onRemove={onRemove}
          onToggle={onToggle}
        />
      ))}
    </div>
  );
}

export default React.memo(UserList);
```

위와 같이 React.memo를 사용하면 콘솔에 해당 컴포넌트만 재생성되는 것을 볼 수 있다.

<br/>

## 참고자료

- [https://goongoguma.github.io/2021/09/22/Use-React.memo()-wisely/](https://goongoguma.github.io/2021/09/22/Use-React.memo()-wisely/)
- [https://react.vlpt.us/basic/18-useCallback.html](https://react.vlpt.us/basic/18-useCallback.html)
- [https://react.vlpt.us/basic/19-React.memo.html](https://react.vlpt.us/basic/19-React.memo.html)