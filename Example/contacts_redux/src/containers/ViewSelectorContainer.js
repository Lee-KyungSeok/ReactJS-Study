import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import * as baseActions from '../modules/base';
import ViewSelector from '../components/ViewSelector';

class ViewSelectorContainer extends Component {
    handleSelect = (view) => {
        const {BaseActions} = this.props;
        BaseActions.setView(view);
    };

    render() {
        const {view} = this.props;
        const {handleSelect} = this;

        return(
            <ViewSelector selected={view} onSelect={handleSelect}/>
        )
    }
}

const mapStateToProps = (state) => ({
    view: state.base.get('view')
});
const mapDispatchToProps = (dispatch) => ({
    BaseActions: bindActionCreators(baseActions, dispatch)
});
// bindActionCreators 를 쓰면 아래를 위와같이 쉽게 만들 수 있다.
/* 아래와 동일
const mapDispatchToProps = (dispatch) => ({
    BaseActions: {
        setView: (payload) => dispatch(baseActions.setView(payload)),
        changeSearch: (payload) => dispatch(baseActions.changeSearch(payload))
    }
});
*/

// 리덕스에 연결
export default connect(mapStateToProps, mapDispatchToProps)(ViewSelectorContainer);