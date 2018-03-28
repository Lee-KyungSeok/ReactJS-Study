import {combineReducers} from 'redux' // redux 에 있는 함수 사용
import counter from './counter';
import ui from './ui'

// 합쳐준다
const reducers = combineReducers({
    counter, ui
});
export default reducers;