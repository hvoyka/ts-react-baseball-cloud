import React from "react";
import { FieldRenderProps } from "react-final-form";
import styled from "styled-components";

type LabelFormInputProps = FieldRenderProps<string, any>;

const LabelFormInput: React.FC<LabelFormInputProps> = ({
  label,
  input,

  meta,
  ...rest
}) => {
  return (
    <Root>
      <StyledInput {...input} {...rest} />
      <Label>{label}</Label>
      {meta && meta.touched && meta.error && (
        <ErrorText>{meta.error}</ErrorText>
      )}
    </Root>
  );
};

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

const StyledInput = styled.input`
  height: 40px;
  padding: 0 16px;
  transition: all 0.2s;
  touch-action: manipulation;
  display: block;
  width: 100%;

  border-radius: 4px;
  background-color: var(--gray5);

  font-size: 16px;
  line-height: 1.13;
  font-weight: 400;
  color: var(--gray4);
  border: 1px solid transparent;

  &:focus,
  &:active {
    outline: none;
    background-color: var(--white);
    border: solid 1px var(--blue1);

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
`;

const ErrorText = styled.p`
  color: var(--red1);
  position: absolute;
  bottom: 0;
  left: 0;
`;

export default LabelFormInput;
