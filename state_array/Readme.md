# state 내부 배열 처리하기
  - concat 함수 이용
  - Immutability Helper 기본
  - ES6 Spread 기본

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

## Immutability Helper 이용
  ### 1. Immutability Helper 사용방법
  - 페이스북의 `immutable.js` 라이브러리 사용 ([Immutability Helper 링크](https://github.com/kolodny/immutability-helper))
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
