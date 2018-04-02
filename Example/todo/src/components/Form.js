import React, {Component} from 'react';
import PropTypes from 'prop-types'
import './Form.css'

/**
 *  인풋과 버튼이 담겨있는 컴포넌트
 */

const propTypes = {
    content: PropTypes.string,
    formOnChange: PropTypes.func,
    formOnKeyPress: PropTypes.func,
    formOnCreate: PropTypes.func
};

function createWarning(funcName){
    return () => console.warn(funcName + " is not defined")
}

/**
 * props의 디폴트 값
 * formOnChange : 인풋 내용이 변경 될 때 실행될 함수
 * formOnKeyPress : 인풋에서 키를 입력 할 때 실행되는 함수 (enter 키 입력시 create)
 * formOnCreate : 버튼이 클릭 될 때 실행될 함수
 */
const defaultProps = {
    content: '',
    formOnChange: createWarning('formOnChange'),
    formOnKeyPress: createWarning('formOnKeyPress'),
    formOnCreate: createWarning('formOnCreate')
};

class Form extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="form">
                <input value={this.props.content} onChange={this.props.formOnChange} onKeyPress={this.props.formOnKeyPress}/>
                <div className="create-button" onClick={this.props.formOnCreate}>
                    추가
                </div>
            </div>
        );
    }
}

Form.propTypes = propTypes;
Form.defaultProps = defaultProps;

export default Form;