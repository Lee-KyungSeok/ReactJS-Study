import React, { Component } from 'react';

class NameList extends Component {
    static defaultProps = {
        names: []
    };

    renderList() {
        const { names } = this.props;
        return names.map(
            (name, i) => (<li key={i}>{name}</li>)
        );
    }

    render() {
        return (
            <ul>
                { this.renderList() }
            </ul>
        );
    }
}

export default NameList;