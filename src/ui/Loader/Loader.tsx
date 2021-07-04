import React from "react";
import styled, { keyframes } from "styled-components";

const Loader = () => {
  return (
    <LoaderContainer>
      <Spinner>
        <div></div>
        <div></div>
        <div></div>
      </Spinner>
    </LoaderContainer>
  );
};

const LoaderContainer = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const animation = keyframes`
  0%, 80%, 100% { 
	transform: scale(0);
  }
  40%{
    transform: scale(1.0);
  }
}
`;

const Spinner = styled.div`
  margin: 0 auto 0;
  width: 70px;
  text-align: center;
  div:nth-child(1) {
    animation-delay: -0.32s;
  }
  div:nth-child(2) {
    animation-delay: -0.16s;
  }
  div:nth-child(3) {
    animation-delay: 0s;
  }
  & > div {
    width: 18px;
    height: 18px;
    background-color: #48bbff;
    border-radius: 100%;
    display: inline-block;
    animation: ${animation} 1.4s infinite ease-in-out both;
  }
`;

export default Loader;
