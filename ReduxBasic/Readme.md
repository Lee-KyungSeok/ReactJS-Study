# Basic Redux
  - Flux 패턴
  - Redux 란
  - Redux의 3가지 원칙
  - Redux 설치
  - 참고 - [Flux 카툰 안내서](http://bestalign.github.io/2015/10/06/cartoon-guide-to-flux/), [Redux 카툰 안내서](http://bestalign.github.io/2015/10/26/cartoon-intro-to-redux/)

---

## Redux
  ### 1. FLUX 패턴
  - FLUX 는 디자인 패턴 중의 하나
  - 시스템에서 어떠한 Action 을 받았을 때, Dispatcher가 받은 Action들을 통제하여 Store에 있는 데이터를 업데이트
  - 변동된 데이터가 있으면 View 에 리렌더링
  - View에서 Dispatcher로 Action을 보내기 가능
  - Dispatcher은 작업이 중첩되지 않도록 한다.
    - 어떤 Action이 Dispatcher를 통하여 Store에 있는 데이터를 처리하고, 그 작업이 끝날 때 까지 다른 Action들을 대기
  - store에서 모든 데이터를 담고 있고, 컴포넌트끼리는 직접 교류하지 않고 store 중간자를 통하여 교류

  ![](https://github.com/Lee-KyungSeok/ReactJS-Study/blob/master/ReduxBasic/picture/flux.png)

  ### 2. Redux 란
  - Flux 아키텍쳐를 좀 더 편하게 사용 할 수 있도록 해주는 라이브러리 (Flux의 구현체!!)
  - Redux는 JavaScript 어플리케이션에서 data-state 와 UI-state 를 관리해주는 도구
  - 싱글 페이지 어플리케이션 (Single Page Application) 에서 매우 유용하게 사용
  - Redux는 이전 상태를 변경하는게 아니라 그저 새로운 상태를 반환하는 것에 주의

  ![](https://github.com/Lee-KyungSeok/ReactJS-Study/blob/master/ReduxBasic/picture/flux.png)

---
## Redux 의 3가지 원칙
  ### 1. Single Source of Truth
  - 어플리케이션의 state 를 위해 단 한개의 store 를 사용
    - Flux 와의 주요한 차이(Flux는 여러개 store 사용)
  - store의 구조는 주로 nested 된 구조로 되어져 있다.
    - JavaScript 객체로서 {{{}{}{}},{}} 와 같이 정리되어 있다.
  - Component 별로 구조화 / Event 별로 구조화 등 여러 구조로 정할 수 있다.

  ### 2. State is read-only
  - 어플리케이션에서 store의 state를 직접 변경할 수 없다.
  - state 를 변경하기 위해서는 action이 반드시 dispatch 되어야 한다.

  ### 3. Changes are made with Pure Functions
  - action 객체를 처리하는 함수를 `reducer` 라고 부른다
    - reducer 는 정보를 받아서 상태를 어떻게 업데이트 할 지 정의한다.
  - 여기서 reducer 는 "순수 함수" 로 작성되어야 한다. (비동기적 접근 불가)
    - return 값은 오직 parameter 값에만 의존
    - 네트워크 및 데이터베이스 접근 X, 인수 변경 X
    - 같은 인수로 실행된 함수는 언제나 같은 결과를 반환
    - "순수하지 않은" API 사용 불가(Date.now(), Math.random() 등)
  - reducer 는 여러개가 될 수 있다.
    - 한개의 reducer 인 경우 그 reducer 가 `root reducer` 이다
    - 여러개인 경우 이를 관리하는 reducer 가 `root reducer` 이다

---
## Redux 설치
  ### 1. 설치
  - 설치 : `npm install --save redux react-redux`
    - react-redux 란 view-layer bind

  ### 2. 프로젝트 구조
  - `src/` 에 `actons`, `components`, `reducers` 를 생성하여 기본 구조를 짠다. (components에는 이전에 한 App.js 를 만든다.)
  - `src/` 에 `index.js` 파일을 만든다.
