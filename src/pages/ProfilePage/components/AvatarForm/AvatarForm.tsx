import React, { ChangeEvent, FC, useState } from "react";
import ApiService from "services/ApiService";
import styled, { css } from "styled-components";

interface AvatarFormProps {
  onAvatarUpload: (imageUrl: string) => void;
}

const AvatarForm: FC<AvatarFormProps> = ({ onAvatarUpload }) => {
  const [imageName, setImageName] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;

    const loadedFile = event.target.files[0];
    const fileName = loadedFile.name;
    const fileUrl = URL.createObjectURL(loadedFile);

    setFile(loadedFile);
    setImageName(fileName);
    setPhotoUrl(fileUrl);
  };

  const handleCancelForm = () => {
    setImageName("");
    setPhotoUrl("");
  };

  const handleLoadForm = async () => {
    if (file) {
      setIsLoading(true);
      ApiService.post("/s3/signed_url", {
        name: imageName,
      })
        .then((response) => {
          const signedUrl = response.data.signedUrl;
          console.log(signedUrl);
          return ApiService.put(signedUrl, file, {
            headers: {
              "Content-type": "image/png",
            },
          });
        })
        .then(({ request }) => {
          const responseUrl = request.responseURL;
          onAvatarUpload(responseUrl.slice(0, responseUrl.indexOf("?")));
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
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
              {imageName || "Choose Photo"}
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
  color: var(--gray2);
  cursor: pointer;
  white-space: nowrap;
  margin-bottom: 10px;
  &:hover {
    color: var(--blue1);
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
  color: var(--blue1);
  margin-right: 20px;
`;
const CancelButton = styled.button`
  ${fileButtonsStyle}
  color: var(--gray2);
  &:hover,
  &:focus {
    color: var(--blue4);
  }
`;

export default AvatarForm;
