import React, { FC } from "react";
import styled from "styled-components";
import { Footer, Header } from "components";
import StorageService from "services/StorageService";

const AuthLayout: FC = ({ children }) => {
  const isLogin = StorageService.hasAuthToken();

  return (
    <MainLayoutWrapper $isLogin={isLogin}>
      <Header />
      <Main>{children}</Main>
      <Footer />
    </MainLayoutWrapper>
  );
};

const Main = styled.main`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`;

const MainLayoutWrapper = styled.div<{ $isLogin: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 100vh;
  background: var(--white);
  ${({ $isLogin }) =>
    $isLogin
      ? `background-image: url("");`
      : `background-image: url(/images/auth-bg.jpg);`}
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
`;

export default AuthLayout;
