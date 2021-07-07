import React, { FC } from "react";
import { Form, Field } from "react-final-form";
import {
  combine,
  required,
  email as emailValidator,
} from "redux-form-validators";
import styled from "styled-components";

import { UserIcon, TextInput, Button } from "ui";

export interface ForgotFormValues {
  email: string;
}

interface ForgotFormProps {
  onSubmit: (values: ForgotFormValues) => void;
}

const ForgotForm: FC<ForgotFormProps> = ({ onSubmit }) => {
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
            <StyledUserIcon />
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

const StyledUserIcon = styled(UserIcon)`
  position: absolute;
  left: 15px;
  top: 14px;
`;

export default ForgotForm;
