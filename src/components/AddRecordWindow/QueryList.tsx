import { FC } from 'react';
import useCatNo from '../../hooks/useCatNo';
import styled from 'styled-components';
import ListItem from './ListItem';

const List = styled.div`
  display: flex;
  flex-direction: column;
`;

interface QueryListProps {
  catno: string;
  listIndex: number;
}
const QueryList: FC<QueryListProps> = ({ catno, listIndex }) => {
  const { response, isLoading } = useCatNo(catno);

  return (
    <List>
      {isLoading && <pre>Loading...</pre>}
      {!isLoading &&
        response &&
        response.results.map((release) => (
          <ListItem
            key={release.id}
            title={release.title}
            uri={release.uri}
            cover_image={release.cover_image}
            id={release.id}
            listIndex={listIndex}
          />
        ))}
    </List>
  );
};

export default QueryList;
