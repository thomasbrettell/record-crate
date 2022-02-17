import styled from 'styled-components';
import { RecordType } from '../../types';
import { FC, useContext } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import RecordWindow from './RecordWindow';
import RecordImage from '../RecordImage';
import { useDisclosure } from '@chakra-ui/react';
import { Badge } from '@chakra-ui/react';
import { database } from '../../firebaseClient';
import { ref, remove } from 'firebase/database';
import { BoardDataCtx } from '../..';
import useIsAuthed from '../../hooks/useIsAuthed';

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
  margin-bottom: 3px;
`;

const Artist = styled.span``;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 15px;
  font-size: 12px;
`;

interface RecordProps {
  index: number;
  record: RecordType;
  id: string;
}
const Record: FC<RecordProps> = ({ index, record, id }) => {
  const { isNew, cover_image, title, artist } = record;
  const { state: boardData } = useContext(BoardDataCtx);
  const isAuthed = useIsAuthed();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const interactHandler = () => {
    onOpen();
    const recordNewRec = ref(
      database,
      `boards/${boardData.id}/records/${id}/isNew`
    );
    isAuthed && isNew && remove(recordNewRec);
  };

  return (
    <>
      <Draggable draggableId={id} index={index}>
        {(provided) => (
          <ListCard
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            onClick={interactHandler}
          >
            <ListDetails>
              <RecordImage image={cover_image} width='100px' />
              <Content>
                <Title>{title}</Title>
                <Artist>{artist}</Artist>
              </Content>
              {isAuthed && isNew && (
                <Badge
                  zIndex='2'
                  position='absolute'
                  top='1'
                  left='1'
                  colorScheme='green'
                  variant='solid'
                >
                  New
                </Badge>
              )}
            </ListDetails>
          </ListCard>
        )}
      </Draggable>
      {isOpen && <RecordWindow onClose={onClose} record={record} />}
    </>
  );
};

export default Record;
