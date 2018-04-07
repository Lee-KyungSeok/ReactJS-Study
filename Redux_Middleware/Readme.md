# Redux Middleware & axios
  - Middleware 기본
  - redux-thunk 사용방법
  - axios Redux 에 적용
  - redux-promise-middleware 사용 방법

---

## Middleware 기본
  ### 1. 미들웨어 만들어 보기
  - store, next, action 이용

  ```javascript
  const loggerMiddleware = store => next => action => {
    // 현재 스토어 상태값 기록
    console.log('현재 상태', store.getState());
    // 액션 기록
    console.log('액션', action);

    // 액션을 다음 미들웨어, 혹은 리듀서로 넘김
    const result = next(action);

    // 액션 처리 후의 스토어 상태 기록
    console.log('다음 상태', store.getState());
    console.log('\n'); // 기록 구분을 위한 비어있는 줄 프린트

    return result; // 여기서 반환하는 값은 store.dispatch(ACTION_TYPE) 했을때의 결과로 설정
  }
  ```

  ### 2. 만든 미들웨어 적용하기
  - createStore할 때 redux 에 있는 `applyMidleware` 이용
  - 여러개의 미들웨어를 적용하면 여러 인자를 넣으면 되고, 순서는 전달한 파라미터의 순서대로 지정된다.


  ```javascript
  import { createStore, applyMiddleware } from 'redux';
  import modules from './modules';
  import loggerMiddleware from './lib/loggerMiddleware';

  // 여러개의 미들웨어 전달 가능 ex> applyMiddleware(a,b,c)
  const store = createStore(modules, applyMiddleware(loggerMiddleware))

  export default store;
  ```

  ### 3. 외부 미들웨어 가져와서 적용해보기(redux-logger)
  - `redux-logger` 는 로거 미들웨어
  - 설치 : `npm install --save redux-logger`
  - 적용 : `import { createLogger } from 'redux-logger'` 선언 후 `const logger = createLogger();` 를 적용
  - 로그 미드뤠어를 생성 할때 설정을 커스터마이징할 수 있다.

  ```javascript
  import { createStore, applyMiddleware } from 'redux';
  import modules from './modules';

  import { createLogger } from 'redux-logger';
  const logger = createLogger();
  const store = createStore(modules, applyMiddleware(logger))

  export default store;
  ```

---

