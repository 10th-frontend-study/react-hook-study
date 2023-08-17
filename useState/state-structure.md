# ****Choosing the State Structure****

### `single` vs `multiple` state variables

- 단일 state와 복합 state를 언제 어떻게 사용하면 좋을까
- state를 organizing할때 주의해야 할 점
- state 구조화에 있어 흔히 발생하는 이슈를 대처하는 법

<br/>

### Single State 사용 방식

```jsx
const [x, setX] = useState(0);
const [y, setY] = useState(0);
```

<br/>

### Multiple State 사용 방식

```jsx
const [position, setPosition] = useState({ x: 0, y: 0 });
```

항상 같이 사용해야하는 변수라면 object 혹은 array 등으로 구조화해서 하나의 state로 사용하는 것이 권장된다.

이렇게 하면 사용할 때마다 두 state의 sync를 맞출 필요도 없고 실수를 줄일 수 있다.

<br/>

### 실습 예제 코드

마우스 위치에 따라 함께 움직이는 포인터

#### [코드 작동 보러가기](https://react.dev/learn/choosing-the-state-structure#group-related-state)

```jsx
import { useState } from 'react';

export default function MovingDot() {
  const [position, setPosition] = useState({
    x: 0,
    y: 0
  });
  return (
    <div
      onPointerMove={e => {
        setPosition({
          x: e.clientX,
          y: e.clientY
        });
      }}
      style={{
        position: 'relative',
        width: '100vw',
        height: '100vh',
      }}>
      <div style={{
        position: 'absolute',
        backgroundColor: 'red',
        borderRadius: '50%',
        transform: `translate(${position.x}px, ${position.y}px)`,
        left: -10,
        top: -10,
        width: 20,
        height: 20,
      }} />
    </div>
  )
}
```
