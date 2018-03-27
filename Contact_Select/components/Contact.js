import React from 'react'
import ContactInfo from './ContactInfo'
import ContactDetails from './ContactDetails'

export default class Contact extends React.Component{
    constructor(props){
        super(props)

        this.state = {
            /* 선택기능 구현 2 : select를 위한 key를 구성 - index 가 key 가 된다. */
            selectedKey: -1,

            // 검색을 위한 keyword
            keyword: '',
            contactData:[
                {name:'Abet', phone:'010-0000-0001'},
                {name:'Betty', phone:'010-0000-0002'},
                {name:'Charlie', phone:'010-0000-0003'},
                {name:'David', phone:'010-0000-0004'}
            ]
        }

        // this를 알려주기 위한 bind
        this.handleChange = this.handleChange.bind(this)
        /* 선택기능 구현 4 클릭효과를 위한 bind */
        this.handleClick = this.handleClick.bind(this)
    }

    // state 변경을 위한 setState
    handleChange(e){
        this.setState({
            keyword: e.target.value
        })
    }

    /* 선택기능 구현 3 클릭효과 => state 를 선택한 key로 변경 */
    handleClick(key){
        this.setState({
            selectedKey: key
        })

        console.log(key, "is selected")
    }
    
    render() {
        const mapToComponent = (data) => {
            // sort & filter => keyword 가 들어간 것을 찾고, 소문자로!!
            data.sort(function(a,b){
                return a.name > b.name ? 1 : a.name < b.name ? -1 :0
            }); // 나중에 user 에게서 값을 받을 것이기 때문에 sort 를 한다.
            data = data.filter( (contact) => {
                return contact.name.toLowerCase().indexOf(this.state.keyword.toLowerCase()) > -1 ;
            })

            return data.map((contact, i) => { // contact 는 value, i 는 index
                /* onClick 과 같은 event는 컴포넌트에 적용되지 않고 props 로 넘김에 주의!!! */
                /* 선택기능 구현 6 : props로 넘길 이벤트를 등록 => arrow function으로 넘겨야 한다. 그냥 this.handleClick() 안됨 */
                return (<ContactInfo
                            contact = {contact}
                            key={i}
                            clickEvent={() => this.handleClick(i)}/>)
            })
        }

        return (
            <div>
                <h1>Contacts</h1>
                {/* keyword state 를 사용 */}
                <input
                    name="keyword"
                    placeholder="Search"
                    value={this.state.keyword}
                    onChange={this.handleChange}
                />
                <div>{mapToComponent(this.state.contactData)}</div>
                {/* 선택기능 구현 9 선택 여부와 선택된 주소의 정보를 넘김*/}
                <ContactDetails
                    isSelected = {this.state.selectedKey !== -1}
                    contact = {this.state.contactData[this.state.selectedKey]}/>
            </div>
        )
    }
}