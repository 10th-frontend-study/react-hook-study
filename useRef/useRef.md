# useRef()

# 기본

useRef는 **저장공간 또는 DOM요소에 접근하기 위해 사용되는 React Hook**이다.

### Ref의 의미

여기서 Ref는 reference, 즉 참조를 뜻한다.

우리가 자바스크립트를 사용 할 때에는, 우리가 특정 DOM 을 선택하기 위해서 querySelector 등의 함수를 사용한다. React를 사용하는 프로젝트에서도 가끔씩 DOM 을 직접 선택해야 하는 상황이 필요하다. 그럴 때 `useRef`를 사용할 수 있다.

---

# useRef: 특정 DOM 선택하기

`useRef` 는 렌더링을 필요로 하지 않는 값을 참조하게 해 주는 Hook이다.

```jsx
const ref = useRef(initialValue)
```

# Reference

컴포넌트 최상단에 ref를 선언하여 useRef를 호출한다.

```jsx
import { useRef } from 'react';

function MyComponent() {
  const intervalRef = useRef(0);
  const inputRef = useRef(null);
  // ...
```

### 주의사항

- `initialValue` : 초기값
- useRef는 `current` 라고 하는 하나의 property를 가진 object를 반환한다.
- 값을 갱신할 때에는 `ref.current` 를 사용한다.
- `ref.current` 를 통해 값을 변경해도 렌더링이 일어나지는 않는다.
    - ref는 순수 자바스크립트 오브젝트이기 때문에 리액트는 ref가 언제 변경지 알 수 없음
- 렌더링할 때에는 ref를 읽거나 쓰지 말아야 함 (초기 initialization 제외)

# 사용해보기

## 🎯 input 박스에 focus 주기

```jsx
import React, { useState, useRef } from 'react';

function InputSample() {
  const [inputs, setInputs] = useState({
    name: '',
    nickname: ''
  });
  const nameInput = useRef();

  const { name, nickname } = inputs; // 비구조화 할당을 통해 값 추출

  const onChange = e => {
    const { value, name } = e.target; // 우선 e.target 에서 name 과 value 를 추출
    setInputs({
      ...inputs, // 기존의 input 객체를 복사한 뒤
      [name]: value // name 키를 가진 값을 value 로 설정
    });
  };

  const onReset = () => {
    setInputs({
      name: '',
      nickname: ''
    });
    nameInput.current.focus();
  };

  return (
    <div>
      <input
        name="name"
        placeholder="이름"
        onChange={onChange}
        value={name}
        ref={nameInput}
      />
      <input
        name="nickname"
        placeholder="닉네임"
        onChange={onChange}
        value={nickname}
      />
      <button onClick={onReset}>초기화</button>
      <div>
        <b>값: </b>
        {name} ({nickname})
      </div>
    </div>
  );
}

export default InputSample;
```

## 🎯 컴포넌트 내에서 변수 관리하기

`useRef` Hook 은 DOM 을 선택하는 용도 외에도, 컴포넌트 안에서 조회 및 수정 할 수 있는 변수를 관리할 수도 있다.

useState의 경우 state를 바꾸는 함수를 호출하고 나서 그 다음 렌더링이 되어야 비로소 업데이트 된 상태를 조회 할 수 있는 반면, `useRef` 로 관리하고 있는 변수는 설정 후 바로 조회 할 수 있다.

아래는 사용자 리스트를 생성하는 코드이다. 새로운 사용자를 생성하고 각 요소마다 고유한 id를 관리할 때 `useRef`를 사용할 수 있다.

### App.js

```jsx
import React from 'react';

import UserList from './UserList';

function App() {
  const users = [
    {
      id: 1,
      username: 'velopert',
      email: 'public.velopert@gmail.com'
    },
    {
      id: 2,
      username: 'tester',
      email: 'tester@example.com'
    },
    {
      id: 3,
      username: 'liz',
      email: 'liz@example.com'
    }
  ];
  return <UserList users={users} />;
}

export default App;
```

### UserList.js

```jsx
import React from 'react';

// 사용자(User)
function User({ user }) {
  return (
    <div>
      <b>{user.username}</b> <span>({user.email})</span>
    </div>
  );
}

// 사용자 리스트(UserList)
function UserList({ users }) {
  return (
    <div>
      {users.map(user => (
        <User user={user} key={user.id} />
      ))}
    </div>
  );
}

export default UserList;
```

### App.js