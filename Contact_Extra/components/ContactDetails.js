// 선택기능 구현 7 : 보여주기 위한 새로운 js 파일 생성
import React from 'react'
import PropTypes from 'prop-types'

export default class ContactDetails extends React.Component {
    constructor(props){
        super(props)

        this.state = {
            isEdit: false,
            editName : '',
            editPhone: ''
        }

        this.handleToggle = this.handleToggle.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleKeyPress = this.handleKeyPress.bind(this)
    }

    handleToggle(){
        if(!this.state.isEdit){
            this.setState({
                editName: this.props.contact.name,
                editPhone: this.props.contact.phone
            })
        } else {
            this.props.onEdit(this.state.editName, this.state.editPhone)
        }
        this.setState({
            isEdit: !this.state.isEdit
        })
    }

    handleChange(e){
        let changed = {}
        changed[e.target.name] = e.target.value
        this.setState(changed)
    }

    handleKeyPress(e){
        if(e.charCode === 13){
            this.handleToggle()
        }
    }

    render() {
        // 선택 되었을때와 안되었을 때 구분하기 위해 두가지 경우를 정의
        const blank = (<div>Not Selected</div>);
        const read = (
            <div>
                <p>{this.props.contact.name}</p>
                <p>{this.props.contact.phone}</p>
            </div>
        );

        const edit = (
            <div>
                <p>
                    <input type="text" name="editName" placeholder="name"
                           value={this.state.editName} onChange={this.handleChange}/>
                </p>
                <p>
                    <input type="text" name="editPhone" placeholder="phone"
                           value={this.state.editPhone} onChange={this.handleChange} onKeyPress={this.handleKeyPress}/>
                </p>
            </div>
        )

        const details = (
            <div>
                {this.state.isEdit ? edit : read}
                <p>
                    <button onClick={this.handleToggle}>{this.state.isEdit ? 'OK' : 'Edit'}</button>
                    <button onClick={this.props.onRemove}>Remove</button>
                </p>
            </div>
        )

        return (
            <div>
                <h2>Details</h2>
                {this.props.isSelected ? details : blank}
            </div>
        )
    }
}

// 선택기능 구현 11 : 선택이 안되었을 때 오류를 해결하기위해 디폴트 값 설정
ContactDetails.defaultProps = {
    contact : {
        name : '',
        phone : ''
    },
    onEdit: () => {console.error('onEdit not defined')},
    onRemove: () => {console.error('onRemove not defined')}
}

ContactDetails.propTypes = {
    contact: PropTypes.object,
    onEdit: PropTypes.func,
    onRemove: PropTypes.func
}