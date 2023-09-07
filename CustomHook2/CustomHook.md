# Custom Hook

### Custom Hook이란?

- 반복되는 로직을 묶어 하나의 컴포넌트로 만들듯이 반복되는 메서드를 하나로 묶어 사용
- 특정 상태관리나 라이프사이클 로직들을 추상화하여 묶어서 재사용이 가능하도록 제작이 가능한 함수

### 왜 사용할까?

- 로직을 컴포넌트 간에 `재사용` 함으로써 필요없는 반복을 줄임
- 코드, 로직이 간결해지고 `가독성`이 좋아짐
- 수정사항이 있을 시 커스텀 훅에서만 수정하면 되므로 `유지보수에 용이`
- 어떤일을 하고 어떤 목적을 가지고 설계된 코드인지 더욱 `명료`해짐

### 참고

1. Custom Hook의 이름은 `use로 시작`해야 함
2. Hook 안에서 `다른 Hook을 호출`할 수 있음
3. 같은 Hook을 사용하는 두 개의 컴포넌트는 `state를 공유하지 않는다.`
    - 두 커스텀 훅은 서로 호출되는 위치와 타이밍이 다름
    - 따라서 서로 다른 스코프(유효범위)를 생성하기 때문에 완전히 `독립적`으로 작동
4. 초기값을 파라미터로 넘겨주는게 일반적

### useInpt

- input 태그 상태 관리

```jsx
function useInput(initalState){
    const [data, setValue] = useState(initalState);
    const handleChange = useCallback( (e) => {
    	const { name, value } = e.target; // input태그의 name값과 value값 불러옴
	  setValue({ ...data, [name]: value }); //input이 여러개일때 ...data로 상태관리
    },[data]);

    return [data, handleChange];
};
```

```jsx
function MyComponent() {
    const [data, handleChange] = useInput({
        id : "",
        email : "",
        password : "",
        phone : "",
      });
  
    useEffect( () =>{
        console.log(data);
    }, [data]);

    return (
        <>	
            <h1>
	        useInput
            </h1>
            <div>
                <div className="input-div">
                  <input type="text" name="id" value={data.id} onChange={handleChange}></input>
                  <input type="text" name="email" value={data.email} onChange={handleChange}></input>
                  <input type="text" name="password" value={data.password} onChange={handleChange}></input>
                </div>
            </div>
        </>
    )
};
```

### 스프레드 연산자를 통해 리팩토링

```jsx
function useInput(initalState){
    const [data, setValue] = useState(initalState);
    const handleChange = (e) => {
        setValue(e.target.value); 
    };
    return { data, onChange: handleChange };
};
```

```jsx
const phone = useInput("");
useEffect( () =>{
  console.log(phone);
}, [phone])

<input type="text" {...phone}></input>
```
<br>

### useToggle

```jsx
const useToggle = (initialState = false) => {
    const [state, setState] = useState(initialState);
    const toggle = useCallback(() => setState(state => !state), []);
    
    return [state, toggle]
}

// usage
import { useCallback, useState } from 'react';

function App() {
    const [isTextChanged, setIsTextChanged] = useToggle();
    
    return (
        <button onClick={setIsTextChanged}>{isTextChanged ? 'Toggled' : 'Click to Toggle'}</button>
    );
}
```

<br>

### usePrevious

- 이전 렌더링 값을 기억해 두어야 할 때 사용
- 현재 렌더링과 이전 렌더링 값을 비교해야 할 때 사용

```jsx
import { useEffect, useRef } from 'react';

function usePrevious(value) {
  const ref = useRef(); // 불필요한 리렌더링 방지를 위해 useState가 아닌 useRef

  useEffect(() => {
    ref.current = value;
  }, [value]); 

  return ref.current;
}

export default usePrevious;
```

```jsx
function MyComponent() {
  const [alphabet, setAlphabet] = useState('A');
  const prevAlphabet = usePrevious(alphabet);
  
// 현재 값이 C이고 이전 값이 B라면
  useEffect(() => {
    if (alphabet === 'C' && prevAlphabet === 'B') {
       doSomething();
    }
  }, [alphabet]);
  // ..
}
```

### ❌ 주의사항

- 단순한 로직 분리로만 사용하면 안됨
- 컴포넌트에 종속해서 사용하게 만든 훅은 좋지 못한 훅임
- 변수이름을 일반적으로 지어야 함

<br>

### 참고

- https://react.dev/learn/reusing-logic-with-custom-hooks

- https://usehooks.com/useprevious

- https://www.d0dam.com/blog/react/react-hooks/make-hooks-with-think

- https://medium.com/finda-tech/%ED%95%80%EB%8B%A4%EC%97%90%EC%84%9C-%EC%93%B0%EB%8A%94-react-custom-hooks-1a732ce949a5

