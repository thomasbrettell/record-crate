import { FormEvent } from 'react';
import styled from 'styled-components';

const Box = styled.header`
  padding: 6px 16px;
  background-color: #242424;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.span`
  font-weight: 700;
`;

const Header = () => {
  const submitHandler = (e: FormEvent) => {
    e.preventDefault();
    console.log('authenticating...');
  };
  return (
    <Box>
      <Title>DAHD's Records</Title>
      <form onSubmit={submitHandler}>
        <input />
        <button>Sign in</button>
      </form>
    </Box>
  );
};

export default Header;
