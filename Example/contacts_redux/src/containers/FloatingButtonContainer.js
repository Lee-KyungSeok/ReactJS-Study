import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import oc from 'open-color';

import * as modalActions from '../modules/modal';
import * as baseActions from '../modules/base';
import FloatingButton from '../components/FloatingButton';

function generateRandomColor() {
    const colors = [
        'gray',
        'red',
        'pink',
        'grape',
        'violet',
        'indigo',
        'blue',
        'cyan',
        'teal',
        'green',
        'lime',
        'yellow',
        'orange'
    ];

    // 0 부터 12까지 랜덤 숫자
    const random = Math.floor(Math.random() * 13);

    return oc[colors[random]][6];
}

class FloatingButtonContainer extends Component {
    handleClick =  () => {
        const {ModalActions, BaseActions} = this.props;

        // 뷰를 리스트로 전환
        BaseActions.setView('list');

        const color = generateRandomColor();
        // 모달을 띄움
        ModalActions.show({
            mode: 'create',
            contact: {
                name: '',
                phone: '',
                color: color
            }
        })
    };

    render(){
        const {handleClick} = this;
        return(
            <FloatingButton onClick={handleClick}/>
        )
    }
}

const mapDispatchToProps = (dispatch) => ({
    BaseActions: bindActionCreators(baseActions, dispatch),
    ModalActions: bindActionCreators(modalActions, dispatch)
});

export default connect(null, mapDispatchToProps)(FloatingButtonContainer);