import { FC } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Text,
  Link,
  Box,
} from '@chakra-ui/react';
import RecordImage from '../RecordImage';
import { RecordType } from '../../types';

interface RecordWindowProps {
  record: RecordType;
  onClose: () => void;
}
const RecordWindow: FC<RecordWindowProps> = ({ record, onClose }) => {
  const { cover_image, title, artist, uri, year, country, format } = record;
  return (
    <Modal isOpen={true} onClose={onClose}>
      <ModalOverlay />
      <ModalContent maxW='900px'>
        <ModalHeader display='flex' paddingRight='55px'>
          <RecordImage
            image={cover_image}
            adStyles={{
              marginRight: '10px',
            }}
          />
          <Box>
            <Link
              href={`https://www.discogs.com${uri}`}
              target='_blank'
              display='block'
              fontWeight='black'
              marginBottom='5px'
              fontSize='xx-large'
            >
              {title}
            </Link>
            <Text fontSize='lg' marginBottom='15px'>
              {artist}
            </Text>
            {country && <Text fontSize='sm'>Country: {country}</Text>}
            {year && <Text fontSize='sm'>Released: {year}</Text>}
            {format && <Text fontSize='sm'>Format: {format.join(', ')}</Text>}
          </Box>
        </ModalHeader>
        <ModalBody></ModalBody>
        <ModalCloseButton />
      </ModalContent>
    </Modal>
  );
};

export default RecordWindow;
