# Basic Component
  - Component

---

## 들어가기 전에
  ### 1. map
  - map() 메소드는 파라미터로 전달 된 함수를 통하여 배열 내의 각 요소를 처리해서 그 결과로 새로운 배열을 생성한다.

  ```javascript
  arr.map(callback,[thisArg])
  ```

  - callback : 새로운 배열의 요소를 생성하는 함수 (아래 인수를 가짐)
    - currentValue : 현재 처리되고 있는 요소
    - index : 현재 처리되고 있는 요소의 index 값
    - array : 메소드가 불려진 배열
  - thisArg : (선택항목) callback 함수 내부에서 사용할 this 값 설정

  > 사용 예 (processed = [1, 4, 9, 16, 25])

  ```javascript
  var numbers = [1,2,3,4,5];
  var processed = numbers.map(function(num) {
    return num * num
  })
  ```

  - 이를 ES6 문법으로, arrow function 으로 사용하면 아래와 같다.

  ```javascript
  let numbers = [1,2,3,4,5];
  let result = numbers.map((num) => {
    return num * num
  })
  ```

  ### 2. arrow function?
  - parameter 가 1개인 경우

  ```javascript
  // 이전
  var one = function(a) {
    return console.log(a)
  }

  // arrow function
  let one = a => console.log(a)
  ```

  - parameter 가 두개인 경우

  ```javascript
  // 이전
  var two = function two(a,b) {
    return console.log(a,b)
  }

  // arrow function
  let two = (a,b) => console.log(a, b);
  ```

  - 여러 명령을 넣는 경우

  ```javascript
  // 이전
  var three = function three(c,d) {
    console.log(c);
    console.log(d);
  }
  // arrow function
  var three = (c,d) => {
    console.log(c);
    console.log(d)
  }
  ```

  - parameter 가 없는 경우

  ```javascript
  // 이전
  var four = function four() {
    console.log('no parameter');
  }

  // arrow function
  let four = () => {
    console.log('no parameter')
  }
  ```

---

## Component 매핑
  ### 1. 예시
  - 반복되는 이름, 전화번호를 컴포넌트화
  - state 에 배열로써 저장
  - 랜더링에 mapToComponent 함수를 만들어 지정하도록 함
  - 컴포넌트를 출력
  - but> 컴포넌트에는 Event 를 지정할 수 없고 native tag에만 지정할 수 있음에 주의하자!


  ```javascript
  // 반복되는 부분을 컴포넌트 화
  class ContactInfo extends React.Component {
    render() {
      return (
        <div>
          {this.props.contact.name} {this.props.contact.phone}
        </div>
      )
    }
  }

  class Contact extends React.Componet {
    // state 를 만들었다.
    constructor(props){
      super(props)

      this.state = {
        contactData:[
          {name:'Abet', phone:'010-0000-0001'},
          {name:'Betty', phone:'010-0000-0002'},
          {name:'Charlie', phone:'010-0000-0003'},
          {name:'David', phone:'010-0000-0004'}
        ]
      }
    }
    render() {
      const mapToComponent = (data) => {
        return data.map((contact, i) => { // contact 는 value, i 는 index
          return (<ContactInfo contact = {contact} key={i}/>)
        })
      }

      return (
        <div>
          {mapToComponent(this.state.contactData)}
        </div>
      )
    }
  }

  Class App extends React.Component {
    render() {
      return (
        <Contact/>
      )
    }
  }

  ReactDOM.render(
    <App></App>
  )
  ```

---
## 함수형 컴포넌트
  ### 1. 함수형 컴포넌트 사용
  - `라이프사이클 API` 도 사용하지 않고, `state` 도 사용하지 않으면서 `props` 만을 이용하여 `뷰를 렌더링만 해주는 역할` 을 하는 경우 이용
  - 비구조화 할당 문법을 사용해서 전달 가능
  - 함수형 컴포넌트를 사용 할 때 첫 마운팅 속도에 있어서는 7% ~ 11% 빠름

  ### 2. Redux 사용시 컴포넌트 스타일
  - Container 컴포넌트 (혹은 Smart, 컴포넌트) 는 클래스형 컴포넌트를 사용
  - Presentational 컴포넌트 (혹은, Dumb 컴포넌트) 는 함수형 컴포넌트를 사용

  ### 3. 사용 방법
  - 아래와 같이 사용하면 된다.

  ```javascript
  // 기본적인 사용 방법
  function Hello(props) {
      return (
          <div>Hello {props.name}</div>
      );
  }

  export default Hello;

  // arrow function 이용시
  const Hello = (props) => {
      return (
          <div>Hello {props.name}</div>
      );
  }

  export default Hello;

  // 비구조화 할당 사용 가능
  const Hello = ({name}) => {
      return (
          <div>Hello {name}</div>
      );
  }

  export default Hello;
  ```
