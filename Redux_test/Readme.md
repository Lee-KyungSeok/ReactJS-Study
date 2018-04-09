# 리액트-리덕스 테스트
  - 리덕스 테스트의 흐름
  - 일반 테스트 코드 작성 방법
  - 비동기 테스트 코드 작성 방법

---

## 리덕스 테스트 흐름
  ### 1. 리덕스 테스트?
  - 리덕스 테스트 항목
    - `액션 생성 함수` : 주어진 파라미터에 따라 원하는 액션 객체가 잘 만들어지는지 검증
    - `리듀서` : 특정 액션이 디스패치 되었을 때, 리듀서가 상태를 제대로 업데이트 하는지 검증
    - `컨테이너 컴포넌트` : 컴포넌트와 연동됐을 때도 잘 작동하는지 확인
  - 테스트 종류
    - `상태를 위한 테스트(리덕스 관련)` : 컴포넌트 테스트 코드를 작성 할 땐, props 가 전달되었을 때 올바르게 그려주는지 테스팅
    - `뷰를 위한 테스트(컴포넌트 관련)` : props 가 전달되었을 때 올바르게 그려주는지 테스팅
    - `통합 테스팅` : 유닛으로 쪼갰던 모든 작업을 함께 테스팅

  ### 2. 테스트의 수준
  - 정해진 것은 없다.
  - 이상적인 수준의 테스트
    - 프리젠테이셔널 컴포넌트, props 에 따라 제대로 보여지는지 테스트
    - 액션 생성함수, 우리가 의도했던 대로 액션을 잘 만들어주는지 테스트 (but> 비동기 액션 함수를 제외하고는 잘 하지 않음)
    - 리듀서, 상태와 액션을 전달해주면, 의도했던 대로 업데이트를 해주는지 테스트
    - 컨테이너 컴포넌트, 통합 테스팅을 통하여 모든게 잘 되는지 테스트

  ### 3. 테스트시 확인 사항
  - 액션 생성 함수들이 액션을 잘 만드는가?
  - 리듀서가 상태 변화를 제대로 일으키는가?
  - 컴포넌트는 제대로 렌더링 되는가?
  - 버튼이 클릭 됐을 때, 실제로 액션이 디스패치 되는가?

---

