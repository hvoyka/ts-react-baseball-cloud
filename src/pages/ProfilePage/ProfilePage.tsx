import { FC } from "react";

import { AuthLayout } from "layouts";
import { useQuery } from "@apollo/client";
import { GET_PROFILE_QUERY } from "services/queries";
import styled from "styled-components";
import { ReturnArrow } from "ui";
import { Loader } from "ui";
import { AvatarForm } from "./components/AvatarForm";

const LoginPage: FC = () => {
  const { loading, data } = useQuery(GET_PROFILE_QUERY, {
    variables: { id: "881" },
  });

  console.log("data", data);

  return (
    <AuthLayout>
      {loading ? (
        <Loader />
      ) : (
        <FlexContainer>
          <Aside>
            <AvatarForm />
          </Aside>
          <PageContentWrapper>
            <PageContent>
              <AccountInfoContainer>
                <ImageBox>
                  <ReturnArrow />
                </ImageBox>
                <HeadingBox>Your Account</HeadingBox>
                <TextBox>
                  Changing your profile options lets you control how others see
                  you and your profile. These settings include things like your
                  name, personal info and school.
                </TextBox>
              </AccountInfoContainer>
            </PageContent>
          </PageContentWrapper>
        </FlexContainer>
      )}
    </AuthLayout>
  );
};

const FlexContainer = styled.div`
  display: flex;
  flex-grow: 1;
`;

const Aside = styled.aside`
  background: #fff;
  border-left: 1px solid rgba(0, 0, 0, 0.1);
  overflow: auto;
  padding: 16px;

  opacity: 1;
  position: relative;
  width: 298px;
  flex: 0 0 298px;
  background: #ffffff;
  height: auto;
  z-index: 1;
  display: block;
  transition: all 0.1s;
  box-shadow: 0 2px 15px 0 rgba(0, 0, 0, 0.1);
`;

const PageContentWrapper = styled.div`
  background: #788b99;
  width: calc(100vw - 220px);
  flex-grow: 1;
`;

const PageContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 570px;
  border-radius: 4px;
  background-color: #ffffff;
  box-shadow: 0 2px 15px 0 rgba(0, 0, 0, 0.1);
`;
const AccountInfoContainer = styled.div`
  display: flex;
  max-width: 420px;
  flex-direction: column;
  align-items: center;
`;

const ImageBox = styled.div`
  display: block;
  margin-bottom: 17px;
  span {
    display: flex;
  }
`;
const HeadingBox = styled.div`
  font-size: 24px;
  line-height: 1.25;
  font-weight: 400;
  text-align: center;
  color: #667784;
  font-size: 32px;
  font-weight: 700;
  margin-bottom: 16px;
`;
const TextBox = styled.div`
  font-size: 16px;
  color: #667784;
  text-align: center;
`;

export default LoginPage;
