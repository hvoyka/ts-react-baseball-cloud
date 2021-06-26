import React from "react";
import { FieldRenderProps } from "react-final-form";
import styled from "styled-components";

type Props = FieldRenderProps<string, any>;

const TextInput: React.FC<Props> = ({ input, meta, ...rest }: Props) => (
  <StyledInput type="text" {...input} {...rest} />
);

const StyledInput = styled.input`
  display: block;
  width: 100%;
  height: 50px;
  border-radius: 4px;
  background-color: #eff1f3;
  padding: 7px 12px 10px 37px;
  font-size: 16px;
  line-height: 1.13;
  font-weight: 400;
  color: #667784;
  border: 1px solid transparent;

  &::placeholder {
    opacity: 1;
    font-weight: 400;
    color: #667784;
    font-size: 16px;
    transition: all 0.4s ease;
  }

  &:focus,
  &:active {
    outline: none;
    background-color: #fff;
    border: solid 1px #48bbff;

    &::placeholder {
      opacity: 0;

      transition: all 0.3s ease;
    }
  }
`;

export default TextInput;
