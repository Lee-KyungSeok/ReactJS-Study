# 주소록 만들기
  - [참고_주소록](https://gist.github.com/vlpt-playground/593da90702641de2564430e2a4161eb8)

---

## 의존 모듈 생성
  ### 1. 추가 의존 모듈
  - open-color: 매우 유용한 색상 관련 라이브러리입니다.
  - prop-types: 컴포넌트의 PropTypes 를 지정할때 필요합니다.
  - react-icons: 다양한 아이콘들을 SVG 형태로 불러와서 사용 가능.
    - 필요한 아이콘만 불러오기 때문에 용량 걱정이 적다.
    - Material Design Icons, FontAwesome, Typicons, Github Octicons, Ionicons 의 모든 아이콘들을 골라서 사용 가능
  - react-onclickoutside: 모달 등을 띄웠을 때 바깥부분 클릭 시 특정 함수를 실행하게 해주는 라이브러리
  - react-transition-group: CSS를 사용해 애니메이션을 사용하는것을 도와준다
    - v2 가 아니라 v1 을 사용함
    - v1이 현재 stable 버전이며, 아직까지 유지보수가 잘 되고있음
  - shortid: 고유 id 를 생성
  - styled-components: 컴포넌트 자바스크립트 파일 내부에 CSS를 정의 할 수 있게 해주는 도구
    - 컴포넌트의 스타일관리를 간소화해줍니다.

  ```
   npm install --save open-color prop-types react-icons react-onclickoutside react-transition-group@1.x shortid styled-components
  ```

---

## 컴포넌트
  ### 1. 기본 컴포넌트
  - `src/components/Header.js` : 페이지의 상단에 띄울 Header
    - styled-Component 를 이용하여 스타일링
  - `src/components/Container.js` 헤더 컴포넌트 하단에 보여줄 Container 컴포넌트
    - 두개의 Container 를 리액트 앱 안에 만들어놓고 특정 조건에 따라 해당 Container 가 보여질지 말지 설정
    -  visible 이란 props 를 받게해서, visible 이 참이 아니라면 null 이 반환

  ### 2. ViewSelector 컴포넌트
  - `Item` 컴포넌트를 따로 지정
  - 아이콘 사용
  - App 상태 정의 및 업데이트
  - ViewSelector 내부 props 설정
  - props 를 이용하여 애니메이션 설정

  ### 3. FloatingButton 컴포넌트
  - 클릭시 이벤트 발생
  - 이 컴포넌트는 스타일링만..

  ### 4. ContactList 컴포넌트
  - 주소록 목록을 렌더링
  - class 형태의 컴포넌트로 작성

  ### 5. ConatactItem 컴포넌트
  - 각각의 주소록을 보여주는 컴포넌트
  - 즐겨찾기 / 수정을 할 수 있는 기능을 제공

  ### 5. 모달
  - 주소록을 추가
  - 주소록을 수정
  - 취소는 바깥을 눌렀을때도 작동하도록함 (`react-onclickoutside` 라이브러리 이용)
  - 모달이랑 관련된 메소드들을 하나의 객체(modalHandler) 로 묶음
  - `Modal.js` 이 파일은 모달을 보여주고, 숨기고, 애니메이션을 실행하는 부분을 담당
  - `ContactModal.js` 이 파일은 위 Modal.js 를 사용하여 모달을 생성하고 그 안에 필요한 뷰 (인풋, 버튼 등등) 을 넣는 기능 담당
  - `Dimmed.js` 이 파일은 화면을 어둡게

---

## 모달 만들기
  ### 1. Modal.js
  - onClickOutside 라이브러리를 적용
    - onClickoutside() 으로 감싸서 컴포넌트를 내보냄
    - 외부를 클릭하게 될 때, handleClickOutside 메소드를 실행
  - 컴포넌트 외부를 클릭하면 실행되는 handleClickOutside 의 메소드에서는 props 로 전달받은 onHide 를 실행
  - Esc 키가 눌려졌을때도 모달이 종료되게 하기 위해서, handleKeyUp 리스너 사용
    - componentDidUpdate 에서 visible 값이 바뀔대 리스너를 등록하고 제거

  ### 2. ContactModal.js
  - 만든 모달을 사용
  - {...modal} 은 modal 객체 내부의 모든 값을 ContactModal 의 props 로 설정한다는 의미
  - 구성
    - `ThumbnailWrapper` : 유저이미지를 담음
    - `Form` : 인풋들을 담음 (input은 따로 분리함)
    - `ButtonsWrapper` : 버튼들을 담음(버튼은 따로 분리 안함)
    - `RemoveButton` : 버튼 삭제를 함
  - 컴포넌트를 만들 때 한 컴포넌트 내부에서만 사용되는 경우 그 안에 만드는게 낫다. (코드가 복잡하다면 빼도 OK)

  ### 3. Dimmed.js
  - visible 값을 전달받아서 이 값에 따라 보여주거나 숨김
  - 배경을 까맣게 하거나 하얗게 함

  ### 4. Thumnail.js
  - 유저 이미지를 보여주는 컴포넌트 (ThumbnailWrapper 로 보여줌)
  - 유저마다 색상 및 크기가 다르기 때문에 유동적

  ### 5. input.js
  - 텍스트를 입력하는 Input 컴포넌트
  - styled.div 가 아닌 styled.input 로 생성

---

## 기타
  ### 1. trasition 애니메이션 효과
  - keyframe 을 이용하여 모듈화 후 적용
  - [CSSTransitionGroup](https://reactjs.org/docs/animation.html) 라는 리엑트 에드온을 사용하면 간단한 애니메이션은 간편하게 구현 가능
  - 아래와 같이 적용

  ```javascript
  import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';

  <div>
      <Wrapper width={width}>
          <CSSTransitionGroup
              transitionName="modal"
              transitionEnterTimeout={500}
              transitionLeaveTimeout={500}>
              {
                  // visible 이 참일때 Modal Box 를 보여준다.
                  visible && (<ModalBox>{children}</ModalBox>)
              }
          </CSSTransitionGroup>
      </Wrapper>
  </div>
  ```

  ### 2. App 설정
  - 고유 id 를 생성하는 shortid 를 이용
  - 기능을 제어하는 함수들 설정
