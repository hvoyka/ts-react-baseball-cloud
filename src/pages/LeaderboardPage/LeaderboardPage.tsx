import { FC, useEffect, useState } from "react";
import styled from "styled-components";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import Select from "react-select";
import { AuthLayout } from "layouts";
import { useLazyQuery } from "@apollo/client";
import {
  GET_LEADERBOARD_BATTING,
  GET_LEADERBOARD_PITCHING,
} from "apollo/queries";
import { Loader } from "ui";
import { BattingTable } from "./components/BattingTable";

import { useDebounce, POSITIONS_OPTIONS } from "utils";
import { PitchingTable } from "./components/PitchingTable";

const POSITIONS_SELECT_OPTIONS = [
  { label: "All", value: "" },
  ...POSITIONS_OPTIONS,
];

const DATE_SELECT_OPTIONS = [
  { label: "All", value: "" },
  { label: "Last Week", value: "last_week" },
  { label: "Last Month", value: "last_month" },
];

const LeaderboardPage: FC = () => {
  const [searchSchoolValue, setSearchSchoolValue] = useState("");
  const [dateValue, setDateValue] = useState("");
  const [positionValue, setPositionValue] = useState("");
  const debouncedSearchSchoolValue = useDebounce(searchSchoolValue, 500);

  const [
    getBatting,
    { loading: isBattingLoading, data: battingData, refetch: refetchBatting },
  ] = useLazyQuery(GET_LEADERBOARD_BATTING, {
    variables: {
      input: {
        type: "exit_velocity",
        date: dateValue,
        school: debouncedSearchSchoolValue,
        position: positionValue,
      },
    },
  });

  const [
    getPitching,
    {
      loading: isPitchingLoading,
      data: pitchingData,
      refetch: refetchPitching,
    },
  ] = useLazyQuery(GET_LEADERBOARD_PITCHING, {
    variables: {
      input: {
        type: "pitch_velocity",
        date: dateValue,
        school: debouncedSearchSchoolValue,
        position: positionValue,
      },
    },
  });

  useEffect(() => {
    getBatting();
  }, [getBatting]);

  const handleTabSelect = (index: number) => {
    index === 1 ? getPitching() : getBatting();
  };

  const battings = battingData?.leaderboard_batting?.leaderboard_batting || [];
  const pitchings =
    pitchingData?.leaderboard_pitching?.leaderboard_pitching || [];

  return (
    <AuthLayout>
      <Wrapper>
        <TopInner>
          <PageTitle>Leaderboard</PageTitle>
          <Filters>
            <StyledSelect
              options={DATE_SELECT_OPTIONS}
              classNamePrefix={"select"}
              placeholder="Date"
              onChange={(option: { value: string }) =>
                setDateValue(option.value)
              }
            />
            <StyledInput
              name="school"
              placeholder="School"
              onChange={(e) => setSearchSchoolValue(e.target.value)}
            />
            <StyledSelect
              options={POSITIONS_SELECT_OPTIONS}
              classNamePrefix={"select"}
              placeholder="Position"
              onChange={(option: { value: string }) =>
                setPositionValue(option.value)
              }
            />
          </Filters>
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
              <BattingTable
                battings={battings}
                onFavoriteClick={() => {
                  if (refetchBatting) refetchBatting();
                }}
              />
            )}
          </StyledTabPanel>
          <StyledTabPanel>
            {isPitchingLoading ? (
              <Loader />
            ) : (
              <PitchingTable
                pitchings={pitchings}
                onFavoriteClick={() => {
                  if (refetchPitching) refetchPitching();
                }}
              />
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
  color: var(--gray4);
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
  border: 2px solid var(--gray2);
  border-radius: 40px;
  font-size: 14px;
  line-height: 17px;
  font-weight: 700;
  &.react-tabs__tab--selected {
    background: var(--gray2);
    color: var(--white);
  }
  &:hover {
    color: var(--gray2);
    background: rgba(120, 139, 153, 0.4);
  }
`;

const StyledTabPanel = styled(TabPanel)`
  display: none;
  &.react-tabs__tab-panel--selected {
    display: block;
  }
`;

const StyledSelect = styled(Select)`
  .select__control {
    min-width: 120px;
    min-height: 38px;
    background-color: transparent;
    border-color: transparent;
  }
  .select__single-value,
  .select__menu {
    color: var(--gray4);
  }

  .select__control--is-focused {
    box-shadow: none;
    &:hover {
      border: solid 1px var(--blue1);
    }
  }
  .select__placeholder,
  .select__single-value {
    color: var(--blue1);
  }
  .select__multi-value {
    border: 1px solid rgba(0, 126, 255, 0.24);
    background-color: var(--blue5);
    background-color: rgba(0, 126, 255, 0.08);
  }
  .select__indicator-separator {
    display: none;
  }
  .select__dropdown-indicator {
    color: var(--blue1);
  }
`;

const StyledInput = styled.input`
  color: var(--gray2);
  &::placeholder {
    color: var(--blue1);
  }
  &:focus,
  &:active {
    border-bottom: 1px solid var(--blue1);
    outline: none;
    color: var(--gray2);
  }
`;

export default LeaderboardPage;
