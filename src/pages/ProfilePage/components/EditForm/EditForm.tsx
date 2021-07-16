import React, { useState } from "react";
import styled from "styled-components";
import { Form, Field } from "react-final-form";
import { required } from "redux-form-validators";

import { LabelFormInput } from "../LabelFormInput";
import { FormSelect } from "../FormSelect";
import { Button } from "ui";
import { ProfileFormValues } from "types";

import { FormApi } from "final-form";
import { useQuery } from "@apollo/client";
import { GET_FACILITIES, GET_SCHOOLS, GET_TEAMS } from "apollo/queries";

const schoolYearOptions = [
  { label: "Freshman", value: "freshman" },
  { label: "Sophomore", value: "sophomore" },
  { label: "Junior", value: "junior" },
  { label: "Senior", value: "senior" },
  { label: "None", value: "none" },
];

const positionOptions = [
  { label: "Catcher", value: "catcher" },
  { label: "First Base", value: "first_base" },
  { label: "Second Base", value: "second_base" },
  { label: "Shortstop", value: "shortstop" },
  { label: "Third Base", value: "third_base" },
  { label: "Outfield", value: "outfield" },
  { label: "Pitcher", value: "pitcher" },
];

const throwsAndBatsOptions = [
  { label: "R", value: "r" },
  { label: "L", value: "l" },
];

interface EditFormProps {
  onEditFormSubmit: (values: ProfileFormValues) => void;
}

const EditForm: React.FC<EditFormProps> = ({ onEditFormSubmit }) => {
  let schoolOptions: [] = [];

  const {
    loading: isSchoolsLoading,
    data: SchoolsData,
    error: SchoolsError,
  } = useQuery(GET_SCHOOLS, {
    variables: { search: "" },
  });

  const {
    loading: isTeamsLoading,
    data: TeamsData,
    error: TeamsError,
  } = useQuery(GET_TEAMS, {
    variables: { search: "" },
  });

  const {
    loading: isFacilitiesLoading,
    data: FacilitiesData,
    error: FacilitiesError,
  } = useQuery(GET_FACILITIES, {
    variables: { search: "" },
  });

  if (!isSchoolsLoading) {
    const schoolsArr = SchoolsData?.schools?.schools;
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
                  <LabelFormInput
                    label="First Name *"
                    placeholder=" "
                    {...props}
                  />
                );
              }}
            />
            <Field<string>
              name="last_name"
              validate={required()}
              render={(props) => {
                return (
                  <LabelFormInput
                    label="Last Name *"
                    placeholder=" "
                    {...props}
                  />
                );
              }}
            />
          </FormRow>

          <Field
            name="position"
            placeholder="Position in Game *"
            validate={required()}
            component={FormSelect}
            options={positionOptions}
          />
          <Field
            name="position2"
            placeholder="Secondary Position in Game"
            component={FormSelect}
            options={positionOptions}
          />

          <Divider>
            <DividerText>Personal Info</DividerText>
          </Divider>

          <FormRow>
            <Field<string>
              name="age"
              validate={required()}
              render={(props) => {
                return (
                  <LabelFormInput label="Age *" placeholder=" " {...props} />
                );
              }}
            />
            <Field<string>
              name="weight"
              validate={required()}
              render={(props) => {
                return (
                  <LabelFormInput label="Weight *" placeholder=" " {...props} />
                );
              }}
            />
          </FormRow>

          <FormRow>
            <Field<string>
              name="feet"
              validate={required()}
              render={(props) => {
                return (
                  <LabelFormInput label="Feet *" placeholder=" " {...props} />
                );
              }}
            />
            <Field<string>
              name="inches"
              render={(props) => {
                return (
                  <LabelFormInput label="Inches" placeholder=" " {...props} />
                );
              }}
            />
          </FormRow>

          <FormRow>
            <Field
              name="throws_hand"
              placeholder="Throws *"
              validate={required()}
              component={FormSelect}
              options={throwsAndBatsOptions}
            />
            <Field
              name="bats_hand"
              placeholder="Bats *"
              validate={required()}
              component={FormSelect}
              options={throwsAndBatsOptions}
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
            <Button
              variant="secondary"
              type="button"
              onClick={() => form.reset()}
              rootCSS={{ padding: "9px 18px" }}
            >
              Reset
            </Button>
            <Button rootCSS={{ padding: "9px 18px" }}>Submit</Button>
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
  color: #414f5a;
  text-align: left;
  display: inline-block;
  position: relative;
  background-color: var(--white);
  padding-right: 12px;
`;

export default EditForm;
