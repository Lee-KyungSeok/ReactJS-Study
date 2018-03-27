import React from 'react'
import update from 'immutability-helper';
import ContactInfo from './ContactInfo'
import ContactDetails from './ContactDetails'
import ContactCreate from './ContactCreate'

export default class Contact extends React.Component{
    constructor(props){
        super(props)

        this.state = {
            // select를 위한 key를 구성 => index 가 key
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
        this.handleClick = this.handleClick.bind(this)
        this.handleCreate = this.handleCreate.bind(this)
        this.handleRemove = this.handleRemove.bind(this)
        this.handleEdit = this.handleEdit.bind(this)
    }

    // keyword 를 client가 입력한 글자러 변경
    handleChange(e){
        this.setState({
            keyword: e.target.value
        })
    }

    // state의 selectedKey 를 선택한 key로 변경
    handleClick(key){
        this.setState({
            selectedKey: key
        })

        console.log(key, "is selected")
    }

    // 주소록을 추가 (새로운 contact를 받아 추가)
    handleCreate(newContact){
        this.setState({
            contactData: update(
                this.state.contactData,{
                    $push: [newContact]
                }
            )
        })
    }

    // 주소록을 삭제
    // (selectedKey 를 통해 제거) + (제거 후 selectedKey를 -1 로 설정하여 오류 해결_무효화)
    handleRemove() {
        this.setState({
            contactData: update(
                this.state.contactData,{
                    $splice: [[this.state.selectedKey, 1]]
                }
            ),
            selectedKey: -1
        })
    }

    // 주소록을 업데이트
    handleEdit(newName, newPhone) {
        this.setState({
            contactData: update(
                this.state.contactData,{
                    [this.state.selectedKey]: {
                        name: {$set: newName},
                        phone: {$set: newPhone}
                    }
                }
            )
        })
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
                // props로 넘길 이벤트를 등록 (onClick 과 같은 event는 컴포넌트에 적용되지 않고 props 로 넘김에 주의!!!)
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
                {/*선택 여부와 선택된 주소의 정보를 넘김*/}
                <ContactDetails
                    isSelected = {this.state.selectedKey !== -1}
                    contact = {this.state.contactData[this.state.selectedKey]}/>
                {/* Contact Create 정보 */}
                <ContactCreate
                    onCreate = {this.handleCreate}
                />
            </div>
        )
    }
}