import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useWindowScroll } from 'react-use';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import LogoImg from "../image/logo.svg";

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 50px;
  padding: 20px 40px;
  background-color: white;
  z-index: 999;
  transition: all 0.3s ease;
  box-shadow: ${props => props.isScrolled ? '0 4px 10px rgba(0,0,0,.1)' : 'none'};
`;

const Logo = styled.img`
`;

const Nav = styled.div`
  @media (max-width: 768px) {
    display: none;
  }
`;

const NavMobile = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: block;
  }
`;

const Menu = styled.ul`
  display: flex;
  gap: 2em;
`;

const MenuItem = styled.div`
  font-size: 16px;
`;

const Hamburger = styled.div``;

const Dropdown = styled.div`
  position: absolute;
  top: 80px;
  right: 10px;
  width: 200px;
  background-color: white;
  border: 1px solid #ccc;
  padding: 10px;
`;

const DropdownItem = styled.div`
  padding: 10px 0;
`;

function Navbar() {
  const { y } = useWindowScroll();
  const [showMenu, setShowMenu] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 50) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Wrapper isScrolled={isScrolled} id="navbar">
      <Link to="/"><Logo style={{height: '30px'}} src={LogoImg} alt='logo' /></Link>
      
      <Nav>
        <Menu>
          <Link style={{textDecoration: 'none', color: 'inherit'}} to="/path2"><MenuItem>Vision</MenuItem></Link>
          <Link style={{textDecoration: 'none', color: 'inherit'}} to="/path3"><MenuItem>Hearing</MenuItem></Link>
          <Link style={{textDecoration: 'none', color: 'inherit'}} to="/path1"><MenuItem>Mental</MenuItem></Link>
          <Link style={{textDecoration: 'none', color: 'inherit'}} to="/path4"><MenuItem>About Us</MenuItem></Link>
        </Menu>
      </Nav>
      
      <NavMobile>
        <Hamburger onClick={() => setShowMenu(!showMenu)}>
          <FontAwesomeIcon icon={faBars} />
        </Hamburger>

        {showMenu && (
          <Dropdown>
            <DropdownItem><Link to="/path1">Item 1</Link></DropdownItem>
            <DropdownItem><Link to="/path2">Item 2</Link></DropdownItem>
            <DropdownItem><Link to="/path3">Item 3</Link></DropdownItem>
            <DropdownItem><Link to="/path4">Item 4</Link></DropdownItem>
          </Dropdown>
        )}
      </NavMobile>
    </Wrapper>
  );
}

export default Navbar;