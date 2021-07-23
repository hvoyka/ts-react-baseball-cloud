import React, { useMemo } from "react";
import styled from "styled-components";
import { Form, Field } from "react-final-form";
import { required } from "redux-form-validators";
import { FormSelect } from "../FormSelect";
import { Button, TextInput } from "ui";
import { FormApi } from "final-form";
import { useQuery } from "@apollo/client";
import { GET_FORM_OPTIONS } from "apollo/queries";
import { TextAreaInput } from "../TextAreaInput";
import {
  findOneOption,
  THROW_AND_BATS_OPTIONS,
  POSITIONS_OPTIONS,
  SCHOOL_YEAR_OPTIONS,
} from "utils";

export interface ProfileFormValues {
  first_name?: string;
  last_name?: string;
  biography?: string;
  feet?: string;
  inches?: string;
  weight?: string;
  age?: string;
  school_year?: { label: string; value: string };
  position?: { label: string; value: string };
  position2?: { label: string; value: string };
  throws_hand?: { label: string; value: string };
  bats_hand?: { label: string; value: string };
  school?: { label: string; value: string; id: string };
  teams?: [{ label: string; value: string; id: string }];
  facilities?: [{ label: string; value: string }];
}

interface EditFormProps {
  onEditFormSubmit: (values: ProfileFormValues) => void;
  currentProfileData: {
    current_profile: any;
  };
  setIsFormEdit: (isFormEdit: boolean) => void;
}

const EditForm: React.FC<EditFormProps> = ({
  onEditFormSubmit,
  currentProfileData,
  setIsFormEdit,
}) => {
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

  const currentProfile = currentProfileData.current_profile;

  const initialValues: ProfileFormValues = {
    age: currentProfile?.age,
    biography: currentProfile?.biography,
    feet: currentProfile?.feet,
    first_name: currentProfile?.first_name,
    inches: currentProfile?.inches,
    last_name: currentProfile?.last_name,
    position:
      currentProfile?.position &&
      findOneOption(POSITIONS_OPTIONS, currentProfile.position),
    position2:
      currentProfile?.position2 &&
      findOneOption(POSITIONS_OPTIONS, currentProfile.position2),
    school_year:
      currentProfile?.school_year &&
      findOneOption(SCHOOL_YEAR_OPTIONS, currentProfile.school_year),
    bats_hand:
      currentProfile?.bats_hand &&
      findOneOption(THROW_AND_BATS_OPTIONS, currentProfile.bats_hand),
    throws_hand:
      currentProfile?.throws_hand &&
      findOneOption(THROW_AND_BATS_OPTIONS, currentProfile.throws_hand),
    weight: currentProfile?.weight,
    school: currentProfile?.school && {
      value: currentProfile?.school?.id,
      label: currentProfile?.school?.name,
    },
    teams: currentProfile?.teams?.map((item: { id: string; name: string }) => {
      return { id: item.id, value: item.id, label: item.name };
    }),
    facilities: currentProfile?.facilities?.map(
      (item: { id: string; u_name: string }) => {
        return { value: item.id, label: item.u_name };
      }
    ),
  };

  const onSubmit = (values: ProfileFormValues, form: FormApi) => {
    onEditFormSubmit(values);
    form.restart();
  };

  return (
    <Form
      onSubmit={onSubmit}
      initialValues={initialValues}
      render={({ handleSubmit, form }) => (
        <form onSubmit={handleSubmit}>
          <FormRow>
            <Field<string>
              name="first_name"
              validate={required()}
              render={(props) => {
                return <TextInput label="First Name *" {...props} />;
              }}
            />
            <Field<string>
              name="last_name"
              validate={required()}
              render={(props) => {
                return <TextInput label="Last Name *" {...props} />;
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
                return <TextInput label="Age *" {...props} />;
              }}
            />
            <Field<string>
              name="weight"
              validate={required()}
              render={(props) => {
                return <TextInput label="Weight *" {...props} />;
              }}
            />
          </FormRow>

          <FormRow>
            <Field<string>
              name="feet"
              validate={required()}
              render={(props) => {
                return <TextInput label="Feet *" {...props} />;
              }}
            />
            <Field<string>
              name="inches"
              render={(props) => {
                return <TextInput label="Inches" {...props} />;
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

          <Field
            name="biography"
            label="Describe yourself in a few words"
            component={TextAreaInput}
          />

          <FormRow>
            <StyledButton
              variant="secondary"
              onClick={() => {
                setIsFormEdit(false);
              }}
            >
              Cancel
            </StyledButton>
            <StyledButton type="submit">Submit</StyledButton>
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
