import React, {Component} from 'react';

import Value from './Value'
import Control from './Control'
import * as actions from '../actions'

import {connect } from 'react-redux';
// import {connect, bindActionCreators } from 'react-redux';

class Counter extends Component {
    constructor(props) {
        super(props)

        this.setRandomColor = this.setRandomColor.bind(this)
    }

    setRandomColor() {
        const color = [
            Math.floor((Math.random()*55) + 200),
            Math.floor((Math.random()*55) + 200),
            Math.floor((Math.random()*55) + 200)
        ];

        this.props.handleSetColor(color);
    }

    render() {

        const color = this.props.color;
        const style = {
            background: `rgb(${color[0]}, ${color[1]}, ${color[2]})`
        }

        return (
            <div style={style}>
                <Value number={this.props.number} /> {/* 만약.. 옵션이 없다면 number={this.props.store,getState().counter.number} 와 같이 뽑을 수 있다.*/}
                <Control
                    onPlus={this.props.handleIncrement}
                    onSubtract={this.props.handleDecrement}
                    onRandomizeColor={this.setRandomColor}
                />
            </div>
        );
    }
}

// component의 number props 와 color props를 연결해준다.
const mapStateToProps = (state) => {
    return {
        number: state.counter.number,
        color: state.ui.color
    }
};

// action을 dispatch 하는 함수를 props로 연결
// ex> handleIncrement를 실행하면 뒤에 있는게 실행됨!
const mapDispatchToProps = (dispatch) => {
    return {
        handleIncrement: () => {dispatch(actions.increment())},
        handleDecrement: () => {dispatch(actions.decrement())},
        handleSetColor: (color) => {dispatch(actions.setColor(color))}
    }
    // 아래와 같이 작성해도 같다. ( 이를 사용하면 먼저 임포트 해준다!)
    // but> 이름을 따로 설정할 수 없고, 함수이름 그대로 사용된다(헤깔릴수도...)
    // return bindActionCreators(actions, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Counter);