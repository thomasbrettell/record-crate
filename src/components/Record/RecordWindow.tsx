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
import useDiscogsId from '../../hooks/useDiscogsId';
import RecordImage from '../RecordImage';

interface RecordWindowProps {
  discogsId: string | number;
  cover_image: string;
  onClose: () => void;
}
const RecordWindow: FC<RecordWindowProps> = ({
  discogsId,
  cover_image,
  onClose,
}) => {
  const { response } = useDiscogsId(discogsId);
  if (!response) return null;
  return (
    <Modal isOpen={true} onClose={onClose}>
      <ModalOverlay />
      <ModalContent maxW='xl'>
        <ModalHeader display='flex' paddingRight='55px'>
          <RecordImage
            image={cover_image}
            adStyles={{
              marginRight: '10px',
            }}
          />
          <Box>
            <Link
              href={response.uri}
              target='_blank'
              display='block'
              fontWeight='black'
              marginBottom='10px'
            >
              {response.title}
            </Link>
            <Text fontSize='md'>
              {response.artists.map((artist) => artist.name).join(', ')}
            </Text>
          </Box>
        </ModalHeader>
        <ModalBody></ModalBody>
        <ModalCloseButton />
      </ModalContent>
    </Modal>
  );
};

export default RecordWindow;
