# 주소록 추가
  - Immutability Helper 를 사용함!!
  - 주소록 추가

---

## 주소록 추가
  ### 1. 메소드 작성 및 바인드, 컴포넌트 사용
  - 추가를 위한 ContactCreate.js 생성
  - 추가할 때 push 는 배열로 들어감에 주의
  - contact 를 받아서 추가한다.
  - 컴포넌트에 생성한 메소드를 props 로 넘긴다

  ```javascript
  // bind
  constructor(props){
    // ...
      this.handleCreate = this.handleCreate.bind(this)
    // ...
  }

  // 메소드 작성
  handleCreate(newContact){
      this.setState({
          contactData: update(
              this.state.contactData,{
                  $push: [newContact]
              }
          )
      })
  }

  // Component 사용하면서 메소드를 props 로 넘긴다.
  render() {
        // ...
      return (
          <div>
              {/* ... */}
              <ContactCreate
                  onCreate = {this.handleCreate}
              />
          </div>
      )
  }

  ```

  ### 2. ContactCreate.js
  - Contact 를 추가하는 기능을 담당한다.
  - 새로운 번호를 담아서 Contact.js 에서 넘긴 메서드를 이용한다.
  - 전화번호를 추가한 후에는 반드시 state 를 리셋시켜 준다.
  - `propTypes` 및 `defaultProps` 를 반드시 생성해주어 가독성을 편하게 한다.

  ```javascript
  import React from 'react'
  import PropTypes from 'prop-types'

  export default class ContactCreate extends React.Component{
      constructor(props){
          super(props)
          // 추가하는 번호이므로 newName으로 선택
          this.state = {
              newName: '',
              newPhone: ''
          }

          this.handleChange = this.handleChange.bind(this)
          this.handleClick = this.handleClick.bind(this)
      }

      // name과 value 를 이용해 담을 수 있게 된다.
      handleChange(e) {
          let nextState = {};
          nextState[e.target.name] = e.target.value
          this.setState(nextState)
      }

      handleClick() {
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

      render() {
          return(
              <div>
                  <h2>Create Contact</h2>
                  <p>
                      <input type="text" name="newName" placeholder="name" value={this.state.newName} onChange={this.handleChange}/>
                      <input type="text" name="newPhone" placeholder="phone" value={this.state.newPhone} onChange={this.handleChange}/>
                  </p>
                  <button onClick={this.handleClick}>Create</button>
              </div>
          )
      }
  }

  ContactCreate.propTypes = {
      onCreate: PropTypes.func
  }

  ContactCreate.defaultProps = {
      onCreate: () => {console.error('onCreate not defined')}
  }
  ```
