import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux'

import Input from '../components/Input';
import * as baseAction from '../modules/base';

class InputContainer extends Component {
    handleChange = (e) => {
        const {BaseActions} = this.props;
        BaseActions.changeSearch(e.target.value);
    };

    render(){
        const { handleChange } = this;
        const { keyword } = this.props;
        return(
            <Input onChange={handleChange} value={keyword} placeholder="검색"/>
        );
    }
}

export default connect(
    (state) => ({
        keyword: state.base.get('keyword')
    }),
    (dispatch) => ({
        BaseActions: bindActionCreators(baseAction, dispatch)
    })
)(InputContainer);