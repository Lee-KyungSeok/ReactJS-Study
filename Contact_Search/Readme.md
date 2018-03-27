# 주소록 검색 기능 구현
  - sort
  - filter
  - 주소록 검색 기능 구현

---

## 들어가기 전에
  ### 1. sort

  ```javascript
  arr.sort([compareFunction])
  ```

  - 자바스크립트의 내장함수
  - 배열을 유니코드와 비교하여 오름차순으로 정렬한다.
  - ★ 기존 배열에 덮어쓴다!

  > 예시

  ```javascript
  var fruit = ['cheeries', 'apples', 'bananas'];
  fruit.sort();
  // 결과 : ['apples', 'bananas', 'cheeries']

  var scores = [1, 10, 2, 21]
  scores.sort();
  // 결과 : [1, 10, 2, 21] => 유니코드를 비교하기 때문!! 함수를 설정해 주어야 한다.

   // 함수는 음수, 양수, 0 을 리턴하며 이에 따라 정렬한다!!!
  function compareNumbers(a,b) {
    return a - b; // 내림차순? 리턴값에 "-1" 곱하면 된다.
  }
  scores.sort(compareNumbers);
  // 결과 : [1, 2, 10, 21]
  ```

  ### 2. filter

  ```javascript
  var new_array = arr.filter(callback[, thisArg])
  ```

  - 자바스크립트 내장함수  
  - 함수에 파라미터를 전달해서 만족하는 값을 배열로 전달
  - `callback` : 배열의 각 요소를 테스트 하는 함수, 요소를 (새 배열에) 계속 두기 위해 true 반환, 아니면 false
    - 인자 : (element, index, array)
  - `thisArg` : (선택사항) callback 을 실행할 때 this 로 사용하는 값
  - ★ 새 배열을 리턴!!!

  > 예시

  ```javascript
  // 모든 작은 값 걸러내기
  function isBigEnough(value) {
    return value >= 10;
  }
  var filtered = [12, 5, 8, 130, 44]
  filtered.filter(isBigEnough);
  // 결과 : [12, 130, 44]
  ```

---

## 주소록 검색 기능 구현
  ### 1. 검색 기능 구현 (Contact.js 파일)
  - 검색 기능 구현 1 : input 태그 추가
  - 검색 기능 구현 2 : state에 keyword 추가
  - 검색 기능 구현 3 : keyword state 를 사용
  - 검색 기능 구현 4 : state 변경을 위한 setState 추가
  - 검색 기능 구현 5 : this를 알려주기 위해 handleChange.bind
  - 검색 기능 구현 6 : onChange 속성 추가
  - 검색 기능 구현 7 : 검색어를 sort & filter 를 통해 추출

  > 코드

  ```javascript
  import React from 'react'
  import ContactInfo from './ContactInfo'

  export default class Contact extends React.Component{
      constructor(props){
          super(props)

          this.state = {
              /* 검색 기능 구현2 state에 keyword 추가 */
              keyword: '',
              contactData:[
                  {name:'Bbet', phone:'010-0000-0001'},
                  {name:'Aetty', phone:'010-0000-0002'},
                  {name:'Charlie', phone:'010-0000-0003'},
                  {name:'David', phone:'010-0000-0004'}
              ]
          }

          /* 검색 기능 구현5 this를 알려주기 위해 handleChange.bind */
          this.handleChange = this.handleChange.bind(this)
      }
      /* 검색 기능 구현4 state 변경을 위한 setState 추가 */
      handleChange(e){
          this.setState({
              keyword: e.target.value
          })
      }

      render() {
          const mapToComponent = (data) => {
              /* 검색 기능 구현7 data를 sort & filter => keyword 가 들어간 것을 찾고, 소문자로!!*/
              data.sort();    // 나중에 user 에게서 값을 받을 것이기 때문에 sort 를 한다.
              data = data.filter( (contact) => {
                  return contact.name.toLowerCase().indexOf(this.state.keyword.toLowerCase()) > -1 ;
              })

              return data.map((contact, i) => { // contact 는 value, i 는 index
                  return (<ContactInfo contact = {contact} key={i}/>)
              })
          }

          return (
              <div>
                  <h1>Contacts</h1>
                  {/* 검색 기능 구현1 input 태그 추가 */}
                  {/* 검색 기능 구현3 keyword state 를 사용 */}
                  {/* 검색 기능 구현6 onChange 속성 추가 */}
                  <input
                      name="keyword"
                      placeholder="Search"
                      value={this.state.keyword}
                      onChange={this.handleChange}
                  />
                  <div>{mapToComponent(this.state.contactData)}</div>
              </div>
          )
      }
  }
  ```
