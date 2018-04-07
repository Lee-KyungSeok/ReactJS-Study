import React from 'react';

const Search = ({location}) => {
    return (
        <div>
            {
                // query가 keyword=XXX 를 가져와서 출력
                new URLSearchParams(location.search).get('keyword')
            }
        </div>
    );
};

export default Search;