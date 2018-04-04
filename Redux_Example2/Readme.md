# Redux Example2
  - 멀티카운터에 Redux 적용
  - immutable.js 적용
  - 기능
    - 클릭: increment
    - 오른쪽클릭 : decrement
    - 더블클릭: setcolor

---

## Redux 적용 (참고내용)
  ### 1. components/Counter.js
  - 각각 click 이벤트를 넣고 여러 Counter 가 될 수 있음을 생각
  - index 를 받아 함수를 실행

  ```javascript
  const Counter = ({number, color, index, onIncrement, onDecrement, onSetColor}) => {
      return (
          <div className="Counter"
               onClick={() => onIncrement(index)}
               onContextMenu={
                   (e) => {
                       e.preventDefault();
                       onDecrement(index)
                   }
               }
               onDoubleClick={() => onSetColor(index)}
               style={{backgroundColor: color}}>
              {number}
          </div>
      );
  };
  ```

  ### 2. components/CounterList.js
  - Counter들을 한꺼번에 보여주는 List 컴포넌트
  - counter를 index 에 따라 props 를 각각 넘겨주는 역할
  - `counters` 의 속성은 immutable 의 List 임에 주의

  ```javascript
  const CounterList = ({counters, onIncrement, onDecrement, onSetColor}) => {
      const counterList = counters.map(
          (counter, i) => (
              <Counter
                  key={i}
                  index={i}
                  {...counter.toJS()}
                  onIncrement={onIncrement}
                  onDecrement={onDecrement}
                  onSetColor={onSetColor}
              />
          )
      );

      return (
          <div className='CounterList'>
              {counterList}
          </div>
      )
  };

  CounterList.propTypes = {
      counters: PropTypes.instanceOf(List),
      onIncrement: PropTypes.func,
      onDecrement: PropTypes.func,
      onSetColor: PropTypes.func
  };

  CounterList.defaultProps = {
      counters: [],
      onIncrement: () => console.warn('onIncrement not defined'),
      onDecrement: () => console.warn('onDecrement not defined'),
      onSetColor: () => console.warn('onSetColor not defined')
  };
  ```

  ### 3. containers/CounterListContainer.js
  - `react-redux` 를 이용한 스마트 컴포넌트
  - store의 state 를 dispatch 및 props로 연결

  ```javascript
  import {connect} from 'react-redux';
  import {getRandomColor} from '../util'

  import CounterList from '../components/CounterList';
  import * as actions from '../actions';

  // store 안의 state 값을 props 로 연결
  const mapStateToProps = (state) => {
      return {counters: state.get('counters')}
  };

  //액션 생성자를 사용하여 액션을 생성하고,
  //해당 액션을 dispatch 하는 함수를 만들은 후, 이를 props 로 연결
  const mapDispatchToProps = (dispatch) => ({
      onIncrement: (index) => dispatch(actions.increment(index)),
      onDecrement: (index) => dispatch(actions.decrement(index)),
      onSetColor: (index) => {
          const color = getRandomColor();
          dispatch(actions.setColor({index, color}));
      }
  });

  const CounterListContainer = connect(
      mapStateToProps,
      mapDispatchToProps
  )(CounterList);

  export default CounterListContainer;
  ```

  ### 4. containers/App.js
  - 처음 화면을 연결해주며 onCreate 와 onRemove 를 dispatch 시켜주는 스마트 컴포넌트
  - props 로 연결시킬 state 는 없으므로 null 을 넘김

  ```javascript
  import React, {Component} from 'react';

  import Buttons from '../components/Buttons';
  import CounterListContainer from './CounterListContainer';

  import {connect} from 'react-redux';
  import * as actions from '../actions';
  import {getRandomColor} from "../util";


  class App extends Component {
      render() {
          const {onCreate, onRemove} = this.props;
          return (
              <div className="App">
                  <Buttons
                      onCreate={onCreate}
                      onRemove={onRemove}
                  />
                  <CounterListContainer/>
              </div>
          );
      }
  }

  const mapToDispatch = (dispatch) => ({
      onCreate: () => {
          const color = getRandomColor();
          dispatch(actions.create(color))
      },
      onRemove: (index) => dispatch(actions.remove(index))
  });

  export default connect(null, mapToDispatch)(App);
  ```
---

## immutable.js 적용
  ### 1. src/reducer/index.js 에 적용
  - object는 Map, 배열은 List 로 초기화
  - 이를 push 하거나 pop 가능
  - 가져올땐 get, 세팅할땐 set, 변경할땐 update 를 사용

  ```javascript
  import {Map, List} from 'immutable';
  import * as types from '../actions/ActionTypes';

  const initialState = Map({
      counters: List([
          Map({
              color: 'black',
              number: 0
          })
      ])
  });

  function counter (state = initialState, action) {
      // 레퍼런스 생성
      const counters = state.get('counters');

      switch (action.type) {
          // 카운터를 새로 추가
          case types.CREATE:
              return state.set( 'counters', counters.push(Map({
                      color: action.color,
                      number:0
                  })));
          // 마지막 카운터를 제거
          case types.REMOVE:
              return state.set('counters', counters.pop());
          // 특정 index 번째 카운터를 1만큼 증가
          case types.INCREMENT:
              return state.set('counters', counters.update(
                  action.index,
                  (counter) => counter.set('number', counter.get('number') +1)
              ));
          // 특정 index 번째 카운터를 1만큼 감소
          case types.DECREMENT:
              return state.set('counters', counters.update(
                  action.index,
                  (counter) => counter.set('number', counter.get('number') -1)
              ));
          // 특정 index 번째 카운터의 색상을 변경
          case types.SET_COLOR:
              return state.set('counters', counters.update(
                  action.index,
                  counter => counter.set('color', action.color)
              ));
          default:
              return state;
      }
  }
  export default counter;
  ```

  ### 2. src/components/CounterList.js
  - 값을 넘길때 {...counter} 가 아니라 `{...counter.toJS()}` 를 이용하여 비구조화 객체를 넘김
  - 인스턴스는 instanceOf(List) !!

  ### 3. src/containers/CounterListContainer.js
  - mapStateToProps 에서 `get` 을 사용하여 state 를 가져와야 한다.

  ```javascript
  const mapStateToProps = (state) => {
      return {counters: state.get('counters')}
  };
  ```
