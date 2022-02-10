import styled from 'styled-components';
import { RecordType } from '../../types';
import { FC, useState } from 'react';
import CardModal from '../CardModal';
import { Draggable } from 'react-beautiful-dnd';
import RecordWindow from './RecordWindow';
import RecordImage from '../RecordImage';

const ListCard = styled.div`
  background-color: #fff;
  box-shadow: 0 1px 0 #091e4240;
  cursor: pointer;
  display: block;
  margin-bottom: 8px;
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
  padding: 6px 8px;
  position: relative;
  z-index: 10;
  display: flex;
`;

const Title = styled.div`
  word-wrap: break-word;
  clear: both;
  color: #172b4d;
  display: block;
  overflow: hidden;
  text-decoration: none;
  font-weight: bold;
  font-size: 12px;
  margin-bottom: 7px;
`;

const Artist = styled.span``;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 15px;
  font-size: 12px;
`;

interface RecordProps extends RecordType {
  index: number;
}
const Record: FC<RecordProps> = ({
  title,
  id,
  index,
  cover_image,
  artist,
  discogsId,
}) => {
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
              <RecordImage image={cover_image} width='100' />
              <Content>
                <Title>{title}</Title>
                <Artist>{artist}</Artist>
              </Content>
            </ListDetails>
          </ListCard>
        )}
      </Draggable>
      {entered && (
        <CardModal onClose={closeHandler}>
          <RecordWindow discogsId={discogsId} cover_image={cover_image} />
        </CardModal>
      )}
    </>
  );
};

export default Record;
