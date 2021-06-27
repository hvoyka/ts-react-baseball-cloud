import React, { FC, ReactNode } from "react";
import styled from "styled-components";

const ContentWrapper: FC<{ children: ReactNode; maxWidth?: number }> = ({
  children,
  maxWidth = 450,
}) => {
  return (
    <Root>
      <Wrapper maxWidth={maxWidth}>{children}</Wrapper>
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

const Wrapper = styled.div<{ maxWidth: number }>`
  display: flex;
  flex-direction: column;

  width: 100%;
  max-width: ${({ maxWidth }) => `${maxWidth}px`};
  padding: 16px;

  border-radius: 8px;
  background: hsla(0, 0%, 100%, 0.8);
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(5px);
`;

export default ContentWrapper;