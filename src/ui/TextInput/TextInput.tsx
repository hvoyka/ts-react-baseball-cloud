import React from "react";
import { FieldRenderProps } from "react-final-form";
import styled, { css } from "styled-components";

type TextInputProps = FieldRenderProps<string, any>;

const TextInput: React.FC<TextInputProps> = ({
  label,
  input,
  meta,
  ...rest
}) => (
  <Root>
    <StyledInput $hasLabel={!!label} {...input} {...rest} />
    {label && <Label>{label}</Label>}
    {meta && meta.touched && meta.error && <ErrorText>{meta.error}</ErrorText>}
  </Root>
);

const Root = styled.div`
  position: relative;
`;

const Label = styled.label`
  position: absolute;
  top: 2px;
  left: 0;
  cursor: text;
  max-width: 70%;
  white-space: nowrap;
  text-overflow: ellipsis;
  transform-origin: left bottom;

  transform: translate(17px, 10px) scale(1.15);
  visibility: hidden;

  transition: 0.2s;
  touch-action: manipulation;
  pointer-events: none;

  font-size: 14px;
  line-height: 14px;
  font-weight: 400;
  color: var(--gray2);
`;

const StyledInput = styled.input<{ $hasLabel: boolean }>`
  display: block;
  width: 100%;
  height: 50px;
  border-radius: 4px;
  background-color: var(--gray5);
  padding: 7px 12px 10px 37px;

  font-size: 16px;
  line-height: 1.13;
  font-weight: 400;
  color: var(--gray4);
  border: 1px solid transparent;

  &::placeholder {
    opacity: 1;
    font-weight: 400;
    color: var(--gray4);
    font-size: 16px;
    transition: all 0.4s ease;
  }

  &:focus,
  &:active {
    outline: none;
    background-color: var(--white);
    border: solid 1px var(--blue1);

    &::placeholder {
      opacity: 0;

      transition: all 0.3s ease;
    }
    + ${Label} {
      transform: translate(6px, 0px) scale(0.8);
      cursor: pointer;
      visibility: visible;
      background: transparent;
      border-radius: 4px;
    }
  }
  &:placeholder-shown {
    + ${Label} {
      visibility: visible;
    }
  }

  ${({ $hasLabel }) =>
    $hasLabel &&
    css`
      height: 40px;
      padding: 0 16px;
      transition: all 0.2s;
      touch-action: manipulation;
    `}
`;

const ErrorText = styled.p`
  position: absolute;
  bottom: -17px;
  left: 15px;
  color: var(--red1);
`;

export default TextInput;
