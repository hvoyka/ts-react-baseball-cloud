import React, { FC, ReactNode } from "react";
import styled from "styled-components";
import Footer from "../../components/Footer";
import Header from "../../components/Header";

import authBackground from "../../assets/images/auth-bg.jpg";

type AutLayoutProps = {
  children?: ReactNode;
};

const AuthLayout: FC<AutLayoutProps> = ({ children }) => {
  return (
    <MainLayoutWrapper>
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

const MainLayoutWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 100vh;
  background-image: url(${authBackground});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
`;

export default AuthLayout;
