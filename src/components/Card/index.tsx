import styled from 'styled-components';
import { CardProps } from '../../types';
import { DragEvent, useState } from 'react';
import CardModal from '../CardModal';

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
`;

const Card = ({ title, listIndex }: CardProps) => {
  const [entered, setEntered] = useState(false);
  const dragHandler = (event: DragEvent) => console.log(event);
  const clickHandler = () => {
    setEntered(true);
  };
  const closeHandler = () => {
    setEntered(false);
  };

  return (
    <>
      <ListCard draggable='true' onDrag={dragHandler} onClick={clickHandler}>
        <span>{title}</span>
      </ListCard>
      {entered && <CardModal onClose={closeHandler} />}
    </>
  );
};

export default Card;
