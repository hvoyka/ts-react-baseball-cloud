import { FC } from "react";
import { Form, Field } from "react-final-form";
import { required } from "redux-form-validators";
import TextInput from "../../ui/components/TextInput";
import Button from "../../ui/components/Button";
import AuthLayout from "../../layouts/AuthLayout";
import FormWrapper from "../../components/FormWrapper";
import styled from "styled-components";
import UserIcon from "../../ui/icons/UserIcon";
import LockIcon from "../../ui/icons/LockIcon";

interface AddUserNameFromValues {
  userName?: string;
}

const LoginPage: FC<{}> = () => {
  const onSubmit = ({ userName }: AddUserNameFromValues) => {
    console.log(userName);
  };

  return (
    <AuthLayout>
      <FormWrapper>
        <TextWrapper>
          <Title>Welcome to BaseballCloud!</Title>
          <Text>Sign into your account here:</Text>
        </TextWrapper>
        <Form
          onSubmit={onSubmit}
          render={({ handleSubmit, submitting, pristine }) => (
            <form onSubmit={handleSubmit}>
              <InputWrapper>
                <Field<string>
                  name="userName"
                  validate={required()}
                  render={(props) => {
                    return <TextInput placeholder="User name" {...props} />;
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

              <div className="buttons">
                <Button>Sign In</Button>
              </div>
            </form>
          )}
        />
        <ForgotWrapper>
          <a href="/forgot-password">Forgotten password?</a>
        </ForgotWrapper>
        <SignUpWrapper>
          <div>Don’t have an account?</div>
          <a href="/registration">Sign Up</a>
        </SignUpWrapper>
      </FormWrapper>
    </AuthLayout>
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

const TextWrapper = styled.div`
  margin-bottom: 48px;
`;

const Title = styled.h1`
  font-size: 24px;
  line-height: 1.25;
  font-weight: 400;
  -webkit-text-align: center;
  text-align: center;
  color: #667784;
  margin-bottom: 8px;
`;

const Text = styled.p`
  line-height: 1.25;
  font-weight: 400;
  -webkit-text-align: center;
  text-align: center;
  color: #667784;
  font-size: 16px;
`;

const ForgotWrapper = styled.div`
  display: flex;

  justify-content: flex-end;
  margin-bottom: 15px;
`;
const SignUpWrapper = styled.div`
  display: flex;
  justify-content: center;
  a {
    padding-left: 3px;
  }
`;

export default LoginPage;
