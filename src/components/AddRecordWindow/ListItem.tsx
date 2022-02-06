import { FC, useContext } from 'react';
import styled from 'styled-components';
import { set, ref, child } from 'firebase/database';
import { BoardDataCtx } from '../..';
import { database } from '../../firebaseClient';

const Item = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  & + & {
    margin-top: 20px;
  }
`;

const Image = styled.div`
  background-color: grey;
  width: 80px;
  background-size: cover;
  margin-right: 20px;
  display: inline-block;
  &:after {
    content: '';
    display: block;
    padding-bottom: 100%;
  }
`;

const Left = styled.div`
  display: flex;
  align-items: center;
`;

interface ListItemProps {
  uri: string;
  title: string;
  cover_image: string;
  id: string;
  listIndex: number;
}
const ListItem: FC<ListItemProps> = ({
  uri,
  title,
  cover_image,
  id,
  listIndex,
}) => {
  const { state: boardData } = useContext(BoardDataCtx);
  const addRecordHandler = () => {
    if (!boardData || !boardData.lists) return;
    const nextCardIndex = boardData.lists[listIndex].cards?.length || 0;
    const listRef = ref(
      database,
      `boards/${process.env.REACT_APP_ENV}-board/lists/${listIndex}`
    );
    set(child(listRef, `cards/${nextCardIndex}`), {
      title: title,
      id: id,
    });
  };
  return (
    <Item>
      <Left>
        <Image style={{ backgroundImage: `url(${cover_image})` }} />
        <a
          target='_blank'
          rel='noreferrer'
          href={`https://www.discogs.com${uri}`}
        >
          {title}
        </a>
      </Left>
      <button onClick={addRecordHandler}>Add to crate</button>
    </Item>
  );
};

export default ListItem;
