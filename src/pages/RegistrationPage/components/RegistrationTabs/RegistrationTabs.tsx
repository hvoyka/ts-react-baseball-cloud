import React, { FC } from "react";
import styled from "styled-components";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";

import { CheckIcon } from "ui";

interface RegistrationTabsProps {
  onTabChange: (index: number) => void;
  className?: string;
}

const RegistrationTabs: FC<RegistrationTabsProps> = ({
  onTabChange,
  className,
}) => {
  return (
    <Tabs
      onSelect={(index: number) => onTabChange(index)}
      className={className}
    >
      <StyledTabList>
        <StyledTab>
          <StyledCheckIcon />
          Sign Up as Player
        </StyledTab>
        <StyledTab>
          <StyledCheckIcon />
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
    </Tabs>
  );
};

const StyledTabList = styled(TabList)`
  display: flex;
  margin-bottom: 20px;
`;

const StyledTab = styled(Tab)`
  padding: 15px 5px 17px;
  flex: 0 1 50%;
  display: flex;
  align-items: center;
  cursor: pointer;
  justify-content: center;
  color: var(--green1);
  font-size: 16px;
  font-weight: 700;
  line-height: 1.13;
  border-radius: 0;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  border: solid 1px var(--green1);
  background-color: var(--white);
  &.react-tabs__tab--selected {
    background-color: var(--green1);
    color: var(--white);
    border: solid 1px var(--green1);
  }
`;

const StyledCheckIcon = styled(CheckIcon)`
  margin-right: 6px;
  width: 14px;
  height: 14px;
  fill: var(--white);
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
