import React, { FC } from "react";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";
import { signInRequest } from "services/AuthApi";

import { AuthLayout } from "layouts";
import { ContentWrapper } from "components";
import { LoginForm, LoginFormValues } from "./components/LoginForm";

import StorageService from "services/StorageService";
import { ROUTES } from "utils/routes";

const LoginPage: FC = () => {
  const history = useHistory();
  const onSubmit = ({ email, password }: LoginFormValues) => {
    signInRequest({ email, password })
      .then((data) => {
        const token = data.headers["access-token"];
        const client = data.headers.client;
        const uid = data.headers.uid;

        StorageService.setUserData({ token, client, uid });
        history.push(ROUTES.PROFILE);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <AuthLayout>
      <ContentWrapper>
        <TextWrapper>
          <Title>Welcome to BaseballCloud!</Title>
          <Text>Sign into your account here:</Text>
        </TextWrapper>

        <LoginForm onSubmit={onSubmit} />

        <ForgotWrapper>
          <Link to="/forgot-password">Forgotten password?</Link>
        </ForgotWrapper>
        <SignUpWrapper>
          <div>Don’t have an account?</div>
          <StyledLink to="/registration">Sign Up</StyledLink>
        </SignUpWrapper>
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

const ForgotWrapper = styled.div`
  display: flex;

  justify-content: flex-end;
  margin-bottom: 15px;
`;
const SignUpWrapper = styled.div`
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

export default LoginPage;
