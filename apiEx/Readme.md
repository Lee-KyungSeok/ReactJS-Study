# axios 를 이용한 Api 연동 실습
  - 환경설정
    - Sass 설정, CSS 모듈 설정
  - API 사용하기
    - axios
    - Promise?
    - async/await
  - loader 불러오기

---

## 들어가기 전 환경 설정
  ### 1. ejct 및 모듈 설치
  - `npm run eject` 를 이용하여 프로젝트 설정을 커스터마이징 할 수 있도록 변경
  - 필요한 모듈 설치
    - axios: Promise 기반 웹 요청 클라이언트
    - classnames: CSS Module 과 조건부 className 을 설정 하는 것을 도와주는 라이브러리
    - sass-loader, node-sass: 프로젝트에서 Sass 를 사용하기 위하여 필요한 도구
    - include-media, open-color: Sass 라이브러리 (반응형 디자인, 색상 팔레트)
    - better-react-spinkit: 로딩 시 보여줄 컴포넌트
    - react-icons: SVG 형태의 리액트 컴포넌트 모음 라이브러리
    - moemnt: 날짜 관련 라이브러리

  ```
  npm install --save axios classnames sass-loader node-sass include-media open-color better-react-spinkit react-icons moment
  ```

  ### 2. Sass 및 CSS Module 적용
  - `webpack.config.dev.js` 파일에서 sass 설정 추가
    - ` includePaths ` 는 sass 에  공통적으로 사용되는 유틸 함수들을 필요할 때 `import ../../styles/utils` 형식으로 작성 할 필요 없이 `@import 'utils';` 형태로 불러 올 수 있게 해주는 설정
    - 나머지 부분은 css 와 동일하게 작성
  - sass 설정에 CSS Module 적용
    - `modules: true` : CSS Module 을 사용으로 설정
    - `localIdentName: '[name]__[local]__[hash:base64:5]'` : CSS Module 에서 고유적으로 생성되는 클래스네임의 형식을 지정

  ```javascript
  {
    test: /\.css$/,
    (...)
  },
  {
    test: /\.scss$/,
    use: [
      require.resolve('style-loader'),
      {
        loader: require.resolve('css-loader'),
        options: {
          importLoaders: 1,
          modules: true,
          localIdentName: '[name]__[local]__[hash:base64:5]'
        },
      },
      {
        loader: require.resolve('postcss-loader'),
        options: {
          // Necessary for external CSS imports to work
          // https://github.com/facebookincubator/create-react-app/issues/2677
          ident: 'postcss',
          plugins: () => [
            require('postcss-flexbugs-fixes'),
            autoprefixer({
              browsers: [
                '>1%',
                'last 4 versions',
                'Firefox ESR',
                'not ie < 9', // React doesn't support IE8 anyway
              ],
              flexbox: 'no-2009',
            }),
          ],
        },
      },
      {
        loader: require.resolve('sass-loader'),
        options: {
          includePaths: [paths.styles]
        }
      }
    ],
  }
  ```

  ### 3. paths.style 적용
  - `config.paths.js ` 에 style 값 설정
    - `styles: resolveApp('src/styles')` 를 exports 에 추가

  ```javascript
  module.exports = {
    dotenv: resolveApp('.env'),
    (...)
    styles: resolveApp('src/styles')
  };
  ```

  ### 4.컴포넌트 구성
  - ViewerTemplate :  템플릿 컴포넌트로서 JSX 형태의 props 인 viewer, spaceNavigator 를 받아와서 적당한 위치에 렌더링
  - Viewer : 이미지 혹은 동영상을 보여주는 컴포넌트
  - SpaceNavigator : 앞, 혹은 뒤로 넘기는 버튼들을 내장하고 있는 컴포넌트

