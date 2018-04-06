# state 내부 배열 처리하기
  - concat 함수 이용
  - immutable.js 사용
  - ES6 Spread 기본
  - 참고
    - Immutability Helper

---

## concat 함수 이용
  ### 1. concat 함수 이용
  - 배열에 `push` 쓰면 안된다 !!
    - 배열 자체를 변경하기 때문!
  - concat 함수를 이용한다.

  ```javascript
  this.setState({
    list: this.state.list.concat(new Obj)
  })
  ```

---

## immutable.js 사용
  ### 1. immutable.js 사용방법
  - 페이스북에서 제공하는 `immutable.js` 라이브러리 사용 ([Immutabile.js 링크](https://facebook.github.io/immutable-js/))
  -  기존의 객체는 건들이지 않고 새 객체를 생성하여 불변함을 유지하며 값을 업데이트하는 작업을 손쉽게 할 수 있다.
  - 설치 : `npm install immutable --save`
  - 사용 : `import { Map, List } from 'immutable'`
  - 규칙
    - 객체는 `Map`
    - 배열은 `List`
    - 설정은 `set`
    - 읽을때는 `get`
    - 읽은다음에 설정 할 땐 `update` (두번째 파라미터에 함수)
    - 내부에 있는걸 작업할 때는 `In` 을 붙임 (setIn, getIn, updateIn)
    - 일반 자바스크립트 객체로 변환할 때는 `toJS`
    - 특정 key를 지울 때는 `delete`
  - List 에는 배열 내장함수와 비슷한 함수들이 존재

  ```javascript
  import { Map, List} from 'immutable';

  // 1. 객체는 Map
  const obj = Map({
    foo: 1,
    inner: Map({
      bar: 10
    })
  })

  // 2. 배열은 List
  const arr = List([
    Map({foo: 1}),
    Map({bar: 2})
  ])

  // 3. 설정은 set
  let nextObj = obj.set('foo', 5);

  // 4. 읽을때는 `get`
  console.log(obj.get('foo'));
  console.log(arr.get(0));

  // 5. 읽은다음에 설정 할 땐 `update` (두번째 파라미터에 함수)
  nextObj = nextObj.update('foo', value => value + 1);

  // 6. 내부에 있는걸 작업할 때는 `In` (setIn, getIn, updateIn)
  nextObj = obj.setIn(['inner', 'bar'], 20);
  console.log(nextObj.getIn(['inner', 'bar']));

  let nextArr = arr.setIn([0, 'foo'], 10);
  console.log(nextArr.getIn([0, 'foo']));

  // 7. 일반 자바스크립트 객체로 변환할 때는 `toJS`
  console.log(nextObj.toJS);
  console.log(nextArr.toJS());

  // 8. 특정 key를 지울 때는 `delete`
  nextObj = nextObj.delete('foo');
  nextArr = nextArr.delete(0);

  // 9. List 내장함수는 배열이랑 비슷
  nextArr = arr.push(Map({qaz: 3}));
  nextArr = arr.filter(item => item.get('foo') === 1);
  ```

  ### 2. 예시
  - state 설정 예시 (object는 Map 으로, 배열은 List 로 감싼다.)

  ```javascript
  state = {
    data: Map({
      input: '',
      users: List([
        Map({
          id: 1,
          username: 'velopert'
        }),
        Map({
          id: 2,
          username: 'mjkim'
        })
      ])
    })
  }
  ```

  - setState 설정 예시

  ```javascript
  onButtonClick = () => {
    const { data } = this.state;

    this.setState({
      data: data.set('input', '')
        .update('users', users => users.push(Map({
          id: this.id++,
          username: data.get('input')
        })))
    })
  }
  ```

  - render 함수에서 설정 예시
    - 반드시 `get` 을 사용해서 가져와야 한다.


  ```javascript
  render() {
    const { onChange, onButtonClick } = this;
    const { data } = this.state;
    const input = data.get('input');
    const users = data.get('users');

    return (
      <div>
        <div>
          <input onChange={onChange} value={input} />
          <button onClick={onButtonClick}>추가</button>
        </div>
        <h1>사용자 목록</h1>
        <div>
          <UserList users={users} />
        </div>
      </div>
    );
  }
  ```

  - 값을 넘겼을때 넘긴 컴포넌트 예시
    - 이 또한 `get` 을 통해서 가져와야만 한다.
    - 그리고 toJS() 를 통해 비구조화 할당할수도 있다.

  ```javascript
  class User extends Component {
    shouldComponentUpdate(prevProps, prevState) {
      return this.props.user !== prevProps.user;
    }
    render() {
      // get
      const { user } = this.props;
      const key = user.get('id');

      // 비구조화 할당
      const { username } = this.props.user.toJS();
      // this.props.user.get('username') 과 동일

      return (
        <div>
          {username}
        </div>
      );
    }
  }

  export default User;
  ```

  ### 3. Record
  - `Record` 를 통하면 `get`을 이용하지 않을 수 있다.
  - but> `set`, `update`, `delete` 는 동일하게 사용

  ```javascript
  // 변수 생성
  const Person = Record({
    name: '홍길동',
    age: 1
  });
  let person = Person();

  // 출력 (get 대신 사용)
  console.log(person.name, person.age);

  // 값 입력
  person = person.set('name', 'Kyung'); // person.name = 'gil' 는 오류

  // 값을 따로 지정 가능
  person = Person({
    name: '영희',
    age: 10
  });

  // 비구조화 할당 가능
  const { name, age } = person;

  // 재생성 할 일이 없다면 바로 함수를 불러옴
  const dog = Record({
    name: '멍멍이',
    age: 1
  })()

  // nested 구조로 생성 가능
  const nested = Record({
    foo: Record({
      bar: true
    })()
  })();

  // 내부를 변경할 때는 setIn 이용
  const nextNested = nested.setIn(['foo', 'bar'], false);
  console.log(nextNested);
  ```

  ### 4. react-immutable-proptypes
  - immutable 에 호환되는 propTypes
  - 설치 : `npm install --save react-immutable-proptypes`
  - 사용 예시

  ```javascript
  import PropTypes from 'prop-types'
  import ImmutablePropTypes from 'react-immutable-proptypes';

  FavoriteList.propTypes = {
      contacts: ImmutablePropTypes.listOf(
          ImmutablePropTypes.mapContains({
              id: PropTypes.string,
              name: PropTypes.string,
              phone: PropTypes.string,
              color: PropTypes.string,
              favorite: PropTypes.bool
          })
      )
  };
  ```

---

## Basic ES6 Spread
  ### 1. Spread 설치
  - 설치 : `npm install --save babel-preset-stage-0`
    - 신버전은 `npm install --save @babel/preset-stage-0`
  - webpack confing 에 추가 (preset 부분)
    - 구버전 : `presets: ['env', 'stage-0' ,'react']`
    - 신버전 : `presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-stage-0']`

  ### 2. Spread 사용 방법 (Object 인 경우)
  - `...변수명` 를 넣어준다. 추가
  - nested 되어 있으면 `...변수명.인자` 를 계속 써주어야 한다.

  ```javascript
  let object = {
    a: '1',
    b: '2',
    c: {
      d: '3',
      e: '4',
      f: {
        change_this_value: '0',
        this_stays_same: '6'
      }
    }
  };

  let changed = {
    ...object,
    b: "hi",
    c: {
      ...object.c,
      f: {
        ...object.c.f,
        change_this_value: '5'
      }
    }
  }

  console.log(JSON.stringify(changed, null, 2))
  // 결과 : {...
  //          "b": "hi",
  //          "c": {
  //                  ...
  //                "f": {
  //                      "change_this_value": "5",
  //                      ...
  //                    }
  //              }
  //        }
  ```

  ### 3. Spread 사용 방법 (배열 인 경우)
  - 배열 안에 `...변수명` 을 추가
    - 값을 추가 : 뒤에 값을 입력
    - 값을 제거 : `slice` api 를 이용하여 제거(필요한 부분만 남긴다!!)
    - 값을 수정 : `slice` 를 이용하여 특정 부분에만 값을 대입

  ```javascript
  let array = [0, 1, 2, 3, 4, 5, 6];

  // 값을 추가
  let addChanged = [...array, 7]
              // 결과 : [0,1,2,3,4,5,6,7]

  // 값을 제거
  let removeChanged = [...array.slice(0, 2), ...array.slice(3,array.legnth -1)]
              // 결과 : [1,2,4,5]

  // 값을 수정
  let updateChanged = [...array.slice(0, 2), '수정' , ...array.slice(3,array.legnth -1)]
              // 결과 : [1,2, 수정 ,4,5]
  ```

---

## Immutability Helper 이용 (참고)
  ### 1. Immutability Helper 사용방법
  - `immutable-helper` 라이브러리 사용 ([Immutability Helper 링크](https://github.com/kolodny/immutability-helper))
  - Immutability Helper 가 하는 일은 기존 데이터를 복사하고 복사된 데이터를 쉽게 수정하고 결과를 반환하는 일을 한다.
  - 설치 : `npm install immutability-helper --save`
  - 사용 : `import update from 'immutability-helper'`
  - 구조 : `update(처리해야 할 배열/객, 처리명령을 지니고 있는 객체)`

  ### 2. 원소의 추가
  - `$push: [newObj, newObj2]` : new Object 를 추가 (1개인 경우에도 반드시 배열로 추가할 것)

  ```javascript
  // 원소를 추가
  this.setState({
    list: update(
      this.state.list,
      {
        $push: [newObj, newObj2]
      }
    )
  });
  ```

  ### 3. 원소의 제거
  - `$splice: [[index or key, 1]]` : index 부터 1 개를 제거 (배열로 감싸져 있으므로 한 개 이상의 item을 지울 수 있다.)  
  - 예시
    - 처음 삭제 후 앞으로 밀렸기 때문에 "2" 이 아닌 "4" 가 삭제된다. 즉, 삭제 후에 배열의 크기가 줄어드는 것에 주의!

  ```javascript
  // 원소를 제거
  this.setState({
    list: update(
      this.state.list,
      {
        $splice: [[index, 1]]
      }
    )
  })

  // 예시 - 배열
  let array = [0, 2, 4, 6, 8, 10];
  let changedArray = update(array, {
    $splice: [[0,1], [1,1]]
  });
  function print(data){
    console.log(JSON.stringify(data, null, 2))
  }

  print(changedArray);
  // 결과 : [2, 6, 8, 10]
  ```

  ### 4. 원소의 수정
  - `[index or key]: { field:{$set: value} }` : index 번째 아이템 혹은 객체key에 맞는 아이템 의 field, field2,.. 값을 변경
  - 예시
    - 특정 부분만 수정할 수 있다.

  ```javascript
  // 원소 수정
  this.setState({
    list: update(
      this.state.list,
      {
        [index]: {
          field: {$set: "value"},
          field2: {$set: "value2"}
        }
      }
    )
  })

  // 예시 - 객체
  let object = {
    a: '1',
    b: '2',
    c: {
      d: '3',
      e: '4',
      f: {
        change_this_value: '0',
        this_stays_same: '6'
      }
    }
  };

  let changed = update(object, {
    c: {
      f: {
        change_this_value: {
          $set: '5'
        }
      }
    }
  });
  function print(data){
    console.log(JSON.stringify(data, null, 2))
  }

  print(changed);
  // 결과 : {............f:{"change_this_value": "5", ......}
  ```

  ### 5. Immutability Helper - 합치기
  - `{$merge: object}` : object 를 합칠 수 있다.

  ```javascript
  // 예시
  const obj = {a: 5, b: 3};
  const newObj = update(obj, {
    $merge: {b: 6, c: 7}
  });
  // 결과 : {a: 5, b: 6, c: 7}
  ```
