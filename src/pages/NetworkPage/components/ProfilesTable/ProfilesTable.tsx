import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { HeartIcon, HeartFillIcon } from "ui";
import { useMutation } from "@apollo/client";
import { UPDATE_FAVORITE_PROFILE } from "apollo/queries";
import { FC } from "react";

interface ProfileItem {
  first_name: string;
  last_name: string;
  age: string;
  id: string;
  favorite: boolean;
  events: [];
  teams: { name: string }[];
  school: {
    name: string;
  };
}

interface ProfilesTableProps {
  profiles: ProfileItem[];
  onFavoriteClick: () => void;
}

const ProfilesTable: FC<ProfilesTableProps> = ({
  profiles,
  onFavoriteClick,
}) => {
  const [updateFavorite] = useMutation(UPDATE_FAVORITE_PROFILE, {
    onCompleted: () => {
      onFavoriteClick();
    },
  });

  const handleFavoriteClick = (id: string, favorite: boolean) => {
    updateFavorite({
      variables: {
        form: { profile_id: id, favorite: !favorite },
      },
    });
  };

  return (
    <>
      <TableHeader>
        <Name>Batter Name</Name>
        <Sessions>Sessions</Sessions>
        <School>School</School>
        <Teams>Teams</Teams>
        <Age>Age</Age>
        <Favorite>Favorite</Favorite>
      </TableHeader>
      <TableBody>
        {profiles &&
          profiles.map((item: ProfileItem, index: number) => (
            <TableRow key={item.id}>
              <Name>
                <NavLink to={`/profile/${item.id}`}>
                  {`${item.first_name} ${item.last_name}`}
                </NavLink>
              </Name>
              <Sessions>{item.events?.length || "-"}</Sessions>

              <School>{item?.school?.name}</School>
              <Teams>{item.teams.map((team) => team.name).join(", ")}</Teams>

              <Age>{item.age}</Age>
              <Favorite>
                <button
                  onClick={() => handleFavoriteClick(item.id, item.favorite)}
                >
                  {item.favorite ? <HeartFillIcon /> : <HeartIcon />}
                </button>
              </Favorite>
            </TableRow>
          ))}
      </TableBody>
    </>
  );
};

const TableHeader = styled.div`
  display: flex;
  font-size: 14px;
  line-height: 1;
  font-weight: 300;
  color: var(--gray4);
  padding: 15px 6px;
  margin-bottom: 6px;
`;
const TableBody = styled.ul`
  font-size: 14px;
  line-height: 1.13;
  font-weight: 400;
  color: var(--gray7);
  border-radius: 4px;
`;

const TableRow = styled.li`
  display: flex;
  background-color: var(--blue6);
  border-radius: 4px;
  padding: 15px 6px;
  margin-bottom: 4px;

  a {
    color: var(--gray7);
    :hover {
      color: var(--blue1);
    }
  }
  &:hover {
    background-color: var(--blue7);
  }
`;

const Name = styled.div`
  width: 19.5%;
`;
const Age = styled.div`
  flex: 1 0 15%;
`;
const School = styled.div`
  flex: 1 0 23%;
`;
const Teams = styled.div`
  flex: 1 0 23%;
`;
const Sessions = styled.div`
  flex: 1 0 10%;
`;

const Favorite = styled.div`
  flex: 1 0 8%;
`;

export default ProfilesTable;
