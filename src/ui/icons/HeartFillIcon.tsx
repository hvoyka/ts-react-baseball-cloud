import * as React from "react";
import { FC } from "react";
import styled, { css, keyframes } from "styled-components";

interface HeartFillIconProps {
  loading?: boolean;
  rest?: React.SVGProps<SVGSVGElement>;
}

export const HeartFillIcon: FC<HeartFillIconProps> = ({
  loading = false,
  ...rest
}) => {
  return (
    <Svg
      $loading={loading}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 477.534 477.534"
      fill="#48bbff"
      width="14px"
      height="14px"
      {...rest}
    >
      <path d="M438.482 58.61a130.815 130.815 0 00-95.573-41.711 130.968 130.968 0 00-95.676 41.694l-8.431 8.909-8.431-8.909C181.284 5.762 98.663 2.728 45.832 51.815a130.901 130.901 0 00-6.778 6.778c-52.072 56.166-52.072 142.968 0 199.134l187.358 197.581c6.482 6.843 17.284 7.136 24.127.654.224-.212.442-.43.654-.654l187.29-197.581c52.068-56.16 52.068-142.957-.001-199.117z" />
    </Svg>
  );
};

const Svg = styled.svg<{ $loading: boolean }>`
  ${({ $loading }) =>
    $loading &&
    css`
      animation: ${rotate} 2s linear infinite;
    `}
`;

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;
