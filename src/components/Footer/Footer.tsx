import React from "react";
import styled from "styled-components";

const Footer: React.FC = () => {
  return (
    <Root>
      <div>
        <span>© 2018 BaseballCloud</span>
        <a href="/">Terms of Service</a>
        <a href="/">Privacy Policy</a>
      </div>
      <div>
        <a href="/">Blog</a>
        <a href="/">Twitter</a>
        <a href="/">Instagram</a>
        <a href="/">Facebook</a>
      </div>
    </Root>
  );
};

const Root = styled.header`
  background: var(--white);
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  font-size: 14px;
  line-height: 20px;
  padding: 16px;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  span {
    padding-right: 10px;
  }
  a {
    padding-right: 8px;
  }
`;

export default Footer;
