import React from "react";
import styled from "styled-components";
import { Form, Field } from "react-final-form";
import { required, email as emailValidator } from "redux-form-validators";

import { LabelFormInput } from "../LabelFormInput";
import { Button } from "ui";
import { ProfileFormValues } from "types";

interface EditFormProps {
  onEditFormSubmit: (values: ProfileFormValues) => void;
}

const EditForm: React.FC<EditFormProps> = ({ onEditFormSubmit }) => {
  const onSubmit = (values: ProfileFormValues, form: any) => {
    onEditFormSubmit(values);
    form.restart();
  };

  return (
    <Form
      onSubmit={onSubmit}
      render={({ handleSubmit, form }) => (
        <form onSubmit={handleSubmit}>
          <Field<string>
            name="first_name"
            validate={required()}
            render={(props) => {
              return (
                <LabelFormInput
                  label="First Name *"
                  placeholder=" "
                  {...props}
                />
              );
            }}
          />

          <ButtonsWrapper>
            <Button
              variant="secondary"
              rootCSS={{ width: "48%" }}
              type="button"
              onClick={() => form.reset()}
            >
              Reset
            </Button>
            <Button rootCSS={{ width: "48%" }}>Submit</Button>
          </ButtonsWrapper>
        </form>
      )}
    />
  );
};

const ButtonsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;
export default EditForm;
