import { FC, useContext } from 'react';
import { set, ref, push } from 'firebase/database';
import { BoardDataCtx } from '../..';
import { database } from '../../firebaseClient';
import { Text, Link, GridItem, IconButton } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import RecordImage from '../RecordImage';

interface ListItemProps {
  uri: string;
  title: string;
  cover_image: string;
  resource_url: string;
  id: string;
  crateId: string;
  year: string | number;
  country: string;
  onClose: () => void;
}
const ListItem: FC<ListItemProps> = ({
  uri,
  title,
  cover_image,
  id,
  crateId,
  resource_url,
  year,
  onClose,
  country,
}) => {
  const { state: boardData } = useContext(BoardDataCtx);
  const [rTitle, rArtist] = title.split(' - ', 2);
  const addRecordHandler = async () => {
    const response = await fetch(resource_url);
    const releaseData = await response.json();
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
      isNew: true
    });
    set(recordIdsRef, [
      ...(boardData.crates[crateId].recordIds || []),
      newRecord.key,
    ]);
    onClose();
  };

  return (
    <GridItem display='flex' flexDir='column' pos='relative'>
      <RecordImage
        image={cover_image}
        width='full'
        adStyles={{ marginBottom: '4px' }}
      />
      <Link
        href={`https://www.discogs.com${uri}`}
        fontSize='xs'
        fontWeight='bold'
        target='_blank'
      >
        {rTitle}
        {(year || country) &&
          ` (${year ? year : ''}${year && country ? ', ' : ''}${
            country ? country : ''
          })`}
      </Link>
      <IconButton
        aria-label='add'
        icon={<AddIcon />}
        pos='absolute'
        top='5px'
        right='5px'
        size='xs'
        onClick={addRecordHandler}
      />
      <Text fontSize='xs'>{rArtist}</Text>
    </GridItem>
  );
};

export default ListItem;
