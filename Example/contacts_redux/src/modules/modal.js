import { createAction, handleActions } from 'redux-actions';
import { Map } from 'immutable';

const SHOW = 'modal/SHOW';
const HIDE = 'modal/HIDE';
const CHANGE = 'modal/CHANGE';

export const show = createAction(SHOW); // { mode, contact: {[id], name, phone, color} }
export const hide = createAction(HIDE);
export const change = createAction(CHANGE); // {name, value}
// name과 phone 정보가 바뀌면 호출

const initialState = Map({
    visible: false,
    mode: null, // create, modify
    contact: Map({
        id: null,
        name: '',
        phone: '',
        color: 'black'
    })
});

export default handleActions({
    [SHOW]: (state, action) => {
        const {mode, contact} = action.payload;
        return state.set('mode', mode)
            .set('visible', true)
            .set('contact', Map(contact));
    },
    [HIDE]: (state, action) => {
        return state.set('visible', false);
    },
    [CHANGE]: (state, action) => {
        const {name, value} = action.payload;
        return state.setIn(['contact', name], value);
    }
}, initialState);