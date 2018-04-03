import React from 'react';
import styled from 'styled-components';
import oc from 'open-color';
import PropTypes from 'prop-types'

import StarIcon from 'react-icons/lib/md/star';
import PeopleIcon from 'react-icons/lib/md/people';

const Wrapper = styled.div`
    height: 4rem;
    background: white;
    width: 100%;
    display: flex;
    
    /* 하단 핑크색 바 위치 설정을 위해 설정, => bottom, left 값 설정할 시 이 Wrapper에 의존 */
    position: relative;
`;

const StyledItem = styled.div`
    /* 레이아웃 */
    height: 100%;
    
    /* 형제 엘리먼트와 동일한 사이즈로 설정 */
    flex: 1;
    
    /* 색상 - props( StyledItem 의 active 값)에 따라 다른 스타일 설정*/
    color: ${ props => props.active ? oc.gray[9] : oc.gray[6]};
    
    /* 가운데 정렬 */
    display: flex;
    align-items: center;
    justify-content: center;
    
    /* 기타 */
    font-size: 1.5rem;
    cursor: pointer;
    
    /* 마우스 위에 있을 때 */
    &:hover {
        background: ${oc.gray[0]};
    }
`;

const Bar = styled.div`
    /* 레이아웃 */
    height: 3px;
    width: 50%;
    position: absolute;
    bottom: 0px;
    
    /* 색상 */
    background: ${oc.pink[6]};
    
    /* 애니메이션 */
    transition: ease-in .25s;
    
    /* right 값에 따라 우측으로 이동 */
    transform: ${props => props.right ? 'translateX(100%)' : 'none'};
`;

// 아이템 컴포넌트에 기능을 달아줘야 하기 때문에 컴포넌트 추가 생성
const Item = ({onSelect, selected, name ,children}) => (
    <StyledItem onClick={() => onSelect(name)} active={selected===name}>
        {children}
    </StyledItem>
);

const ViewSelector = ({onSelect, selected}) => (
    <Wrapper>
        <Item
            onSelect={onSelect}
            selected={selected}
            name="favorite">
            <StarIcon/>
        </Item>
        <Item
            onSelect={onSelect}
            selected={selected}
            name="list">
            <PeopleIcon/>
        </Item>
        <Bar right={selected==='list'}/>
    </Wrapper>
);

StyledItem.propTypes = {
    active: PropTypes.bool
};

Bar.propTypes = {
    right: PropTypes.bool
};

Item.propTypes = {
    selected: PropTypes.string,
    name: PropTypes.string,
    onSelect: PropTypes.func
};

export default ViewSelector;