import React from 'react';

const NameList = ({names}) => {
    const nameList = names.map(
        (name, i) => (
            <li key={i}>{name}</li>
        )
    );

    return(
        <ul>
            {nameList}
        </ul>
    )
};

export default NameList;