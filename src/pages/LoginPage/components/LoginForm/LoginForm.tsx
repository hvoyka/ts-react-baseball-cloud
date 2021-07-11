import React, { FC } from "react";
import { Form, Field } from "react-final-form";
import styled, { css } from "styled-components";

import { UserIcon, LockIcon, TextInput, Button } from "ui";
import { required } from "redux-form-validators";

export interface LoginFormValues {
  email: string;
  password: string;
}

interface LoginFormProps {
  onSubmit: ({ email, password }: LoginFormValues) => void;
}

const LoginForm: FC<LoginFormProps> = ({ onSubmit }) => {
  return (
    <Form
      onSubmit={onSubmit}
      render={({ handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <InputWrapper>
            <Field<string>
              name="email"
              validate={required()}
              render={(props) => {
                return <TextInput placeholder="Email" {...props} />;
              }}
            />

            <StyledUserIcon />
          </InputWrapper>

          <InputWrapper>
            <Field<string>
              name="password"
              validate={required()}
              render={(props) => {
                return <TextInput placeholder="Password" {...props} />;
              }}
            />

            <StyledLockIcon />
          </InputWrapper>

          <Button>Sign In</Button>
        </form>
      )}
    />
  );
};

const InputWrapper = styled.div`
  margin-bottom: 15px;
  position: relative;
`;

const StyledIcon = css`
  position: absolute;
  left: 15px;
  top: 14px;
`;

const StyledLockIcon = styled(LockIcon)`
  ${StyledIcon}
`;

const StyledUserIcon = styled(UserIcon)`
  ${StyledIcon}
`;

export default LoginForm;
