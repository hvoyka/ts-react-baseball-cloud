import React, { FC } from "react";
import styled from "styled-components";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";

import { CheckIcon } from "ui";

interface RegistrationTabsProps {
  onTabChange: (index: number) => void;
}

const RegistrationTabs: FC<RegistrationTabsProps> = ({ onTabChange }) => {
  return (
    <StyledTabs onSelect={(index: number) => onTabChange(index)}>
      <StyledTabList>
        <StyledTab>
          <TabIconWrapper>
            <CheckIcon fill="#fff" width={14} height={14} />
          </TabIconWrapper>
          Sign Up as Player
        </StyledTab>
        <StyledTab>
          <TabIconWrapper>
            <CheckIcon fill="#fff" width={14} height={14} />
          </TabIconWrapper>
          Sign Up as Scout
        </StyledTab>
      </StyledTabList>

      <StyledTabPanel>
        <Title>Players</Title>
        <Text>
          Players have their own profile within the system and plan on having
          data collected.
        </Text>
      </StyledTabPanel>
      <StyledTabPanel>
        <Title>Scouts</Title>
        <Text>
          Coaches and scouts can view players in the system but do not have
          their own profile.
        </Text>
      </StyledTabPanel>
    </StyledTabs>
  );
};

const StyledTabs = styled(Tabs)`
  margin-bottom: 20px;
`;

const StyledTabList = styled(TabList)`
  display: flex;
  margin-bottom: 20px;
`;

const StyledTab = styled(Tab)`
  padding: 15px 5px 17px;
  flex: 0 1 50%;
  display: flex;
  cursor: pointer;
  justify-content: center;
  color: var(--green1);
  font-size: 16px;
  font-weight: 700;
  line-height: 1.13;
  border-radius: 0;
  border-top-right-radius: 0px;
  border-bottom-right-radius: 0px;
  border: solid 1px var(--green1);
  background-color: var(--white);
  &.react-tabs__tab--selected {
    background-color: var(--green1);
    color: var(--white);
    border: solid 1px var(--green1);
  }
`;

const TabIconWrapper = styled.div`
  margin-right: 6px;
`;

const StyledTabPanel = styled(TabPanel)`
  &.react-tabs__tab-panel--selected {
    display: block;
    background: var(--blue1);
    border-radius: 8px;
    padding: 16px;
    margin-bottom: 16px;
  }
`;

const Title = styled.h2`
  text-align: center;
  font-size: 36px;
  font-weight: 700;
  line-height: 0.78;
  color: var(--white);
  margin-bottom: 21px;
`;

const Text = styled.p`
  text-align: center;
  line-height: 1.44;
  color: var(--white);
`;

export default RegistrationTabs;