## ReduxMiddleware 1 : redux-thunk
  ### 1. redux-thunk 란
  - [redux-thunk 홈페이지](https://github.com/gaearon/redux-thunk)
  - 객체 대신 함수를 생성하는 액션 생성함수를 작성 할 수 있게 해준다.
  - 액션 생성자 내부에서 여러가지 작업을 할 수 있게 만들어준다.
    - ex> 네트워크  요청 / 액션을 여러번 dispatch 등
  - 설치 : `npm install --save redux-thunk`
  - 적용 : `import ReduxThunk from redux-thunk` 후 createStore에서 적용

  ```javascript
  import { createStore, applyMiddleware } from 'redux';
  import modules from './modules';

  import ReduxThunk from 'redux-thunk';
  const store = createStore(modules, applyMiddleware(ReduxThunk))

  export default store;
  ```

  ### 2. 일반적인 액션과 비교
  - 일반 액션에서는 여러 액션 작업을 수행할 수 없지만 미들웨어를 사용하면 리턴값에 `dispatch` 혹은 `getState` 등을 넣어 수행 가능

  ```javascript
  // 일반 액션
  function increment() {
    return {
      type: INCREMENT_COUNTER
    };
  }

  // 미들웨어 사용후 액션 수행하는 function
  function incrementIfOdd() {
    return (dispatch, getState) => {
      const { counter } = getState();

      if (counter % 2 === 0) {
        return;
      }
      dispatch(increment());
    };
  }
  ```

  ### 3. 비동기적 코드 만들기 예제
  - module에서 만들어 특정 액션을 그 뒤에 dispatch 하도록 설정 가능
  - arrow function 으로 사용 가능

  > modules/index.js

  ```javascript
  import { handleActions, createAction } from 'redux-actions';

  const INCREMENT = 'INCREMENT';
  const DECREMENT = 'DECREMENT';

  export const increment = createAction(INCREMENT);
  export const decrement = createAction(DECREMENT);

  // 리턴값을 dispatch로 받아 수행 가능
  export const incrementAsync = () => dispatch => {
      // 1초 뒤 액션 디스패치
      setTimeout(
          () => { dispatch(increment()) },
          1000
      );
  }

  export default handleActions({
      [INCREMENT]: (state, action) => state + 1,
      [DECREMENT]: (state, action) => state - 1
  }, 0);
  ```

---

## Redux 에서 axios 사용
  ### 1. 기본
  - 설치 : `npm install --save axios`
  - 사용방법

  ```javascript
  import axios from 'axios';

  componentDidMount() {
      axios.get('api 주소')
           .then(response => console.log(response.data));
  }
  ```

  ### 2. redux-thunk 와 함께 이용 - post.js
  - api 를 get 한 뒤 promise 를 이용한 후 요청 결과에 따라 dipatch를 성공/실패로 나누어 실행한다.

  ```javascript
  import { handleActions } from 'redux-actions';

  import axios from 'axios';

  function getPostAPI(postId) {
      return axios.get(`api 주소/${postId}`)
  }

  const GET_POST_PENDING = 'GET_POST_PENDING';
  const GET_POST_SUCCESS = 'GET_POST_SUCCESS';
  const GET_POST_FAILURE = 'GET_POST_FAILURE';

  export const getPost = (postId) => dispatch => {
      // 먼저, 요청이 시작했다는것을 notice
      dispatch({type: GET_POST_PENDING});

      // 요청을 시작
      // 여기서 만든 promise 를 return 해주어야, 나중에 컴포넌트에서 호출 할 때 getPost().then(...) 을 할 수 있다.
      return getPostAPI(postId).then(
          (response) => {
              // 요청이 성공했을경우, 서버 응답내용을 payload 로 설정하여 GET_POST_SUCCESS 액션을 디스패치
              dispatch({
                  type: GET_POST_SUCCESS,
                  payload: response
              })
          }
      ).catch(error => {
          // 에러가 발생했을 경우, 에로 내용을 payload 로 설정하여 GET_POST_FAILURE 액션을 디스패치
          dispatch({
              type: GET_POST_FAILURE,
              payload: error
          });
      })

  }

  const initialState = {
      pending: false,
      error: false,
      data: {
          title: '',
          body: ''
      }
  }

  export default handleActions({
      [GET_POST_PENDING]: (state, action) => {
          return {
              ...state,
              pending: true,
              error: false
          };
      },
      [GET_POST_SUCCESS]: (state, action) => {
          const { title, body } = action.payload.data;

          return {
              ...state,
              pending: false,
              data: {
                  title, body
              }
          };
      },
      [GET_POST_FAILURE]: (state, action) => {
          return {
              ...state,
              pending: false,
              error: true
          }
      }
  }, initialState);
  ```

  ### 3. redux-thunk 와 함께 이용 - 컴포넌트
  - async 와 await 를 이용하여 비동기를 동기화로 변환하여 요청 완료 및 에러처리 가능
  - 따로 만들어서 사용할 수 있다.

  ```javascript
  import React, { Component } from 'react';
  import { bindActionCreators } from 'redux';
  import { connect } from 'react-redux';

  import * as postActions from './modules/post';


  class App extends Component {
      // 컴포넌트가 처음 마운트 될 때 Post를 get
      componentDidMount() {
          this.getPost(1);
      }

      getPost = async (postId) => {
          const { PostActions } = this.props;

          try {
              await PostActions.getPost(postId);
              console.log('요청이 완료 된 다음에 실행')
          } catch(e) {
              console.log('에러 발생!');
          }
      }

      render() {
          const { PostActions, post, error, loading } = this.props;

          return (
              <div>
                  { loading && <h2>로딩중...</h2>}
                  { error
                      ? <h1>에러발생!</h1>
                      : (
                          <div>
                              <h1>{post.title}</h1>
                              <p>{post.body}</p>
                          </div>
                      )}
              </div>
          );
      }
  }

  export default connect(
      (state) => ({
          post: state.post.data,
          loading: state.post.pending,
          error: state.post.error
      }),
      (dispatch) => ({
          PostActions: bindActionCreators(postActions, dispatch)
      })
  )(App);
  ```

---

## ReduxMiddleware 2 : redux-promise-middleware
  ### 1. redux-promise-middleware 기본
  - 설치 : `npm install --save redux-promise-middleware`
  - 프로미스가 payload 로 전달되면, 요청이 시작, 성공, 실패 할 때 액션의 뒷부분에 `_PENDING`, `_FULFILLED`, `_REJECTED` 를 반환
    - 접미사 커스터마이징 가능 : 아래는 'LOADING', 'SUCCESS', 'FAILURE' 로 커스터마이징 함
  - 적용

  ```javascript
  import { createStore, applyMiddleware } from 'redux';
  import modules from './modules';

  import ReduxThunk from 'redux-thunk';
  import promiseMiddleware from 'redux-promise-middleware';

  const customizedPromiseMiddleware = promiseMiddleware({
      promiseTypeSuffixes: ['LOADING', 'SUCCESS', 'FAILURE']
  });

  const store = createStore(modules, applyMiddleware(ReduxThunk, customizedPromiseMiddleware));

  export default store;
  ```

  ### 2. 액션 생성자에 적용
  - thunk 를 통하여 직접 하는 작업 생략 가능
  - 아래는 `getPost` 부분이 간소화됨
  - 액션에서 정의된 타입, payload 참고 : [홈페이지](https://github.com/pburtchaell/redux-promise-middleware/blob/master/docs/introduction.md)

  ```javascript
  import { handleActions } from 'redux-actions';

  import axios from 'axios';

  function getPostAPI(postId) {
      return axios.get(`api주소/${postId}`)
  }

  const GET_POST = 'GET_POST';
  const GET_POST_PENDING = 'GET_POST_PENDING';
  const GET_POST_SUCCESS = 'GET_POST_SUCCESS';
  const GET_POST_FAILURE = 'GET_POST_FAILURE';

  export const getPost = (postId) => ({
      type: GET_POST,
      payload: getPostAPI(postId)
  })

  /* 리듀서 부분은 동일 */
  ```
