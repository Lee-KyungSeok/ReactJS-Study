import React from 'react';
import renderer from 'react-test-renderer';
import App from './App';

describe('NameList', () => {
    let component = null;

    it('renders correctly', () => {
        component = renderer.create(<App/>);
    });

    it('match correctly', () => {
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });

    //onInsert 확인
    it('insert correctly', () => {
        component.getInstance().onInsert('Test');
        expect(component.getInstance().state.names).toMatchObject(['Kyung','Seok','Test']);
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    })
});