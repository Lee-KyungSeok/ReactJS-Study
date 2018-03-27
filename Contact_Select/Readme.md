# 주소록 선택 기능 구현
  - 주소록 선택 기능 구현
    - 세가지 파일

---

## 주소록 선택 기능 구현
  ### 1. 선택기능 구현 - Contact.js
  - select를 위한 key를 구성 - index 가 key 가 된다.
  - 클릭효과를 넣어 state 를 선택한 key로 변경하고 이를 바인딩
  - props로 넘길 이벤트를 등록
    - onClick 은 컴포넌트에는 적용할 수 없음에 주의해야 한다.!!!! (즉, 이벤트 설정이 아니라 이벤트를 넘기는 것!)
    - arrow function으로 넘겨야 한다. 그냥 this.handleClick() 안됨(이전 설명)
  - 새로 만든 ContactDetails 에 정보를 넘긴다.

  ```javascript
  import React from 'react'
  import ContactInfo from './ContactInfo'
  import ContactDetails from './ContactDetails'

  export default class Contact extends React.Component{
      constructor(props){
          super(props)

          this.state = {
              /* 선택기능 구현 2 : select를 위한 key를 구성 - index 가 key 가 된다. */
              selectedKey: -1,
              keyword: '',
              contactData:[
                  {name:'Abet', phone:'010-0000-0001'},
                  {name:'Betty', phone:'010-0000-0002'},
                  {name:'Charlie', phone:'010-0000-0003'},
                  {name:'David', phone:'010-0000-0004'}
              ]
          }

          this.handleChange = this.handleChange.bind(this)
          /* 선택기능 구현 4 클릭효과를 위한 bind */
          this.handleClick = this.handleClick.bind(this)
      }

      handleChange(e){
          this.setState({
              keyword: e.target.value
          })
      }

      /* 선택기능 구현 3 클릭효과 => state 를 선택한 key로 변경 */
      handleClick(key){
          this.setState({
              selectedKey: key
          })

          console.log(key, "is selected")
      }

      render() {
          const mapToComponent = (data) => {
              data.sort(function(a,b){
                  return a.name > b.name ? 1 : a.name < b.name ? -1 :0
              });
              data = data.filter( (contact) => {
                  return contact.name.toLowerCase().indexOf(this.state.keyword.toLowerCase()) > -1 ;
              })

              return data.map((contact, i) => { // contact 는 value, i 는 index
                  /* onClick 과 같은 event는 컴포넌트에 적용되지 않고 props 로 넘김에 주의!!! */
                  /* 선택기능 구현 6 : props로 넘길 이벤트를 등록 => arrow function으로 넘겨야 한다. 그냥 this.handleClick() 안됨 */
                  return (<ContactInfo
                              contact = {contact}
                              key={i}
                              clickEvent={() => this.handleClick(i)}/>)
              })
          }

          return (
              <div>
                  <h1>Contacts</h1>
                  <input
                      name="keyword"
                      placeholder="Search"
                      value={this.state.keyword}
                      onChange={this.handleChange}
                  />
                  <div>{mapToComponent(this.state.contactData)}</div>
                  {/* 선택기능 구현 9 선택 여부와 선택된 주소의 정보를 넘김*/}
                  <ContactDetails
                      isSelected = {this.state.selectedKey !== -1}
                      contact = {this.state.contactData[this.state.selectedKey]}/>
              </div>
          )
      }
  }
  ```

  ### 2. 선택기능 구현 - ContactInfo.js
  - 이름만 보여주기 위해 name 만 남겨둠
  - onClick 효과를 적용 (넘겨진 이벤트 효과를 onClick 이벤트에 적용)

  ```javascript
  export default class ContactInfo extends React.Component {
      render() {
          return (
              /* 선택기능 구현 5 : onClick을 native에 적용 (onClick 과 같은 event는 컴포넌트에 적용되지 않고 props로 넘기게 된다!) */
              <div onClick={this.props.clickEvent}>
                  {/* 선택기능 구현 1 이름만 보여주기 위해 name 만 남겨둠 */}
                  {this.props.contact.name}
              </div>
          )
      }
  }
  ```

  ### 3. 선택기능 구현 - ContactDetails.js
  - 상세 주소록을 보여주기 위한 파일
  - 선택 되었을때와 안되었을 때 구분하기 위해 두가지 경우를 정의하고 `Contact.js` 에서 결과를 받아 뿌려줌
  - 선택 되었을 때 `Contact.js` 에서 넘긴 객체를 이용하여 화면에 뿌려줌

  ```javascript
  // 선택기능 구현 7 : 보여주기 위한 새로운 js 파일 생성
  import React from 'react'

  export default class ContactDetails extends React.Component {
      render() {
          // 선택기능 구현 8 : 선택 되었을때와 안되었을 때 구분하기 위해 두가지 경우를 정의
          const blank = (<div>Not Selected</div>);
          // 선택기능 구현 10 : 선택 되었을 때 넘긴 객체를 가지고 화면에 뿌려줌
          const details = (
              <div>
                  <p>{this.props.contact.name}</p>
                  <p>{this.props.contact.phone}</p>
              </div>
          );

          return (
              <div>
                  <h2>Details</h2>
                  {this.props.isSelected ? details : blank}
              </div>
          )
      }
  }

  // 선택기능 구현 11 : 선택이 안되었을 때 오류를 해결하기위해 디폴트 값 설정
  ContactDetails.defaultProps = {
      contact : {
          name : '',
          phone : ''
      }
  }
  ```
