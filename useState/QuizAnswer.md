# Quiz1. 정답

```jsx
import { useState } from 'react';

function MyComponent() {
  const [age, setAge] = useState(42);
  const [name, setName] = useState('Taylor');
  // ...
```


```jsx
function handleClick() {
  setName('Robin');
  console.log(name); // 뭐가 나올까요
}
```
<br/>

### 답.

콘솔에는 여전히 Taylor가 찍힌다.
그 이유는 변경된 state의 return값이 다음 렌더가 시작될 때 return되기 때문이다.

### [실습 예제코드](https://react.dev/reference/react/useState#examples-basic)


<br/><br/>

# Quiz2. 정답

### 직전 값을 기반으로 새 값 리턴하기
현재 age가 42라고 가정할 때 setAge를 아래와 같이 세 번 호출한다.

```jsx
function handleClick() {
  setAge(age + 1); 
  setAge(age + 1); 
  setAge(age + 1); 
}

// handleClick 함수가 호출되었을 때 age값은 몇일까요
```

<br/>

### 답.

버튼을 클릭했을때 age는 45가 아닌 43이 된다. 코드가 돌아가는 중에는 setter가 업데이트되지 않기 때문임.

그래서 각각의 setAge(age+1) 은 결국 setAge(43)이 된다.

<br/>

### 해결방법.

```jsx
function handleClick() {
  setAge(a => a + 1); // setAge(42 => 43)
  setAge(a => a + 1); // setAge(43 => 44)
  setAge(a => a + 1); // setAge(44 => 45)
}
```

### [차이점 알아보기](https://react.dev/reference/react/useState#examples-updater)
