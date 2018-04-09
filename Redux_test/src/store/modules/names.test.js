import names, * as namesActions from './names';

describe('names', () => {
    // 액션 확인
    describe('actions', () => {
        const actions = [
            namesActions.changeInput('input'),
            namesActions.insert('name')
        ];
        it('should create actions', () => {
            expect(actions).toMatchSnapshot();
        })
    });

    describe('reducer', () => {
        let state = names(undefined, {});

        it('should return the initialState', () => {
            expect(state).toEqual({
                input: '',
                names: []
            });
        });

        it('should change input', () => {
            state = names(state, namesActions.changeInput('hello'));
            expect(state).toHaveProperty('input', 'hello');
        });

        it('should insert', () => {
            state = names(state, namesActions.insert('kyung'));
            expect(state.names).toEqual(['kyung']);
            state = names(state, namesActions.insert('seok'));
            expect(state.names).toEqual(['kyung', 'seok']);
        });
    })
});