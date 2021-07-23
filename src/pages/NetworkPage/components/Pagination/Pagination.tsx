import styled, { css } from "styled-components";

import { FC } from "react";

interface PaginationProps {
  totalCount: number;
  pageSize: number;
  currentPage: number;
  onPaginationClick: (index: number) => void;
  setCurrentPage: (index: number) => void;
}

const Pagination: FC<PaginationProps> = ({
  totalCount,
  pageSize,
  currentPage,
  onPaginationClick,
  setCurrentPage,
}) => {
  const totalPageCount = Math.ceil(totalCount / pageSize);
  const handleClick = (pageIndex: number) => {
    setCurrentPage(pageIndex);
    onPaginationClick((pageIndex - 1) * pageSize);
  };

  const items = [];
  for (let index = 1; index <= totalPageCount; index++) {
    items.push(
      <PaginationItem
        key={index}
        index={index}
        currentPage={currentPage}
        onClick={() => handleClick(index)}
      />
    );
  }

  return (
    <Root>
      <List>
        <ItemButton onClick={() => handleClick(1)}>{`<<`}</ItemButton>
        {items}
        <ItemButton
          onClick={() => handleClick(totalPageCount)}
        >{`>>`}</ItemButton>
      </List>
    </Root>
  );
};

const PaginationItem = ({ index, onClick, currentPage }: any) => {
  return (
    <li key={index}>
      <ItemButton $isActive={index === currentPage} onClick={onClick}>
        {index}
      </ItemButton>
    </li>
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
