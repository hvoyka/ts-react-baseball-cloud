import { FC } from "react";
import { Form, Field } from "react-final-form";
import { required } from "redux-form-validators";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";

import TextInput from "../../ui/components/TextInput";
import Button from "../../ui/components/Button";
import AuthLayout from "../../layouts/AuthLayout";
import ContentWrapper from "../../components/ContentWrapper";

import UserIcon from "../../ui/icons/UserIcon";
import LockIcon from "../../ui/icons/LockIcon";

import CheckIcon from "../../ui/icons/CheckIcon";

interface AddUserNameFromValues {
  email: string;
  password: string;
}

const RegistrationPage: FC<{}> = () => {
  const onSubmit = ({ email, password }: AddUserNameFromValues) => {
    console.log(email, password);
  };

  return (
    <AuthLayout>
      <ContentWrapper>
        <StyledTabs>
          <StyledTabList>
            <StyledTab>
              <TabIconWrapper>
                <CheckIcon fill="#fff" width={14} height={14} />
              </TabIconWrapper>
              Sign Up as Player
            </StyledTab>
            <StyledTab>
              <TabIconWrapper>
                <CheckIcon fill="#fff" width={14} height={14} />
              </TabIconWrapper>
              Sign Up as Scout
            </StyledTab>
          </StyledTabList>

          <StyledTabPanel>
            <Title>Players</Title>
            <Text>
              Players have their own profile within the system and plan on
              having data collected.
            </Text>
          </StyledTabPanel>
          <StyledTabPanel>
            <Title>Scouts</Title>
            <Text>
              Coaches and scouts can view players in the system but do not have
              their own profile.
            </Text>
          </StyledTabPanel>
        </StyledTabs>
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

              <InputWrapper>
                <Field<string>
                  name="confirm_password"
                  validate={required()}
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
                <Button>Sign In</Button>
              </div>
            </form>
          )}
        />
        <TermsWrapper>
          By clicking Sign Up, you agree to our&nbsp;
          <Link to="/">Terms of Service</Link>&nbsp;and&nbsp;
          <Link to="/">Privacy Policy</Link>
        </TermsWrapper>
        <SignInWrapper>
          <div>Already registered?</div>
          <Link to="/login">Sign In</Link>
        </SignInWrapper>
      </ContentWrapper>
    </AuthLayout>
  );
};

const StyledTabs = styled(Tabs)`
  margin-bottom: 20px;
`;

const StyledTabList = styled(TabList)`
  display: flex;
  margin-bottom: 20px;
`;

const StyledTab = styled(Tab)`
  padding: 15px 5px 17px;
  flex: 0 1 50%;
  display: flex;
  cursor: pointer;
  justify-content: center;
  color: #35c32a;
  font-size: 16px;
  font-weight: 700;
  line-height: 1.13;
  border-radius: 0;
  border-top-right-radius: 0px;
  border-bottom-right-radius: 0px;
  border: solid 1px #35c32a;
  background-color: #ffffff;
  &.react-tabs__tab--selected {
    background-color: #35c32a;
    color: #ffffff;
    border: solid 1px #35c32a;
  }
`;

const TabIconWrapper = styled.div`
  margin-right: 6px;
`;

const StyledTabPanel = styled(TabPanel)`
  &.react-tabs__tab-panel--selected {
    display: block;
    background: #48bbff;
    border-radius: 8px;
    padding: 16px;
    margin-bottom: 16px;
  }
`;

const Title = styled.h2`
  text-align: center;
  font-size: 36px;
  font-weight: 700;
  line-height: 0.78;
  color: #ffffff;
  margin-bottom: 21px;
`;

const Text = styled.p`
  text-align: center;
  line-height: 1.44;
  color: #ffffff;
`;

const InputWrapper = styled.div`
  margin-bottom: 15px;
  position: relative;
`;

const IconWrapper = styled.div`
  position: absolute;
  left: 15px;
  top: 14px;
`;

const TermsWrapper = styled.div`
  margin-bottom: 8px;
  margin-top: 8px;
  padding-left: 10px;
  padding-right: 10px;
`;

const SignInWrapper = styled.div`
  display: flex;
  justify-content: center;
  a {
    padding-left: 3px;
    text-decoration: underline;
    color: #48bbff;
    &:hover {
      text-decoration: none;
    }
  }
`;

export default RegistrationPage;