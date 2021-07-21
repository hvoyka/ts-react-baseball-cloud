import { FC, useState } from "react";
import styled from "styled-components";

import { AuthLayout } from "layouts";
import { useMutation, useQuery } from "@apollo/client";
import {
  GET_CURRENT_PROFILE,
  GET_PROFILE,
  UPDATE_PROFILE,
} from "apollo/queries";
import { ReturnArrow, Loader } from "ui";
import { AvatarForm, TopValues, UserInfo } from "./components";
import { EditForm } from "./components/EditForm";
import { ProfileFormValues } from "./components/EditForm/EditForm";

const ProfilePage: FC = () => {
  const [updateProfile] = useMutation(UPDATE_PROFILE);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [isFormEdit, setIsFormEdit] = useState(false);

  const { loading: isCurrentProfileLoading, data: currentProfileData } =
    useQuery(GET_CURRENT_PROFILE);

  const { loading: isProfileLoading, data: profileData } = useQuery(
    GET_PROFILE,
    {
      /* variables: { id: currentProfileData?.current_profile?.id }, */
      /*   variables: { id: "415" }, */
      variables: { id: "413" },
    }
  );

  console.log(profileData?.profile?.batter_summary);
  const onAvatarUpload = (imageUrl: string) => {
    setUploadedImageUrl(imageUrl);
  };

  const onEditFormSubmit = (values: ProfileFormValues) => {
    if (values && !isCurrentProfileLoading) {
      const {
        age,
        bats_hand,
        biography,
        facilities,
        teams,
        feet,
        first_name,
        last_name,
        inches,
        position,
        position2,
        school,
        school_year,
        throws_hand,
        weight,
      } = values;

      const facilitiesData = facilities?.map((item) => {
        return { id: item.value, u_name: item.label };
      });
      const teamsData = teams?.map((item) => {
        return { id: item.id, name: item.label };
      });

      const formData = {
        age: age && parseInt(age),
        avatar: uploadedImageUrl,
        biography,
        facilities: facilitiesData,
        feet: feet && parseInt(feet),
        first_name,
        id: currentProfileData.current_profile.id,
        inches: inches && parseInt(inches),
        last_name,
        position: position?.value,
        position2: position2?.value,
        school: { id: school?.value, name: school?.label },
        school_year: school_year?.value,
        teams: teamsData,
        bats_hand: bats_hand?.value,
        throws_hand: throws_hand?.value,
        weight: weight && parseInt(weight),
      };

      updateProfile({
        variables: {
          form: formData,
        },
      });
      setIsFormEdit(false);
    }
  };

  return (
    <AuthLayout>
      {isCurrentProfileLoading ? (
        <Loader />
      ) : (
        <FlexContainer>
          <Aside>
            {isFormEdit ? (
              <>
                <AvatarForm
                  onAvatarUpload={onAvatarUpload}
                  avatarUrl={currentProfileData?.current_profile?.avatar}
                />
                <EditForm
                  onEditFormSubmit={onEditFormSubmit}
                  currentProfileData={currentProfileData}
                  setIsFormEdit={setIsFormEdit}
                />
              </>
            ) : (
              <UserInfo
                setIsFormEdit={setIsFormEdit}
                profileData={currentProfileData.current_profile}
              />
            )}
          </Aside>

          <PageContentWrapper>
            {isProfileLoading ? (
              <PageContent>
                <AccountInfoContainer>
                  <ImageBox>
                    <ReturnArrow />
                  </ImageBox>
                  <HeadingBox>Your Account</HeadingBox>
                  <TextBox>
                    Changing your profile options lets you control how others
                    see you and your profile. These settings include things like
                    your name, personal info and school.
                  </TextBox>
                </AccountInfoContainer>
              </PageContent>
            ) : (
              <TopValues
                batting={profileData?.profile?.batter_summary[0]}
                pitching={profileData?.profile?.pitcher_summary[0]}
              />
            )}
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

  overflow-y: auto;
  height: calc(100vh - 98px);
  @media (max-width: 620px) {
    height: calc(100vh - 118px);
  }
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
