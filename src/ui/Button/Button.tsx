import React from "react";
import styled, { css, CSSProp } from "styled-components";

interface ButtonProps {
  type?: "button" | "submit";
  variant?: Variant;
  rootCSS?: CSSProp;
  onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
}

type Variant = "primary" | "secondary";

const variantButtonOptions = {
  primary: `
  background-color:var(--blue1);
  border-color:var(--blue1);
  color: var(--white);
  &:hover{
    background-color: var(--blue2);
  }
  `,
  secondary: `
  background-color:var(--white);
  border-color:var(--blue1);
  color: var(--blue1);
  &:hover{
    background-color: var(--blue1);
    color: var(--white);
  }
  `,
};

const Button: React.FC<ButtonProps> = ({
  type = "button",
  variant = "primary",
  rootCSS,
  children,
  ...rest
}) => (
  <StyledButton variant={variant} $CSS={rootCSS} {...rest}>
    {children}
  </StyledButton>
);

export default Button;

const StyledButton = styled.button<{ variant?: Variant; $CSS?: CSSProp }>`
  display: block;
  width: 100%;
  border-radius: 4px;
  font-size: 16px;
  line-height: 19px;
  color: var(--white);
  font-weight: 400;
  border: solid 1px transparent;
  box-shadow: 0 0 4px 0 rgba(72, 187, 255, 0);
  background-color: var(--blue1);
  padding: 15px 19px 14px 18px;
  &:hover {
    background-color: var(--blue2);
  }
  ${({ variant = "primary" }) =>
    css`
      ${variantButtonOptions[variant]}
    `}
  ${({ $CSS }) => $CSS};
`;
