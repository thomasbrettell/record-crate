import { FC } from 'react';
import ModalWindow from '../UI/ModalWindow';
import useDiscogsId from '../../hooks/useDiscogsId';
import styled from 'styled-components';

const RecordImage = styled.div`
  width: 150px;
  background-size: cover;
  &:after {
    content: '';
    display: block;
    padding-bottom: 100%;
  }
`;

interface RecordWindowProps {
  discogsId: string | number;
  cover_image: string;
}
const RecordWindow: FC<RecordWindowProps> = ({ discogsId, cover_image }) => {
  const { response } = useDiscogsId(discogsId);
  console.log(response);
  if (!response) return null;
  return (
    <ModalWindow>
      <RecordImage style={{ backgroundImage: `url(${cover_image})` }} />
      {response.title}
    </ModalWindow>
  );
};

export default RecordWindow;
