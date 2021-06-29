import React, { FC, useContext } from "react";
import { Form, Field } from "react-final-form";
import styled from "styled-components";

import { UserIcon, LockIcon, TextInput, Button } from "ui";
import { required } from "redux-form-validators";
import { signInRequest } from "services/api";
import StorageService from "services/StorageService";
import TokenContext from "context/tokenContext";

interface LoginFormValues {
  email: string;
  password: string;
}

const LoginForm: FC = () => {
  const context = useContext(TokenContext);

  const onSubmit = ({ email, password }: LoginFormValues) => {
    signInRequest({ email, password })
      .then((data) => {
        const token = data.headers["access-token"];
        const client = data.headers.client;
        const uid = data.headers.uid;
        StorageService.setStorageData({ token, client, uid });
        context.setToken(token);
      })
      .catch((error) => {
        console.error(error);
      });
  };

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
            <IconWrapper>
              <UserIcon />
            </IconWrapper>
          </InputWrapper>

          <InputWrapper>
            <Field<string>
              name="password"
              validate={required()}
              render={(props) => {
                return <TextInput placeholder="Password" {...props} />;
              }}
            />
            <IconWrapper>
              <LockIcon />
            </IconWrapper>
          </InputWrapper>

          <div className="buttons">
            <Button>Sign In</Button>
          </div>
        </form>
      )}
    />
  );
};

const InputWrapper = styled.div`
  margin-bottom: 15px;
  position: relative;
`;

const IconWrapper = styled.div`
  position: absolute;
  left: 15px;
  top: 14px;
`;

export default LoginForm;
