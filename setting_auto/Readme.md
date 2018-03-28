# create-react-app
  - React 에서 제공하는 프로젝트 생성도구
    - babel이나 webpack 설정을 자동으로 해준다.
  - [참고](https://github.com/facebook/create-react-app)

---

## create-reacat-app
  ### 1. 설치 및 프로젝트 생성
  - 설치 : `npm install -g create-react-app`
  - 프로젝트 생성 : `create-react-app [프로젝트명]`
  - 서버 시작 : `npm start`
    - 포트는 `3000` (노드환경에서 변경 가능)
  - 빌드 : `npm run build` (자동으로 설정되어 있음)
  - react-hot-loader 는 따로 설정해주어야 한다.

  ### 2. 도구 Eject
  - 프로젝트의 환경 설정을 도와주는 도구
  - 현재 프로젝트의 모든 설정 / 스크립트를 자신의 프로젝트로 옮겨주어 마음대로 커스터마이징하도록 하게 해준다.
  - 단, 프로젝트의 구조가 이전보다 깔끔해지지는 않는다.
  - 시작 : `npm run eject`

## 프로젝트 구조 및 컴포넌트 생성
  ### 1. 프로젝트 구조
  - src/ 내에 있는 파일을 삭제(`registerServiceWorker`, `index` 빼고 삭제)
  - src/ 디렉토리에 `actions`, `components`, `reducers` 폴더를 만든다.

  ### 2. 기본 파일 생성
  - components 에 `App.js` 파일을 만든다.

  > src/components/App.js

  ```JavaScript
  import React, {Component} from 'react';
  import PropTypes from 'prop-types'

  const propTypes = {};

  const defaultProps = {};

  class App extends Component {
      constructor(props) {
          super(props)
      }

      render() {
          return (
              <div>MyComponent</div>
          );
      }
  }

  App.propTypes = propTypes;
  App.defaultProps = defaultProps;

  export default App;
  ```

  - src/ 디렉토리에 `index.js` 파일을 수정한다.

  > src/index.js

  ```JavaScript
  import React from 'react';
  import ReactDOM from 'react-dom';
  import App from './components/App';
  import registerServiceWorker from './registerServiceWorker';

  ReactDOM.render(<App />, document.getElementById('root'));
  registerServiceWorker();
  ```
