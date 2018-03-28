# props & state
  - props
    - props 란
    - defaultProps 설정
    - propType 설정
  - state

---

## props
  ### 1. props 란
  - props 란 컴포넌트 내부의 Immutable Data 이다
    - 변하지 않는 데이터를 처리할 때 사용
  - 사용 방법
    - JSX 내부에 {this.props.propsName} 를 넣고
    - 컴포넌트를 사용(랜더링)할 때 `<>` 괄호 안에 `propsName="Value"` 를 작성
    - `this.props.children` 은 기본적으로 갖고있는 props 로서 `<Cpnt>..</Cpnt>` 으로 감싼 값이 들어가게 된다.

  > ex

  ```JavaScript
  // props 사용
  class Codelab extends React.Component{
    render() {
      return (
        <div>
          <h1>Hello {this.props.name}</h1>
          <div>{this.props.children}</div>
        </div>
      );
    }
  }

  // 컴포넌트 사용 (한번 더 props 사용)
  class App extends React.Component{
    render() {
      return (
        <Codelab name={this.props.name}>{this.props.children}</Codelab>
      );
    }
  }
  // ReactDOM 에 name 과 children 을 랜더링
  ReactDOM.render(<App name="Kyung">I am your child</App>.document.getElementByID("root"));
  ```

  - 결과

  ```
  Hello Kyung
  i am your child  
  ```

  ### 2. 기본값 설정
  - `Component.defaultProps = {...}` 으로 설정
    - 즉, 컴포넌트 설정이 끝난 후 defaultProps 를 설정한다.

  ```JavaScript
  // 컴포넌트 설정
  class App extends React.Component{
    render() {
      return (
        <div>{this.props.value}</div>
      );
    }
  }

  // defaultProps 설정
  App.defaultProps = {
    value:0
  };
  ```

  ### 3. Type 검증
  - 특정 Props 값이 특정 타입이 아니거나, 필수 props 인데 입력하지 않았을 경우 개발자 콘솔에서 경고를 띄울 수 있다.
  - 지금은 설치 후 import 해주어야 한다.
    - 설치 : `npm install --save prop-types`
    - 모듈 추출 : `import PropTypes from 'prop-types'`
  - `Component.propTypes = {...}` 으로 사용
    - 컴포넌트 설정이 끝난 후 propTypes 을 설정한다.
  - [PropType 참고](https://www.npmjs.com/package/prop-types)
    - number : 숫자
    - string : 문자
    - any : 전부
    - isRequired : 필수
    - ...

  ```JavaScript
  // 컴포넌트 설정
  class App extends React.Component{
    render() {
      return (
        <div>
          {this.props.value}
          {this.props.secondValue}
          {this.props.thirdValue}
        </div>
      );
    }
  }

  // propTypes 설정
  App.propTypes = {
    value: PropTypes.string,
    secondValue: PropTypes.number,
    thirdValue: PropTypes.any.isRequired
  };
  ```

---

## state
  ### 1. state 란
  - 유동적인 데이터를 보여줄 때 사용
  - 사용 방법
    - 초기값 설정이 필수!! => 생성자( `constructor` ) 에서 `this.state = {}` 으로 설정
    - JSX 내부에 `{this.state.stateName}`
    - 랜더링 후 값을 수정할 때는 `this.setState({...})` (랜더링 전 사용 불가 - constructor 에서는 사용 불가)
    - 랜더링 후 `this.state = {}` 절대 사용하지 말 것 (=> setState 시 특정 프로세스 이후 사용되기 때문)
      - cf> `this.forceUpdate();` 해서 강제로 실행 할 수는 있지만... 하지 말 것(거의 안쓸 거임)

  > ex

  ```javascript
  class Counter extends React.Component {
    // 초기값 설정
    constructor(props) {
      super(props);
      this.state = {
        value:0
      }
      // bind를 해주어야 "this" 가 render에서 사용되는 this 와 같다는 것을 명시할 수 있다.
      this.handleClick = this.handleClick.bind(this)
    }

    // 버튼 클릭 시(랜더링 후 state 를 수정하기 위해) 실행할 메소드 정의
    handleClick(){
      this.setState({
        value:this.state.value + 1
      })
    }

    render() {
      return(
        <div>
          <h2>{this.state.value}</h2>
          {/* handleClick에 메소드를 실행함에도 괄호가 없음에 주의
            만약 () 를 쓰게 되면 랜더링을 하면 setState 를 실행하고 이는 또 랜더링 시키고.. 무한 반복이 진행되게 된다.*/}
          <button onClick={this.handleClick}>Press Me</button>
        </div>
      )
    }
  }

  class App extends React.Component {
    render() {
      return (
        <Counter/>
      )
    }
  }

  ReactDOM.render(

  )
  ```
