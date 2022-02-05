import styled from 'styled-components';
import { CardProps } from '../../types';
import { DragEvent } from 'react';

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

const Card = ({ title }: CardProps) => {
  const dragHandler = (event: DragEvent) => console.log(event);
  return (
    <ListCard draggable='true' onDrag={dragHandler}>
      <span>{title}</span>
    </ListCard>
  );
};

export default Card;
