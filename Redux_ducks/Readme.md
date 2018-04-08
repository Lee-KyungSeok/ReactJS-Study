# Ducks 구조
  - Ducks 구조란
  - redux-actions 사용하기

---

## Ducks 구조
  ### 1. Ducks 구조란
  -  Reducer 파일 안에 액션타입과 액션생성자 함수를 함께 넣어서 관리하고 이를 ‘모듈’ 로 관리하는 구조
    - 최상단에 액션타입을 정의 (액션 타입은 `npm-module-or-app/reducer/ACTION_TYPE` 의 형식으로 정의)
    - 리듀서를 정의하고 `export default` 로 내보냄
    - 액션생성자는 `export const` 로 내보냄
  - 액션타입의 경우 NPM 모듈을 만드는 경우가 아니면 `reducer/ACTION_TYPE` 의 형식으로 사용 가능

  > 예시

  ```javascript
  // Actions
  const LOAD   = 'my-app/widgets/LOAD';
  const CREATE = 'my-app/widgets/CREATE';

  // Reducer
  export default function reducer(state = {}, action = {}) {
    switch (action.type) {
      // do reducer stuff
      default: return state;
    }
  }

  // Action Creators
  export function loadWidgets() {
    return { type: LOAD };
  }

  export function createWidget(widget) {
    return { type: CREATE, widget };
  }
  ```

---
## redux-actions 사용
  ### 1. redux-actions 패키지
  - 리덕스의 액션들을 관리하기 위한 유용한 `createAction` 과 `handleActions` 존재
  - 설치 : `npm install --save redux-actions`
  - 모듈추출 : `import { createAction, handleActions } from 'redux-actions'`

  ### 2. createAction을 통한 액션 자동화
  - 파라미터로 전달받은 값을 자동으로 넣어준다.
  - 전달받은 파라미터는 모두 payload 의 값으로 설정된다.
  - 그러나 파라미터의 값이 뭐가 될 지 모르므로 그 위에 주석을 작성해야 한다.

  > 액션 자동화

  ```javascript
  // 이전
  export const increment = (index) => ({
      type: types.INCREMENT,
      index
  });

  export const setColor = ({index, color}) => ({
      type: types.DECREMENT,
      index,
      color
  });

  // createAction 사용
  export const increment = createAction(types.INCREMENT);
  export const setColor = createAction(types.SET_COLOR);
  ```

  > 사용시 결과값

  ```javascript
  increment(3)
  /* 결과
  {
      type: 'INCREMENT',
      payload: 5
  }
  */

  setColor({index: 5, color: '#fff'})
  /* 결과
  {
      type: 'SET_COLOR',
      payload: {
          index: 5,
          color: '#fff'
      }
  }
  */
  ```

  ### 3. switch문 대신 handleActions 사용
  - switch 문을 이용해 type에 따라 다른 작업을 적용하는 것은 단점이 존재
    - scope 가 리듀서 => 다른 case 에서 같은 변수 선언 불가능
    - case 마다 함수를 정의하면 코드 가독성이 떨어짐
  - 이를 해결하는 것이 `handleActions`
  - 사용방법
    - 첫번째 파라미터로는 액션에 따라 실행 할 함수들을 가지고있는 객체를 넣음
    - 두번째 파라미터로는 상태의 기본 값 (initialState)을 넣음
  - 주의사항
    - 접두사가 들어 있는 경우 INCREMENT: 가 아니라 `[INCREMENT]:` 를 사용해야 함에 주의

  ```javascript
  const reducer = handleActions({
    INCREMENT: (state, action) => ({
      counter: state.counter + action.payload
    }),

    DECREMENT: (state, action) => ({
      counter: state.counter - action.payload
    })
  }, { counter: 0 });
  ```

---
## 적용 예시
  ### 멀티카운터의 src/modules/index.js
  - 아래처럼 ducks 구조로 사용
  - createAction, handleActions 이용
  - reducer 혹은 actions 대신해서 modules를 불러옴
    - 그 후 `src/index.js` 에서, `./reducers` 파일을 불러오는 대신에 `./modules` 를 불러옴
    - `App.js` 과 `CounterListContainer.js` 컴포넌트에서도 `./actions` 대신에 `./modules` 를 불러옴

  > src/modules/index.js

  ```javascript
  import { createAction, handleActions } from 'redux-actions';
  import { Map, List } from 'immutable';

  // 액션 타입
  const CREATE = 'counter/CREATE';
  const REMOVE = 'counter/REMOVE';
  const INCREMENT = 'counter/INCREMENT';
  const DECREMENT = 'counter/DECREMENT';
  const SET_COLOR = 'counter/SET_COLOR';

  // 액션 생성자
  export const create = createAction(CREATE); // color
  export const remove = createAction(REMOVE);
  export const increment = createAction(INCREMENT);  // index
  export const decrement = createAction(DECREMENT);  // index
  export const setColor = createAction(SET_COLOR);   // {index, color}

  // 초기상태 정의
  const initialState = Map({
      counters: List([
          Map({
              color: 'black',
              number: 0
          })
      ])
  });

  // 리듀서 정의
  export default handleActions(
      {
          [CREATE]: (state, action) => {
              const counters = state.get('counters');

              return (
                  state.set('counters', counters.push(
                      Map({
                          color: action.payload,
                          number:0
                      })
                  ))
              )
          },
          [REMOVE]: (state, action) => {
              const counters = state.get('counters');

              return (
                  state.set('counters', counters.pop())
              );
          },
          [INCREMENT]: (state, action) => {
              const counters = state.get('counters');
              return(
                  state.set('counters', counters.update(
                      action.payload,
                      (counter) => counter.set('number', counter.get('number') +1)
                  ))
              );
          },
          [DECREMENT]: (state, action) => {
              const counters = state.get('counters');
              return(
                  state.set('counters', counters.update(
                      action.payload,
                      (counter) => counter.set('number', counter.get('number') -1)
                  ))
              )
          },
          [SET_COLOR]: (state, action) => {
              const counters = state.get('counters');
              return(
                  state.set('counters', counters.update(
                      action.payload.index,
                      (counter) => counter.set('color', action.payload.color)
                  ))
              );
          },
      },
      initialState
  );
  ```
