import styled from 'styled-components';

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

const Composer = () => {
  return (
    <Box>
      <AddButton>+ Add a record</AddButton>
    </Box>
  );
};

export default Composer;
