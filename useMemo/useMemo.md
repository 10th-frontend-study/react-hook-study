# useMemo

<br>

### **Memoization ( 메모이제이션 )**

- 동일한 계산을 반복해야 할 때 `이전값`을 메모리에 `저장` 함으로써 계산의 반복수행을 제거하여 프로그램 `실행속도`를 빠르게 하는 기술
- 필요할 때마다 또 다시 계산하지 않고, 저장한 값을 `재사용`하는 기법

<br>

## useMemo란?

- 여기서 Memo란 `Memoization`을 의미
- useMemo는 메모이제이션된 `값`을 반환
- 이전에 계산한 값을 메모리에 저장함으로써 재렌더링이 되어도 다시 함수 호출을 하지 않고 이전 결과값을 `재사용`
- 재렌더링 사이의 계산 결과를 `캐시`할 수 있는 훅

<br>

## 사용법

```jsx
const cachedValue = useMemo(calculateValue, dependencies)
```

- **calculateValue**
    - 캐시하려는 값을 계산해서 리턴해주는 `함수`
- **dependencies**
    - `의존성 배열`
    - `Object.is`를 통해 이전 값과 비교를 진행
    - 마지막 렌더링 이후 `변경되지 않았으면` `동일한` 값 반환
    - `값이 변하게` 된다면 `calculateValue` 함수를 실행 후 값 저장
    - 빈배열이라면 맨 처음 컴포넌트가 마운트 되었을 때만 값을 계산하고, 이후에는 항상 메모이제이션된 값을 꺼내와서 사용


<br>

## useMemo 예제

### 코드1

```jsx
import React, { useMemo, useState } from "react";

const hardCalculate = (number) => {
  console.log("나 지금 복잡한 계산 중이야.. 💤💤");
  for (let i = 0; i < 999999999; i++) {} // 복잡한 계산 시간
  return number + 10000;
};

const easyCalculate = (number) => {
  console.log("나 지금 쉬운 계산 중이야.. 🙂🙂");
  return number + 1;
};

// 함수형컴포넌트에서의 렌더링 > 컴포넌트 함수 호출 > 모든 내부 변수 초기화
function App() {
  const [hardNumber, setHardNumber] = useState(0);
  const [easyNumber, setEasyNumber] = useState(0);
	
  // const hardSum = hardCalculate(hardNumber);

  // const hardSum = useMemo(() => {
  //   return hardCalculate(hardNumber);
  // }, [hardNumber]);
  
  const easySum = easyCalculate(easyNumber);
  
  return (
    <div>
      <h3>어려운 계산기</h3>
      <input
        type="number"
        value={hardNumber}
        onChange={(e) => setHardNumber(parseInt(e.target.value))}
      />
      <span> + 10000 = {hardSum}</span>
      
      <h3>쉬운 계산기</h3>
      <input
        type="number"
        value={easyNumber}
        onChange={(e) => setEasyNumber(parseInt(e.target.value))}
      />
      <span> + 1 = {easySum}</span>
    </div>
  );
}

export default App;
```

### 코드2

```jsx
import { useMemo, useEffect, useState } from "react";

function App() {
  const [number, setNumber] = useState(1);
  const [isKorea, setIsKorea] = useState(true);

  // 1번 location
  // const location = isKorea ? "한국" : "일본";

  // 2번 location
  // const location = {
  //   country: isKorea ? "한국" : "일본"
  // };

  // 3번 location
  // const location = useMemo(() => {
  //   return {
  //     country: isKorea ? '한국' : '일본'
  //   }
  // }, [isKorea]);

  // 렌더링이 될때마다 location이 초기화 되는 것을 막아주면 됨
  // isKorea가 바뀔때만 초기화가 되도록 useMemo dependencies 설정

  useEffect(() => {
    console.log("useEffect 호출!");
  }, [location]);

  return (
    <header className="App-header">
      <h3>하루에 몇 끼 먹어요? 🍴</h3>
      <input
        type="number"
        value={number}
        onChange={(e) => setNumber(e.target.value)}
      />
      

      <h3>어느 나라에 있어요?? 🌈</h3>
      <p>나라: {location.country}</p>
      <button onClick={() => setIsKorea(!isKorea)}>바꾸기</button>
    </header>
  );
}

export default App;
```

### 원시타입 vs 참조타입

```jsx
// 원시(Primitive) 타입 ex) String, number, Boolean
// 데이터의 실제 값을 할당
const location1 = "korea";
const location2 = "korea";

console.log(location1 === location2);  
// true

// 참조(Reference) 타입
// 데이터의 주소 값만 할당
const location3 = {
	country : "korea"
}
const location4 = {
	country : "korea"
}

console.log(location3 === location4);

// false
// 참조타입은 주소 값을 참조하기 때문에 데이터의 값이 같더라도 서로 다른 주소를 가리키기에 false
```

