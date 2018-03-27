import React from 'react'
import PropTypes from 'prop-types'

export default class ContactCreate extends React.Component{
    constructor(props){
        super(props)
        // 추가하는 번호이므로 newName으로 선택
        this.state = {
            newName: '',
            newPhone: ''
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleClick = this.handleClick.bind(this)
    }

    // name과 value 를 이용해 담을 수 있게 된다.
    handleChange(e) {
        let nextState = {};
        nextState[e.target.name] = e.target.value
        this.setState(nextState)
    }

    handleClick() {
        // 새로운 전화번호를 세팅
        const contact = {
            name: this.state.newName,
            phone: this.state.newPhone
        };
        this.props.onCreate(contact)
        
        // 세팅 후 리셋
        this.setState({
            newName: '',
            newPhone: ''
        })
    }

    render() {
        return(
            <div>
                <h2>Create Contact</h2>
                <p>
                    <input type="text" name="newName" placeholder="name" value={this.state.newName} onChange={this.handleChange}/>
                    <input type="text" name="newPhone" placeholder="phone" value={this.state.newPhone} onChange={this.handleChange}/>
                </p>
                <button onClick={this.handleClick}>Create</button>
            </div>
        )
    }
}

ContactCreate.propTypes = {
    onCreate: PropTypes.func
}

ContactCreate.defaultProps = {
    onCreate: () => {console.error('onCreate not defined')}
}