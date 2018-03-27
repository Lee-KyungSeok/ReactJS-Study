# Setting
  - 동일 세팅
  - Webpack3 & babel 업데이트 이하 버전
    - `react-fundamental` 프로젝트 참고(react-hot-loader 반영됨)
  - Webpack4 & babel7 업데이트 버전(베타버전)
    - `react-fundamental2` 프로젝트 참고(react-hot-loader 반영 안됨)
  - 패키지 및 기본구조 세팅

---

## 동일 세팅
  ### 1. 시작 전 세팅
  - git 관리!!
  - NPM/NODE 를 LTS 버전으로 받는다.
    - 그 후 `npm install -g npm` 을 통하여 npm 버전을 최신으로 업데이트 해야 한다. (설치 시 속도 때문)
  - DB 설치
  - 원하는 에디터 설치
    - react 에 관한 tool 을 설치하면 좋다.
  - 시작 - `npm init`
    - 프로젝트를 생성 후 (빈 프로젝트) 프로젝트를 시작 한다(노드화)

  ### 2. React 설치
  - npm 을 활용하여 react 와 react-dom 둘다 설치한다.
  - react-hot-loader 는 개발자 디펜던시로 추가

  ```
  npm install --save react react-dom
  npm install --save-dev react-hot-loader
  ```

  ### 3. 디렉토리 구조 이해 및 파일 생성
  - 디렉토리 구조는 아래와 같이 된다.
  - 미리 만들고 싶다면 아래 명령어를 입력한다.
  - Webpack entry point 는, Webpack 모듈에서 가장 처음으로 읽어들일 파일이다.

  > 디렉토리 구조

  ```
  react-tutorial
  ├── package.json    
  ├── package-lock.json      
  ├── public            # 서버 public path
  │   └── index.html    # 메인 페이지
  ├── src               # React.js 프로젝트 루트
  │   ├── components    # 컴포넌트 폴더
  │   │   └── App.js    # App 컴포넌트
  │   └── index.js      # Webpack Entry point
  └── webpack.config.js # Webpack 설정파일
  ```

  > 명령어

  ```
  mkdir src src/components public && touch public/index.html src/components/App.js src/index.js webpack.config.js
  ```

  ### 4. babel 과 webpack 이란?
  - `babel` : 아직 ECMAScript6 를 지원하지 않는 환경에서 ECMAScript6 Syntax를 사용 할 수 있게 해준다
  - `webpack` : 모듈 번들러로서, Browserify 처럼 브라우저 위에서 import (require) 을 할 수 있게 해주고 자바스크립트 파일들을 하나로 합쳐준다.
  - `webpack-dev-server` : wepback에서 지원하는 간단한 개발서버로서 별도의 서버를 구축하지 않고도 웹서버를 열 수 있으며 hot-loader를 통하여 코드가 수정될때마다 자동으로 리로드 되게 할 수 있습니다. (but> 개발용 서버로 production 용은 아니다)

---

## Webpack3 & babel 업데이트 이하 버전 세팅
  ### 1. babel 설치
  - babel 에서 사용 될 플러그인을 설치 (해당 모듈들은 개발환경에서만 사용되므로 –save-dev 옵션을 설정)
    - babel/preset-env로 설치 (es2015 등은 env 로 바뀌었다.)

  ```
  npm install --save-dev babel-core babel-loader babel-preset-react babel-preset-env
  ```

  ### 2. Webpack 설치
  - webpack 은 글로벌로 설치하는 것이 좋다
  - 3점대로 설치하며 서버는 2점대로 설치한다.
  - webpack 과 webpack-dev-server 을 로컬 모듈로 다시 설치하는 이유는 webpack 의 livereload와 비슷한 기능인 –hot 옵션을 사용하기 위함
  -  란 해당 사항이 변경되면 컴포넌트를 변경해준다. (따로 로더를 설치.. 안하면 새로고침 하면 된다.)

  ```
  npm install -g babel webpack@3 webpack-dev-server@2
  npm install --save-dev webpack@3 webpack-dev-server@2
  ```

  ### 3. webpack.config.js 파일 설정
  - `webpack.config.js` 파일을 생성 후 수정
  - entry 부터 시작하여 필요한 모듈들을 다 불러온 후, 한 파일로 합쳐 bundle.js 에 저장
  - module 부분
    - es2015 등 버전과 react 부분을 일반 자바스크립트 형태로 변환해준다.
    - 여기서 css 로더 등도 함께 사용 가능하다.
  - `module` 에서 `loader` 가 `rules` 로 바뀌었음에 주의 (loader 는 webpack 1 버전)

  > webpack.config.js

  ```javascript
  var webpack = require('webpack');

  module.exports = {
      // 주를 이루는 JavaScript 파일(엔트리 포인트)
      entry: './src/index.js',

      // 파일 출력 설정
      output: {
          path: __dirname + '/public/', // 출력 파일 디렉토리 이름
          filename: 'bundle.js'         // 출력 파일 이름
      },

      devServer: {
          hot: true,
          inline: true,
          host: '0.0.0.0',
          port: 4000,
          contentBase: __dirname + '/public/',
      },

      module: {
          rules: [
              {
                  test: /\.js$/,
                  loader: 'babel',
                  exclude: /node_modules/,
                  options: {
                      cacheDirectory: true,
                      presets: ['env', 'react']
                  }
              }
          ]
      },

      plugins: [
          new webpack.HotModuleReplacementPlugin()
      ]
  }
  ```