<br>

## ****Troubleshooting****

### 1.  객체를 반환해야 하는데 잘못된 반환을 하는 경우

```jsx
// 🔴 () => { 는 arrow function에서 객체를 반환할 수 없음
  const searchOptions = useMemo(() => {
    matchMode: 'whole-word',
    text: text
  }, [text]);

// () => ({ }) 가능은 하지만 같은 실수를 유발할 수 있음
  const searchOptions = useMemo(() => ({
    matchMode: 'whole-word',
    text: text
  }), [text]);

// ✅ 가장 명시적인 방법
  const searchOptions = useMemo(() => {
    return {
      matchMode: 'whole-word',
      text: text
    };
  }, [text]);
```

### 2. 각각의 item을 memo하고 싶은 경우

```jsx
function ReportList({ items }) {
  return (
    <article>
      {items.map(item => {
        // 🔴 다음과 같은 루프에서는 useMemo를 사용 할 수 없음
        const data = useMemo(() => calculateReport(item), [item]);
        return (
          <figure key={item.id}>
            <Chart data={data} />
          </figure>
        );
      })}
    </article>
  );
}
```

```jsx
function ReportList({ items }) {
  return (
    <article>
      {items.map(item =>
        <Report key={item.id} item={item} />
      )}
    </article>
  );
}

// ✅ 각 항목에 대한 구성요소 추출 후 useMemo
function Report({ item }) {
  const data = useMemo(() => calculateReport(item), [item]);
  return (
    <figure>
      <Chart data={data} />
    </figure>
  );
}
```

```jsx
import { memo } from "react";

const Report = memo(function Report({ item }) {
  const data = calculateReport(item);
  return (
    <figure>
      <Chart data={data} />
    </figure>
  );
});
// memo를 사용해 props의 변경이 있을 때만 리렌더링
// item의 변경이 없으면 Chart 컴포넌트의 렌더링을 건너뛸 수 있음
```

- **React.memo 간단 정리**
    
    ### React.memo란
    
    - `HOC(고차 컴포넌트)` : 컴포넌트를 인자로 받아서 새로운 컴포넌트를 리턴해주는 함수
    - `props의 변화` 가 있다면 렌더링 진행, 없으면 기존 렌더링 된 내용 재사용
    - 불필요한 `리렌더링 방지`
    
    ### 적합한 상황
    
    1. 컴포넌트가 같은 props로 자주 렌더링 될 때
    2. 컴포넌트가 렌더링이 될때마다 복잡한 로직을 처리해야할  때
    
    ### 사용법
    
    ```jsx
    const MemoizedComponent = memo(SomeComponent, arePropsEqual?)
    ```
    
    - `SomeComponent` : memo할 컴포넌트
    - `arePropsEqual` : 비교 방식을 커스텀할 때 사용하는 함수 ( 선택사항 )
    
    ### 예시
    
    ```jsx
    import React, { memo } from "react";
    
    const Test = (props) => {
      console.log("render");
      return <h1>{props.todoTitle}</h1>;
    };
    
    export default memo(Test);
    ```
    
    - 오직 props의 변화에만 의존
    - 컴포넌트가 useState, useContext 등 상태와 관련된 훅을 사용한다면 props의 변화가 없더라도 재렌더링 발생
    

### useMemo는 대가 없이 제공되지 않는다


- 메모이제이션을 하기 위해 메모리를 추가적으로 사용
- 오히려 성능악화로 이어질 수 있음

### 이때는 useMemo 사용을 피하자

1. **최적화 하려는 계산의 비용이 크지 않은 경우**
2. **메모이제이션이 필요한지 확실하지 않은 경우**
    - useMemo없이 작업 후, 문제가 발생하면 코드에 점진적으로 적용해 나가는 것이 좋음
3. **메모하고 있는 값이 컴포넌트로 전달되지 않는 경우**
    - 다른 컴포넌트의 렌더링에 영향을 주지 않으므로 기억할 필요가 없음
4. **의존성 배열이 너무 자주 변경되는 경우**
    - 항상 재계산되므로 성능적인 이점을 제공하지 않음
    

### 참고

- https://react.dev/reference/react/useMemo
- https://www.youtube.com/watch?v=e-CnI8Q5RY4
- https://javascript.plainenglish.io/stop-using-usememo-now-e5d07d2bbf70#5aca
- https://github.com/yeonjuan/dev-blog/blob/master/JavaScript/should-you-really-use-usememo.md