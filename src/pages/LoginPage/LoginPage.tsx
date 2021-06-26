import { FC } from "react";
import { Form, Field } from "react-final-form";
import { required } from "redux-form-validators";
import TextInput from "../../ui/components/TextInput";
import Button from "../../ui/components/Button";
import AuthLayout from "../../layouts/AuthLayout";
import ContentWrapper from "../../components/ContentWrapper";
import styled from "styled-components";
import UserIcon from "../../ui/icons/UserIcon";
import LockIcon from "../../ui/icons/LockIcon";
import { Link } from "react-router-dom";

interface AddUserNameFromValues {
  email: string;
  password: string;
}

const LoginPage: FC<{}> = () => {
  const onSubmit = ({ email, password }: AddUserNameFromValues) => {
    console.log(email, password);
  };

  return (
    <AuthLayout>
      <ContentWrapper>
        <TextWrapper>
          <Title>Welcome to BaseballCloud!</Title>
          <Text>Sign into your account here:</Text>
        </TextWrapper>
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

              <div className="buttons">
                <Button>Sign In</Button>
              </div>
            </form>
          )}
        />
        <ForgotWrapper>
          <Link to="/forgot-password">Forgotten password?</Link>
        </ForgotWrapper>
        <SignUpWrapper>
          <div>Don’t have an account?</div>
          <Link to="/registration">Sign Up</Link>
        </SignUpWrapper>
      </ContentWrapper>
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
    text-decoration: underline;
    color: #48bbff;
    &:hover {
      text-decoration: none;
    }
  }
`;

export default LoginPage;
