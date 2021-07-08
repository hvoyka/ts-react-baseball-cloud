import React, { FC } from "react";
import styled from "styled-components";

interface ContentWrapperProps {
  className?: string;
}

const ContentWrapper: FC<ContentWrapperProps> = ({ children, className }) => {
  return (
    <Root className={className}>
      <Wrapper>{children}</Wrapper>
    </Root>
  );
};

const Root = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
  overflow: auto;
  padding: 16px;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 450px;
  width: 100%;
  padding: 16px;

  border-radius: 8px;
  background: hsla(0, 0%, 100%, 0.8);
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(5px);
`;

export default ContentWrapper;
