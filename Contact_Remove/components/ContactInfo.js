import React from 'react'

export default class ContactInfo extends React.Component {
    render() {
        return (
            // onClick을 native에 적용 (onClick 과 같은 event는 컴포넌트에 적용되지 않고 props로 넘기게 된다!)
            <div onClick={this.props.clickEvent}>
                {this.props.contact.name}
            </div>
        )
    }
}