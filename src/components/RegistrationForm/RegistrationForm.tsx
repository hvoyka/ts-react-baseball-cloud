import React, { FC, useState } from "react";
import styled from "styled-components";
import { Form, Field } from "react-final-form";
import {
  combine,
  confirmation,
  required,
  email as emailValidator,
  length as lengthValidator,
} from "redux-form-validators";

import { UserIcon, LockIcon, CheckIcon, Button, TextInput } from "ui";
import { signUpRequest } from "services/api";
import { FetchStatus } from "types";
import { ROLES } from "utils/roles";

interface RegistrationFormValues {
  email: string;
  password: string;
  password_confirmation: string;
}

interface RegistrationFormProps {
  role: ROLES;
}

const RegistrationForm: FC<RegistrationFormProps> = ({ role }) => {
  const [registrationStatus, setRegistrationStatus] =
    useState<FetchStatus>("idle");

  const onSubmit = ({
    email,
    password,
    password_confirmation,
  }: RegistrationFormValues) => {
    setRegistrationStatus("pending");
    signUpRequest({ email, password, password_confirmation, role })
      .then((data) => {
        setRegistrationStatus("fulfilled");
      })
      .catch((error) => {
        console.error(error);
        setRegistrationStatus("rejected");
      });
  };

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
              <IconWrapper>
                <UserIcon />
              </IconWrapper>
            </InputWrapper>

            <InputWrapper>
              <Field<string>
                name="password"
                validate={combine(required(), lengthValidator({ minimum: 6 }))}
                render={(props) => {
                  return <TextInput placeholder="Password" {...props} />;
                }}
              />
              <IconWrapper>
                <LockIcon />
              </IconWrapper>
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
              <IconWrapper>
                <CheckIcon />
              </IconWrapper>
            </InputWrapper>

            <div className="buttons">
              <Button>Sign Up</Button>
            </div>
          </form>
        )}
      />
      <RegistrationStatus>
        {registrationStatus === "rejected" && <p>Error, try again</p>}
        {registrationStatus === "fulfilled" && <p>You are registered!</p>}
        {registrationStatus === "pending" && <p>Loading...</p>}
      </RegistrationStatus>
    </>
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

const RegistrationStatus = styled.div`
  margin-bottom: 15px;
`;

export default RegistrationForm;