---
## Webpack4 & babel7 업데이트 버전 세팅
  ### 1. @babel~~ 설치
  - 새로운 바벨 버전이 필요
    - @babel/core: 바벨의 핵심 파일, 바벨의 다른 모듈들이 종속성을 가짐
    - @babel/node: 바벨의 CLI 도구 중 하나, 이전 버전의 babel-cli로부터 분리
    - @babel/preset-env: 바벨의 preset 중 하나로 es6+ 이상의 자바스크립트를 각 브라우저/노드 환경에 맞는 코드로 변환
    - ...
  - [참고_babel-loader](https://github.com/babel/babel-loader)

  ```
  npm install "babel-loader@^8.0.0-beta" @babel/core @babel/preset-env @babel/node @babel/preset-react --save-dev
  ```

  ### 2. .babelrc 파일 생성
  - .babelrc 파일 을 프로젝트 폴더 아래 만든 후 적용

  ```javascript
  // .babelrc
  {
    "presets": ["@babel/preset-env", "@babel/preset-react"]
  }
  ```

  ### 3. package.json 수정 (node 인 경우_nodemon 설치 시)
  - babel-node 추가 (꼭 start 가 아니어도 된다.)

  ```javascript
  "start": "nodemon index.js --exec babel-node"
  ```

  ### 3. Webpack4 설명 및 설치
  -  웹팩은 버전 4 를 내놓으며 전보다 더 빠르고, 설정 파일 없는 빌드(zero-configuration)가 가능
  - webpack을 사용하려면 두 가지 모듈이 필요하므로 설치한다.
    - 글로벌로 설치 후 local에 Dependedncy에도 추가하면 좋다.
  - package.json 파일에서 새로운 스크립트를 추가 (webpack 명령어를 package.json 파일에 'build' 명령어로 등록)

  ```
  npm install webpack webpack-cli -g
  npm install webpack webpack-cli webpack-devserver --save-dev
  ```

  > package.json

  ```json
  "scripts": {
      "build": "webpack"
  },
  ```

  ### 4. webpack.config.js 파일 설정
  - `webpack.config.js` 파일을 최상위 디렉토리에 생성 후 수정
  - `mode` 설정 가능
    - 'production'으로 설정하면 최적화된 상태에서 JS 파일이 출력
    - 'development'로 설정하면 소스맵을 효과적으로 JS 파일이 출력된다.
  - `optimization` 에 최적화 관련 플러그인들이 통함됨
    - ModuleConcatenationPlugin과 UglifyJsPlugin, NoEmitOnErrorsPlugin, NamedModules 플러그인도 여기 속성으로 바뀜
    - 나중에 나오는 CommonsChunkPlugin도 사라지고 여기에 병합
  - babel 사용시 `@babel` 로 사용

  ```javascript
  var webpack = require('webpack');

  module.exports = {
      mode: 'development',

      entry: './src/index.js',

      output: {
          path: __dirname + '/public/',
          filename: 'bundle.js'
      },

      devServer: {
          hot: true,
          inline: true,
          host: '0.0.0.0',
          port: 4000,
          contentBase: __dirname + '/public/',
      },

      module: {
          rules: [
              {
                  test: /\.js$/,                  //js로 끝나는 확장자만 로더를 적용할 것
                  loader: 'babel-loader',         //babel-loader 사용
                  exclude: ['/node_modules'],     //node_modules 폴더는 제외
                  options: {
                      presets: [
                          '@babel/preset-env',
                          '@babel/preset-react'
                      ],
                  },
              }
          ]
      },

      plugins: [
          new webpack.HotModuleReplacementPlugin()
      ],

      optimization: {
          minimize: true/false,     // 정해주어야 함
          splitChunks: {}
      }
  };
  ```

---

## 패키지 및 기본구조 세팅
  ### 1. HTML 작성
  - `/public/index.html` 을 만든다
  - div id = “app” 을 React 프로젝트의 root element 로 지정하고
index.js 스크립트를 로드
  -  이 파일은 webpack에서 bundle된 파일로서, react 라이브러리 및 기타 자바스크립트 파일들이 하나로 합쳐진 파일

  ```HTML
  <!DOCTYPE html>
  <html>

     <head>
        <meta charset="UTF-8">
        <title>React App</title>
     </head>

     <body>
        <div id="root"></div>
        <script src="bundle.js"></script>
     </body>

  </html>
  ```

  ### 2. JS 파일 작성
  - `src/components/App.js` 생성 (첫 네이밍이 대문자인건 React의 naming convention)
    - `import` : JavaScript ES6 에 새로 도입된 키워드로서, `require('..')` 의 역할
    - `export` : JavaScript ES6 에 새로 도입된 키워드로서, `module.export = App` 과 동일
  - `src/index.js` 생성
    - App 컴포넌트를 불러와서 root element 에 렌더링

  > src/components/App.js

  ```javascript
  import React from 'react';

  class App extends React.Component {
      render(){

          return (
                  <h1>Hello React</h1>
          );
      }
  }

  export default App;
  ```

  > src/index.js

  ```javascript
  import React from 'react';
  import ReactDOM from 'react-dom';
  import App from './components/App';

  const rootElement = document.getElementById('root');
  ReactDOM.render(<App/>, rootElement);
  ```

  ### 3. package.json 에 명령어 설정
  - `npm run dev-server` 명령어를 입력하면 실행될 수 있도록 script 부분을 설정

  ```json
  "scripts": {
      "dev-server": "webpack-dev-server"
  },
  ```
