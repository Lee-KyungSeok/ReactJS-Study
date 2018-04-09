import React from 'react';
import { mount } from 'enzyme';
import NamesContainer from './NamesContainer';
import configureStore from '../store/configureStore';

describe('NamesContainer', () => {
    let component = null;
    let button = null;

    // 실제 store로 받아봄
    let store = configureStore();

    it('renders properly', () => {
        const context = { store };
        component = mount(<NamesContainer/>, {context});
    });

    it('matches snapshot', () => {
        expect(component).toMatchSnapshot();
    });

    it('dispatches CHANGE_INPUT action', () => {
        const mockedEvent = {
            target: {
                value: 'world'
            }
        };
        component.find('input').simulate('change', mockedEvent);
        expect(store.getState().names.input).toBe('world');
    });

    it('dispatches INSERT action', () => {
        component.find('form').simulate('submit');
        expect(store.getState().names.names).toEqual(['world']);
    });
});