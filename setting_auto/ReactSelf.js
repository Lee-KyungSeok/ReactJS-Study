import React, {Component} from 'react';
import PropTypes from 'prop-types'

const propTypes = {};

const defaultProps = {};

class MyComponent extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div>MyComponent</div>
        );
    }
}

MyComponent.propTypes = propTypes;
MyComponent.defaultProps = defaultProps;

export default MyComponent;