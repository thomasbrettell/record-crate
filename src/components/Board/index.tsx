import styled from 'styled-components';
import List from '../List';
import { BoardProps } from '../../types';
import AddListButton from './AddListButton';

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
  -webkit-user-select: none;
  user-select: none;
  white-space: nowrap;
  padding-top: 16px;
  margin-top: 16px;
`;

const Wrapper = styled.div`
  position: relative;
  height: 100%;
`;

const Board = ({ lists, title }: BoardProps) => {
  return (
    <Wrapper>
      <Box>
        {lists &&
          lists.map((list, i) => (
            <List key={`list-${i}`} index={i} title={list.title} cards={list.cards} />
          ))}
        <AddListButton nextI={lists.length} />
      </Box>
    </Wrapper>
  );
};

export default Board;