---
## API 사용하기
  ### 1. Promise란?
  - Promise란 ES6 에서 비동기 처리를 다루기 위해 사용되는 객체로 콜백 지옥을 해결하기 위해 사용된다.

  ```javascript
  //Promise 선언
  var _promise = function (param) {
  	return new Promise(function (resolve, reject) {
  		// 비동기를 표현하기 위해 setTimeout 함수를 사용
  		window.setTimeout(function () {
  			// 파라메터가 참이면,
  			if (param) {
  				// 해결됨
  				resolve("해결 완료");
  			}
  			// 파라메터가 거짓이면,
  			else {
  				// 실패
  				reject(Error("실패!!"));
  			}
  		}, 3000);
  	});
  };

  //Promise 실행
  _promise(true)
  .then(function (text) {
  	// 성공시
  	console.log(text);
  }, function (error) {
  	// 실패시
  	console.error(error);
  });
  ```

  ### 2. API 요청 함수 만들기
  - `src/lib/api.js` 를 만들어 API 요청에 대한 함수를 따로 관리하는 것이 좋다.
  - date 가 주어지지 않을 경우를 처리하기 위해 공백을 사용

  ```javascript
  // src/lib/api.js
  import axios from 'axios';

  const API_KEY = '자신의 API KEY'

  export function getAPOD(date = '') {
      return axios.get(`https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&date=${date}`);
  }
  ```

  ### 3. API 요청 함수 사용하기
  - 컴포넌트에서 API 를 요청을 하고, API 가 응답되었을때 특정 작업을 하려면 Promise 의 then 을 사용 할 수 있다.

  ```javascript
  import * as api from './lib/api';

  class App extends Component {
    getAPOD = (date) => {
      api.getAPOD(date).then((response) => {
        console.log(response);
      });
    }

    componentDidMount() {
      this.getAPOD();
    }

    render() {
      (...)
    }
  }
  ```

  - async/await 를 이용하여 더욱 편하게 사용할 수 있다.
  - 앞부분에 `async` 키워드를 붙이고, 내부에서는 Promise 의 앞부분에 `await` 키워드를 넣어서 사용

  ```javascript

  import * as api from './lib/api';

  class App extends Component {
    getAPOD = async (date) => {
      try {
        const response = await api.getAPOD(date);
        console.log(response);
      } catch (e) {
        // 오류가 났을 경우
        console.log(e);
      }
    }

    componentDidMount() {
      this.getAPOD();
    }

    render() {
      (...)
    }
  }
  ```

  ### 4. 상태 관리하기
  - 요청이 시작하면 loading 값을 true 로, 끝났다면 false 로 설정
  - 나중에 다음 이미지를 보여주게 될 때, 오늘 이후의 데이터는 존재하지 않기 때문에 maxDate 를 설정
  - 비구조화 할당이 되는 과정에서, 새로운 이름으로 값을 지정.
    - ex> response.data 안에 있는 media_type 이란 값을 mediaType 이라고 부르겠다 라는 의미와 동일
  - 상태의 url, mediaType, loading 값을 Viewer 로 전달

  ```javascript
  import * as api from './lib/api';

  class App extends Component {
      state = {
          loading: false,
          maxDate: null,
          date: null,
          url: null,
          mediaType: null
      };

      getAPOD = async (date) => {
          if(this.state.loading) return; // 이미 요청중이라면 무시

          // 로딩 상태 시작
          this.setState({
             loading: true
          });

          try {
              const response = await api.getAPOD(date);
              // 비구조화 할당 + 새로운 이름
              const { date: retrievedDate, url, media_type: mediaType} = response.data;

              if(!this.state.maxDate){
                  // maxDate 가 없으면 지금 받은 date 로 지정
                  this.setState({
                      maxDate: retrievedDate
                  })
              }

              // 전달받은 데이터 넣어주기
              this.setState({
                 date: retrievedDate,
                 mediaType,
                 url
              });
          } catch (e) {
              // 오류
              console.log("error" + e);
          }

          // 로딩 상태 종료
          this.setState({
             loading:false
          });
      };

      componentDidMount() {
          this.getAPOD();
      }

      render() {
          const{url, mediaType, loading} = this.state;

          return (
              <ViewerTemplate
                  spaceNavigator={<SpaceNavigator/>}
                  viewer={(
                      <Viewer
                          url={url}
                          mediaType={mediaType}
                          loading={loading}/>
                  )}
              />
          );
      }
  }

  export default App;
  ```

  ### 5. 다음 / 이전 이미지로 넘기기
  - moment 라이브러리 활용해 date 사용
  - 마지막 날짜만 확인 후 결정
  - 이를 함수로 넘김

  ```javascript
  import moment from 'moment';

  handlePrev = () => {
      const {date} = this.state;
      const prevDate = moment(date).subtract(1, 'days').format('YYYY-MM-DD');
      this.getAPOD(prevDate);
  };

  handleNext = () => {
      const {date, maxDate} = this.state;
      if(date === maxDate) return; // 마지막 날짜라면 return

      const nextDate = moment(date).add(1, 'days').format('YYYY-MM-DD');
      this.getAPOD(nextDate);
  };

  render() {
      const {url, mediaType, loading} = this.state;
      const {handlePrev, handleNext} = this;

      return (
          <ViewerTemplate
              spaceNavigator={<SpaceNavigator onPrev={handlePrev} onNext={handleNext}/>}
              viewer={(
                  <Viewer
                      url={url}
                      mediaType={mediaType}
                      loading={loading}/>
              )}
          />
      );
  }
  ```

---
## 참고
  ### 1. 로더 보여주기
  - `better-react-spinkit` 라이브러리 이용

  > src/components/Viewer/Viewer.js

  ```javascript
  import React from 'react';
  import styles from './Viewer.scss';
  import classNames from 'classnames/bind';
  import {ChasingDots} from 'better-react-spinkit';

  const cx = classNames.bind(styles);

  const Viewer = ({mediaType, url, loading}) => {
      // 로딩부분=============================
      if(loading){
          // 로딩이라면 로더 보여주기
          return <div className={cx('viewer')}>
              <ChasingDots color="white" size={60}/>
          </div>
      }
      // ====================================

      if(!url) return null;

      return (
          <div className={cx('viewer')}>
              {
                  mediaType === 'image' ? (
                      <img onClick={() => window.open(url)} src={url} alt="space"/>
                  ) : (
                      <iframe title="space-video" src={url} frameBorder="0" gesture="media" allow="encrypted-media" allowFullScreen/>
                  )
              }
          </div>
      );
  };

  export default Viewer;
  ```
