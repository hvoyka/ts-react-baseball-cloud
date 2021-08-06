import React from "react";
import styled from "styled-components";

interface StatProgressIconProps {
  value?: number;
  maximumValue?: number;
}

export const StatProgressIcon = ({
  value = 0,
  maximumValue = 100,
}: StatProgressIconProps) => {
  const pathWidth = (100 * value) / maximumValue;

  return (
    <SVG viewBox="0 0 100 1" preserveAspectRatio="none">
      <path
        d="M 0.5,0.5
L 99.5,0.5"
        strokeLinecap="round"
        stroke="#eff1f3"
        strokeWidth="1"
        fillOpacity="0"
      ></path>
      <FillPath
        $pathWidth={pathWidth}
        d="M 0.5,0.5
L 99.5,0.5"
        stroke-strokeLinecap="round"
        stroke="#ffd01a"
        strokeWidth="1"
        fillOpacity="0"
      />
    </SVG>
  );
};

const FillPath = styled.path<{ $pathWidth: number }>`
  stroke-dasharray: ${({ $pathWidth }) => `${$pathWidth}px, 100px`};
  stroke-dashoffset: 0px;
  transition: stroke-dashoffset 0.3s ease 0s, stroke-dasharray 0.3s ease 0s,
    stroke 0.3s linear 0s, 0.06s;
`;
const SVG = styled.svg`
  width: 100%;
  height: 4px;
  vertical-align: top;
`;
