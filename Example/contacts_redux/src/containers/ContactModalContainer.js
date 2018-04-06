import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import shortid from 'shortid';

import ContactModal from '../components/ContactModal';
import Dimmed from '../components/Dimmed';

import * as modalActions from '../modules/modal';
import * as contactActions from '../modules/contacts';

class ContactModalContainer extends Component {
    handleAction = {
        create: () => {
            const {ContactActions, modal} = this.props;
            const {name, phone, color} = modal.get('contact').toJS();
            const id = shortid.generate()
            ContactActions.create({
                id,
                name,
                phone,
                color
            });
            this.handleHide();
        },
        modify: () => {
            const {ContactActions, modal} = this.props;
            const {name, phone, id} = modal.get('contact').toJS();

            ContactActions.modify({
                id,
                contact: {
                    name,
                    phone
                }
            });
            this.handleHide();
        }
    };

    handleRemove = () => {
        const {ContactActions, modal} = this.props;
        const id = modal.getIn('contact', 'id');

        ContactActions.remove({id});
        this.handleHide();
    };

    handleHide = () => {
        const {ModalActions} = this.props;

        ModalActions.hide();
    };

    handleChange = (name, value) => {
        const {ModalActions} = this.props;

        ModalActions.change({name, value});
    };

    render(){
        const {handleAction, handleRemove, handleHide, handleChange} = this;
        const {modal} = this.props;
        const {visible, mode, contact} = modal.toJS();

        return(
            <div>
                <ContactModal
                    visible={visible}
                    mode={mode}
                    name={contact.name}
                    phone={contact.phone}
                    color={contact.color}
                    onAction={handleAction[mode]}
                    onHide={handleHide}
                    onRemove={handleRemove}
                    onChange={handleChange}
                />
                <Dimmed visible={visible}/>
            </div>
        );
    };
}

const mapStateToProps  = (state) => ({
    modal: state.modal
});

const mapDispatchToProps = (dispatch) => ({
    ModalActions: bindActionCreators(modalActions, dispatch),
    ContactActions: bindActionCreators(contactActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(ContactModalContainer);
