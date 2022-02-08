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
  crateId: string;
  onClose: () => void;
}
const QueryList: FC<QueryListProps> = ({ catno, crateId, onClose }) => {
  const { response, isLoading } = useCatNo(catno);

  console.log(response)

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
            crateId={crateId}
            onClose={onClose}
          />
        ))}
    </List>
  );
};

export default QueryList;
