import React, {Component} from 'react';

import Buttons from '../components/Buttons';
import CounterListContainer from './CounterListContainer';

import {connect} from 'react-redux';
import * as actions from '../actions';
import {getRandomColor} from "../util";


class App extends Component {
    render() {
        const {onCreate, onRemove} = this.props;
        return (
            <div className="App">
                <Buttons
                    onCreate={onCreate}
                    onRemove={onRemove}
                />
                <CounterListContainer/>
            </div>
        );
    }
}

const mapToDispatch = (dispatch) => ({
    onCreate: () => {
        const color = getRandomColor();
        dispatch(actions.create(color))
    },
    onRemove: (index) => dispatch(actions.remove(index))
});

export default connect(null, mapToDispatch)(App);