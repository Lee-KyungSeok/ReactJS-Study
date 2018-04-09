import React from 'react';
import {shallow} from 'enzyme';
import Counter from './Counter';

describe('Counter', () => {
    let component = null;
    const mockIncrease = jest.fn();
    const mockDecrease = jest.fn();

    // 랜더링 검증
    it("renders correctly", () => {
        component = shallow(<Counter value={700} onIncrease={mockIncrease} onDecrease={mockDecrease}/>);
    });

    // 스냅샷이 일치하는지 검증(u 시 업데이트)
    it("matches snapshot", () => {
        expect(component).toMatchSnapshot();
    });

    // value 값이 들어오는지 검증
    it('is 700', () => {
        expect(component.find('h2').at(0).text(), '700');
    });

    // props 로 전달해줄 onIncrease 와 onDecrease 가 제대로 작동하는지 검증
    it('calls functions', () => {
        const button = component.find('button');
        // 0번째 버튼과 1번째 버튼을 시뮬레이트
        button.at(0).simulate('click');
        button.at(1).simulate('click');
        expect(mockIncrease.mock.calls.length).toBe(1);
        expect(mockDecrease.mock.calls.length).toBe(1);
    });
});
