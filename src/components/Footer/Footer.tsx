import React from "react";
import styled from "styled-components";

const Footer: React.FC = () => {
  return (
    <Root>
      <div>
        <Text>© 2018 BaseballCloud</Text>
        <Link href="/">Terms of Service</Link>
        <Link href="/">Privacy Policy</Link>
      </div>
      <div>
        <Link href="/">Blog</Link>
        <Link href="/">Twitter</Link>
        <Link href="/">Instagram</Link>
        <Link href="/">Facebook</Link>
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
`;

const Text = styled.span`
  padding-right: 10px;
`;

const Link = styled.a`
  padding-right: 10px;
`;

export default Footer;
