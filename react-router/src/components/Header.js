import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import './Header.css';

const Home = () => {
    return (
        <div className="header">
            <NavLink exact to="/" className="item" activeClassName='active'>홈</NavLink>
            <NavLink to="/about" className="item" activeClassName='active'>소개</NavLink>
            <NavLink to="/posts" className="item" activeClassName='active'>포스트</NavLink>
            <NavLink to="/login" className="item" activeClassName='active'>로그인</NavLink>
            <NavLink to="/me" className="item" activeClassName='active'>MyPage</NavLink>
            <NavLink to="/search" className="item" activeClassName='active'>검색</NavLink>
        </div>
    );
};

export default Home;