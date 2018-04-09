import React from 'react';
import {shallow} from 'enzyme';
import NameList from './NameList';

describe('NameList', () => {
    let component = null;

    it('renders correctly', () => {
        component = shallow(<NameList names={['Kyung','Seok']}/>);
    });

    it('match correctly', () => {
        expect(component).toMatchSnapshot();
    });
});