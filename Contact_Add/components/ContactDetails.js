// 선택기능 구현 7 : 보여주기 위한 새로운 js 파일 생성
import React from 'react'

export default class ContactDetails extends React.Component {
    render() {
        // 선택기능 구현 8 : 선택 되었을때와 안되었을 때 구분하기 위해 두가지 경우를 정의
        const blank = (<div>Not Selected</div>);
        // 선택기능 구현 10 : 선택 되었을 때 넘긴 객체를 가지고 화면에 뿌려줌
        const details = (
            <div>
                <p>{this.props.contact.name}</p>
                <p>{this.props.contact.phone}</p>
            </div>
        );

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
    }
}