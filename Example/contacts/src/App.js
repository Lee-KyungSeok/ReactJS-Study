import React, {Component} from 'react';
import oc from 'open-color';
import shortid from 'shortid';

import Header from './components/Header'
import Container from "./components/Container";
import ViewSelector from './components/ViewSelector';
import FloatingButton from './components/FloatingButton';
import ContactModal from './components/ContactModal';
import Dimmed from './components/Dimmed';
import ContactList from './components/ContactList';
import Input from './components/Input';
import FavoriteList from "./components/FavoriteList";

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

class App extends Component {
    // state 정의
    state = {
        view: 'favorite',
        modal: {
            visible: false,
            mode: null  // create or modify
        },
        contacts: [],
        search: ''
    };

    handleSearchChange = (e) => {
        this.setState({
            search: e.target.value
        })
    };

    // handleSelectorView 메소드
    handleSelectorView = (view) => {
        this.setState({
            view: view
        })
    };

    // 모달 관련 메서드
    modalHandler = {
        show : (mode, payload) => {
            this.setState({
                modal: {
                    mode,
                    visible: true,
                    ...payload  // payload 값을 여기에 넣음
                }
            });
        },
        hide : () => {
            this.setState({
               modal: {
                   ...this.state.modal, // 기존값을 복사해서 안에 넣음
                   visible: false
               } 
            });
        },
        change: (name, value) => {
            this.setState({
                modal: {
                    ...this.state.modal,
                    [name]: value   // 인자로 전달받은 name 의 값을 value로 설정
                }
            })
        },
        action: {
            create: () => {
                // 고유 id 생성
                const id = shortid.generate();

                // 레퍼런스 생성
                const { contacts, modal: {name, phone, color}} = this.state;

                // 데이터 생성
                const newContact = {
                    id,
                    name,
                    phone,
                    color,
                    favorite: false // 즐겨찾기의 기본값은 false
                };

                // 변경
                this.setState({
                    contacts : [...contacts, newContact]
                });

                // 모달 닫기
                this.modalHandler.hide();
            },
            modify: () => {
                // 레퍼런스 준비
                const {modal: { name, phone, index}, contacts } = this.state;
                const item = contacts[index];

                // 상태 변경
                this.setState({
                    contacts: [
                        ...contacts.slice(0, index), // 0~index 전까지 객체를 넣음
                        {
                            ...item, // 기존의 아이템 값에 덮어씀
                            name,
                            phone
                        },
                        ...contacts.slice(index + 1, contacts.length) // 그 뒤 객체들을 넣음
                    ]
                });

                // 모달 닫기
                this.modalHandler.hide();
            },
            remove: () => {
                // 레퍼런스 준비
                const {modal:{index}, contacts} = this.state;

                // 상태 변경
                this.setState({
                   contacts: [
                       ...contacts.slice(0,index),
                       ...contacts.slice(index + 1, contacts.length)
                   ]
                });

                // 모달 닫기
                this.modalHandler.hide();
            }
        }
    };

    itemHandler = {
        toggleFavorite: (id) => {
            const {contacts} = this.state;
            const index = contacts.findIndex(contact => contact.id === id);
            const item = this.state.contacts[index];

            // favorite 인자 변경
            this.setState({
                contacts: [
                    ...contacts.slice(0,index),
                    {
                        ...item,
                        favorite: !item.favorite
                    },
                    ...contacts.slice(index + 1, contacts.length)
                ]
            });
        },
        openModify: (id) => {
            const {contacts} = this.state;
            //id 로 index 조회
            const index = contacts.findIndex(contact => contact.id === id);
            const item = this.state.contacts[index];

            this.modalHandler.show(
                'modify',
                {
                    ...item,
                    index
                }
            );
        }
    };

    // Floating 버튼 클릭
    handleFloatingButtonClick = () => {
        // 현재 view 가 list가 아니라면 list로 설정
        const {view} = this.state;
        if(view !== 'list') this.setState({view: 'list'});

        // Contact 추가 모달 띄우기
        this.modalHandler.show(
            'create',
            {
                name: '',
                phone: '',
                color: generateRandomColor()
            }
        );
    };

    //
    render() {
        // 레퍼런스 준비
        // ViewSelector 에 메소드와 view 값 전달
        const {handleSearchChange, handleSelectorView, handleFloatingButtonClick, modalHandler, itemHandler} = this;
        const {view, modal, contacts, search} = this.state;

        return (
            <div>
                <Header/>
                <ViewSelector onSelect={handleSelectorView} selected={view}/>

                {/* view 값에 따라 다른 Container 렌더링 */}
                <Container visible={view==='favorite'}>
                    <FavoriteList contacts={contacts}/>
                </Container>
                <Container visible={view==='list'}>
                    <Input
                        onChange={handleSearchChange}
                        value={search}
                        placeholder='검색'/>
                    <ContactList
                        contacts={contacts}
                        onOpenModify={itemHandler.openModify}
                        search={search}
                        onToggleFavorite={itemHandler.toggleFavorite}/>
                </Container>

                <ContactModal
                    {...modal}
                    onHide = {modalHandler.hide}
                    onChange = {modalHandler.change}
                    onAction={modalHandler.action[modal.mode]}
                    onRemove={modalHandler.action.remove}/>
                <Dimmed visible={modal.visible}/>
                <FloatingButton onClick={handleFloatingButtonClick}/>
            </div>
        );
    }
}

export default App;
