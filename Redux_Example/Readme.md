# Redux Example
  - Component 작성
  - Actions 작성 (객체 + 함수)
  - Reducer 작성
  - Store 사용
  - react-redux (view layer binding)
    - Provider 컴포넌트
    - connect 함수

---

## Component
  ### 1. 구성
  - `Value.js` : 숫자를 보여주는 컴포넌트 (dump Component)
  - `Control.js` : 버튼을 보여줄 컴포넌트 (dump Component)
  - `Counter.js` : 위 두 컴포넌트를 담을 부모 컴포넌트 (Smart Component)

  ### 2. 컴포넌트 출력 사진
  - 아래처럼 구성한다.

  ![](https://github.com/Lee-KyungSeok/ReactJS-Study/blob/master/Redux_Example/picture/component.png)

---

## Actions
  ### 1. 기본
  - 이름은 `대문자` 와 `_` 로 만든다.
  - 구성 (ActionTypes.js 내 action들 구성)
    - `INCREMENT` : 값을 1씩 증가시키는 action
    - `DECREMENT` : 값을 1씩 감소시키는 action
    - `SET_COLOR` : 새로운 색상을 설정하는 action
  - 액션 객체의 형태
    - `type` : 필수 항목으로 어떤 객체인지를 가리킨다.
    - `color` : 어떤 색상으로 결정할지 알려준다.
    - 즉, type을 제외하고 필요한 값들은 필드를 추가해서 직접 추가하면 된다. (color도 직접 추가한 것

  ```javascript
  // 액션 객체
  {type: 'INCREMENT'}
  {type: 'DECREMENT'}
  {
    type: 'SET_COLOR',
    color: [200,200.200]
  }
  ```

  ### 2. 액션 생성자 함수
  - 액션 객체를 따로 계속 만드는 것은 어려우니 함수로 만듦
  - `actions/index.js` 생성하여 actions 의 default 파일로 설정
    - 항상 index 는 아니고 action 이 많아지면 여러 action 생성자를 만들어도 된다.
    - ex> number.js / ui.js 등등
  - 객체를 받아 처리하면 되며, ActionTypes에 접근하게 만든다.

  ```javascript
  // import {INCREMENT, DECREMENT, SET_COLOR} from "./ActionTypes"
  import * as types from './ActionTypes'; // 각 상수에 모두 접근할 수 있게 된다. (이렇게 해도 된다.)

  export function increment() {
      return {
          type: types.INCREMENT
      }
  }

  export function decrement() {
      return {
          type: types.DECREMENT
      }
  }

  // color만 써도 동일한 의미!
  export function setColor(color) {
      return {
          type: types.SET_COLOR,
          color: color
      }
  }
  ```

---

## Reducer
  ### 1. 기본
  - 비동기작업 X, 인수 변경 X, 동일한인수=동일한결과 로 만들어야 한다는 것을 항상 생각!
  - 이전 상태와 액션을 받아서 다음(새로운) 상태를 반환
    - (previousState, action) => newState
    - 기존 상태를 복사하고 변화를 준 다음 반환

  ### 2. reducer 생성
  - `counter.js` (숫자 카운트), `ui.js` (색 변경) 생성
  - 각각 리듀서 작성
    - 초기상태를 항상 지정하도록 한다.
    - 변화를 줄 때, Immutability Helper 또는 Spread 를 사용하여 하도록한다. (새롭게 만들기 위해)
    - ui.js 의 경우 color의 인자를 포함하고 있다.

  > src/reducers/counter.js

  ```javascript
  import * as types from '../actions/ActionTypes';

  // 초기 상태 작성
  const initialState = {
      number: 0,
      dummy: 'dummy!!',                       // 임의의 dummy
      dumbObject: { d: 0, u: 1, m: 2, b: 3 } // 임의의 dumbObject 작성함
  };

  export default function counter(state = initialState, action) {
      switch (action.type) {
          case types.INCREMENT:
              return {
                  ...state,
                  number: state.number + 1,
                  dumbObject: { ...state.dumbObject, u: 5 }
              };
          case types.DECREMENT:
              return {
                  ...state,
                  number: state.number - 1
              };
          default:
              return state;
      }
  }
  ```

  > src/reducers/ui.js

  ```javascript
  import * as types from '../actions/ActionTypes';

  const initialState = {
      color: [255,255,255]
  };

  export default function ui(state = initialState, action) {
      switch (action) {
          case types.SET_COLOR:
              return {
                  ...state,
                  color: action.color
              };
          default:
              return state;
      }
  }
  ```

  ### 3. 리듀서 통합
  - 만들어진 리듀서들을 합쳐야 한다.
  - index.js 에 통합해서 관리
  - `redux` 라이브러리에서 제공하는 함수 사용하면 된다.

  > src/reducers/index.js

  ```javascript
  import {combineReducers} from 'redux' // redux 에 있는 함수 사용
  import counter from './counter';
  import ui from '.ui'

  // 합쳐준다
  const reducers = combineReducers({
      counter, ui
  });
  export default reducers;
  ```

---

## Store
  ### 1. 기본
  - Store 는 어플리케이션의 현재 상태를 지니고 있는 부분
  - Redux 에서는 단 하나의 Store가 존재한다.
  - `createStore` 를 불러온 후 `리듀서를 인수로 전달` 하여 해당 함수를 실행 (src/index.js 에 아래 코드와 같이 작성하면 된다.)

  > src/index.js

  ```javascript
  /* React, ReacDOM APP 임포트 */

  // createStore와 reducer를 불러옴 (reducer의 경우 index 를 지정했기 때문에 특정 js 파일을 임포트 안함.)
  import {createStore} from 'redux';
  import reducers from './reducers';

  // store에 reducer를 넘긴다.
  const store = createStore(reducers);

  ReactDOM.render(<App />, document.getElementById('root'));
  ```

  ### 2. 번외...Store가 하는 일? (예시)
  - `dispatch(action)` : 액션을 리듀서로 보내는 일을 한다.
  - `get(State)` : 현재 상태를 불러오는 일을 한다.
  - `subscribe(listener)` : 상태가 바뀔때마다 실행할 함수를 등록 (listener가 콜백함수)
  - `replaceReducer(nextReducer)` : hot-reloading 과 코드 분할을 구분할때 사용(보통 사용 X)

  ```javascript
  import * as actions from './actions';

  const store = createStore(reducers);
  // 초기상태 출력
  console.log(store.getState());
  // 상태 바뀌면 출력 및 unsubscribe 정의
  const unsubscribe = store.subscribe(() => console.log(store.getState()));
  // 각각 dispatch !!
  store.dispatch(actions.increment());
  store.dispatch(actions.increment());
  store.dispatch(actions.decrement());
  store.dispatch(actions.setColor([200, 200, 200]));
  // 이 이상은 더이상 바꾸지 않겠다 선언!(unsubscribe)
  unsubscribe();
  // 이는 반영되지 않는다.
  store.dispatch(actions.increment());

  // 결과 => number : 1, color: [200,200,200] 로 바뀜
  ```

---

## view layer binding (react-redux)
  ### 1. Provider
  - 컴포넌트에서 redux 를 사용할 수 있도록 서비스를 제공
  - Provider 는 하나의 컴포넌트이다.
  - 랜더링하게 될 때, 해당 컴포넌트를 Provider 컴포넌트로 감싸게 되면 Provider 가 복잡한 작업을 알아서 해준다.

  > src/index.js

  ```javascript
  import {Provider} from 'react-redux';

  const store = createStore(reducers);

  ReactDOM.render(
      <Provider store={store}>
          <App/>
      </Provider>,
      document.getElementById('root')
  );
  ```

  ### 2. connect 함수
  - 옵션을 인수로 받고, 전달받은 옵션을 사용해서 컴포넌트를컴포넌트를 REDUX 에 연결하는 "또다른" 함수를 반환
  - `connect([...options])` 로 사용
  - 만약 connect()(Counter) 라면
    - `store` 에 연결된 `새로운 컴포넌트 클래스` 가 반환 (새로운 컴포넌트 클래스는 REDUX 에 연결됨)
    - 옵션이 없으면 `this.props.store` 로 접근 가능(but> 옵션을 넣으면 더 깔끔)
    - 기존에 있던 Counter 컴포넌트는 변경되지 않고 새로운 컴포넌트가 반환된다!!
  - 옵션 (앞 세개 : 함수형태, 뒤 : 객체형태)
    - [mapStateToProps] : state(컴포넌트의 state랑 다르다. 그냥 파라미터가 state,redux의 state)를 해당 props로 연결해주는 함수(state를 파라미터로 가짐)
    - [mapDispatchToProps] : dispatch한 함수를 props로 연결 (dispatch를 파라미터로 가짐)
    - [mergeProps] : state 와 dispatch를 파라미터로 가져서 동시에 사용할 때 쓰면 됨 (잘 사용 안됨)
    - [options] : 객체형태이며 `{[pure=true], [withRef=false]}`(default값들) 가 있다. `pure` 가 true이면 불필요한 업데이트를 하지 않는다. `withRef` 가 true 면 getWrappedInstance()를 통하여 ref에 접근할 수 있게 한다.

  > connect 함수 적용 부분 (src/components/Counter.js)

  ```javascript
  import React, {Component} from 'react';

  import Value from './Value'
  import Control from './Control'
  import * as actions from '../actions'

  import {connect } from 'react-redux';
  // import {connect, bindActionCreators } from 'react-redux';

  class Counter extends Component {
      constructor(props) {
          super(props)

          this.setRandomColor = this.setRandomColor.bind(this)
      }

      setRandomColor() {
          const color = [
              Math.floor((Math.random()*55) + 200),
              Math.floor((Math.random()*55) + 200),
              Math.floor((Math.random()*55) + 200)
          ];

          this.props.handleSetColor(color);
      }

      render() {

          const color = this.props.color;
          const style = {
              background: `rgb(${color[0]}, ${color[1]}, ${color[2]})`
          }

          return (
              <div style={style}>
                  <Value number={this.props.number} /> {/* 만약.. 옵션이 없다면 number={this.props.store,getState().counter.number} 와 같이 뽑을 수 있다.*/}
                  <Control
                      onPlus={this.props.handleIncrement}
                      onSubtract={this.props.handleDecrement}
                      onRandomizeColor={this.setRandomColor}
                  />
              </div>
          );
      }
  }

  // component의 number props 와 color props를 연결해준다.
  const mapStateToProps = (state) => {
      return {
          number: state.counter.number,
          color: state.ui.color
      }
  };

  // action을 dispatch 하는 함수를 props로 연결
  // ex> handleIncrement를 실행하면 뒤에 있는게 실행됨!
  const mapDispatchToProps = (dispatch) => {
      return {
          handleIncrement: () => {dispatch(actions.increment())},
          handleDecrement: () => {dispatch(actions.decrement())},
          handleSetColor: (color) => {dispatch(actions.setColor(color))}
      }
      // 아래와 같이 작성해도 같다. ( 이를 사용하면 먼저 임포트 해준다!)
      // but> 이름을 따로 설정할 수 없고, 함수이름 그대로 사용된다(헤깔릴수도...)
      // return bindActionCreators(actions, dispatch);
  };

  export default connect(mapStateToProps, mapDispatchToProps)(Counter);
  ```
