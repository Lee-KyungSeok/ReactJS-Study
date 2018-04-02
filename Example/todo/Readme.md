# 할일 목록 만들기
  - [참고_결과 및 함수](https://velopert.com/3480)
  - Redux 이용하여 변경
  - 컴포넌트 최적화

---

## Redux 구성
  ### 1. Component 종류
  - Form : 할일을 추가하기 위한 컴포넌트
  - TodoItem : 특정 할일에 대한 정보를 보여주는 컴포넌트
  - TodoItemList : TodoItem 의 리스트를 보관하고 있는 컴포넌트
  - TodoListTemplate : template 형태로 제작
  - TodoFinal : smart 컴포넌트로 전체적인 컴포넌트 관리

  ### 2. Action 종류
  - TODO_CREATE : 할일을 생성하는 action
  - TODO_ON_REMOVE : 할일을 제거하는 action
  - TODO_ON_TOGGLE : 할일에 대한 체크를 하는 action

  ### 3. Reducer 종류
  - todo : 할일에 대해 상태를 업데이트 시키는 함수!!

---

## 컴포넌트 최적화
  ### 1. TodoItemList
  - 랜더링을 방지하기 위해 props 가 변경되었을 때만 리스트를 랜더링하게 만듦
  - 컴포넌트 LifCycle 이용

  ```javascript
  shouldComponentUpdate(nextProps, nextState){
      return this.props.todos !== nextProps.todos;
  }
  ```
