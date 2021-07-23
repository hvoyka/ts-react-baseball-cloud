import styled, { css } from "styled-components";
import { usePagination } from "utils";

interface PaginationProps {
  totalCount: number;
  pageSize: number;
  currentPage: number;
  siblingCount?: number;
  onPaginationClick: (index: number) => void;
}

const Pagination = ({
  totalCount,
  pageSize,
  currentPage,
  siblingCount = 1,
  onPaginationClick,
}: PaginationProps) => {
  const totalPageCount = Math.ceil(totalCount / pageSize);

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });

  if (currentPage === 0 || (paginationRange && paginationRange.length < 2)) {
    return null;
  }

  return (
    <Root>
      <List>
        {currentPage !== 1 && (
          <ItemButton onClick={() => onPaginationClick(1)}>{`<<`}</ItemButton>
        )}

        {paginationRange?.map((item, index) => {
          if (typeof item === "string") {
            return <li key={index}>...</li>;
          }
          return (
            <li key={index}>
              <ItemButton
                $isActive={item === currentPage}
                onClick={() => onPaginationClick(item)}
              >
                {item}
              </ItemButton>
            </li>
          );
        })}

        {currentPage !== totalPageCount && (
          <ItemButton
            onClick={() => onPaginationClick(totalPageCount)}
          >{`>>`}</ItemButton>
        )}
      </List>
    </Root>
  );
};

const Root = styled.div`
  margin: 40px auto;
  display: flex;
  justify-content: center;
`;

const List = styled.ul`
  display: flex;
`;

const ItemButton = styled.button<{ $isActive?: boolean }>`
  margin-right: 10px;
  position: relative;
  padding: 6px 12px;
  line-height: 1.42857143;
  color: #414f5a;
  border: none;
  text-decoration: none;
  border-radius: 4px;
  margin: 0 2px;
  background-color: #f7f8f9;
  cursor: pointer;
  &:hover {
    color: #23527c;
    background-color: #eee;
    border-color: #ddd;
  }
  ${({ $isActive }) =>
    $isActive &&
    css`
      pointer-events: none;
      color: #fff;
      cursor: default;
      background-color: #48bbff;
      border: none;
    `}
`;

export default Pagination;
