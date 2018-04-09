import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';


import * as counterActions from '../store/modules/counter';
import Counter from '../components/Counter';

class CounterContainer extends Component {
    onIncrease = () => {
        const {CounterActions} = this.props;
        CounterActions.increase();
    };

    onDecrease = () => {
        const {CounterActions} = this.props;
        CounterActions.decrease();
    };

    render(){
        const {onIncrease, onDecrease} = this;
        const {number} = this.props;

        return(
            <Counter value={number} onIncrease={onIncrease} onDecrease={onDecrease}/>
        );
    }
}

const mapStateToProps = ({counter}) => ({
    number: counter.number
});

const mapDispatchToProps =(dispatch) => ({
    CounterActions: bindActionCreators(counterActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(CounterContainer);