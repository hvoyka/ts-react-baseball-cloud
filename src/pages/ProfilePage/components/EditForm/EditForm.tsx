import React, { useMemo } from "react";
import styled from "styled-components";
import { Form, Field } from "react-final-form";
import { required } from "redux-form-validators";

import { FormSelect } from "../FormSelect";
import { Button, TextInput } from "ui";

import { FormApi } from "final-form";
import { useMutation, useQuery } from "@apollo/client";
import { GET_FORM_OPTIONS, UPDATE_PROFILE } from "apollo/queries";
import {
  POSITIONS_OPTIONS,
  SCHOOL_YEAR_OPTIONS,
  THROW_AND_BATS_OPTIONS,
} from "utils/constants";

export interface ProfileFormValues {
  first_name?: string;
}

interface EditFormProps {
  onEditFormSubmit: (values: ProfileFormValues) => void;
}

const EditForm: React.FC<EditFormProps> = ({ onEditFormSubmit }) => {
  const [updateProfile, { data }] = useMutation(UPDATE_PROFILE);
  const {
    data: optionsData = {
      facilities: { facilities: [] },
      schools: { schools: [] },
      teams: { teams: [] },
    },
  } = useQuery(GET_FORM_OPTIONS, {
    variables: { search: "" },
  });

  const facilitiesArr = optionsData?.facilities?.facilities;
  const schoolsArr = optionsData?.schools?.schools;
  const teamsArr = optionsData?.teams?.teams;

  const schoolOptions = useMemo(
    () =>
      schoolsArr.map((item: { id: number; name: string }) => {
        return {
          label: item.name,
          value: item.name,
          id: item.id,
        };
      }),
    [schoolsArr]
  );

  const facilitiesOptions = useMemo(
    () =>
      facilitiesArr.map((item: { id: number; u_name: string }) => {
        return {
          label: item.u_name,
          value: item.id,
        };
      }),
    [facilitiesArr]
  );

  const teamsOptions = useMemo(
    () =>
      teamsArr.map((item: { id: number; name: string }) => {
        return {
          label: item.name,
          value: item.name,
          id: item.id,
        };
      }),
    [teamsArr]
  );

  const onSubmit = (values: ProfileFormValues, form: FormApi) => {
    onEditFormSubmit(values);
    console.log(values);
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

          <Field
            name="school"
            placeholder="School"
            component={FormSelect}
            options={schoolOptions}
          />

          <Field
            name="school_year"
            placeholder="School Year"
            component={FormSelect}
            options={SCHOOL_YEAR_OPTIONS}
          />

          <Field
            name="teams"
            placeholder="Team"
            isMulti
            component={FormSelect}
            options={teamsOptions}
          />

          <Divider>
            <DividerText>Facility</DividerText>
          </Divider>

          <Field
            name="facilities"
            placeholder="Facility"
            isMulti
            component={FormSelect}
            options={facilitiesOptions}
          />

          <Divider>
            <DividerText>About</DividerText>
          </Divider>

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
