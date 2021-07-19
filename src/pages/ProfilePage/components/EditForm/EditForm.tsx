import React from "react";
import styled from "styled-components";
import { Form, Field } from "react-final-form";
import { required } from "redux-form-validators";

import { FormSelect } from "../FormSelect";
import { Button, TextInput } from "ui";

import { FormApi } from "final-form";
import { useQuery } from "@apollo/client";
import { GET_FACILITIES, GET_SCHOOLS, GET_TEAMS } from "apollo/queries";
import { POSITIONS_OPTIONS, THROW_AND_BATS_OPTIONS } from "utils/constants";

export interface ProfileFormValues {
  first_name?: string;
}

interface EditFormProps {
  onEditFormSubmit: (values: ProfileFormValues) => void;
}

const EditForm: React.FC<EditFormProps> = ({ onEditFormSubmit }) => {
  let schoolOptions: [] = [];

  const {
    loading: isSchoolsLoading,
    data: schoolsData,
    error: schoolsError,
  } = useQuery(GET_SCHOOLS, {
    variables: { search: "" },
  });

  const {
    loading: isTeamsLoading,
    data: teamsData,
    error: teamsError,
  } = useQuery(GET_TEAMS, {
    variables: { search: "" },
  });

  const {
    loading: isFacilitiesLoading,
    data: facilitiesData,
    error: facilitiesError,
  } = useQuery(GET_FACILITIES, {
    variables: { search: "" },
  });

  if (!isSchoolsLoading) {
    const schoolsArr = schoolsData?.schools?.schools;
    schoolOptions = schoolsArr.map((item: { id: number; name: string }) => {
      return {
        label: item.name,
        value: item.name,
      };
    });
  }

  const onSubmit = (values: ProfileFormValues, form: FormApi) => {
    onEditFormSubmit(values);
    form.restart();
  };

  return (
    <Form
      onSubmit={onSubmit}
      render={({ handleSubmit, form }) => (
        <form onSubmit={handleSubmit}>
          <FormRow>
            <Field<string>
              name="first_name"
              validate={required()}
              render={(props) => {
                return (
                  <TextInput label="First Name *" placeholder=" " {...props} />
                );
              }}
            />
            <Field<string>
              name="last_name"
              validate={required()}
              render={(props) => {
                return (
                  <TextInput label="Last Name *" placeholder=" " {...props} />
                );
              }}
            />
          </FormRow>

          <Field
            name="position"
            placeholder="Position in Game *"
            validate={required()}
            component={FormSelect}
            options={POSITIONS_OPTIONS}
          />
          <Field
            name="position2"
            placeholder="Secondary Position in Game"
            component={FormSelect}
            options={POSITIONS_OPTIONS}
          />

          <Divider>
            <DividerText>Personal Info</DividerText>
          </Divider>

          <FormRow>
            <Field<string>
              name="age"
              validate={required()}
              render={(props) => {
                return <TextInput label="Age *" placeholder=" " {...props} />;
              }}
            />
            <Field<string>
              name="weight"
              validate={required()}
              render={(props) => {
                return (
                  <TextInput label="Weight *" placeholder=" " {...props} />
                );
              }}
            />
          </FormRow>

          <FormRow>
            <Field<string>
              name="feet"
              validate={required()}
              render={(props) => {
                return <TextInput label="Feet *" placeholder=" " {...props} />;
              }}
            />
            <Field<string>
              name="inches"
              render={(props) => {
                return <TextInput label="Inches" placeholder=" " {...props} />;
              }}
            />
          </FormRow>

          <FormRow>
            <Field
              name="throws_hand"
              placeholder="Throws *"
              validate={required()}
              component={FormSelect}
              options={THROW_AND_BATS_OPTIONS}
            />
            <Field
              name="bats_hand"
              placeholder="Bats *"
              validate={required()}
              component={FormSelect}
              options={THROW_AND_BATS_OPTIONS}
            />
          </FormRow>

          <Divider>
            <DividerText>School</DividerText>
          </Divider>

          <FormRow>
            <Field
              name="school"
              placeholder="School"
              validate={required()}
              component={FormSelect}
              options={schoolOptions}
            />
          </FormRow>

          <FormRow>
            <StyledButton
              variant="secondary"
              type="button"
              onClick={() => form.reset()}
            >
              Reset
            </StyledButton>
            <StyledButton>Submit</StyledButton>
          </FormRow>
        </form>
      )}
    />
  );
};

const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
  margin-bottom: 15px;
`;

const Divider = styled.div`
  display: flex;
  position: relative;
  margin-bottom: 15px;
  &::before {
    content: "";
    position: absolute;
    top: 11px;
    left: 0;
    right: 0;
    height: 1px;
    background-color: var(--gray6);
    z-index: 0;
  }
`;

const DividerText = styled.div`
  line-height: 1.25;
  text-align: center;
  font-size: 18px;
  font-weight: 900;
  color: var(--gray7);
  text-align: left;
  display: inline-block;
  position: relative;
  background-color: var(--white);
  padding-right: 12px;
`;

const StyledButton = styled(Button)`
  padding: 9px 18px;
`;

export default EditForm;
