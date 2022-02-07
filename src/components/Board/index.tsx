import styled from 'styled-components';
import Crate from '../Crate';
import AddListButton from './AddListButton';
import { useContext } from 'react';
import { BoardDataCtx } from '../..';

const Box = styled.div`
  bottom: 0;
  left: 0;
  margin-bottom: 8px;
  overflow-x: auto;
  overflow-y: hidden;
  padding-bottom: 8px;
  position: absolute;
  right: 0;
  top: 0;
  user-select: none;
  white-space: nowrap;
  padding-top: 16px;
  margin-top: 16px;
`;

const Wrapper = styled.div`
  position: relative;
  height: 100%;
`;

const Board = () => {
  const { state: boardData } = useContext(BoardDataCtx);

  return (
    <Wrapper>
      <Box>
        {boardData.crateOrder.map((crateId) => {
          const crate = boardData.crates[crateId];
          return (
            <Crate
              key={crate.id}
              title={crate.title}
              id={crate.id}
              recordIds={crate.recordIds}
            />
          );
        })}
        <AddListButton />
      </Box>
    </Wrapper>
  );
};

export default Board;
