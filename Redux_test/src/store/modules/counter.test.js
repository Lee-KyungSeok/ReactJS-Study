import counter, * as counterActions from './counter';

describe('counter', () => {
    // 액션함수 테스트
    describe('actions', () => {
        it('should create actions', () => {
            const expectedActions = [
                { type: 'counter/INCREASE'},
                { type: 'counter/DECREASE'}
            ];

            const actions = [
                counterActions.increase(),
                counterActions.decrease()
            ];
            // 일치하는지 확인
            expect(actions).toEqual(expectedActions);
        });
    });
    
    // 리듀서 테스트
    describe('reducer', () => {
        let state = counter(undefined, {});
        // counter의 초기값 확인
        it('should return the initialState', () => {
            expect(state).toHaveProperty('number', 0);
        });

        // increase 확인
        it('should increase', () => {
            state = counter(state, counterActions.increase());
            expect(state).toHaveProperty('number', 1);
        });

        // decrease 확인
        it('should increase', () => {
            state = counter(state, counterActions.decrease());
            expect(state).toHaveProperty('number', 0);
        });
    });
});