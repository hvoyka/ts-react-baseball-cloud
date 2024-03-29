import { useMutation } from "@apollo/client";
import { UPDATE_FAVORITE_PROFILE } from "apollo/queries";
import React from "react";
import styled from "styled-components";
import {
  AgeIcon,
  BatsIcon,
  HeartFillIcon,
  HeartIcon,
  HeightIcon,
  PencilIcon,
  ThrowsIcon,
  WeightIcon,
} from "ui";
import { capitalize } from "utils";

interface UserInfoProps {
  onEditClick: () => void;
  onFavoriteClick: () => void;
  profileData: any;
  pageId: string | undefined;
}

const UserInfo: React.FC<UserInfoProps> = ({
  onEditClick,
  onFavoriteClick,
  pageId,
  profileData,
}) => {
  const {
    avatar,
    first_name,
    last_name,
    position,
    position2,
    age,
    feet,
    inches,
    weight,
    throws_hand,
    bats_hand,
    school,
    school_year,
    teams,
    facilities,
    biography,
    favorite,
  } = profileData;

  const [updateFavorite] = useMutation(UPDATE_FAVORITE_PROFILE, {
    onCompleted: () => {
      onFavoriteClick();
    },
  });

  const handleFavoriteClick = () => {
    updateFavorite({
      variables: {
        form: { profile_id: pageId, favorite: !favorite },
      },
    });
  };

  return (
    <Root>
      <TopWrapper>
        <AvatarWrapper>
          <Avatar $photoUrl={avatar}></Avatar>
        </AvatarWrapper>
        {pageId ? (
          <Favorite onClick={handleFavoriteClick}>
            {favorite ? <HeartFillIcon /> : <HeartIcon />}
          </Favorite>
        ) : (
          <IconButton onClick={onEditClick}>
            <PencilIcon />
          </IconButton>
        )}

        <TopInfoWrapper>
          <TopInfoName>{`${first_name} ${last_name}`}</TopInfoName>
          <TopInfoPosition>{position}</TopInfoPosition>
          <TopInfoPosition>{position2}</TopInfoPosition>
        </TopInfoWrapper>
        <ul>
          <StatsItem>
            <StatsIconWrapper>
              <AgeIcon />
            </StatsIconWrapper>
            <div>Age</div>
            <StatsValue>{age}</StatsValue>
          </StatsItem>
          <StatsItem>
            <StatsIconWrapper>
              <HeightIcon />
            </StatsIconWrapper>
            <div>Height</div>
            <StatsValue>{`${feet} ft ${inches} in`}</StatsValue>
          </StatsItem>
          <StatsItem>
            <StatsIconWrapper>
              <WeightIcon />
            </StatsIconWrapper>
            <div>Weight</div>
            <StatsValue>{`${weight} lbs`}</StatsValue>
          </StatsItem>
          <StatsItem>
            <StatsIconWrapper>
              <ThrowsIcon />
            </StatsIconWrapper>
            <div>Throws</div>
            <StatsValue>{throws_hand?.toUpperCase()}</StatsValue>
          </StatsItem>
          <StatsItem>
            <StatsIconWrapper>
              <BatsIcon />
            </StatsIconWrapper>
            <div>Bats</div>
            <StatsValue>{bats_hand?.toUpperCase()}</StatsValue>
          </StatsItem>
        </ul>
        <ul>
          <li>
            <BottomStatsTitle>School</BottomStatsTitle>
            <BottomStatsValue>{school?.name}</BottomStatsValue>
          </li>
          <li>
            <BottomStatsTitle>School Year</BottomStatsTitle>
            <BottomStatsValue>
              {school_year ? capitalize(school_year) : "-"}
            </BottomStatsValue>
          </li>
          <li>
            <BottomStatsTitle>Team</BottomStatsTitle>
            <BottomStatsValue>
              {teams &&
                teams
                  ?.map((item: { name: string }, index: number) => item.name)
                  .join(", ")}
            </BottomStatsValue>
          </li>
          <li>
            <BottomStatsTitle>Facility</BottomStatsTitle>
            <BottomStatsValue>
              {facilities &&
                facilities.map((item: { u_name: string }, index: number) => {
                  return index === facilities.length - 1
                    ? item.u_name
                    : `${item.u_name}, `;
                })}
            </BottomStatsValue>
          </li>
          <Divider>
            <DividerText>About</DividerText>
          </Divider>
          <Biography>{biography}</Biography>
        </ul>
      </TopWrapper>
    </Root>
  );
};

const Root = styled.div`
  position: relative;
`;

const TopWrapper = styled.div`
  position: relative;
`;

const AvatarWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 8px;
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
  overflow: hidden;
  border-radius: 50%;
`;

const IconButton = styled.button`
  position: absolute;
  right: 5%;
  top: 5%;
  transition: 0.2s;
  &:hover {
    transform: scale(1.1);
  }
`;

const TopInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TopInfoName = styled.div`
  font-size: 20px;
  line-height: 24px;
  color: var(--gray7);
  word-wrap: break-word;
  word-break: break-all;
  text-align: center;
`;

const TopInfoPosition = styled.div`
  font-size: 16px;
  line-height: 19px;
  color: var(--gray2);
  &:last-of-type {
    border-top: 1px solid var(--gray3);
  }
`;

const StatsItem = styled.li`
  display: flex;
  padding: 16px 0;
`;

const StatsIconWrapper = styled.div`
  margin-right: 16px;
  width: 24px;
  height: 24px;
`;

const StatsValue = styled.div`
  margin-left: auto;
`;

const BottomStatsTitle = styled.div`
  font-size: 14px;
  line-height: 17px;
  font-weight: 300;
  color: var(--gray4);
  margin-bottom: 3px;
`;
const BottomStatsValue = styled.div`
  font-size: 16px;
  color: var(--gray4);
  word-wrap: break-word;
  margin-bottom: 11px;
`;

const Divider = styled.div`
  display: flex;
  position: relative;
  margin-bottom: 15px;
  &::before {
    content: "";
    position: absolute;
    top: 11px;
    left: 0;
    right: 0;
    height: 1px;
    background-color: var(--gray6);
    z-index: 0;
  }
`;

const DividerText = styled.div`
  line-height: 1.25;
  text-align: center;
  font-size: 18px;
  font-weight: 900;
  color: var(--gray7);
  text-align: left;
  display: inline-block;
  position: relative;
  background-color: var(--white);
  padding-right: 12px;
`;

const Biography = styled.p`
  font-size: 16px;
  color: var(--gray2);
  line-height: 1.75;
  word-wrap: break-word;
`;

const Favorite = styled.button`
  position: absolute;
  right: 5%;
  top: 5%;
  transition: 0.2s;
  &:hover {
    transform: scale(1.1);
  }
  svg {
    width: 30px;
    height: 30px;
  }
`;

export default UserInfo;
