import { connect } from 'react-redux';
import FavoriteList from '../components/FavoriteList';

export default connect(
    (state) => ({
        contacts: state.contacts
    })
)(FavoriteList);