import React, {Component} from 'react';
import PropTypes from 'prop-types'
import TodoFinal from './components/TodoFinal'

const propTypes = {};

const defaultProps = {};

class App extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <TodoFinal/>
        );
    }
}

App.propTypes = propTypes;
App.defaultProps = defaultProps;

export default App;