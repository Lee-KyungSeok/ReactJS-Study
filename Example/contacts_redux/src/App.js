import React, {Component} from 'react';
import oc from 'open-color';

import Header from './components/Header'
import Container from "./components/Container";
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux';


import * as contactActions from './modules/contacts';

import ViewSelectorContainer from './containers/ViewSelectorContainer';
import InputContainer from './containers/InputContainer';
import FavoriteListContainer from './containers/FavoriteListContainer'
import FloatingButtonContainer from './containers/FloatingButtonContainer'
import ContactModalContainer from "./containers/ContactModalContainer";
import ContactListContainer from './containers/ContactListContainer';

class App extends Component {
    componentDidMount() {
        const {loadContacts} = this.props;
        loadContacts();
    }

    componentDidUpdate(prevProps, prevState) {
        const {contacts} = this.props;
        if(JSON.stringify(prevProps.contacts) !== JSON.stringify(contacts)){
            localStorage.contacts = JSON.stringify(contacts)
        }
    }

    render() {
        const {view} = this.props;
        return (
            <div>
                <Header/>
                <ViewSelectorContainer/>
                {/* view 값에 따라 다른 Container 렌더링 */}
                <Container visible={view==='favorite'}>
                    <FavoriteListContainer/>
                </Container>
                <Container visible={view==='list'}>
                    <InputContainer/>
                    <ContactListContainer/>
                </Container>
                <FloatingButtonContainer/>
                <ContactModalContainer/>

            </div>
        );
    }
}

export default connect(
    // 여기서 원래는  mapStateToProps 에서 설정하지만 이렇게 함!
    (state) => ({
        view: state.base.get('view'),
        contacts: state.contacts
    }),
    (dispatch) =>({
        loadContacts: () => dispatch(contactActions.loadContacts())
    })
)(App);

/*
const mapStateToProps = (state) => ({
    view: state.base.get('view')
});
*/