import * as React from "react";
import styled, { css, keyframes } from "styled-components";

interface HeartFillIconProps {
  loading?: boolean;
  rest?: React.SVGProps<SVGSVGElement>;
}

export const HeartIcon: React.FC<HeartFillIconProps> = ({
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
      <path d="M438.482 58.61a130.815 130.815 0 00-95.573-41.711 130.968 130.968 0 00-95.676 41.694l-8.431 8.909-8.431-8.909C181.284 5.762 98.662 2.728 45.832 51.815a130.901 130.901 0 00-6.778 6.778c-52.072 56.166-52.072 142.968 0 199.134l187.358 197.581c6.482 6.843 17.284 7.136 24.127.654.224-.212.442-.43.654-.654l187.29-197.581c52.068-56.16 52.068-142.957-.001-199.117zm-24.695 175.616h-.017L238.802 418.768 63.818 234.226c-39.78-42.916-39.78-109.233 0-152.149 36.125-39.154 97.152-41.609 136.306-5.484a96.482 96.482 0 015.484 5.484l20.804 21.948c6.856 6.812 17.925 6.812 24.781 0l20.804-21.931c36.125-39.154 97.152-41.609 136.306-5.484a96.482 96.482 0 015.484 5.484c40.126 42.984 40.42 109.422 0 152.132z" />
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
