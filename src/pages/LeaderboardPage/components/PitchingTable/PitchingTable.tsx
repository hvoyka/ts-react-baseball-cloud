import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { HeartIcon, HeartFillIcon } from "ui";
import { useMutation } from "@apollo/client";
import { UPDATE_FAVORITE_PROFILE } from "apollo/queries";
import { FC } from "react";
interface PitchingItem {
  pitcher_datraks_id: string;
  pitcher_name: string;
  velocity: string;
  launch_angle: string;
  pitch_type: string;
  spin_rate: string;
  age: string;
  favorite: boolean;
  events: [];
  teams: { name: string }[];
  school: {
    name: string;
  };
}
interface PitchingTableProps {
  pitchings: PitchingItem[];

  onFavoriteClick: () => void;
}

const PitchingTable: FC<PitchingTableProps> = ({
  pitchings,
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
        <Rank>Rank</Rank>
        <Name>Pitcher Name</Name>
        <Age>Age</Age>
        <School>School</School>
        <Teams>Teams</Teams>
        <Type>Launch Angle</Type>
        <Velocity> Velocity</Velocity>

        <Rate>Spin Rate</Rate>
        <Favorite>Favorite</Favorite>
      </TableHeader>
      <TableBody>
        {pitchings.map((item: PitchingItem, index: number) => (
          <TableRow key={item.pitcher_datraks_id}>
            <Rank>{index + 1}</Rank>
            <Name>
              <NavLink to={`/profile/${item.pitcher_datraks_id}`}>
                {item.pitcher_name}
              </NavLink>
            </Name>
            <Age>{item.age}</Age>
            <School>{item.school.name}</School>
            <Teams>{item.teams.map((team) => team.name).join(", ")}</Teams>
            <Type>{item.pitch_type}</Type>
            <Velocity>{item.velocity}</Velocity>
            <Rate>{item.spin_rate}</Rate>
            <Favorite
              onClick={() =>
                handleFavoriteClick(item.pitcher_datraks_id, item.favorite)
              }
            >
              {item.favorite ? <HeartFillIcon /> : <HeartIcon />}
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
const Rank = styled.div`
  flex: 1 0 6.5%;
`;
const Name = styled.div`
  flex: 1 0 14%;
`;
const Age = styled.div`
  flex: 1 0 5%;
`;
const School = styled.div`
  flex: 1 0 14%;
`;
const Teams = styled.div`
  flex: 1 0 14.5%;
`;
const Type = styled.div`
  flex: 1 0 14.5%;
`;
const Velocity = styled.div`
  flex: 1 0 14.5%;
`;
const Rate = styled.div`
  flex: 1 0 10%;
`;
const Favorite = styled.button`
  flex: 1 0 5%;
`;

export default PitchingTable;
