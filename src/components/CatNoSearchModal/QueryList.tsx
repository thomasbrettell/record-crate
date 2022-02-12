import { FC } from 'react';
import ListItem from './ListItem';
import { DiscogsDBQuery } from '../../types';
import { Grid } from '@chakra-ui/react';

interface QueryListProps {
  crateId: string;
  onClose: () => void;
  releases: DiscogsDBQuery;
}
const QueryList: FC<QueryListProps> = ({ crateId, onClose, releases }) => {
  return (
    <Grid templateColumns='repeat(5, 1fr)' rowGap='8' columnGap='4'>
      {releases &&
        releases.results.map((release, i) => (
          <ListItem
            key={release.id}
            title={release.title}
            uri={release.uri}
            cover_image={release.cover_image}
            id={release.id}
            crateId={crateId}
            resource_url={release.resource_url}
            onClose={onClose}
            country={release.country}
            year={release.year}
          />
        ))}
    </Grid>
  );
};

export default QueryList;
