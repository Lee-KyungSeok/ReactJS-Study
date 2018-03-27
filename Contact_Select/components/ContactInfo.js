import React from 'react'

export default class ContactInfo extends React.Component {
    render() {
        return (
            /* 선택기능 구현 5 : onClick을 native에 적용 (onClick 과 같은 event는 컴포넌트에 적용되지 않고 props로 넘기게 된다!) */
            <div onClick={this.props.clickEvent}>
                {/* 선택기능 구현 1 이름만 보여주기 위해 name 만 남겨둠 */}
                {this.props.contact.name}
            </div>
        )
    }
}