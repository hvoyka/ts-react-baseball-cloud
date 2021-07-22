import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { HeartIcon, HeartFillIcon } from "ui";
import { useMutation } from "@apollo/client";
import {
  GET_LEADERBOARD_BATTING,
  UPDATE_FAVORITE_PROFILE,
} from "apollo/queries";

const BattingTable = ({ battings }: any) => {
  const [updateFavorite] = useMutation(UPDATE_FAVORITE_PROFILE, {
    refetchQueries: [
      {
        query: GET_LEADERBOARD_BATTING,
        variables: { input: { type: "exit_velocity" } },
      },
    ],
  });

  const handleFavoriteClick = (id: string, favorite: boolean) => {
    console.log(id, favorite);
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
        <Name>Batter Name</Name>
        <Age>Age</Age>
        <School>School</School>
        <Teams>Teams</Teams>
        <Velocity>Exit Velocity</Velocity>
        <Angle>Launch Angle</Angle>
        <Distance>Distance</Distance>
        <Favorite>Favorite</Favorite>
      </TableHeader>
      <TableBody>
        {battings &&
          battings.map((item: any, index: number) => (
            <TableRow key={index}>
              <Rank>{index + 1}</Rank>
              <Name>
                <NavLink to={`/profile/${item.batter_datraks_id}`}>
                  {item.batter_name}
                </NavLink>
              </Name>
              <Age>{item.age}</Age>
              <School>{item.school.name}</School>
              <Teams>
                {item.teams.map((team: any) => team.name).join(", ")}
              </Teams>
              <Velocity>{item.exit_velocity}</Velocity>
              <Angle>{item.launch_angle}</Angle>
              <Distance>{item.distance}</Distance>
              <Favorite>
                <button
                  onClick={() =>
                    handleFavoriteClick(item.batter_datraks_id, item.favorite)
                  }
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
const Velocity = styled.div`
  flex: 1 0 14%;
`;
const Angle = styled.div`
  flex: 1 0 14.5%;
`;
const Distance = styled.div`
  flex: 1 0 10%;
`;
const Favorite = styled.div`
  flex: 1 0 5%;
`;

export default BattingTable;
