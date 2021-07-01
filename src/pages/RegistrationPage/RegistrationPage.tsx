import { FC, useState } from "react";
import styled from "styled-components";

import { Link } from "react-router-dom";
import { AuthLayout } from "layouts";
import { ContentWrapper } from "components";
import { RegistrationForm, RegistrationTabs } from "./components/";
import { ROLES } from "types";
import { signUpRequest } from "services/api";
import { FetchStatus } from "types";

interface RegistrationFormValues {
  email: string;
  password: string;
  password_confirmation: string;
}

const RegistrationPage: FC = () => {
  const [role, setRole] = useState(ROLES.PLAYER);
  const [registrationStatus, setRegistrationStatus] =
    useState<FetchStatus>("idle");

  const onSubmit = ({
    email,
    password,
    password_confirmation,
  }: RegistrationFormValues) => {
    setRegistrationStatus("pending");
    signUpRequest({ email, password, password_confirmation, role })
      .then((data) => {
        setRegistrationStatus("fulfilled");
      })
      .catch((error) => {
        console.error(error);
        setRegistrationStatus("rejected");
      });
  };

  const onTabChange = (index: number) => {
    index === 1 ? setRole(ROLES.SCOUT) : setRole(ROLES.PLAYER);
  };

  return (
    <AuthLayout>
      <ContentWrapper>
        <StyledRegistrationTabs onTabChange={onTabChange} />
        <StyledRegistrationForm
          onSubmit={onSubmit}
          registrationStatus={registrationStatus}
        />

        <TermsWrapper>
          By clicking Sign Up, you agree to our&nbsp;
          <Link to="/">Terms of Service</Link>&nbsp;and&nbsp;
          <Link to="/">Privacy Policy</Link>
        </TermsWrapper>
        <SignInWrapper>
          <div>Already registered?</div>
          <StyledLink to="/login">Sign In</StyledLink>
        </SignInWrapper>
      </ContentWrapper>
    </AuthLayout>
  );
};

const TermsWrapper = styled.div`
  margin-bottom: 8px;
  margin-top: 8px;
  padding-left: 10px;
  padding-right: 10px;
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

const StyledRegistrationForm = styled(RegistrationForm)`
  margin-bottom: 15px;
`;

const StyledRegistrationTabs = styled(RegistrationTabs)`
  margin-bottom: 20px;
`;

export default RegistrationPage;
