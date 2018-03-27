# JSX
  - JSX란
  - JSX 사용 방법
  - JSX 특징

---

## JSX
  ### 1. JSX 란
  - JavaScript + XML을 합쳐서 탄생한 자바스크립트의 확장 문법
  - XML-like syntax 를 native JavaScript로 변경한다.
    - ""로 감싸지 않는다.
    - ()를 사용하지 않아도 되지만 사용하는 것이 좋다..
  - 확장자의 경우 요즘에는 `.js` 로 하는것이 추세이다. 가끔 `react.js` 확장자를 쓰기도 한다.

  ### 2. JSX 사용
  - App.js 를 확인해보면..
  - class 개념이 ES6 에 도입되었다.
  - `render` : 여기에 컴포넌트에 렌더링 될 데이터를 정의한다!!
    - "" 를 사용하지 않음에 주의하고
    - () 는 안써도 되지만 쓰는것이 가독성이 좋아진다.


  ```JavaScript
  import React from 'react';

  class App extends React.Component {
      render(){
          return (
              <div>
                  <h1>Hello React</h1>
              </div>
          );
      }
  }

  export default App;
  ```

  ### 3. JSX 특징 - Nested Element
  - 컴포넌트에서 여러 Element를 랜더링 해야할 때 반드시 `container element` 에 포함시켜야 한다

  ```JavaScript
  // 오류
  return  (
             <h1> Hello Velopert</h1>
             <h2> Welcome </h2>
         );

  // 다음과 같이 container element 로 감싸야만 한다.
  return  (
              <div>
                <h1> Hello Velopert </h1>
                <h2> Welcome </h2>
              </div>
          );
  ```

  ### 4. JSX 특징 - JavaScript Expression
  - JSX 안에서 JavaScript 문법은 `{}` 로 wrapping 한 뒤 사용
  - `if-else` 문 사용 불가능하므로 `삼항연산자` 를 사용한다.
  - (참고- `let` 은 ES6 에서 새로 추가된 문법 cf> `const`)

  ```JavaScript
  render(){
          let text = "Dev-Server"
          return  (
              <div>
                  <h1> Hello Velopert </h1>
                  <h2> Welcome to {text}</h2>
              </div>
          );
      }
  ```

  > method 생성 및 실행시키기 (onClick에 {} 를 넣어 실행시킨다.)

  ```JavaScript
  let text = "Dev-Server";

  sayHey(){
     alert("hey");
  }

  render(){
      let text = "Dev-Server"
      return  (
          <div>
              <h1> Hello Velopert </h1>
              <h2> Welcome to {text}</h2>
              <button onClick={this.sayHey}>Click Me</button>
          </div>
      );
  }
  ```

  ### 5. JSX 특징 - Inline Style
  - React의 Inline Style 에서는, string 형식이 사용되지 않고 key 가 camelCase 인 Object 가 사용

  ```JavaScript
  render(){
      let pStyle = {
          color: 'aqua',
          backgroundColor: 'black'
      }; // backgroundColor 를 camelCase로 작성해야 한다.

      return  (
          <div>
              <h1> Hello Velopert </h1>
              <h2> Welcome to {text}</h2>
              <button onClick= {this.sayHey}>Click Me</button>
              <p style = {pStyle}>{1 == 1 ? 'True' : 'False'}</p>
          </div>
      );
  }
  ```

  ### 6. JSX 특징 - 주석
  - `{ /* ... */ }` 형식으로 작성한다.
  - 반드시 container element 안에 주석이 작성되어야만 한다!!

  ### 7. JSX 특징 - Naming Convention
  - React Component 은 첫 문자가 대문자인 CamelCase 로 작성됩니다.

---
## 참고
  ### 1. JSX 를 쓰지 않는다면?
  - JSX 와 babel 에서 컴파일을 해준 결과는 아래와 같다.
  - 즉, 가독성이 떨어진다!!

  > JSX

  ```JavaScript
  const element = (
    <h1 className="greeting">
      Hello, world!
    </h1>
  );
  ```

  > 컴파일 후

  ```JavaScript
  const element = React.createElement(
    'h1',
    {className: 'greeting'},
    'Hello, world!'
  );
  ```
