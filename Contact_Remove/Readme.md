# 주소록 추가/삭제/수정
  - Immutability Helper 를 사용함!!
  - 주소록 삭제
  - 주소록 수정

---

## 주소록 삭제
  ### 1. 메소드 작성 및 바인드, 컴포넌트 사용
  - 따로 인자를 받지 않고 선택된 key 를 받아서 처리한다.
  - 선택되지 않았을 경우 반드시 예외처리를 한다.
  - 반드시 삭제 후 selectedKey를 리셋시켜 무효화 해야 오류가 안난다.
  - ContactDetail 에 삭제 메소드를 넘겨주어 처리

  ```javascript
  constructor(props){
    // ...
      this.handleRemove = this.handleRemove.bind(this)
    // ...
  }

  // 주소록을 삭제
  handleRemove() {
      // 예외 처리
      if(this.state.selectedKey < 0){
            return;
      }
      this.setState({
          contactData: update(
              this.state.contactData,{
                  $splice: [[this.state.selectedKey, 1]]
              }
          ),
          selectedKey: -1
      })
  }

  render() {
        // ...
      return (
          <div>
              {/* ... */}
              <ContactDetails
                    isSelected = {this.state.selectedKey !== -1}
                    contact = {this.state.contactData[this.state.selectedKey]}
                    onRemove = {this.handleRemove}/>
          </div>
      )
  }
  ```

  ### 2. ContactDetail 에서 디폴트값 생성 및 메소드 실행
  - onClick 속성에 props 로 넘겨진 메서드를 부착한다.
  - Props 를 넘겨받았으므로 default 값을 정의해준다.

  ```javascript
  return (
              <div>
                  <h2>Details</h2>
                  {this.props.isSelected ? details : blank}
                  <button onClick={this.props.onRemove}>Remove</button>
              </div>
          )

  ContactDetails.defaultProps = {
      onRemove: () => {console.error('onRemove not defined')}
  }
  ```

---

## 주소록 수정
  ### 1. 메소드 작성 및 바인드, 컴포넌트 사용
  - index 는 따로 받지 않고 선택된 key 를 받아서 처리
  - 주소록은 이름과 전화번호를 받아 이를 세팅한다.

  ```javascript
  constructor(props){
    // ...
      this.handleEdit = this.handleEdit.bind(this)
    // ...
  }

  // 주소록을 업데이트
  handleEdit(newName, newPhone) {
      this.setState({
          contactData: update(
              this.state.contactData,{
                  [this.state.selectedKey]: {
                      name: {$set: newName},
                      phone: {$set: newPhone}
                  }
              }
          )
      })
  }

  // 컴포넌트 사용
  render() {
        // ...
      return (
          <div>
              {/* ... */}
              <ContactDetails
                    isSelected = {this.state.selectedKey !== -1}
                    contact = {this.state.contactData[this.state.selectedKey]}
                    onRemove = {this.handleRemove}
                    onEdit = {this.handleEdit}/>
          </div>
      )
  }
  ```

  ### 2. ContactDetail 에서 디폴트값 생성 및 메소드 실행, 수정
  - eidt을 위한 state 를 생성
  - Toggle 버튼을 통해 edit 혹은 ok 로 변경, 및 기능 수행
  - input 값 변경시마다 editstate 에 값 변경
  - 넘겨받은 메서드를 실행

  ```javascript
  export default class ContactDetails extends React.Component {
      constructor(props){
          super(props)

          this.state = {
              isEdit: false,
              editName : '',
              editPhone: ''
          }

          this.handleToggle = this.handleToggle.bind(this)
          this.handleChange = this.handleChange.bind(this)
      }

      handleToggle(){
          if(!this.state.isEdit){
              this.setState({
                  editName: this.props.contact.name,
                  editPhone: this.props.contact.phone
              })
          } else {
              this.props.onEdit(this.state.editName, this.state.editPhone)
          }
          this.setState({
              isEdit: !this.state.isEdit
          })
      }

      handleChange(e){
          let changed = {}
          changed[e.target.name] = e.target.value
          this.setState(changed)
      }

      render() {
          // 선택 되었을때와 안되었을 때 구분하기 위해 두가지 경우를 정의
          const blank = (<div>Not Selected</div>);
          const read = (
              <div>
                  <p>{this.props.contact.name}</p>
                  <p>{this.props.contact.phone}</p>
              </div>
          );

          const edit = (
              <div>
                  <p>
                      <input type="text" name="editName" placeholder="name"
                             value={this.state.editName} onChange={this.handleChange}/>
                  </p>
                  <p>
                      <input type="text" name="editPhone" placeholder="phone"
                             value={this.state.editPhone} onChange={this.handleChange}/>
                  </p>
              </div>
          )

          const details = (
              <div>
                  {this.state.isEdit ? edit : read}
                  <p>
                      <button onClick={this.handleToggle}>{this.state.isEdit ? 'OK' : 'Edit'}</button>
                      <button onClick={this.props.onRemove}>Remove</button>
                  </p>
              </div>
          )

          return (
              <div>
                  <h2>Details</h2>
                  {this.props.isSelected ? details : blank}
              </div>
          )
      }
  }
  ```
