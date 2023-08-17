# Quiz1.
### 아래 코드를 보고 콘솔에는 뭐가 찍힐지 생각해보기

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


콘솔에 여전히 Taylor가 찍히는 이유.

변경된 state의 return값이 다음 렌더가 시작될 때 return되기 때문임.

### [실습 예제코드](https://react.dev/reference/react/useState#examples-basic)



# Quiz2.
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

<br/><br/><br/>

# useState의 초기값으로 함수 전달할 때 유의할 점

```jsx
function TodoList() {
  const [todos, setTodos] = useState(createInitialTodos());
  // ...
```

 `createInitialTodos()` 는 자기 함수를 호출한 결과이기 때문에 렌더링할 때마다 매번 함수를 호출함 → 낭비

```jsx
function TodoList() {
  const [todos, setTodos] = useState(createInitialTodos);
  // ...
```

함수 자신을 전달하는 것이 한 번만 수행되게 해준다.

### [실습 예제 코드](https://react.dev/reference/react/useState#examples-initializer)

<br/><br/><br/>

# Trouble Shooting

### 1. state를 update했는데 old value를 반환하는 경우

https://react.dev/reference/react/useState#troubleshooting

state는 일반적인 자바스크립트의 변수처럼 보이지만 사실은 좀 더 snapshot처럼 동작한다.

[state는 snapshot처럼 동작한다는 말의 의미](./state-snapshot.md)

### 2. state를 update했는데 화면이 update되지 않는 경우

리액트에서는 **`Object.is()`** 다음 state가 이전 state와 동일하다면 사용자의 update 요청을 무시한다.

이는 흔히 array 혹은 object 데이터를 직접적으로 수정하려고 할 때 발생하는 실수이다.

```jsx
obj.x = 10;  // 🚩 Wrong: 기존 오브젝트를 수정하려고 함
setObj(obj); // 🚩 아무일도 일어나지 않는다.
```


```jsx
// ✅ Correct: 새 오브젝트를 생성하는 방식으로 업데이트한다.
setObj({
  ...obj,
  x: 10
});
```