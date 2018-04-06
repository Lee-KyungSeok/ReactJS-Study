# Redux 를 활용한 주소록
  - [이전 주소록](https://github.com/Lee-KyungSeok/ReactJS-Study/tree/master/Example/contacts)
  - [참고](https://velopert.com/3360)
  - (대부분은 코드 참고 바람)

---

## 들어가기 전에..
  ### 1. 의존모듈 설치
  - 설치 : `npm install --save redux redux-actions react-redux immutable react-immutable-proptypes`

  ### 2. 파일 구조 설정
  - `src/cotainers` 및 `src/modules` 생성

---

## 모듈
  ### 1. base
  - 검색 인풋과, 뷰를 관리

  ### 2. modal
  - 모달을 띄우고, 숨기고, 그리고 그 안에있는 인풋들의 값을 수정하는 액션들을 관리

  ### 3. contacts
  - 주소록 데이터

  ### 4. index
  - 리서를 합쳐춘다.

---

## 컨테이너
  ### 1. bindActionCreators 를 이용
  - 이를 이용하면 간편하게 dispatch할 수 있다.

  ```javascript
  import {bindActionCreators} from 'redux';

  const mapDispatchToProps = (dispatch) => ({
      BaseActions: bindActionCreators(baseActions, dispatch)
  });
  /* 아래와 동일
  const mapDispatchToProps = (dispatch) => ({
      BaseActions: {
          setView: (payload) => dispatch(baseActions.setView(payload)),
          changeSearch: (payload) => dispatch(baseActions.changeSearch(payload))
      }
  });
  */
  ```

  ### 2. immutable 사용시
  - immutable 사용시 모든 객체를 변경해야 함에 주의해야 한다.

---

## localStorage
  ### 1. localStorage 이용시
  - `fromJS()` 를 이용하여 가져올 수 있다.
  - 이 때 id에 따라 중복값을 확인할 수 있다.(merge 이용)
