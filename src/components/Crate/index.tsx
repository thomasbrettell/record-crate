import styled from 'styled-components';
import Record from '../Record';
import { CrateType } from '../../types';
import Composer from './Composer';
import { ChangeEvent, useContext, useRef, useState } from 'react';
import { set, ref, remove } from 'firebase/database';
import { database } from '../../firebaseClient';
import { BoardDataCtx } from '../..';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import TextareaAutosize from 'react-textarea-autosize';
import IconButton from '../UI/IconButton';
import Close from '../Icons/Close';
import { auth } from '../../firebaseClient';

export const Wrapper = styled.div`
  box-sizing: border-box;
  display: inline-block;
  height: 100%;
  margin: 0 4px;
  vertical-align: top;
  white-space: nowrap;
  width: 300px;
`;

export const Content = styled.div`
  background-color: #ebecf0;
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
  min-height: 1px;
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
  display: flex;
  padding-right: 35px;
`;

const Textarea = styled(TextareaAutosize)`
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
  line-height: 1.55;
  overflow: hidden;
  overflow-wrap: break-word;
`;

const ClickBlocker = styled.div`
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
`;

const DeleteButton = styled(IconButton)`
  position: absolute;
  top: 8px;
  right: 8px;
  z-index: 1;
  padding: 4px;

  &:hover {
    background-color: #091e4214;
  }
`;

interface CrateProps extends CrateType {
  index: number;
}
const List = ({ title, id, recordIds, index }: CrateProps) => {
  const { state: boardData } = useContext(BoardDataCtx);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [textareaEntered, setTextareaEntered] = useState(false);

  const renameHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const crateTitleRef = ref(
      database,
      `boards/${boardData.id}/crates/${id}/title`
    );
    set(crateTitleRef, e.target.value.trim());
    setTextareaEntered(false);
  };

  const deleteHandler = () => {
    const crateRecords = boardData.crates[id].recordIds;
    const crateOrderRef = ref(database, `boards/${boardData.id}/crateOrder`);
    const crateRef = ref(database, `boards/${boardData.id}/crates/${id}`);
    const newCrateOrder = Array.from(boardData.crateOrder || []);
    newCrateOrder.splice(index, 1);

    crateRecords?.forEach((recordId) => {
      const recordRef = ref(
        database,
        `boards/${boardData.id}/records/${recordId}`
      );
      remove(recordRef);
    });
    remove(crateRef);
    set(crateOrderRef, newCrateOrder);
  };

  const textareaEnterHandler = () => {
    if (!auth.currentUser) return;
    setTextareaEntered(true);
    textareaRef.current?.focus();
  };

  return (
    <Draggable draggableId={id} index={index}>
      {(provided) => (
        <Wrapper {...provided.draggableProps} ref={provided.innerRef}>
          <Content {...provided.dragHandleProps}>
            <Header>
              <Textarea
                ref={textareaRef}
                defaultValue={title}
                onBlur={renameHandler}
              ></Textarea>
              {auth.currentUser && (
                <DeleteButton
                  icon={<Close size={20} />}
                  onClick={deleteHandler}
                />
              )}
              {!textareaEntered && (
                <ClickBlocker onClick={textareaEnterHandler} />
              )}
            </Header>
            <Droppable droppableId={id} direction='vertical' type='record'>
              {(provided) => (
                <CrateList {...provided.droppableProps} ref={provided.innerRef}>
                  {recordIds &&
                    recordIds.map((recordId, i) => {
                      const record = boardData.records[recordId];
                      if (!record) return null;
                      return (
                        <Record
                          key={recordId}
                          title={record.title}
                          id={recordId}
                          index={i}
                          cover_image={record.cover_image}
                          artist={record.artist}
                          discogsId={record.discogsId}
                        />
                      );
                    })}
                  {provided.placeholder}
                </CrateList>
              )}
            </Droppable>
            <Composer crateId={id} />
          </Content>
        </Wrapper>
      )}
    </Draggable>
  );
};

export default List;
