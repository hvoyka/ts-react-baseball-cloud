import { FC } from "react";
import styled from "styled-components";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";

import { AuthLayout } from "layouts";
import { useLazyQuery } from "@apollo/client";
import {
  GET_LEADERBOARD_BATTING,
  GET_LEADERBOARD_PITCHING,
} from "apollo/queries";
import { useEffect } from "react";
import { Loader } from "ui";
import { BattingTable } from "./components/BattingTable";

const LeaderboardPage: FC = () => {
  const handleTabSelect = (index: number) => {
    index === 1 ? getPitching() : getBatting();
    console.log(index);
  };

  const [getBatting, { loading: isBattingLoading, data: battingData }] =
    useLazyQuery(GET_LEADERBOARD_BATTING, {
      variables: { input: { type: "exit_velocity" } },
    });

  const [getPitching, { loading: isPitchingLoading, data: pitchingData }] =
    useLazyQuery(GET_LEADERBOARD_PITCHING, {
      variables: { input: { type: "pitch_velocity" } },
    });

  useEffect(() => {
    getBatting();
  }, [getBatting]);

  const battings = battingData?.leaderboard_batting?.leaderboard_batting;
  const pitchings = pitchingData?.leaderboard_pitching?.leaderboard_pitching;

  console.log("battingData", battings);
  console.log("pitchingData", pitchings);

  return (
    <AuthLayout>
      <Wrapper>
        <TopInner>
          <PageTitle>Leaderboard</PageTitle>
          <Filters></Filters>
        </TopInner>

        <StyledTabs onSelect={(index) => handleTabSelect(index)}>
          <StyledTabList>
            <StyledTab>Batting</StyledTab>
            <StyledTab>Pitching</StyledTab>
          </StyledTabList>

          <StyledTabPanel>
            {isBattingLoading ? (
              <Loader />
            ) : (
              battings && (
                <BattingTable battings={battings} getBatting={getBatting} />
              )
            )}
          </StyledTabPanel>
          <StyledTabPanel>
            {isPitchingLoading ? (
              <Loader />
            ) : (
              pitchings &&
              pitchings.map((item: any) => {
                return JSON.stringify(item);
              })
            )}
          </StyledTabPanel>
        </StyledTabs>
      </Wrapper>
    </AuthLayout>
  );
};

const Wrapper = styled.div`
  background-color: var(--white);
  flex-grow: 1;
  padding: 16px;
`;
const TopInner = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 16px;
`;

const PageTitle = styled.h1`
  font-size: 24px;
  line-height: 1.25;
  font-weight: 400;
  text-align: center;
  color: #667784;
`;
const Filters = styled.div`
  display: flex;
  justify-content: space-between;
`;
const StyledTabs = styled(Tabs)`
  -webkit-tap-highlight-color: transparent;
`;
const StyledTabList = styled(TabList)`
  display: flex;
  margin: 0 0 10px;
  padding: 0;
`;

const StyledTab = styled(Tab)`
  cursor: pointer;
  padding: 8px;
  margin: 8px;
  border: 2px solid #788b99;
  border-radius: 40px;
  font-size: 14px;
  line-height: 17px;
  font-weight: 700;
  &.react-tabs__tab--selected {
    background: #788b99;
    color: #fff;
  }
  &:hover {
    color: #788b99;
    background: rgba(120, 139, 153, 0.4);
  }
`;

const StyledTabPanel = styled(TabPanel)`
  display: none;
  &.react-tabs__tab-panel--selected {
    display: block;
  }
`;
export default LeaderboardPage;
