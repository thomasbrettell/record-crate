import { useState, FC } from 'react';
import CardModal from '../CardModal';
import AddRecordWindow from '../AddRecordWindow';
import { Box, BoxProps } from '@chakra-ui/react';
import { auth } from '../../firebaseClient';
import CatNoSearchModal from '../CatNoSearchModal';
import { useDisclosure } from '@chakra-ui/react';

const BoxStyles: BoxProps = {
  display: 'flex',
  justifyContent: 'space-between',
  maxH: '38px',
  minH: '38px',
  padding: '2px 8px 8px 8px',
};

const ButtonStyles: BoxProps = {
  borderRadius: '3px',
  width: 'full',
  textAlign: 'left',
  padding: ' 0px 8px',
  fontSize: 'sm',
  _hover: {
    backgroundColor: 'gray.300',
  },
};

interface ComposerProps {
  crateId: string;
}
const Composer: FC<ComposerProps> = ({ crateId }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [entered, setEntered] = useState(false);
  if (!auth.currentUser) return null;
  return (
    <>
      <Box {...BoxStyles}>
        <Box as="button" {...ButtonStyles} onClick={onOpen}>
          + Add a record
        </Box>
      </Box>
      <CatNoSearchModal isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default Composer;

// <CardModal onClose={() => setEntered(false)}>
//   <AddRecordWindow
//     crateId={crateId}
//     onClose={() => setEntered(false)}
//   />
// </CardModal>