## 테스트 코드 작성 방법
  ### 1. 액션 생성 함수 및 리듀서 테스팅
  - 리듀서 함수와 액션함수를 import 한 뒤 검증
  - 액션 생성함수
    - expectActions 객체의 내부 값들이 일치하는지 확인
    - toMatchSnapshot 을 통하여 비교할 수 도 있다.
  - 리듀서
    - 초기상태 설정 확인
    - 각 액션의 결과물 검증

  > src/store/modules/counter.test.js

  ```javascript
  import counter, * as counterActions from './counter';

  describe('counter', () => {
      // 액션함수 테스트
      describe('actions', () => {
          it('should create actions', () => {
              const expectedActions = [
                  { type: 'counter/INCREASE'},
                  { type: 'counter/DECREASE'}
              ];

              const actions = [
                  counterActions.increase(),
                  counterActions.decrease()
              ];
              // 일치하는지 확인
              expect(actions).toEqual(expectedActions);
              // expect(actions).toMatchSnapshot(); 이도 가능
          });
      });

      // 리듀서 테스트
      describe('reducer', () => {
          let state = counter(undefined, {});
          // counter의 초기값 확인
          it('should return the initialState', () => {
              expect(state).toHaveProperty('number', 0);
          });

          // increase 확인
          it('should increase', () => {
              state = counter(state, counterActions.increase());
              expect(state).toHaveProperty('number', 1);
          });

          // decrease 확인
          it('should increase', () => {
              state = counter(state, counterActions.decrease());
              expect(state).toHaveProperty('number', 0);
          });
      });
  });
  ```

  ### 2. 프리젠테이셔널 컴포넌트 테스팅
  - 렌더링 결과물에 props 가 잘 전달되는지 검증
    - ex> value props 를 700으로 검증하고 <h2> 태그에 700이 있는지 검증
  - props에 전달된 함수가 제대로 작동하는지 검증
    - Jest의 `fn` 도구 이용 (함수가 호출되는지 확인해주는 도구)
    - ex> mock함수를 만들어 이 함수가 호출될때마다 값(`함수명.mock.calls.length`)을 증가시킴

  > src/components/Counter.test.js

  ```javascript
  import React from 'react';
  import {shallow} from 'enzyme';
  import Counter from './Counter';

  describe('Counter', () => {
      let component = null;
      const mockIncrease = jest.fn();
      const mockDecrease = jest.fn();

      // 랜더링 검증
      it("renders correctly", () => {
          component = shallow(<Counter value={700} onIncrease={mockIncrease} onDecrease={mockDecrease}/>);
      });

      // 스냅샷이 일치하는지 검증(u 시 업데이트)
      it("matches snapshot", () => {
          expect(component).toMatchSnapshot();
      });

      // value 값이 들어오는지 검증
      it('is 700', () => {
          expect(component.find('h2').at(0).text(), '700');
      });

      // props 로 전달해줄 onIncrease 와 onDecrease 가 제대로 작동하는지 검증
      it('calls functions', () => {
          const button = component.find('button');
          // 0번째 버튼과 1번째 버튼을 시뮬레이트
          button.at(0).simulate('click');
          button.at(1).simulate('click');
          expect(mockIncrease.mock.calls.length).toBe(1);
          expect(mockDecrease.mock.calls.length).toBe(1);
      });
  });
  ```

  ### 3. 컨테이너 컴포넌트 테스트
  - 가짜 스토어 이용
    - `redux-mock-store` : 가짜 스토어를 만들어서, 특정 액션이 디스패치됐는지 안됐는지 판별하는것을 도와주는 라이브러리 (이를 이용)
    - 설치 : `npm install --save-dev redux-mock-store`
    - 가짜 store를 생성해서 각 버튼 클릭에 따라 dispatch 가 잘 되었는지 확인
  - 실제 스토어 이용
    - redux 에 존재하는 실제 스토어릁 이용할 수 있다.
  - 디스패치된 액션들의 목록을 store.getActions() 를 통하여 조회가능
  - 디스패치된 상태는 store.getState() 를 통하여 조회 가능

  > src/containers/CounterContainer.test.js (가짜스토어)

  ```javascript
  import React from 'react';
  import {mount} from 'enzyme';
  import CounterContainer from './CounterContainer';
  import configureMockStore from 'redux-mock-store';
  import * as counterActions from '../store/modules/counter';

  describe('CounterContainer', () => {
      let component = null;
      let button = null;

      // 데이터를 받아올 가짜 스토어 만들기
      const mockStore = configureMockStore();
      let store = mockStore({
          counter: {
              number: 0
          }
      });

      // 랜더링 확인
      it('renders properly', () => {
          const context = {store};
          // 가짜 store를 지정
          component = mount(<CounterContainer/>, {context});
          // 혹은 component = mount(<CounterContainer store={store} />);
      });

      // snapshot 비교
      it('matches snapshot', () => {
          expect(component).toMatchSnapshot();
      });

      // increase dispatch 확인
      it('dispatches Increase action', () => {
          component.find('button').at(0).simulate('click');
          expect(store.getActions()[0]).toEqual(counterActions.increase());
      });

      // decrease dispatch 확인
      it('dispatches Decrease action', () => {
          component.find('button').at(1).simulate('click');
          expect(store.getActions()[1]).toEqual(counterActions.decrease());
      });
  });
  ```

  > src/containers/NamesContainer.test.js (진짜 스토어)

  ```javascript
  import React from 'react';
  import { mount } from 'enzyme';
  import NamesContainer from './NamesContainer';
  import configureStore from '../store/configureStore';

  describe('NamesContainer', () => {
      let component = null;
      let button = null;

      // 실제 store로 받아봄
      let store = configureStore();

      it('renders properly', () => {
          const context = { store };
          component = mount(<NamesContainer/>, {context});
      });

      it('matches snapshot', () => {
          expect(component).toMatchSnapshot();
      });

      it('dispatches CHANGE_INPUT action', () => {
          const mockedEvent = {
              target: {
                  value: 'world'
              }
          };
          component.find('input').simulate('change', mockedEvent);
          expect(store.getState().names.input).toBe('world');
      });

      it('dispatches INSERT action', () => {
          component.find('form').simulate('submit');
          expect(store.getState().names.names).toEqual(['world']);
      });
  });
  ```

