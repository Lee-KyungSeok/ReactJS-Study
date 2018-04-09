# 리엑트 라우터
  - 라우트 생성 및 설정
  - 라우트 이동(Link, NavLink)
  - 내부 라우트 설정
  - Redirect 사용 방법
  - QueryString 사용방법
  - Not Found Page 설정

---

## 리엑트 라우터 기본
  ### 1. 리엑트 라우터란?
  - 사용이유 : 리엑트를 사용해서 여러 페이지가 존재하는 서비스를 만들때 필요 (url 주소에 따라 특정 상태를 나누기 위해 필요)
  - 리엑트 라우터는 하나의 라이브러리!!
    - 그러나 매우 많이 사용되고 있다.
  - 설치 : `npm install --save react-router-dom`
  - 모듈 추출: `import {BrowserRouter as Router, Route} from 'react-router-dom';`

  ### 2. 라우트 만들기
  - 특정 랜더링할 페이지를 작성 (ex> Home)
  - 받은 파라미터는 `params.파라미터명` 을 이용해서 받아올 수 있다.

  > About.js

  ```javascript
  import React from 'react';

  const About = ({match}) => {
      return (
          <div>
              {match.params.username} 소개
          </div>
      );
  };

  export default About;
  ```

  ### 3. 라우트 설정하기
  - 라우팅을 지정 할 때 `path` 와 `component` 를 지정해서 불러온다.
    - `exact` 를 지정하면 '/' 인 경우에만 불러올 수 있다.(`/about` 은 `/` 를 포함하므로 home 을 불러올 수 있으므로 주의!)
  - 여기서 Router 컴포넌트 내부는 반드시 `하나`여야 한다.
    - 즉, Header 컴포넌트를 따로 뺄 수 없고 `div` 와 같은 태그로 감싸 하나처럼 만들어야 한다.
  - 라우터에 `/:params`와 같이 파라미터를 넣을 수도 있다.

  > src/App.js

  ```javascript
  import React from 'react';
  import {BrowserRouter as Router, Route} from 'react-router-dom';

  import Home from './routes/Home';
  import About from './routes/About';

  import Header from './components/Header';

  const App = () => {
      return (
          <Router>
              <div>
                  <Header/>
                  <Route exact path="/" component={Home}/>
                  <Route path="/about" component={About}/>
              </div>
          </Router>
      );
  };

  export default App;
  ```

  ### 4. 라우트 이동하기
  - `Link` 컴포넌트를 이용하여 라우트를 설정할 수 있다.
    - `a` 태그를 이용해서 이동하면 안되는 것에 주의!!
    - 페이지를 새로 불러오는걸 막고, 원하는 라우트로 화면 전환 가능
  - `NavLink` 컴포넌트는 설정한 URL 이 활성화가 되면, 특정 스타일 혹은 클래스를 지정 할 수 있다.
    - 즉, 게시판의 버튼이 클릭됨에 따라 다른 스타일을 줄 수 있다.
    - `activeClassName` 을 이용하여 활성화 되었을 때의 className을 바꿀 수 있다.
    - path의 경우 위에서와 같이 `exact` 를 넣어 줄 수 있다.

  > src/components/Header

  ```javascript
  import React from 'react';
  import { Link, NavLink } from 'react-router-dom';
  import './Header.css';

  const Home = () => {
      return (
          <div className="header">
              <NavLink exact to="/" className="item" activeClassName='active'>홈</NavLink>
              <Link to="/about" className="item">소개</Link>
              <Link to="/posts" className="item">포스트</Link>
          </div>
      );
  };

  export default Home;
  ```

  ### 5. 라우트 안에 라우트
  - Route 내부에 Route를 설정할 수 있다.
  - App 에서 라우트를 시켜준 Post 컴포넌트!!
    - 이 안에 또 Route를 시켜줄 수 있다.

  > src/routes/Posts.js

  ```javascript
  import React from 'react';
  import {Route, Link} from 'react-router-dom';

  const Post = ({match}) => {
      return(
          <h2>
              {match.params.title}
          </h2>
      );
  };

  const Posts = () => {
      return (
          <div>
              <h1>포스트</h1>
              <Link to='/posts/react'>React</Link>
              <Link to='/posts/redux'>Redux</Link>
              <Link to='/posts/flux'>Flux</Link>

              <Route path='/posts/:title' component={Post}/>
          </div>
      );
  };

  export default Posts;
  ```

