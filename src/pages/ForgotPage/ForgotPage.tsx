import { FC } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import { AuthLayout } from "layouts";
import ContentWrapper from "components/ContentWrapper/ContentWrapper";
import { ForgotForm, ForgotFormValues } from "./components/ForgotForm";
import { forgotPasswordRequest } from "services/AuthApi";

const ForgotPage: FC = () => {
  const onSubmit = ({ email }: ForgotFormValues) => {
    const redirect_url = process.env.REACT_APP_FORGOT_REDIRECT_URL;
    forgotPasswordRequest({ email, redirect_url }).catch((error) => {
      console.error(error);
    });
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

        <ForgotForm onSubmit={onSubmit} />

        <SignInWrapper>
          <div>Remember password?</div>
          <StyledLink to="/login">Sign In</StyledLink>
        </SignInWrapper>
      </ContentWrapper>
    </AuthLayout>
  );
};

const TextWrapper = styled.div`
  margin-bottom: 48px;
`;

const Title = styled.h1`
  font-size: 24px;
  line-height: 1.25;
  font-weight: 400;
  text-align: center;
  color: var(--gray4);
  margin-bottom: 8px;
`;

const Text = styled.p`
  line-height: 1.25;
  font-weight: 400;
  text-align: center;
  color: var(--gray4);
  font-size: 16px;
`;

const SignInWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const StyledLink = styled(Link)`
  padding-left: 3px;
  text-decoration: underline;
  color: var(--blue1);
  &:hover {
    text-decoration: none;
  }
`;

export default ForgotPage;
