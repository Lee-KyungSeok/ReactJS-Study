# Component LifeCycle API
  - Component LifeCycle 이란
  - Component LifeCycle API 설명

---

## Component LifeCycle API 기초
  ### 1. Component LifeCycle API 란
  - 컴포넌트가 DOM 위에 생성되기 전 후, 데이터가 변경되어 상태를 업데이트하기 전 후, 컴포넌트가 DOM 에서 사라지기 전에 실행되는 메소드
  - 각 API 는 오버라이딩해서 사용할 수 있다.
  - 이를 이용해서 컴포넌트를 효율적으로 관리할 수 있다.
  - API 종류
    - ~~componentWillMount        : (사라짐) 랜더링이 되기 전 실행~~
    - componentDidMount         : 랜더링이 된 다음 실행
    - ~~componentWillReceiveProps : (사라짐) 새로운 props 를 받았을 때 실행~~
    - shouldComponentUpdate     : Component 가 update를 할지 말지 정하는 부분
    - ~~componentWillUpdate       : (사라짐) Component 가 update 되기 전 실행~~
    - componentDidUpdate        : Component 가 update 된 다음 실행
    - componentWillUnmount      : Component 가 제거될 때 실행

  ### 2. 라이프사이클 다이어 그램
  - 아래 그림과 같이 실행 된다.

  ![](https://github.com/Lee-KyungSeok/ReactJS-Study/blob/master/ComponentLifeCycle/picture/lifecycle.png)

---

## Component LifCycle API 구성 및 설명
  ### 1. constructor
  - 컴포넌트가 처음 만들어질 대 실행된다.
  - 기본 state 를 설정할 수 있다.

  ```javascript
  constructor(props){
      super(props);
      console.log("constructor");
  }
  ```

  ### 2. ~~componentWillMount~~
  - 컴포넌트가 DOM 위에 만들어지기 전 실행

  ```javascript
  componentWillMount(){
      console.log("componentWillMount");
  }
  ```

  ### 3. render
  - 컴포넌트 렌더링을 담당

  ### 4. componentDidMount
  - 컴포넌트가 만들어지고 첫 렌더링을 다 마친 후 실행
  - 다른 JavaScript 프레임워크를 연동하거나, setTimeout, setInterval 및 AJAX 처리를 하도록 한다.

  ```javascript
  componentDidMount(){
      console.log("componentDidMount");
  }
  ```

  ### 5. ~~componentWillReceiveProps~~
  - 컴포넌트가 prop 을 새로 받았을 때 실행
  - prop 에 따라 state 를 업데이트 해야 할 때 사용하면 유용
  - 이 안에서 this.setState() 를 해도 추가적으로 렌더링하지 않는다.

  ```javascript
  componentWillReceiveProps(nextProps){
      console.log("componentWillReceiveProps: " + JSON.stringify(nextProps));
  }
  ```

  ### 6. shouldComponentUpdate
  - prop 혹은 state 가 변경 되었을 때, 리렌더링을 할지 말지 정하는 메소드
  - true 혹은 false 를 통해 이를 결정
  - ex> return nextProps.id !== this.props.id;
JSON.stringify() 를 쓰면 여러 field 를 편하게 비교 할 수 있다.

  ```javascript
  shouldComponentUpdate(nextProps, nextState){
      console.log("shouldComponentUpdate: " + JSON.stringify(nextProps) + " " + JSON.stringify(nextState));
      return true;
  }
  ```

  ### 7. ~~componentWillUpdate~~
  - 컴포넌트가 업데이트 되기 전에 실행
  - `this.setState() 를 사용하지 말 것!! `
    – 무한루프에 빠져들게 된다.

  ```javascript
  componentWillUpdate(nextProps, nextState){
      console.log("componentWillUpdate: " + JSON.stringify(nextProps) + " " + JSON.stringify(nextState));
  }
  ```

  ### 8. componentDidUpdate
  - 컴포넌트가 리렌더링을 마친 후 실

  ```javascript
  componentDidUpdate(prevProps, prevState){
      console.log("componentDidUpdate: " + JSON.stringify(prevProps) + " " + JSON.stringify(prevState));
  }
  ```

  ### 9. componentWillUnmount
  - 컴포넌트가 DOM 에서 사라진 후 실행되는 메소드

  ```javascript
  componentWillUnmount(){
      console.log("componentWillUnmount");
  }
  ```