---
## 비동기 작업 테스트
  ### 1. nock 라이브러리
  - 실제 테스트는 실제 주소에 HTTP 요청을 날렸다가, 기다린다음에 잘 됐는지 확인하지만 이는 비효율적임
  - `nock` 라이브러리 : 우리가 사전에 정해준 주소로 요청을 하게 되었을 때, HTTP 요청을 가로채서, 네트워크 요청을 실제로 넣지 않고 우리가 원하는 데이터가 바로 나오도록 설정
  - 설치 : `npm install --save nock`
  - axios 의 어댑터를 http 로 설정 (`setupTest.js` 파일 수정)

  > src/setupTest.js

  ```javascript
  import {configure} from 'enzyme';
  import Adapter from 'enzyme-adapter-react-16';
  import http from 'axios/lib/adapters/http';
  import axios from 'axios'

  axios.defaults.adapter = http;
  configure({ adapter: new Adapter()});
  ```

  ### 2. 액션 테스트 및 리듀서 테스트
  - 액션 테스트
    - thunk 가 제대로 작동하는지 확인 (요청이 시작했을때, 실패했을 때, 성공했을때 모든게 잘 되는지 확인)
  - 리듀서 테스트
    - 리듀서 함수를 직접 호출하는 대신, 스토어를 만들어서 실제로 변화가 제대로 이뤄지는지 검증

  ```javascript
  import post, {getPost} from "./post";
  import nock from 'nock';
  import thunk from 'redux-thunk';
  import configureMockStore from 'redux-mock-store';

  describe('post', () =>
      // 액션 테스팅
      describe('actions', () => {
          const store = configureMockStore([thunk])();
          it('getPost dispatches proper actions', async () => {
              nock('http://jsonplaceholder.typicode.com')
                  .get('/posts/1').once().reply(200, {
                      title: 'hello',
                      body: 'world'
              });
              await store.dispatch(getPost(1));
              expect(store.getActions()[0]).toHaveProperty('type', 'post/GET_POST_PENDING');
              expect(store.getActions()[1]).toHaveProperty('type', 'post/GET_POST_SUCCESS');
              expect(store.getActions()).toMatchSnapshot();
          });

          it('fails', async () => {
              store.clearActions(); // 기존 액션 비우기
              nock('http://jsonplaceholder.typicode.com')
                  .get('/posts/0').once().reply(400);
              try{
                  await store.dispatch(getPost(0));
              } catch (e) {

              }
              expect(store.getActions()).toMatchSnapshot();
          });
      });

      // 리듀서 테스팅
      describe('reducer', () => {
          const store = configureStore();
          it('should process getPost', async () => {
              nock('http://jsonplaceholder.typicode.com')
                  .get('/posts/1').once().reply(200, {
                      title: 'hello',
                      body: 'world'
              });
              await store.dispatch(getPost(1));
              expect(store.getState().post.title).toBe('hello');
              expect(store.getState().post.body).toBe('world');
          });
      });
  });
  ```

  ### 3. 컨테이너 컴포넌트 테스트
  - 이전에 리듀서를 테스트 할 땐, getPost 를 직접 호출했었기 때문에 await 을 할 수있었지만, 버튼에 클릭 이벤트를 시뮬레이트 할 경우, getPost 가 반환하는 Promise 에 접근 할 방법이 없다.
  -  스토어의 subscribe 기능을 활용해서, 새로운 Promise 를 만들고, subscribe 를 통하여 새 액션이 디스패치 됐을 때 resolve 를 하도록 한다.

  > src/containers/PostContainer

  ```javascript
  import React, {Component} from 'react';
  import {bindActionCreators} from 'redux';
  import {connect} from 'react-redux';

  import Post from '../components/Post';
  import * as postActions from '../store/modules/post';

  class PostContainer extends Component {
      loadData = async () => {
          const { PostActions } = this.props;
          try{
              await PostActions.getPost(1);
          } catch (e) {
              console.log(e);
          }
      };

      render() {
          const {title, body} = this.props;
          const {loadData} = this;

          return (
              <Post title={title} body={body} onLoad={loadData}/>
          );
      }
  }

  const mapStateToProps = (state) => ({
      title: state.post.title,
      body: state.post.body
  });

  const mapDispatchToProps = (dispatch) => ({
      PostActions: bindActionCreators(postActions, dispatch)
  });

  export default connect(mapStateToProps, mapDispatchToProps)(PostContainer);
  ```
