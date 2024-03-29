import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';
import { Search as SearchIcon, Menu } from 'react-feather';

import NavigationList from './NavigationList';
import Dropdown from './Dropdown';
import device from '../utils/device';

const Navbar = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const location = useLocation();
  useEffect(() => {
    setShowDropdown(false);
  }, [location.pathname]);
  return (
    <Header>
      <Navigation>
        <BrandContainer>
          <Brand to="/">Fashionista</Brand>
        </BrandContainer>
        <SearchContainer>
          <SearchInput placeholder="Search entire store here..." />
          <SearchButton>
            <SearchIcon color="grey" size="16" />
          </SearchButton>
        </SearchContainer>
        <NavigationListContainer>
          <NavigationList />
        </NavigationListContainer>
        <MenuButton onClick={() => setShowDropdown((prev) => !prev)}>
          <MenuButtonIcon />
        </MenuButton>
      </Navigation>
      <Dropdown showDropdown={showDropdown}>
        <NavigationList />
      </Dropdown>
    </Header>
  );
};

const Header = styled.header`
  height: 70px;
  width: 100%;
  background-color: white;
  display: flex;
  align-items: center;
  padding: 0 20px;
  -webkit-box-shadow: 0px 8px 5px 0px rgba(0, 0, 0, 0.05);
  -moz-box-shadow: 0px 8px 5px 0px rgba(0, 0, 0, 0.05);
  box-shadow: 0px 8px 5px 0px rgba(0, 0, 0, 0.05);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  @media ${device.tablet} {
    height: 60px;
  }
  @media ${device.mobileM} {
    height: 60px;
  }
`;

const Navigation = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex: 1;
`;

const BrandContainer = styled.div``;

const Brand = styled(Link)`
  color: #1b2839;
  text-decoration: none;
  font-size: 24px;
  font-weight: 700;
  text-transform: uppercase;
  &:hover {
    color: teal;
  }
  @media ${device.tablet} {
    font-size: 22px;
  }
  @media ${device.mobileM} {
    font-size: 22px;
  }
`;

const SearchContainer = styled.div`
  width: 400px;
  position: relative;
  @media ${device.tablet} {
    display: none;
  }
  @media ${device.mobileM} {
    display: none;
  }
`;

const SearchInput = styled.input`
  width: 100%;
  height: 40px;
  padding: 10px;
  border: none;
  outline: 1px solid grey;
  &:focus {
    outline: 1px solid teal;
  }
`;

const SearchButton = styled.button`
  background-color: transparent;
  border: none;
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
`;

const NavigationListContainer = styled.div`
  @media ${device.tablet} {
    display: none;
  }
  @media ${device.mobileM} {
    display: none;
  }
`;

// const NavigationList = styled.ul`
//   display: flex;
//   align-items: center;
//   justify-content: flex-end;
//   list-style: none;
//   flex-basis: 33%;
//   @media ${device.tablet} {
//     display: none;
//   }
//   @media ${device.mobileM} {
//     display: none;
//   }
// `;

const NavigationItem = styled.li`
  margin-right: 20px;
  transition: all 5s;
`;

const NavigationLink = styled(Link)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #1b2839;
  cursor: pointer;
  text-transform: uppercase;
  text-decoration: none;
  font-size: 14px;
  &:hover {
    color: teal;
  }
  &:hover svg {
    stroke: teal;
  }
  &:hover > span {
    color: teal;
  }
  // button styles
  background: none;
  border: none;
`;

const LinkDescription = styled.span`
  text-transform: capitalize;
  font-weight: 700;
  color: rgb(27, 40, 57);
  display: inline-block;
  margin-top: 3px;
`;

const IconContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CartBadge = styled.span`
  display: inline-flex;
  background-color: teal;
  color: white;
  font-size: 12px;
  height: 20px;
  width: 20px;
  border-radius: 50%;
  align-items: center;
  justify-content: center;
  font-weight: 500;
  position: absolute;
  bottom: 0;
  left: 22px;
`;

const MenuButton = styled.button`
  display: none;
  @media ${device.tablet} {
    background: transparent;
    border: none;
    cursor: pointer;
    display: block;
  }
`;

const MenuButtonIcon = styled(Menu)`
  stroke: #1b2839;
`;

export default Navbar;
