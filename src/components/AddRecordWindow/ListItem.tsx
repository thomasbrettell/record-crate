import { FC, useContext } from 'react';
import styled from 'styled-components';
import { set, ref, push, update } from 'firebase/database';
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
  resource_url: string;
  id: string;
  crateId: string;
  onClose: () => void;
}
const ListItem: FC<ListItemProps> = ({
  uri,
  title,
  cover_image,
  id,
  crateId,
  resource_url,
  onClose,
}) => {
  const { state: boardData } = useContext(BoardDataCtx);
  const addRecordHandler = async () => {
    const response = await fetch(resource_url)
    const releaseData = await response.json()
    console.log(releaseData)
    const recordIdsRef = ref(
      database,
      `boards/${boardData.id}/crates/${crateId}/recordIds`
    );
    const recordsRef = ref(database, `boards/${boardData.id}/records`);
    const newRecord = push(recordsRef, {
      title: releaseData.title,
      artist: releaseData.artists.map((artist: any) => artist.name).join(', '),
      discogsId: id,
      cover_image: cover_image,
    });
    set(recordIdsRef, [
      ...(boardData.crates[crateId].recordIds || []),
      newRecord.key,
    ]);
    onClose();
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
