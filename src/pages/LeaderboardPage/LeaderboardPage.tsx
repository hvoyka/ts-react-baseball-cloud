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
import { POSITIONS_OPTIONS } from "utils/constants";
import useDebounce from "utils/useDebounce";

const POSITIONS_SELECT_OPTIONS = [
  { label: "All", value: "all" },
  ...POSITIONS_OPTIONS,
];

const DATE_SELECT_OPTIONS = [
  { label: "All", value: "all" },
  { label: "Last Week", value: "last_week" },
  { label: "Last Month", value: "last_month" },
];

const LeaderboardPage: FC = () => {
  const [searchSchoolValue, setSearchSchoolValue] = useState("");
  const debouncedSearchSchoolValue = useDebounce(searchSchoolValue, 500);

  const [getBatting, { loading: isBattingLoading, data: battingData }] =
    useLazyQuery(GET_LEADERBOARD_BATTING);

  const [getPitching, { loading: isPitchingLoading, data: pitchingData }] =
    useLazyQuery(GET_LEADERBOARD_PITCHING, {
      variables: { input: { type: "pitch_velocity" } },
    });

  useEffect(() => {
    getBatting({
      variables: { input: { type: "exit_velocity" } },
    });
  }, [getBatting]);

  useEffect(() => {
    if (debouncedSearchSchoolValue) {
      getBatting({
        variables: {
          input: { type: "exit_velocity", school: debouncedSearchSchoolValue },
        },
      });
    }
  }, [debouncedSearchSchoolValue, getBatting]);

  const handleTabSelect = (index: number) => {
    index === 1 ? getPitching() : getBatting();
    console.log(index);
  };

  const handlePositionChange = (option: { value: string; label: string }) => {
    getBatting({
      variables: { input: { type: "exit_velocity", position: option.value } },
    });
  };

  const handleDateChange = (option: { value: string; label: string }) => {
    getBatting({
      variables: { input: { type: "exit_velocity", date: option.value } },
    });
  };

  const battings = battingData?.leaderboard_batting?.leaderboard_batting;
  const pitchings = pitchingData?.leaderboard_pitching?.leaderboard_pitching;

  console.log("battingData", battings);
  console.log("pitchingData", pitchings);

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
              onChange={handleDateChange}
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
              onChange={handlePositionChange}
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
    color: #48bbff;
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
    color: #48bbff;
  }
`;

const StyledInput = styled.input`
  &::placeholder {
    color: #48bbff;
  }
  &:focus,
  &:active {
    border-bottom: 1px solid #48bbff;
    outline: none;
    color: #788b99;
    padding-bottom: 6px;
  }
`;

export default LeaderboardPage;
