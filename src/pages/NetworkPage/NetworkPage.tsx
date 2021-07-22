import { FC, useEffect, useState } from "react";
import styled from "styled-components";
import Select from "react-select";
import { AuthLayout } from "layouts";
import { useLazyQuery } from "@apollo/client";

import { Loader } from "ui";
import { POSITIONS_OPTIONS } from "utils/constants";
/* import useDebounce from "utils/useDebounce"; */
import { GET_PROFILES } from "apollo/queries";
import { ProfilesTable } from "./components/ProfilesTable";
import { Pagination } from "./components/Pagination";

const POSITIONS_SELECT_OPTIONS = [
  { label: "All", value: "" },
  ...POSITIONS_OPTIONS,
];

const LeaderboardPage: FC = () => {
  const [positionValue, setPositionValue] = useState("");
  const [profilesPerPage, setProfilesPerPage] = useState(10);
  const [profilesTotal, setProfilesTotal] = useState(0);
  const [pagesOffset, setPagesOffset] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const [
    getProfiles,
    { loading: isProfilesLoading, data: priflesData, refetch: refetchProfiles },
  ] = useLazyQuery(GET_PROFILES, {
    variables: {
      input: {
        profiles_count: profilesPerPage,
        offset: pagesOffset,
        position: positionValue,
      },
    },
    onCompleted: () => {
      setProfilesTotal(priflesData?.profiles?.total_count);
    },
  });

  useEffect(() => {
    getProfiles();
  }, [getProfiles]);

  const profiles = priflesData?.profiles?.profiles;

  return (
    <AuthLayout>
      <Wrapper>
        <TopInner>
          <PageTitle>Network</PageTitle>
          <Filters>
            <StyledInput name="school" placeholder="School" />
            <StyledSelect
              options={POSITIONS_SELECT_OPTIONS}
              classNamePrefix={"select"}
              placeholder="Position"
              onChange={(option: { value: string }) =>
                setPositionValue(option.value)
              }
            />
            <StyledSelect
              options={[
                { label: "10", value: 10 },
                { label: "15  ", value: 15 },
                { label: "25", value: 25 },
              ]}
              classNamePrefix={"select"}
              placeholder="Show"
              onChange={(option: { value: number }) =>
                setProfilesPerPage(option.value)
              }
            />
          </Filters>
        </TopInner>
        {isProfilesLoading ? (
          <Loader />
        ) : (
          profiles && (
            <>
              <ProfilesTable
                profiles={profiles}
                onFavoriteClick={() => {
                  if (refetchProfiles) refetchProfiles();
                }}
              />
              <Pagination
                totalCount={profilesTotal}
                pageSize={profilesPerPage}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                onPaginationClick={setPagesOffset}
              />
            </>
          )
        )}
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
