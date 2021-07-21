import React from "react";

import styled from "styled-components";
import { StatProgressIcon } from "ui";

interface TopValuesProps {
  batting: any;
  pitching: any;
}

const TopValues: React.FC<TopValuesProps> = ({ batting, pitching }) => {
  const { exit_velocity, distance, launch_angle } = batting || {};
  const { velocity, spin_rate, horizontal_break } = pitching || {};

  return (
    <>
      <SummaryBlockWrapper>
        <ContentTopTitle>Top Batting Values</ContentTopTitle>
        <SummaryStatsList>
          <SummaryStatsItem>
            <SummaryStatsItemTop>
              <SummaryStatsTitle>Exit Velocity</SummaryStatsTitle>
              <SummaryStatsValue>
                {exit_velocity ? exit_velocity : "N/A"}
              </SummaryStatsValue>
            </SummaryStatsItemTop>
            <StatProgressIcon
              value={exit_velocity ? exit_velocity : 0}
              maximumValue={190}
            />
          </SummaryStatsItem>
          <SummaryStatsItem>
            <SummaryStatsItemTop>
              <SummaryStatsTitle>Carry Distance</SummaryStatsTitle>
              <SummaryStatsValue>
                {distance ? distance : "N/A"}
              </SummaryStatsValue>
            </SummaryStatsItemTop>
            <StatProgressIcon
              value={distance ? distance : 0}
              maximumValue={540}
            />
          </SummaryStatsItem>
          <SummaryStatsItem>
            <SummaryStatsItemTop>
              <SummaryStatsTitle>Launch Angle</SummaryStatsTitle>
              <SummaryStatsValue>
                {launch_angle ? launch_angle : "N/A"}
              </SummaryStatsValue>
            </SummaryStatsItemTop>
            <StatProgressIcon
              value={launch_angle ? launch_angle : 0}
              maximumValue={60}
            />
          </SummaryStatsItem>
        </SummaryStatsList>
      </SummaryBlockWrapper>

      {pitching && (
        <SummaryBlockWrapper>
          <ContentTopTitle>Top Pitching Values</ContentTopTitle>
          <SummaryStatsList>
            <SummaryStatsItem>
              <SummaryStatsItemTop>
                <SummaryStatsTitle>Fastball Velocity</SummaryStatsTitle>
                <SummaryStatsValue>
                  {velocity ? velocity : "N/A"}
                </SummaryStatsValue>
              </SummaryStatsItemTop>
              <StatProgressIcon
                value={velocity ? velocity : 0}
                maximumValue={150}
              />
            </SummaryStatsItem>
            <SummaryStatsItem>
              <SummaryStatsItemTop>
                <SummaryStatsTitle>Spin Rate</SummaryStatsTitle>
                <SummaryStatsValue>
                  {spin_rate ? spin_rate : "N/A"}
                </SummaryStatsValue>
              </SummaryStatsItemTop>
              <StatProgressIcon
                value={spin_rate ? spin_rate : 0}
                maximumValue={5000}
              />
            </SummaryStatsItem>
            <SummaryStatsItem>
              <SummaryStatsItemTop>
                <SummaryStatsTitle>Pitch Movement</SummaryStatsTitle>
                <SummaryStatsValue>
                  {horizontal_break ? horizontal_break : "N/A"}
                </SummaryStatsValue>
              </SummaryStatsItemTop>
              <StatProgressIcon
                value={horizontal_break ? horizontal_break : 0}
                maximumValue={100}
              />
            </SummaryStatsItem>
          </SummaryStatsList>
        </SummaryBlockWrapper>
      )}
    </>
  );
};

const SummaryBlockWrapper = styled.div`
  background: #fff;
  margin: 16px;
  padding: 16px;
  border-radius: 8px;
`;

const ContentTopTitle = styled.div`
  font-size: 18px;
  font-weight: 900;
  color: #414f5a;
  line-height: 1.25;
`;

const SummaryStatsList = styled.ul`
  display: flex;
  justify-content: space-between;
`;

const SummaryStatsItem = styled.li`
  flex: 0 1 32%;
  padding: 16px 0 0;
`;

const SummaryStatsItemTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 8px;
`;

const SummaryStatsTitle = styled.div`
  font-size: 16px;
  color: #667784;
`;

const SummaryStatsValue = styled.div`
  font-size: 16px;
  color: #667784;
  font-weight: 700;
`;

export default TopValues;
