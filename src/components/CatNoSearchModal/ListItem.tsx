import { FC, useContext } from 'react';
import { set, ref, push } from 'firebase/database';
import { BoardDataCtx } from '../..';
import { database } from '../../firebaseClient';
import { Text, Link, GridItem, IconButton } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import RecordImage from '../RecordImage';
import { DiscogsDBRelease } from '../../types';

interface ListItemProps extends DiscogsDBRelease {
  crateId: string;
  onClose: () => void;
}
const ListItem: FC<ListItemProps> = ({
  uri,
  title,
  cover_image,
  id,
  crateId,
  year,
  onClose,
  country,
  format,
  ...props
}) => {
  const { state: boardData } = useContext(BoardDataCtx);
  const [rArtist, rTitle] = title.split(' - ', 2);
  const addRecordHandler = async () => {
    const recordIdsRef = ref(
      database,
      `boards/${boardData.id}/crates/${crateId}/recordIds`
    );
    const recordsRef = ref(database, `boards/${boardData.id}/records`);
    const newRecord = push(recordsRef, {
      title: rTitle || null,
      artist: rArtist || null,
      discogsId: id || null,
      cover_image: cover_image || null,
      uri: uri || null,
      label: props.label || null,
      style: props.style || null,
      catno: props.catno || null,
      genre: props.genre || null,
      format: format || null,
      master_id: props.master_id || null,
      year: year || null,
      isNew: true,
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
        {(year || country || format) &&
          ` (${[year, country, format[0]].filter((el) => el).join(', ')})`}
      </Link>
      <IconButton
        aria-label='add'
        icon={<AddIcon />}
        pos='absolute'
        top='5px'
        right='5px'
        size='xs'
        onClick={addRecordHandler}
        colorScheme='blue'
      />
      <Text fontSize='xs'>{rArtist}</Text>
    </GridItem>
  );
};

export default ListItem;
