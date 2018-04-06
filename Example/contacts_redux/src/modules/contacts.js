import {createAction, handleActions} from 'redux-actions';
import {Map, List, fromJS} from 'immutable';

const CREATE = 'contacts/CREATE';
const MODIFY = 'contacts/MODIFY';
const REMOVE = 'contacts/REMOVE';
const TOGGLE_FAVORITE = 'contacts/TOGGLE_FAVORITE';
const LOAD_CONTACTS = 'contacts/LOAD_CONTACTS';

export const create = createAction(CREATE); // {id, name, phone, color}
export const modify = createAction(MODIFY); // {id, contact: {name, phone}}
export const remove = createAction(REMOVE); // {id}
export const toggleFavorite = createAction(TOGGLE_FAVORITE); // {id}
export const loadContacts = createAction(LOAD_CONTACTS);    // {contacts}

const initialState = List([
    Map({
        "id": "r1s_9c10l",
        "name": "아벳",
        "phone": "010-0000-0001",
        "color": "#12b886",
        "favorite": true
    }),
    Map({
        "id": "BJcFqc10l",
        "name": "베티",
        "phone": "010-0000-0002",
        "color": "#fd7e14",
        "favorite": false
    }),
    Map({
        "id": "BJUcqqk0l",
        "name": "찰리",
        "phone": "010-0000-0003",
        "color": "#15aabf",
        "favorite": false
    }),
    Map({
        "id": "rJHoq91Cl",
        "name": "데이비드",
        "phone": "010-0000-0004",
        "color": "#e64980",
        "favorite": false
    })
]);

export default handleActions({
    [CREATE]: (state, action) => {
        return state.push(Map(action.payload));
    },
    [MODIFY]: (state, action) => {
        const index = state.findIndex((contact) => contact.get('id') === action.payload.id);
        return state.mergeIn([index], action.payload.contact);
    },
    [REMOVE]: (state, action) => {
        const index = state.findIndex((contact) => contact.get('id') === action.payload.id);
        return state.delete(index);
    },
    [TOGGLE_FAVORITE]: (state, action) => {
        const index = state.findIndex((contact) => contact.get('id') === action.payload.id);
        return state.update(index, (contact) => contact.set('favorite', !contact.get('favorite')))
    },
    [LOAD_CONTACTS]: (state, action) => {
        if(!localStorage.contacts) return state;
        else {
            const contactData = fromJS(JSON.parse(localStorage.contacts));
            return state.merge(contactData);
        }
    }
}, initialState);