import React from "react";

import styled from "styled-components";
import Select from "react-select";

const FormSelect: React.FC<any> = ({ label, input, meta, ...rest }) => {
  return (
    <Root>
      <StyledSelect {...input} {...rest} classNamePrefix={"select"} />
      {meta && meta.touched && meta.error && (
        <ErrorText>{meta.error}</ErrorText>
      )}
    </Root>
  );
};

const Root = styled.div`
  position: relative;
  padding-bottom: 15px;
`;

const StyledSelect = styled(Select)`
  .select__control {
    max-width: 100%;
    height: 38px;
    background-color: var(--gray5);
    border-color: transparent;
  }
  .select__single-value,
  .select__menu {
    color: var(--gray4);
  }

  .select__control--is-focused {
    &:hover {
      border: solid 1px var(--blue1);
    }
  }
`;

const ErrorText = styled.p`
  color: var(--red1);
  position: absolute;
  bottom: 0;
  left: 0;
`;

export default FormSelect;
