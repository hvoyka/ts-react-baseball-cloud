import { FC } from "react";
import { Form, Field } from "react-final-form";
import { required } from "redux-form-validators";
import TextInput from "../../ui/components/TextInput";
import Button from "../../ui/components/Button";
import AuthLayout from "../../layouts/AuthLayout";
import ContentWrapper from "../../components/ContentWrapper";
import styled from "styled-components";
import UserIcon from "../../ui/icons/UserIcon";
import { Link } from "react-router-dom";

interface AddUserNameFromValues {
  email?: string;
}

const LoginPage: FC<{}> = () => {
  const onSubmit = ({ email }: AddUserNameFromValues) => {
    console.log(email);
  };

  return (
    <AuthLayout>
      <ContentWrapper>
        <TextWrapper>
          <Title>Forgot Password</Title>
          <Text>
            Please enter your email address. You will receive a link to reset
            your password via email.
          </Text>
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

              <div className="buttons">
                <Button>Submit</Button>
              </div>
            </form>
          )}
        />

        <SignInWrapper>
          <div>Remember password?</div>
          <Link to="/login">Sign In</Link>
        </SignInWrapper>
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

export default LoginPage;
