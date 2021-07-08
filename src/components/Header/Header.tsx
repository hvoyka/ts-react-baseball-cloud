import React, { FC } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { LogoIcon } from "ui";

const Header: FC = () => {
  return (
    <Root>
      <Link to="/">
        <LogoIcon />
      </Link>
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

export default Header;
