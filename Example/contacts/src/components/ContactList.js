import React, {Component} from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';

import { transition } from '../lib/style-utils';
import ContactItem from './ContactItem';

const Wrapper = styled.div`
    margin-top: 1rem;

    .contact-enter {
        animation: ${transition.stretchOut} .15s linear;
        animation-fill-mode: forwards;
    }

    .contact-leave {
        animation: ${transition.shrinkIn} .15s linear;
        animation-fill-mode: forwards;
    }

`;

class ContactList extends Component {
    static propTypes = {
        contacts: PropTypes.arrayOf(PropTypes.object),
        search: PropTypes.string, // 검색 키워드
        onToggleFavorite: PropTypes.func,   // 즐겨찾기 토글
        onOpenModify: PropTypes.func    // 수정 모달 띄우기
    };

    render(){
        const {contacts, onOpenModify, onToggleFavorite, search} = this.props;
        const contactList = contacts
            .filter(
                c => c.name.indexOf(search) !== -1
            ).sort(
                (a,b) => {
                    if(a.name > b.name) return 1;
                    if(a.name < b.name) return -1;
                    return 0;
                }
            ).map(
                contact =>
                    <ContactItem key={contact.id}
                                 contact={contact}
                                 onOpenModify={onOpenModify}
                                 onToggleFavorite={onToggleFavorite}/>
            );
        return (
          <Wrapper>
              <CSSTransitionGroup
                  transitionName='contact'
                  tansitionEnterTimeout={500}
                  tansitionLeaveTimeout={500}
              >
                  {contactList}
              </CSSTransitionGroup>
          </Wrapper>
        );
    };
}

export default ContactList;