import React, { FC } from "react";
import { Form, Field } from "react-final-form";
import {
  combine,
  required,
  email as emailValidator,
} from "redux-form-validators";
import styled from "styled-components";

import { forgotPasswordRequest } from "services/api";
import { UserIcon, TextInput, Button } from "ui";

interface ForgotFormValues {
  email: string;
}

const ForgotForm: FC = () => {
  const onSubmit = ({ email }: ForgotFormValues) => {
    const redirect_url =
      "https://baseballcloud-front.herokuapp.com/resetpassword";
    forgotPasswordRequest({ email, redirect_url })
      .then((data) => {})
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
              validate={combine(required(), emailValidator())}
              render={(props) => {
                return <TextInput placeholder="Email" {...props} />;
              }}
            />
            <IconWrapper>
              <UserIcon />
            </IconWrapper>
          </InputWrapper>

          <div className="buttons">
            <Button>Submit</Button>
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

export default ForgotForm;
