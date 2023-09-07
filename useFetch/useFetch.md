### `custom hooks`란?

React에서 커스텀 훅이란 `상태 로직을 재사용`할 수 있도록 하는 기능이다.

- 이는 컴포넌트에서 공통적으로 사용되는 상태 로직을 추출하여 하나의 함수로 만들어 사용할 수 있도록 한다.
- 보통 `use`라는 `접두사`를 사용하여 함수의 이름을 정의하며, React의 기본 훅(useState, useEffect)을 이용하여 구현한다.
- JSX 코드나 렌더링과 관련된 코드를 포함해서는 안된다.
- 컴포넌트 내부, 외부에서 호출하여 사용한다.

<br/>

### `custom hooks`를 쓰는 이유

컴포넌트를 만들다 보면 반복되는 로직이 자주 발생된다. 이때 custom hooks를 만들어서 반복되는 로직을 쉽게 재활용할 수 있다.

- 자주 반복되는 로직 중에 `상태 관리`가 필요한 경우

  - 입력값 검증 util 함수

  ```jsx
  function validateEmail(email) {
    const re =
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }
  ```

  - custom hooks로 변경했을 때

  ```jsx
  import { useState } from "react";

  function useEmailValidation() {
    const [emailValid, setEmailValid] = useState(false);

    function validateEmail(email) {
      const re =
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      setEmailValid(re.test(email));
    }

    return { emailValid, validateEmail };
  }
  ```

→ 결국 `custom hooks`는 `react hooks`를 사용하여 `특정 동작이나 기능을 제공하는 함수`이다.

---

### `useFetch`란

- 데이터를 받아와 상태를 업데이트 하는 로직을 처리하는 hook이다.

<br/>

### `useFetch` 만들기

- 페이지에 들어가자마자 backend에서 데이터를 받아와야하는 상황

- 기존 코드는 다음과 같다.

```jsx
const [sources, setSources] = useState([]);

useEffect(() => {
  fetch("/todos/1", {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      setSources(data);
    });
}, []);
```

<br/>

- `useFetch.js` 를 구현한 코드는 다음과 같다.

```jsx
import { useState, useEffect } from "react";

const useFetch = (url) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => setData(data));
  }, [url]);

  return [data]; // 받아온 데이터를 반환
};

export default useFetch;
```

<br/>

- `useFetch.js`를 호출한 코드는 다음과 같다.

```jsx
...
import useFetch from '../../../hooks/useFetch';
...
const [sources] = useFetch('/todos/1'); // todo 받아오기**
...
  return (
...
        {sources &&
          sources.map((source, index) => (
            <div key={index}>
              <Item source={source} />
            </div>
          ))}
...
  );
};
```
