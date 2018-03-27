import React from 'react'
import ContactInfo from './ContactInfo'

export default class Contact extends React.Component{
    constructor(props){
        super(props)

        this.state = {
            /* 검색 기능 구현2 state에 keyword 추가 */
            keyword: '',
            contactData:[
                {name:'Abet', phone:'010-0000-0001'},
                {name:'Betty', phone:'010-0000-0002'},
                {name:'Charlie', phone:'010-0000-0003'},
                {name:'David', phone:'010-0000-0004'}
            ]
        }

        /* 검색 기능 구현5 this를 알려주기 위해 handleChange.bind */
        this.handleChange = this.handleChange.bind(this)
    }
    /* 검색 기능 구현4 state 변경을 위한 setState 추가 */
    handleChange(e){
        this.setState({
            keyword: e.target.value
        })
    }
    
    render() {
        const mapToComponent = (data) => {
            /* 검색 기능 구현7 data를 sort & filter => keyword 가 들어간 것을 찾고, 소문자로!!*/
            data.sort(function(a,b){
                return a.name > b.name ? 1 : a.name < b.name ? -1 :0
            }); // 나중에 user 에게서 값을 받을 것이기 때문에 sort 를 한다.
            data = data.filter( (contact) => {
                return contact.name.toLowerCase().indexOf(this.state.keyword.toLowerCase()) > -1 ;
            })

            return data.map((contact, i) => { // contact 는 value, i 는 index
                return (<ContactInfo contact = {contact} key={i}/>)
            })
        }

        return (
            <div>
                <h1>Contacts</h1>
                {/* 검색 기능 구현1 input 태그 추가 */}
                {/* 검색 기능 구현3 keyword state 를 사용 */}
                {/* 검색 기능 구현6 onChange 속성 추가 */}
                <input
                    name="keyword"
                    placeholder="Search"
                    value={this.state.keyword}
                    onChange={this.handleChange}
                />
                <div>{mapToComponent(this.state.contactData)}</div>
            </div>
        )
    }
}