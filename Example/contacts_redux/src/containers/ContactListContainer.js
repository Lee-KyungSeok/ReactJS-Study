import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import * as modalActions from '../modules/modal';
import * as contactActions from '../modules/contacts';

import ContactList from '../components/ContactList';

class ContactListContainer extends Component {
    handleOpenModify = (id) => {
        const {contacts, ModalActions} = this.props;
        // id 로 contact 조회
        const contact = contacts.find(contact => contact.get('id') === id);
        ModalActions.show({
            mode: 'modify',
            contact: contact.toJS()
        });
    };

    handleToggleFavorite = (id) => {
        const {ContactActions} = this.props;
        ContactActions.toggleFavorite({ id });
    };

    render(){
        const {handleOpenModify, handleToggleFavorite} = this;
        const {keyword, contacts} = this.props;

        return(
          <ContactList
              contacts={contacts}
              search={keyword}
              onOpenModify={handleOpenModify}
              onToggleFavorite={handleToggleFavorite}
          />
        );
    }
}

export default connect(
    (state) => ({
        keyword: state.base.get('keyword'),
        contacts: state.contacts
    }),
    (dispatch) => ({
        ModalActions: bindActionCreators(modalActions, dispatch),
        ContactActions: bindActionCreators(contactActions, dispatch)
    })
)(ContactListContainer);