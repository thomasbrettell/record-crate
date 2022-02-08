import { useState, FC } from 'react';
import styled from 'styled-components';
import CardModal from '../CardModal';
import AddRecordWindow from '../AddRecordWindow';

const Box = styled.div`
  display: flex;
  justify-content: space-between;
  max-height: 38px;
  min-height: 38px;
`;

const AddButton = styled.button`
  border-radius: 3px;
  color: #5e6c84;
  display: block;
  flex: 1 0 auto;
  margin: 2px 8px 8px 8px;
  padding: 4px 8px;
  position: relative;
  text-decoration: none;
  -webkit-user-select: none;
  user-select: none;
  background: none;
  border: none;
  text-align: left;

  &:hover {
    background-color: #091e4214;
    color: #172b4d;
  }
`;

interface ComposerProps {
  crateId: string;
}
const Composer: FC<ComposerProps> = ({ crateId }) => {
  const [entered, setEntered] = useState(false);
  return (
    <>
      <Box>
        <AddButton onClick={() => setEntered(true)}>+ Add a record</AddButton>
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
