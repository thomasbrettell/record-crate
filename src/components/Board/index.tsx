import styled from 'styled-components';
import Crate from '../Crate';
import AddListButton from './AddListButton';
import { useContext } from 'react';
import { BoardDataCtx } from '../..';
import { DragDropContext, DropResult, Droppable } from 'react-beautiful-dnd';

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
  const onDragEnd = (e: DropResult) => {
    console.log(e);
  };

  return (
    <Wrapper>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="all-crates" direction="horizontal" type="crate">
          {(provided) => (
            <Box {...provided.droppableProps} ref={provided.innerRef}>
              {boardData.crateOrder && boardData.crateOrder.map((crateId, i) => {
                const crate = boardData.crates[crateId];
                return (
                  <Crate
                    key={crate.id}
                    title={crate.title}
                    id={crate.id}
                    recordIds={crate.recordIds}
                    index={i}
                  />
                );
              })}
              {provided.placeholder}
              <AddListButton />
            </Box>
          )}
        </Droppable>
      </DragDropContext>
    </Wrapper>
  );
};

export default Board;
