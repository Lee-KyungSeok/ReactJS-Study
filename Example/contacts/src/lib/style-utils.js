import {css, keyframes} from 'styled-components';

/* 모바일 크기 - 나중에는 tablet, desktop, wideDesktop 등 만들어야 함 */
export const media = {
    mobile: (...args) => css`
    @media (max-width: 768px) {
        ${ css(...args) }
    }
  `
};

export const transition = {
    slideDown: keyframes`
        0% {
            opacity: 0;
            transform: translateY(-100vh);
        }
        75% {
            opacity: 1;
            transform: translateY(25px);        
        }
        100% {
            transform: translateY(0px);        
        }
    `,
    slideUp: keyframes`
        0% {
            opacity: 1;
            transform: translateY(0);
        }
        25% {
            opacity: 1;
            transform: translateY(25px);        
        }
        100% {
            opacity: 0;
            transform: translateY(-100vh);        
        }
    `,
    stretchOut: keyframes`
        0% {
            transform: scale(0,0);
        }
        100% {
            transform: scale(1,1);
        }
    `,
    shrinkIn: keyframes`
        0% {
            transform: scale(1, 1);
        }
        100% {
            transform: scale(0,0);
        }
    `
};