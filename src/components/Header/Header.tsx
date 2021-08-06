import React, { FC } from "react";
import { NavLink, Link, useHistory } from "react-router-dom";
import StorageService from "services/StorageService";
import styled, { css } from "styled-components";
import { LogoIcon } from "ui";
import { ROUTES } from "utils/routes";

const Header: FC = () => {
  const history = useHistory();
  return (
    <Root>
      <Link to="/">
        <LogoIcon />
      </Link>
      {StorageService.hasAuthToken() && (
        <Nav>
          <StyledLink to={ROUTES.LEADERBOARD} activeClassName="selected">
            Leaderboard
          </StyledLink>
          <StyledLink to={ROUTES.NETWORK} activeClassName="selected">
            Network
          </StyledLink>
          <StyledLink to={ROUTES.PROFILE} activeClassName="selected">
            Profile
          </StyledLink>
          <StyledButton
            onClick={() => {
              StorageService.removeUserData();
              history.push("/");
            }}
          >
            Logout
          </StyledButton>
        </Nav>
      )}
    </Root>
  );
};

const Root = styled.header`
  background: var(--white);
  color: var(--gray2);
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  padding: 8px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
`;

const Nav = styled.nav`
  display: flex;
`;

const navStyles = css`
  padding: 0 8px;
  color: var(--gray2);
  text-decoration: none;
  position: relative;
  display: flex;
  align-items: flex-start;
  align-items: center;
  &:after {
    content: "";
    display: block;
    left: 0;
    right: 0;
    position: absolute;
    bottom: -10px;
    border-bottom: 4px solid transparent;
  }
  &:hover {
    text-decoration: none;
    &:after {
      border-color: rgba(120, 139, 153, 0.4);
    }
  }
`;

const StyledLink = styled(NavLink)`
  ${navStyles}
  &.selected {
    &:after {
      border-color: var(--gray2);
    }
  }
`;
const StyledButton = styled.button`
  ${navStyles}
`;
export default Header;
