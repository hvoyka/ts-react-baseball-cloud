import React from "react";
import { FieldRenderProps } from "react-final-form";
import styled from "styled-components";

type TextInputProps = FieldRenderProps<string, any>;

const TextInput: React.FC<TextInputProps> = ({ input, meta, ...rest }) => (
  <Root>
    <StyledInput {...input} {...rest} />
    {meta && meta.touched && meta.error && <ErrorText>{meta.error}</ErrorText>}
  </Root>
);

const Root = styled.div`
  position: relative;
`;

const StyledInput = styled.input`
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
  }
`;

const ErrorText = styled.p`
  position: absolute;
  bottom: -17px;
  left: 15px;
  color: var(--red1);
`;

export default TextInput;
