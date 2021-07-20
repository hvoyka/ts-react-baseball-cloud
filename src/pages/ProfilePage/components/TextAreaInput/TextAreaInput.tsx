import React from "react";
import { FieldRenderProps } from "react-final-form";
import styled from "styled-components";

type Props = FieldRenderProps<string, any>;

const TextAreaInput: React.FC<Props> = ({
  input,
  meta,
  label,
  placeholder = " ",
  ...rest
}: Props) => (
  <Root>
    <StyledTextArea
      $hasLabel={!!label}
      placeholder={placeholder}
      {...input}
      {...rest}
    />
    {label && <Label>{label}</Label>}
    {meta && meta.touched && meta.error && <ErrorText>{meta.error}</ErrorText>}
  </Root>
);

const Root = styled.div`
  position: relative;
  padding-bottom: 15px;
`;

const Label = styled.label`
  position: absolute;
  top: 2px;
  left: 0;
  cursor: text;
  max-width: 70%;

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

const StyledTextArea = styled.textarea<{ $hasLabel: boolean }>`
  display: block;
  width: 100%;
  min-height: 110px;
  resize: none;
  border-radius: 4px;
  background-color: var(--gray5);
  padding: 16px;
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
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
  &:placeholder-shown {
    + ${Label} {
      visibility: visible;
    }
  }
`;

const ErrorText = styled.p`
  position: absolute;
  bottom: -17px;
  left: 15px;
  color: var(--red1);
`;

export default TextAreaInput;
