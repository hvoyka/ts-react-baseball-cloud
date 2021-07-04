import React, { useState } from "react";
import styled, { css } from "styled-components";

const AvatarForm = () => {
  const [imageName, setImageName] = useState<string>("");
  const [photoUrl, setPhotoUrl] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = (event: any) => {
    const file = event.target.files[0];
    const fileName = file.name.slice(0, 50);
    const fileUrl = URL.createObjectURL(file);
    setImageName(fileName);
    setPhotoUrl(fileUrl);
  };

  const handleCancelForm = () => {
    setImageName("");
    setPhotoUrl("");
  };

  const handleLoadForm = () => {
    setIsLoading(true);
  };

  return (
    <Root>
      <AvatarWrapper>
        <Avatar $photoUrl={photoUrl}></Avatar>
      </AvatarWrapper>
      <FormWrapper>
        <FileInput
          type="file"
          name="avatarFile"
          id="uploadAvatar"
          accept="image/png,image/jpeg,image/jpg"
          onChange={handleFileChange}
        />
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <>
            <FileLabel htmlFor="uploadAvatar">
              {imageName ? imageName : "Choose Photo"}
            </FileLabel>
            {photoUrl && (
              <div>
                <UploadButton onClick={handleLoadForm}>
                  Upload Photo
                </UploadButton>
                <CancelButton onClick={handleCancelForm}>Cancel</CancelButton>
              </div>
            )}
          </>
        )}
      </FormWrapper>
    </Root>
  );
};

const Root = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 23px;
`;

const AvatarWrapper = styled.div`
  display: block;
  margin-bottom: 8px;
  overflow: hidden;
  border-radius: 50%;
`;

const Avatar = styled.div<{ $photoUrl: string }>`
  ${({ $photoUrl }) =>
    $photoUrl
      ? `background-image: url(${$photoUrl});`
      : `background-image: url(/images/avatar.png);`}

  width: 100px;
  height: 100px;
  background-size: cover;
  background-position: 50% 50%;
`;

const FormWrapper = styled.div`
  display: flex;
  width: 100%;
  flex: 0 0 100%;
  flex-direction: column;
  align-items: center;
`;

const FileInput = styled.input`
  display: none;
`;

const FileLabel = styled.label`
  margin-bottom: 0;
  font-size: 14px;
  line-height: 1;
  font-weight: 400;
  color: #788b99;
  cursor: pointer;
  white-space: nowrap;
  margin-bottom: 10px;
  &:hover {
    color: #48bbff;
    text-decoration: underline;
  }
`;

const fileButtonsStyle = css`
  background: transparent;
  border: none;
  font-size: 16px;
  line-height: 1.13;
  font-weight: 400;
  cursor: pointer;
  &:hover,
  &:focus {
    text-decoration: underline;
  }
`;

const UploadButton = styled.button`
  ${fileButtonsStyle}
  color: #48bbff;
  margin-right: 20px;
`;
const CancelButton = styled.button`
  ${fileButtonsStyle}
  color: #788b99;
  &:hover,
  &:focus {
    color: #23527c;
  }
`;

export default AvatarForm;
