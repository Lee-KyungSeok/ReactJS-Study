# react-hot-loader 설정
  - react-hot-loader 설정하기 (webpack3, babel7 사용)

---

## react-hot-loader 설정하기
  ### 1. react-hot-loader 란?
  - hot 을 사용하면 파일을 수정했을 때 달라진 부분만 로드시켜주는 기능을 한다.
  - 그러나 state 가 바뀔 경우 이를 생략해버리는 경우가 존재하여 이를 방지하고자 설정
  - 가끔 안될때도 있으니.... 그럴땐 새로고침 해야함

  ### 2. webpack.confing.js 파일 수정
  - 아래와 같이 수정한다.(현재 4점대 사용)
    - entry
    - module의 options 부분에서 plugins 추가

  ```javascript
  const webpack = require('webpack');

  module.exports = {
      // 주를 이루는 JavaScript 파일(엔트리 포인트)
      entry: ['react-hot-loader/patch','./src/index.js'],

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
                  loader: 'babel-loader',
                  exclude: /node_modules/,
                  options: {
                      cacheDirectory: true,
                      presets: ['env', 'react'],
                      plugins: ["react-hot-loader/babel"]
                  }
              }
          ]
      },

      plugins: [
          new webpack.HotModuleReplacementPlugin()
      ]
  };
  ```

  ### 3. src/index.js 수정
  - hot-loader의 api 를 불러와야 한다.

  ```javascript
  import React from 'react';
  import ReactDOM from 'react-dom';
  import { AppContainer } from 'react-hot-loader'
  import App from './components/App';

  ReactDOM.render(
      <AppContainer>
          <App/>
      </AppContainer>,
      document.getElementById('root')
  );

  // Hot Module Replacement API
  if (module.hot) {
      module.hot.accept('./components/App', () => {
          const NextApp = require('./components/App').default;
          ReactDOM.render(
              <AppContainer>
                  <NextApp/>
              </AppContainer>
              ,
              document.getElementById('root')
          );
      });
  }
  ```
