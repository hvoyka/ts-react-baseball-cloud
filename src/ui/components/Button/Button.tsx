import React, { ReactNode } from "react";
import styled from "styled-components";

const Button: React.FC<{ children: ReactNode }> = ({ children }) => (
  <StyledButton>{children}</StyledButton>
);

export default Button;

const StyledButton = styled.button`
  display: block;

  border-radius: 4px;

  font-size: 16px;
  line-height: 19px;
  color: #ffffff;
  font-weight: 400;
  border: solid 1px transparent;
  box-shadow: 0 0 4px 0 rgba(72, 187, 255, 0);
  background-color: #48bbff;

  width: 100%;
  padding: 15px 19px 14px 18px;
  margin-bottom: 15px;
  cursor: pointer;
  &:hover {
    background-color: #2eb0fc;
  }
`;
