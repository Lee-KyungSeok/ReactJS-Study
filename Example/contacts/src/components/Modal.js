import React, { Component } from 'react';
import styled from 'styled-components';
import onClickOutside from 'react-onclickoutside';
import {media, transition} from '../lib/style-utils';
import PropTypes from 'prop-types';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';

// 모달 위치 및 사이즈 설정
const Wrapper = styled.div`
    /* 레이아웃 */
    position: fixed;
    /* 화면 가운대로 정렬 */
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    /* 레이어 */
    z-index: 10;

    /* 너비 (기본값 400px) */
    width: ${ props => props.width };

    /* 모바일일땐 양옆 여백 1rem 에 꽉 채우기 */
    ${media.mobile`
        width: calc(100% - 2rem);
    `}
    
    /* 애니메이션 설정 */
    .modal-enter {
        animation: ${transition.slideDown} .5s ease-in-out;
        animation-fill-mode: forwards;
    }
    .modal-leave {
        animation: ${transition.slideUp} .5s ease-in-out;
        animation-fill-mode: forwards;
    }
`;

Wrapper.propTypes = {
    width : PropTypes.string
};

// 모달 틀
const ModalBox = styled.div`
    background: white;
    border: 1px solid rgba(0,0,0,0.3)
`;

class Modal extends Component {
    static propTypes = {
        visible: PropTypes.bool,
        onHide: PropTypes.func,
        width: PropTypes.string
    };

    static defaultProps = {
        visible: false,
        width: '400px',
        onHide: () => {console.error('onHide is not defined')}
    };

    // 컴포넌트 외부를 클릭하면 실행되는 메소드
    handleClickOutside = (e) => {
        const {onHide, visible} = this.props;
        if(!visible) return null; // visible=false 면 null 을 리턴
        onHide();
    };

    // Esc 키가 클릭되면 onHide 를 실행한다
    handleKeyUp = (e) => {
        const {onHide} = this.props;
        // esc 코드는 27
        if(e.charCode === 27) {
            onHide();
        }
    };

    componentDidUpdate(prevProps, nextProps) {
        //visible 이 변했는데 visible 값에 따라 handleKeyUp 리스터를 등록 및 제거
        if(prevProps.visible !== this.props.visible) {
            if(this.props.visible) {
                document.body.addEventListener('keyup', this.handleKeyUp);
            } else {
                document.body.removeEventListener('keyup', this.handleKeyUp);
            }
        }
    };

    render() {
        const {children, visible, width} = this.props;

        return(
            <div>
                <Wrapper width={width}>
                    <CSSTransitionGroup
                        transitionName="modal"
                        transitionEnterTimeout={500}
                        transitionLeaveTimeout={500}>
                        {
                            // visible 이 참일때 Modal Box 를 보여준다.
                            visible && (<ModalBox>{children}</ModalBox>)
                        }
                    </CSSTransitionGroup>
                </Wrapper>
            </div>
        )
    }
}

// onClickoutside 라이브러리 적용
export default onClickOutside(Modal);