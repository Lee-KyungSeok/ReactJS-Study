# Jest & Enzyme 를 이용한 Unit Test
  - Unit Test 란?
  - crash 테스팅
  - 스냅샷 테스팅
  - DOM 시뮬레이션 (By Enzyme)

---

## Unit Test
  ### 1. UnitTest란?
  - 소프트웨어를 기능별로 쪼개고, 그리고 그 기능 내부에서 사용되는 함수들도, 쪼개고 쪼개서 아주 작은 단위로 테스팅을 하는것을 의미
  - 유닛 테스팅은, 내가 작성한 코드가 다른 코드들을 망가뜨리지 않도록, 적어도 우리가 사전에 정의한 상황속에서 보장해준다!!!
  - 프로젝트를 다른 사람들과 협업을 하게 되는 경우 유용

  ### 2. 리액트 컴포넌트 테스팅
  - 리액트 프로젝트 또한, 컴포넌트 단위로 하나하나 테스트 로직을 정해줄 수 있다.
  - 아래와 같은 형식으로 주로 진행됨
    - 특정 props 에 따라 컴포넌트가 크래쉬 없이 잘 렌더링이 되는지 확인
    - 이전에 렌더링했던 결과와, 지금 렌더링한 결과가 일치하는지 확인
    - 특정 DOM 이벤트를 시뮬레이트 하여, 원하는 변화가 제대로 발생하는지 확인
    - 렌더링된 결과물을 이미지 로 저장을 하여 픽셀을 하나하나 확인해서 모두 일치하는지 확인

  ### 3. 테스팅 주요 키워드([Jest](https://facebook.github.io/jest/))
  - `describe` : 여러개의 it 을 describe 안에 넣을 수 있게 되며, describe 안에는 또 여러개의 describe 를 넣을 수 있다.
    - 첫번째 파라미터에 어떤 기능을 확인하는지에 대한 설명을 넣음
  - `it` :  코드 테스팅 로직을 쪼개고 쪼갤때, 가장 작은 단위
    - 첫번째 파라미터에 무엇을 검사하는지에 대한 설명을 넣음
  - `expect` : it 내부에서는 expect 를 통하여 특정 값이 우리가 예상한 값이 나왔는지 확인 가능([Jest 메뉴얼](https://facebook.github.io/jest/docs/en/expect.html)에 다양한 함수 존재)

  > 예시

  ```javascript
  // describe 안에 it 및 describe 넣을 수 있다.
  describe('...', () => {
    describe('...', () => {
      // 가장 작은 단위는 it
      it('is working!', () => {
        // expect를 통해 예상한 값이 나왔는지 확인 가능
        expect(something).toBeTruthy();
      })
      it('...', () => { });
      it('...', () => { });
    });
    describe('...', () => {
      it('...', () => { });
      it('...', () => { });
    });
  });
  ```

---

## crash 테스팅
  ### 1. crash 테스팅
  - 특정 props 에 따라 컴포넌트가 크래쉬 없이 잘 렌더링이 되는지 확인
  - 프로젝트를 자동생성하면 `App.test.js` 파일이 존재!
  - `npm start` 혹은 `yarn start` 를 통해 테스트 가능(패키지의 스트립트에서 정의됨)

  > src/App.test.js

  ```javascript
  import React from 'react';
  import ReactDOM from 'react-dom';
  import App from './App';

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
  ```

## 스냅샷 테스팅
  ### 1. 스냅샷 테스팅 이란
  - 스냅샷 테스팅은, 컴포넌트를 주어진 설정으로 렌더링하고, 그 결과물을 파일로 저장
  - 다음번에 테스팅을 진행하게 되었을때, 이전의 결과물과 일치하는지 확인
  - 각 상황에 모두 이전에 렌더링했던 결과와 일치하는지 비교 가능

  ### 2. 사용방법 및 설치
  - 먼저 테스팅할 컴포넌트를 작성후 라이브러리 설치
  - 설치 : `npm install --save-dev react-test-renderer`
  - `renderer.create()` 를 통해 스냅샷 찍음

  ### 3. 테스트코드 작성 (Counter.js 테스트코드)
  - `src/components/__snapshots__` 에 스냅샷이 저장
  - 만약 `Counter.js` 코드를 수정하면 test 에서 fail 이됨
  - 현재 스냅샷을 최신으로 설정하여 오류가 더 이상 나타나지 않게하려면 `U` 키를 누른다.

  > src/compnents/Counter.test.js

  ```javascript
  import React from 'react';
  import renderer from 'react-test-renderer';
  import Counter from './Counter';

  describe('Counter', () => {
      let component = null;

      it("first rendering test", () => {
          component = renderer.create(<Counter/>);
      });

      it("snapshot comparing test", () => {
          const tree = component.toJSON();
          expect(tree).toMatchSnapshot();
      })
  });

  ```

  ### 4. 내부 메소드 호출 및 state 조회
  - getInstance() 를 통해 state, function 등을 가져올 수 있다.
  - expect의 메서드를 이용할 수 있다.
  - 예시
    - toBe() : 값이 일치하는지 확인
    - toMatchObject() : object 가 일치하는지 확인(배열포함)

  ```javascript
  describe('Counter', () => {
      let component = null;

      it("renders correctly", () => {
          component = renderer.create(<Counter/>);
      });

      it("matches snapshot", () => {
          const tree = component.toJSON();
          expect(tree).toMatchSnapshot();
      });

      // increase 확인
      it('increase correctly', () => {
          component.getInstance().onIncrease();
          expect(component.getInstance().state.value).toBe(2); // value 값이 2인지 확인
          const tree = component.toJSON(); // re-render
          expect(tree).toMatchSnapshot(); // 스냅샷 비교
      });

      // decrease 확인
      it('decrease correctly', () => {
          component.getInstance().onDecrease();
          expect(component.getInstance().state.value).toBe(1);
          const tree = component.toJSON();
          expect(tree).toMatchSnapshot();
      })
  });
  ```

---

## DOM 시뮬레이션 (By Enzyme)
  ### 1. Enzyme 설치 및 사용방법
  - [Enzyme](http://airbnb.io/enzyme/) 은 airbnb 에서 만든 리액트 컴포넌트 테스팅 도구
  - DOM 이벤트를 시뮬레이트 가능(ex> 버튼 클릭, 인풋 수정, 폼 등록 등)
  - 모든 라이프사이클이 문제없이 돌아가는지도 확인 가능
  - 설치 : `npm install --save-dev enzyme enzyme-adapter-react-16 enzyme-to-json`
    - enzyme-to-json : enzyme 으로 랜더링된 스냅샷을 가독성 좋게 바꿔줌
  - 테스트코드를 위한 글로벌 코드 작성 (CRA 로 만든 프로젝트에서 필요한 테스트 설정)
    - src/setupTest.js 를 만든다.

  > src/setupTest.js

  ```javascript
  import { configure } from 'enzyme';
  import Adapter from 'enzyme-adapter-react-16';

  configure({ adapter: new Adapter() });
  ```

  - 가독성을 위해 package.json 에서 jest 값 추가

  > package.json

  ```javascript
  (...)
  "devDependencies": {
    "enzyme": "^3.3.0",
    "enzyme-adapter-react-16": "^1.1.1",
    "enzyme-to-json": "^3.3.3",
    "react-test-renderer": "^16.3.1"
  },
  "jest": {
    "snapshotSerializers": [
      "enzyme-to-json/serializer"
    ]
  }
  ```

  ### 2. 테스트 코드 작성
  - shallow 를 이용해서 render링 테스트하고
  - 앞과 다르게 'toJSON' 사용하지 않는다.

  ```javascript
  import React from 'react';
  import { shallow } from 'enzyme';
  import NameForm from './NameForm';

  describe('NameForm', () => {
    let component = null;

    it('renders correctly', () => {
      component = shallow(<NameForm />);
    });

    it('matches snapshot', () => {
      expect(component).toMatchSnapshot();
    });
  });
  ```

  ### 3. DOM 시뮬레이션
  - 알맞는 객체를 지정한 후 시뮬레이트 가능
    - 시뮬레이트 할때 내부 함수가 있을 경우 test 용 함수를 작성
  - 특정 DOM 에 특정 문자열 이 들어있는지, 혹은 특정 props가 설정 되었는지, 등 정말 수많은 기능 들로 리액트 컴포넌트 테스팅 가능

  ```javascript
  import React from 'react';
  import {shallow} from 'enzyme';
  import NameForm from './NameForm';

  describe('NameForm', () => {
      let component = null;

      it('renders correctly', () =>{
          component = shallow(<NameForm onInsert={onInsert}/>);
      });

      it('match correctly', () => {
          expect(component).toMatchSnapshot();
      });

      // 테스트용 onInsert 함수. changed 값을 바꿔줌
      let changed = null;
      const onInsert = (name) => {
          changed = name;
      }

      // 시뮬레이트 테스트
      describe('insert new text', () => {
          it('has a form', () => {
              expect(component.find('form').exists()).toBe(true);
          });
          it('has an input', () => {
              expect(component.find('input').exists()).toBe(true);
          });

          it('simulates input change', () => {
              const mockedEvent = {
                  target: {
                      value: 'hello'
                  }
              };

              // 이벤트를 시뮬레이트, 두번째 파라미터는 이벤트 객체
              component.find('input').simulate('change', mockedEvent);
              expect(component.state().name).toBe('hello');
          });

          it('simulates form submit', () => {
              const mockedEvent = {
                  preventDefault: () => null // onSubmit 에서 preventDefault 를 호출하게 되므로, 가짜 함수 추
              };
              component.find('form').simulate('submit', mockedEvent);
              expect(component.state().name).toBe('');
              expect(changed).toBe('hello')
          })
      });
  });
  ```
