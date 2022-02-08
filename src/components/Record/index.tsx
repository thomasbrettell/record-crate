import styled from 'styled-components';
import { RecordType } from '../../types';
import { DragEvent, FC, useState } from 'react';
import CardModal from '../CardModal';
import { Draggable } from 'react-beautiful-dnd';

const ListCard = styled.div`
  background-color: #fff;
  border-radius: 3px;
  box-shadow: 0 1px 0 #091e4240;
  cursor: pointer;
  display: block;
  margin-bottom: 8px;
  max-width: 300px;
  min-height: 20px;
  position: relative;
  text-decoration: none;
  z-index: 0;
  font-size: 14px;

  &:hover {
    background-color: #f4f5f7;
  }
`;

const ListDetails = styled.div`
  overflow: hidden;
  padding: 6px 8px 2px;
  position: relative;
  z-index: 10;
`;

const ListTitle = styled.div`
  word-wrap: break-word;
  clear: both;
  color: #172b4d;
  display: block;
  margin: 0 0 4px;
  overflow: hidden;
  text-decoration: none;
`;

interface RecordProps extends RecordType {
  index: number;
}
const Record: FC<RecordProps> = ({ title, id, index }) => {
  const [entered, setEntered] = useState(false);
  const clickHandler = () => {
    setEntered(true);
  };
  const closeHandler = () => {
    setEntered(false);
  };

  return (
    <>
      <Draggable draggableId={id} index={index}>
        {(provided) => (
          <ListCard
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            onClick={clickHandler}
          >
            <ListDetails>
              <ListTitle>{title}</ListTitle>
            </ListDetails>
          </ListCard>
        )}
      </Draggable>
      {entered && <CardModal onClose={closeHandler} />}
    </>
  );
};

export default Record;
