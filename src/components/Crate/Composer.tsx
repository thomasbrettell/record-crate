import { useState, FC } from 'react';
import CardModal from '../CardModal';
import AddRecordWindow from '../AddRecordWindow';
import { Box, BoxProps } from '@chakra-ui/react';
import { auth } from '../../firebaseClient';

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
  const [entered, setEntered] = useState(false);
  if (!auth.currentUser) return null;
  return (
    <>
      <Box {...BoxStyles}>
        <Box as='button' {...ButtonStyles} onClick={() => setEntered(true)}>
          + Add a record
        </Box>
      </Box>
      {entered && (
        <CardModal onClose={() => setEntered(false)}>
          <AddRecordWindow
            crateId={crateId}
            onClose={() => setEntered(false)}
          />
        </CardModal>
      )}
    </>
  );
};

export default Composer;
