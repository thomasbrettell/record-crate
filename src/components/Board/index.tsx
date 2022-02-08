import styled from 'styled-components';
import Crate from '../Crate';
import AddListButton from './AddListButton';
import { useContext } from 'react';
import { BoardDataCtx } from '../..';
import { DragDropContext, DropResult, Droppable } from 'react-beautiful-dnd';
import { ref, set } from 'firebase/database';
import { database } from '../../firebaseClient';
import Header from '../Header';

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
  padding-left: 16px;
  padding-right: 16px;
`;

const Wrapper = styled.div`
  position: relative;
  height: 100%;
`;

const Board = () => {
  const { state: boardData } = useContext(BoardDataCtx);
  const onDragEnd = ({
    destination,
    source,
    draggableId,
    type,
  }: DropResult) => {
    if (!destination || !boardData.crateOrder) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }
    if (type === 'crate') {
      const crateOrderRef = ref(database, `boards/${boardData.id}/crateOrder`);
      const newCrateOrder = Array.from(boardData.crateOrder);
      newCrateOrder.splice(source.index, 1);
      newCrateOrder.splice(destination.index, 0, draggableId);
      set(crateOrderRef, newCrateOrder);
    } else if (type === 'record') {
      const initialCrate = boardData.crates[source.droppableId];
      const endCrate = boardData.crates[destination.droppableId];

      if (initialCrate === endCrate) {
        const recordIdsRef = ref(
          database,
          `boards/${boardData.id}/crates/${destination.droppableId}/recordIds`
        );
        const newRecordIds = Array.from(endCrate.recordIds || []);
        newRecordIds.splice(source.index, 1);
        newRecordIds.splice(destination.index, 0, draggableId);
        set(recordIdsRef, newRecordIds);
      } else {
        const initialRecordIdsRef = ref(
          database,
          `boards/${boardData.id}/crates/${source.droppableId}/recordIds`
        );
        const endRecordIdsRef = ref(
          database,
          `boards/${boardData.id}/crates/${destination.droppableId}/recordIds`
        );
        const newInitialRecordIds = Array.from(initialCrate.recordIds || []);
        const newEndRecordIds = Array.from(endCrate.recordIds || []);

        newInitialRecordIds.splice(source.index, 1);
        newEndRecordIds.splice(destination.index, 0, draggableId);

        set(initialRecordIdsRef, newInitialRecordIds);
        set(endRecordIdsRef, newEndRecordIds);
      }
    }
  };

  return (
    <>
      <Header />
      <Wrapper>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable
            droppableId='all-crates'
            direction='horizontal'
            type='crate'
          >
            {(provided) => (
              <Box {...provided.droppableProps} ref={provided.innerRef}>
                {boardData.crateOrder &&
                  boardData.crateOrder.map((crateId, i) => {
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
    </>
  );
};

export default Board;
