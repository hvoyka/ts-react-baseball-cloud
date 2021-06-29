import { FC, useState } from "react";
import styled from "styled-components";

import { Link } from "react-router-dom";
import { AuthLayout } from "layouts";
import { RegistrationForm, ContentWrapper, RegistrationTabs } from "components";
import { ROLES } from "utils/roles";

const RegistrationPage: FC = () => {
  const [role, setRole] = useState(ROLES.PLAYER);

  const onTabChange = (index: number) => {
    index === 1 ? setRole(ROLES.SCOUT) : setRole(ROLES.PLAYER);
  };

  return (
    <AuthLayout>
      <ContentWrapper>
        <RegistrationTabs onTabChange={onTabChange} />
        <RegistrationForm role={role} />

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

export default RegistrationPage;
