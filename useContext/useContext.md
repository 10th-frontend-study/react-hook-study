# useContext

<br>

## 목차
1. [useContext란?](#useContext란?)
2. [왜 useContext를 사용하는가?](#왜-usecontext를-사용하는가)
3. [사용 방법](#사용-방법)
4. [주의사항](#주의할-점)

<br>

## useContext란?

> 특정범위 내에 존재하는 각각의 컴포넌트에서 동일한 데이터에 접근할 수 있게 해주는 기능

- props가 아닌 또 다른 방식으로 컴포넌트 간 값을 전달하는 방법

- 전역적(global)으로 필요한 데이터를 다룰 때 사용

- ex) 로그인된 사용자 정보, 테마, 언어 등

- 재사용성이 높은 컴포넌트를 만들때도 유용하게 사용 가능


## 왜 useContext를 사용하는가?

- react에서의 데이터 흐름은 props를 통해 부모에서 자식으로 전달
- but, 엄청 큰 react 앱에서 공통적으로 필요한 전역적인 데이터가 있을 때
- props로 일일히 전달하는 것은 매우 비효율적!!
 

<br>

#### Prop Drilling

> props를 통해 데이터를 전달하는 과정에서 중간 컴포넌트는 그 데이터가 필요하지 않음에도 자식컴포넌트에 전달하기 위해 props를 전달해야하는 과정

```javascript
import React from "react";

const First = ({ content }) => {
  return (
    <div>
      <h3>I am the first component</h3>
      <Second content={content} />
    </div>
  );
}

const Second = ({ content }) => {
  return (
    <div>
      <h3>I am the Second component</h3>
      <NeedingProps content={content} />
    </div>
  );
}

const NeedingProps = ({ content }) => {
  return <h3>{content}</h3>
}

export default function App() {
  return (
    <div>
      <First content="Who needs me?" />
    </div>
  );
}
```

- Prop drilling을 피하기 위한 목적이라면 Component Composition(컴포넌트 합성)이 더 좋은 해결책이 될 수 있음

<br>

## 사용 방법

#### createContext(defaultValue)
```javascript
import { createContext } from "react";

export const ThemeContext = createContext(defaultValue)
```
- Provider로 감싸주지 않고 전달했을 때의 초기값
- 지정하지 않았을 때는 undifined

#### Context.Provider
```javascript
function App() {
  const [isDart, setIsDark] = useState(false);
  return (
    <ThemeContext.Provider value={{ isDart, setIsDark }}>
      <Page />
    </ThemeContext.Provider>
  );
}
```
#### Provider 중첩
```javascript
return (
  <ThemeContext.Provider value="dark">
    ...
    <ThemeContext.Provider value="light">
      <Footer/>
    </ThemeContext.Provider>
    ...
  </ThemeContext.Provider>
)
```
- 가장 가까운 Provider의 value를 참조

#### useContext()
```javascript
import { useContext } from 'react';

  function MyComponent() {
    const [isDart, setIsDark] = useContext(ThemeContext);
    const toggleTheme = () =>{
      setIsDark(!isDart);
    }
  }

 return (
  <header
    className="footer"
    style={{
      backgroundColor: isDart ? 'black' : 'white',
    }}
  >
    <button className="button" onClick={toggleTheme}>
      Dark Mode
    </button>
  </header>
);
```

<br>

## Context와 상태 관리 라이브러리

- Context 는 전역 상태 관리를 할 수 있는 수단
- 상태 관리 라이브러리는 상태 관리를 더욱 편하고, 효율적으로 할 수 있게 해주는 기능을 제공
- 상태 관리 외의 여러 기능이 필요하다면 상태 관리 라이브러리 사용!!
- ex) Redux, Recoil, Zustand ... 
 

## 주의할 점

1. 불필요한 렌더링이 발생하지 않도록 하기 !!
  - 전달하는 value에 새로운 객체가 만들어지지 않도록 해야 불필요한 렌더링 방지 가능
 
  - useMemo 등 활용

  - 상태변화가 거의 일어나지 않는 테마, 언어 등에 활용하면 적합

2. 반드시 value로
```javascript
  <ThemeContext.Provider value={theme}>
    <Button />
  </ThemeContext.Provider>
```

3. Provider를 찾지 못하는 경우를 대비해서 초기값 세팅


<br>

### 참고

- [https://www.youtube.com/watch?v=LwvXVEHS638](https://www.youtube.com/watch?v=LwvXVEHS638)
- [https://velog.io/@velopert/react-hooks#1-usestate](https://velog.io/@velopert/react-hooks#1-usestate)
- [https://ko.legacy.reactjs.org/docs/context.html](https://ko.legacy.reactjs.org/docs/context.html)