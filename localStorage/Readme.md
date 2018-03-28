# localStorage
  - localStorage 기본
  - localStorage 사용 방법

---

## localStorage
  ### 1. localStorage 기본
  - 데이터를 브라우저에 저장한다. (단, 서버로 전송되지 않는다.)
  - HTML5 부터 지원
  - 저장 용량은 2.5 ~ 5 MB 까지 지원
    - cf> Cookie : 4KB 가 최고 용량

  ### 2. 기본적인 사용 방법
  - localStorage 에 저장하고 불러올 수 있다.
  - localStorage 는 text 형으로만 지원하므로 객체형으로 넣을 수 없음에 주의

  > 객체 예제(text 일 경우 그냥 하면 됨)

  ```javascript
  // 값 설정
  let obj = {
    lastname: 'Lee',
    address : 'street dong'
    phone : '010-1234-1111'
  }
  // Store
  localStorage.myinfo = JSON.stringify(obj);

  // Retrieve
  JSON.parse(localStorage.myinfo);

  // reset
  localStorage.clear()
  ```

---

## Contact 에 구현
  ### 1. Component LifCycle API 활용
  - 랜더링 되기 전 저장된 것을 불러온다.
  - state 가 업데이트 되면 이를 확인하고 localStorage 에 저장한다.

  ```javascript
  // 라이프사이클API 중 랜더링 되기 전 실행시킴
  componentWillMount() {
      const contactData = localStorage.contactData;

      if(contactData){
          this.setState({
             contactData: JSON.parse(contactData)
          });
      }
  }

  // 컴포넌트의 state 가 업데이트 될때마다 localStorage에 저장
  componentDidUpdate(prevProps, prevState) {
      if(JSON.stringify(prevState.contactData) !== JSON.stringify(this.state.contactData)){
          localStorage.contactData = JSON.stringify(this.state.contactData)
      }
  }
  ```
