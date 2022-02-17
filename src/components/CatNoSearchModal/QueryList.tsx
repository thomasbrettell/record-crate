import { FC } from 'react';
import ListItem from './ListItem';
import { DiscogsDBQuery, DiscogsDBRelease } from '../../types';
import { Grid } from '@chakra-ui/react';

interface QueryListProps {
  crateId: string;
  onClose: () => void;
  releases: DiscogsDBQuery;
}

const sortVinylFirst = (a: DiscogsDBRelease, b: DiscogsDBRelease) => {
  if (a.format[0] === 'Vinyl' && b.format[0] !== 'Vinyl') {
    return -1;
  }

  return 0;
};

const QueryList: FC<QueryListProps> = ({ crateId, onClose, releases }) => {
  return (
    <Grid templateColumns='repeat(5, 1fr)' rowGap='8' columnGap='4'>
      {releases &&
        releases.results
          .sort(sortVinylFirst)
          .map((release, i) => (
            <ListItem
              key={release.id}
              title={release.title}
              uri={release.uri}
              cover_image={release.cover_image}
              id={release.id}
              crateId={crateId}
              onClose={onClose}
              country={release.country}
              year={release.year}
              label={release.label}
              style={release.style}
              master_id={release.master_id}
              format={release.format}
              catno={release.catno}
              genre={release.genre}
            />
          ))}
    </Grid>
  );
};

export default QueryList;
