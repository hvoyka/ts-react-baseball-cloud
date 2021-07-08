import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Footer: React.FC = () => {
  return (
    <Root>
      <div>
        <Text>© 2018 BaseballCloud</Text>
        <StyledLink to="/">Terms of Service</StyledLink>
        <StyledLink to="/">Privacy Policy</StyledLink>
      </div>
      <div>
        <StyledLink to="/">Blog</StyledLink>
        <StyledLink to="/">Twitter</StyledLink>
        <StyledLink to="/">Instagram</StyledLink>
        <StyledLink to="/">Facebook</StyledLink>
      </div>
    </Root>
  );
};

const Root = styled.footer`
  background: var(--white);
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  font-size: 14px;
  line-height: 20px;
  padding: 16px;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
`;

const Text = styled.span`
  padding-right: 10px;
`;

const StyledLink = styled(Link)`
  padding-right: 10px;
`;

export default Footer;
