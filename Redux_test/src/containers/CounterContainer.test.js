import React from 'react';
import {mount} from 'enzyme';
import CounterContainer from './CounterContainer';
import configureMockStore from 'redux-mock-store';
import * as counterActions from '../store/modules/counter';

describe('CounterContainer', () => {
    let component = null;
    let button = null;
    const mockStore = configureMockStore();

    // 데이터를 받아올 가짜 스토어 만들기
    let store = mockStore({
        counter: {
            number: 0
        }
    });

    // 랜더링 확인
    it('renders properly', () => {
        const context = {store};
        // 가짜 store를 지정
        component = mount(<CounterContainer/>, {context});
        // 혹은 component = mount(<CounterContainer store={store} />);
    });

    // snapshot 비교
    it('matches snapshot', () => {
        expect(component).toMatchSnapshot();
    });

    // increase dispatch 확인
    it('dispatches Increase action', () => {
        component.find('button').at(0).simulate('click');
        expect(store.getActions()[0]).toEqual(counterActions.increase());
    });

    // decrease dispatch 확인
    it('dispatches Decrease action', () => {
        component.find('button').at(1).simulate('click');
        expect(store.getActions()[1]).toEqual(counterActions.decrease());
    });
});