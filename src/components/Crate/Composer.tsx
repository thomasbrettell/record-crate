import { useState, FC } from 'react';
import CardModal from '../CardModal';
import AddRecordWindow from '../AddRecordWindow';
import { Box, BoxProps } from '@chakra-ui/react';

// const Box = styled.div`
//   display: flex;
//   justify-content: space-between;
//   max-height: 38px;
//   min-height: 38px;
// `;

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
  padding:' 0px 8px',
  fontSize: 'sm',
  _hover: {
    backgroundColor: 'gray.300',
    // color: 'white'
  },
};

// const AddButton = styled.button`
//   border-radius: 3px;
//   color: #5e6c84;
//   display: block;
//   flex: 1 0 auto;
//   /* margin: 2px 8px 8px 8px; */
//   padding: 4px 8px;
//   position: relative;
//   text-decoration: none;
//   -webkit-user-select: none;
//   user-select: none;
//   background: none;
//   border: none;
//   text-align: left;

//   &:hover {
//     background-color: #091e4214;
//     color: #172b4d;
//   }
// `;

interface ComposerProps {
  crateId: string;
}
const Composer: FC<ComposerProps> = ({ crateId }) => {
  const [entered, setEntered] = useState(false);
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
