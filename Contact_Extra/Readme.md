# KeyPress & Focus
  - KeyPress 구현
  - ref 이용방법
    - Focus 기능 사용

---

## KeyPress
  ### 1. KeyPress
  - charCode 가 13 이면 enter를 의미한다.
  - 엔터를 누르면 이벤트가 발생하도록 설정한다.
  - 아래는 create 예제, update 의 경우 toggle 임에만 주의하자.

  ```javascript
  // 생성자에 bind 하기
  constructor(props){
          // ...
          this.handleKeyPress = this.handleKeyPress.bind(this)
      }

  // Key 가 눌릴때 특정 event 발생 시키기
  handleKeyPress(e){
      // e.charCode == 13 이면 엔터란 의미
      if(e.charCode === 13){
          this.handleClick()
      }
  }

  // input 타입에 KeyPress 를 랜더링
  render() {
      return(
          <div>
              // ...
              <input type="text"
                  name="newPhone"
                  placeholder="phone"
                  value={this.state.newPhone}
                  onChange={this.handleChange}
                  onKeyPress={this.handleKeyPress}/>
              // ...
          </div>
      )
  }

  ```

---

## Focus
  ### 1. refs 이용
  - 일반 자바스크립트 처럼 `document.getElementById(id).focus();` 로 하면 안된다. (id 사용 XX)
  - `callback function` 을 사용해야만 한다.
  - Component를 ref 로 설정하여 Component 에서 설정한 메서드를 이용할 수 있다.
  - 그러나 state 나 props 로 해결 가능한 것은 왠만하면 이로 해결하도록 한다.!!
  - 랜더링 메소드 내부, 컨스트럭트 내부는 ref 로 접근할 수 없음에 주의

  > ex>

  ```javascript
  class Hello extends React.Component {
    render() {
      return (
        <div>
          {/* this 의 input을 ref 값으로 설정 */}
          <input ref={(ref) => {this.input = ref}}/>
        </div>
      )
    }

    componentDidMount(){
      // 설정 후에는 아래와 같이 접근 가능하다.
      this.input.value = "I used ref to do this";
    }
  }
  ```

  ### 2. Contact 에 적용
  - 주고 싶은 곳에 ref 콜백을 이용하여 지정
  - 클릭시 focus 를 줄 것이므로 이를 설정

  ```javascript
  // this.nameInput 으로 ref 를 설정
  render() {
      return(
          <div>
              <h2>Create Contact</h2>
              <p>
                  <input type="text" name="newName" placeholder="name"
                         value={this.state.newName} onChange={this.handleChange}
                         ref={(ref) => { this.nameInput = ref}}/>
              <button onClick={this.handleClick}>Create</button>
          </div>
      )
  }

  // 메서드에 focus 를 세팅
  handleClick() {
      // 아무 입력값이 없을 경우 ref 준 것을 focus 시킨다.
      if(!this.state.newName && !this.state.newPhone) {
          this.nameInput.focus();
      } else {
          // 새로운 전화번호를 세팅
          const contact = {
              name: this.state.newName,
              phone: this.state.newPhone
          };
          this.props.onCreate(contact)

          // 세팅 후 리셋
          this.setState({
              newName: '',
              newPhone: ''
          })
      }
  }
  ```