---
## Redirect
  ### 1. redirect ?
  - 특정 조건에 따라 보여줘야 하는 페이지의 경우 redirect 해서 보여줘야 한다.
    - ex> 로그인에 따라 보여주는 페이지, 안했을 경우 로그인 페이지로 이동

  ### 2. 사용방법
  - Redirect 컴포넌트 를 불러와서 사용한다.

  > src/routes/MyPage.js

  ```javascript
  import React from 'react';
  import {Redirect} from 'react-router-dom';

  const logged =false;

  const MyPage = () => {
      return (
          <div>
              {
                  !logged && <Redirect to='/login'/>
              }
          </div>
      );
  };

  export default MyPage;
  ```

  ### 3. history를 이용한 Redirect
  - 작업을 하다보면 Redirect 컴포넌트만으로 충분하지 않을 때가 있다!
    - ex> Method 에서 Redirect를 해야 한다면??
  - 이 때는 `history` 를 불러와서 redirect 할 수 있다.

  > src/routs/Home

  ```javascript
  import React from 'react';

  const Home = ({history}) => {
      return (
          <div>
              Home
              <button onClick={() => {history.push('./posts')}}>버튼</button>
          </div>
      );
  };

  export default Home;
  ```

---

## QueryParameter
  ### 1. QueryParameter 내장함수 이용
  - 자바스크립트 내장함수인 `URLSearchParams` 를 이용하여 가져올 수 있다.
  - `location.search` 에 QueryParameter 가 들어있다.

  ```javascript
  import React from 'react';

  const Search = ({location}) => {
      return (
          <div>
              {
                  // query가 keyword=XXX 를 가져와서 출력
                  new URLSearchParams(location.search).get('keyword')
              }
          </div>
      );
  };

  export default Search;
  ```

  ### 2. QueryString 라이브러리 이용
  - 설치 : `npm install --save query-string`
  - 사용방법 : location의 search 에 있는 쿼리부분을 파싱한다.
    - `query = queryString.parse(location.search)` 이용
    - `query.detail` 과 같이 파라미터 가져올 수 있음

  ```javascript
  import React from 'react';
  import queryString from 'query-string';

  const About = ({location, match}) => {
      const query = queryString.parse(location.search);
      console.log(query.detail === 'Kyung');

      return (
          <div>
              <h2>About {match.params.name}</h2>
          </div>
      );
  };

  export default About;
  ```

---
## Not Found page 만들기
  ### 1. Not Found page 만드는 방법
  - `Switch` 를 이용하여 만들 수 있다.
    - Switch 컴포넌트로 라우트 컴포넌트를 감싼다.
    - 마지막 라우트 컴포넌트에 404 Not Found 컴포넌트를 라우팅한다.
  - Switch의 역할?
    - Switch 가 없는 경우 존재하는 모든 path 를 비교해서 일치하면 전부 보여준다.
    - Switch로 감싸게 되면 위부터 path를 확인해서 일치하는 게 있으면 뒤는 무시한다.
    - 즉, 만약 path 가 없다면 Not Found page를 보여줄 수 있다.

  > src/App.js

  ```javascript
  import React from 'react';
  import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

  import Header from './components/Header';

  import Home from './routes/Home';
  import About from './routes/About';
  import Posts from './routes/Posts';
  import MyPage from './routes/MyPage';
  import Login from './routes/Login';
  import Search from './routes/Search'
  import NoMatch from "./routes/NoMatch";

  const App = () => {
      return (
          <Router>
              <div>
                  <Header/>
                  <Switch>
                      <Route exact path="/" component={Home}/>
                      <Route path="/about/:username" component={About}/>
                      <Route path='/posts' component={Posts}/>
                      <Route path='/login' component={Login}/>
                      <Route path='/me' component={MyPage}/>
                      <Route path='/search' component={Search}/>
                      <Route component={NoMatch}/>
                  </Switch>
              </div>
          </Router>
      );
  };
  ```
