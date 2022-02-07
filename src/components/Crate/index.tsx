import styled from 'styled-components';
import Record from '../Record';
import { CrateType } from '../../types';
import Composer from './Composer';
import { ChangeEvent, useContext } from 'react';
import { update, ref } from 'firebase/database';
import { database } from '../../firebaseClient';
import { BoardDataCtx } from '../..';
import { Draggable, Droppable } from 'react-beautiful-dnd';

export const Wrapper = styled.div`
  box-sizing: border-box;
  display: inline-block;
  height: 100%;
  margin: 0 4px;
  vertical-align: top;
  white-space: nowrap;
  width: 272px;

  &:first-child {
    margin-left: 16px;
  }

  &:last-child {
    margin-right: 16px;
  }
`;

export const Content = styled.div`
  background-color: #ebecf0;
  border-radius: 3px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  max-height: 100%;
  position: relative;
  white-space: normal;
  width: 100%;
  cursor: pointer;
`;

const CrateList = styled.div`
  flex: 1 1 auto;
  margin: 0 4px;
  min-height: 0;
  overflow-x: hidden;
  overflow-y: auto;
  padding: 0 4px;
  z-index: 1;
`;

const Header = styled.div`
  flex: 0 0 auto;
  min-height: 20px;
  padding: 10px 8px;
  position: relative;
`;

const Textarea = styled.textarea`
  resize: none;
  background: #0000;
  border-radius: 3px;
  box-shadow: none;
  font-weight: 600;
  height: 20px;
  margin: -4px 0;
  max-height: 256px;
  min-height: 20px;
  padding: 4px 8px;
  resize: none;
  width: 100%;
  overflow: hidden;
  overflow-wrap: break-word;
  height: 28px;
  font-family: inherit;
  border: none;
`;

interface CrateProps extends CrateType {
  index: number;
}
const List = ({ title, id, recordIds, index }: CrateProps) => {
  const { state: boardData } = useContext(BoardDataCtx);

  const renameHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
    // const listRef = ref(
    //   database,
    //   `boards/${process.env.REACT_APP_ENV}-board/lists/${index}`
    // );
    // update(listRef, {
    //   title: e.target.value,
    // });
  };

  return (
    <Draggable draggableId={id} index={index}>
      {(provided) => (
        <Wrapper {...provided.draggableProps} ref={provided.innerRef}>
          <Content {...provided.dragHandleProps}>
            <Header>
              <Textarea defaultValue={title} onBlur={renameHandler}></Textarea>
            </Header>
            <Droppable droppableId={`${id}-records`} direction='vertical'>
              {(provided) => (
                <CrateList {...provided.droppableProps} ref={provided.innerRef}>
                  {recordIds.map((recordId, i) => {
                    const record = boardData.records[recordId];
                    return (
                      <Record
                        key={record.id}
                        title={record.title}
                        id={record.id}
                        index={i}
                      />
                    );
                  })}
                  {provided.placeholder}
                </CrateList>
              )}
            </Droppable>
            <Composer listIndex={1} />
          </Content>
        </Wrapper>
      )}
    </Draggable>
  );
};

export default List;
