import { FC, useState } from "react";
import styled from "styled-components";

import { AuthLayout } from "layouts";
import { useQuery } from "@apollo/client";
import { GET_CURRENT_PROFILE } from "apollo/queries";
import { ReturnArrow, Loader, Button } from "ui";
import { AvatarForm } from "./components";
import { EditForm } from "./components/EditForm";
import { ProfileFormValues } from "types";

const ProfilePage: FC = () => {
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [isFormEdit, setIsFormEdit] = useState(false);

  const {
    loading: isProfileLoading,
    data: profileData,
    error: profileError,
  } = useQuery(GET_CURRENT_PROFILE);

  const onAvatarUpload = (imageUrl: string) => {
    setUploadedImageUrl(imageUrl);
  };

  const onEditFormSubmit = ({ first_name }: ProfileFormValues) => {
    if (first_name) {
      console.log(first_name);
      setIsFormEdit(false);
    }
  };

  return (
    <AuthLayout>
      {isProfileLoading ? (
        <Loader />
      ) : (
        <FlexContainer>
          <Aside>
            {isFormEdit ? (
              <>
                <AvatarForm onAvatarUpload={onAvatarUpload} />
                <EditForm onEditFormSubmit={onEditFormSubmit} />
              </>
            ) : (
              <Button onClick={() => setIsFormEdit(true)}>Edit Form</Button>
            )}
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
  background: var(--white);
  border-left: 1px solid rgba(0, 0, 0, 0.1);
  overflow: auto;
  padding: 16px;

  opacity: 1;
  position: relative;
  width: 298px;
  flex: 0 0 298px;
  background: var(--white);
  height: auto;
  z-index: 1;
  transition: 0.1s;
  box-shadow: 0 2px 15px 0 rgba(0, 0, 0, 0.1);
`;

const PageContentWrapper = styled.div`
  background: var(--gray2);
  width: calc(100vw - 220px);
  flex-grow: 1;
`;

const PageContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 570px;
  border-radius: 4px;
  background-color: var(--white);
  box-shadow: 0 2px 15px 0 rgba(0, 0, 0, 0.1);
`;

const AccountInfoContainer = styled.div`
  display: flex;
  max-width: 420px;
  flex-direction: column;
  align-items: center;
`;

const ImageBox = styled.div`
  margin-bottom: 17px;
`;

const HeadingBox = styled.div`
  font-size: 24px;
  line-height: 1.25;
  font-weight: 400;
  text-align: center;
  color: var(--gray4);
  font-size: 32px;
  font-weight: 700;
  margin-bottom: 16px;
`;

const TextBox = styled.div`
  font-size: 16px;
  color: var(--gray4);
  text-align: center;
`;

export default ProfilePage;
