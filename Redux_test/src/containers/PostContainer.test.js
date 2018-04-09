import React, {Componet} from 'react';
import { mount } from 'enzyme';
import nock from 'nock';
import { Provider } from 'react-redux';

import PostContainer from './PostContainer';
import configureStore from '../store/configureStore';

describe('PostContainer', () => {
    let component = null;
    const store = configureStore();
    const context = {store};

    it('renders correctly', () => {
        component = mount(
            <Provider store={store}>
                <PostContainer/>
            </Provider>
        )
    });

    it('fetches and updates', async () => {
        nock('http://jsonplaceholder.typicode.com')
            .get('/posts/1').once().reply(200, {
                title: 'hello',
                body: 'world'
        });
        component.find('button').simulate('click');
        const waitForNextAction = new Promise(resolve => {
            const unsubscribe = store.subscribe(() => {
                resolve();
                unsubscribe();
            });
        });
        await waitForNextAction;
        expect(component.find('h2').text()).toBe('hello');
        expect(component.find('p').text()).toBe('world');
    });
});