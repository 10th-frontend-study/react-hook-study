# useState는 어쩌다 생기게 되었을까

### 베경

`Class Component` vs `Functional Component`

- Functional Component
    - 함수형 컴포넌트
    - 기본적으로 `불변성` 이라는 특징을 가짐
    - 리렌더링이 필요한 경우 한 번 더 호출됨
- Class Component
    - 함수형 컴포넌트 이전에 사용하던 클래스형 컴포넌트
    - this 가 가리키는 것, 내부 상태값의 변화 등의 문제로 메서드를 실행하는 시점의 어떤 값을 예측하는 데 문제가 있었음

### useState가 생긴 이유

- `불변성`이라는 함수형 컴포넌트의 특징이 단점이 됨
- 상태가 변하지 않는 pure한 컴포넌트로 모든 것을 만드는 것은 쉽지 않은 일임
- 상태 관리를 위해 useState가 생김


<br/><br/>

# useState 사용법

```jsx
import { useState } from 'react';

// let index = 0;
const [index, setIndex] = useState(0);
```

- `index` : 상태 변수
- `setIndex` : setter 함수
- `useState()` : 괄호 안에는 하나의 인자(변수의 초기값)를 받음

```jsx
useState(initialState)
```

```jsx
import { useState } from 'react';

function MyComponent() {
  const [age, setAge] = useState(28);
  const [name, setName] = useState('Taylor');
  const [todos, setTodos] = useState(() => createTodos());
  // ...
```

useState 네임 컨벤션 `[something, setSomething]`

### useState 사용 시 주의할 점

<aside>
💡 주의 

1. 모든 `hooks`는 컴포넌트 최상단에 위치해야 한다.
2. 조건문, 반복문, 중첩 함수 내부에서는 hooks를 호출할 수 없다.
3. React Function에서만 hooks 호출 가능

</aside>

<br/>

### 일반 변수를 사용한 경우

[코드 작동 보러가기](https://react.dev/learn/state-a-components-memory#when-a-regular-variable-isnt-enough)

![useState1](../images/useState1.png)

```jsx
// App.js
import { sculptureList } from './data.js';

export default function Gallery() {
  let index = 0;

  function handleClick() {
    index = index + 1;
  }

  let sculpture = sculptureList[index];
  return (
    <>
      <button onClick={handleClick}>
        Next
      </button>
      <h2>
        <i>{sculpture.name} </i> 
        by {sculpture.artist}
      </h2>
      <h3>  
        ({index + 1} of {sculptureList.length})
      </h3>
      <img 
        src={sculpture.url} 
        alt={sculpture.alt}
      />
      <p>
        {sculpture.description}
      </p>
    </>
  );
}
```

### useState를 사용한 코드

```jsx
import { useState } from 'react';
import { sculptureList } from './data.js';

export default function Gallery() {
  const [index, setIndex] = useState(0);

  function handleClick() {
    setIndex(index + 1);
  }

  let sculpture = sculptureList[index];
  return (
    <>
      <button onClick={handleClick}>
        Next
      </button>
      <h2>
        <i>{sculpture.name} </i> 
        by {sculpture.artist}
      </h2>
      <h3>  
        ({index + 1} of {sculptureList.length})
      </h3>
      <img 
        src={sculpture.url} 
        alt={sculpture.alt}
      />
      <p>
        {sculpture.description}
      </p>
    </>
  );
}
```



## useState의 특징
* state는 isolated하고 private함

* 같은 컴포넌트를 두 번 렌더할 경우 각 복사본 컴포넌트의 두 state는 완전히 다른 것이기 때문에 서로에게 영향을 주지 않음

### 한 컴포넌트에서 두 개의 state 사용하기

따라서 위에서 각각의 state는 왼쪽 컴포넌트, 오른쪽 컴포넌트가 개별적으로 작동함
![useState2](../images/useState2.png)

`Show details` 클릭 시

[코드 작동 보러가기](https://react.dev/learn/state-a-components-memory#state-is-isolated-and-private)



```jsx
import { useState } from 'react';
import { sculptureList } from './data.js';

export default function Gallery() {
  const [index, setIndex] = useState(0);
  const [showMore, setShowMore] = useState(false);

  function handleNextClick() {
    setIndex(index + 1);
  }

  function handleMoreClick() {
    setShowMore(!showMore);
  }

  let sculpture = sculptureList[index];
  return (
    <>
      <button onClick={handleNextClick}>
        Next
      </button>
      <h2>
        <i>{sculpture.name} </i> 
        by {sculpture.artist}
      </h2>
      <h3>  
        ({index + 1} of {sculptureList.length})
      </h3>
      <button onClick={handleMoreClick}>
        {showMore ? 'Hide' : 'Show'} details
      </button>
      {showMore && <p>{sculpture.description}</p>}
      <img 
        src={sculpture.url} 
        alt={sculpture.alt}
      />
    </>
  );
}
```

위처럼 서로 관계가 없는 두 state일 경우에는 두 state로 개별적으로 사용하면 되지만 두 state가 동시에 사용될 경우에는 하나의 오브젝트로 담아서 사용하는 것이 편리하다.

### [useState structure로 사용하기](./StateStructure.md)

<br/><br/>

# 리액트 훅은 마법이 아닌 배열이다.

[React Hook 동작 원리에 대한 글](https://medium.com/@ryardley/react-hooks-not-magic-just-arrays-cd4f1857236e)

- hooks의 동작 원리를 알 수 있음
- 왜 루프, 조건문, 중첩함수 내에서 사용하면 안되는지 알 수 있음
