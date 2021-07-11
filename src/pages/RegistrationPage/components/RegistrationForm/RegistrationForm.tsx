import React, { FC } from "react";
import styled, { css } from "styled-components";
import { Form, Field } from "react-final-form";
import {
  combine,
  confirmation,
  required,
  email as emailValidator,
  length as lengthValidator,
} from "redux-form-validators";

import { UserIcon, LockIcon, CheckIcon, Button, TextInput } from "ui";
import { FetchStatus } from "types";

const errors = {
  idle: "",
  rejected: "Error, try again",
  fulfilled: "You are registered!",
  pending: "Loading...",
};

export interface RegistrationFormValues {
  email: string;
  password: string;
  password_confirmation: string;
}

interface RegistrationFormProps {
  registrationStatus: FetchStatus;
  onSubmit: ({
    email,
    password,
    password_confirmation,
  }: RegistrationFormValues) => void;
}

const RegistrationForm: FC<RegistrationFormProps> = ({
  onSubmit,
  registrationStatus,
}) => {
  return (
    <>
      <Form
        onSubmit={onSubmit}
        render={({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <InputWrapper>
              <Field<string>
                name="email"
                validate={combine(required(), emailValidator())}
                render={(props) => {
                  return <TextInput placeholder="Email" {...props} />;
                }}
              />

              <StyledUserIcon />
            </InputWrapper>

            <InputWrapper>
              <Field<string>
                name="password"
                validate={combine(required(), lengthValidator({ minimum: 6 }))}
                render={(props) => {
                  return <TextInput placeholder="Password" {...props} />;
                }}
              />

              <StyledLockIcon />
            </InputWrapper>

            <InputWrapper>
              <Field<string>
                name="password_confirmation"
                validate={combine(
                  required(),
                  confirmation({ field: "password", fieldLabel: "password" })
                )}
                render={(props) => {
                  return (
                    <TextInput placeholder="Confirm password" {...props} />
                  );
                }}
              />

              <StyledCheckIcon />
            </InputWrapper>

            <Button>Sign Up</Button>
          </form>
        )}
      />
      <p>{errors[registrationStatus]}</p>
    </>
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

const StyledCheckIcon = styled(CheckIcon)`
  ${StyledIcon}
`;
const StyledUserIcon = styled(UserIcon)`
  ${StyledIcon}
`;
const StyledLockIcon = styled(LockIcon)`
  ${StyledIcon}
`;

export default RegistrationForm;
