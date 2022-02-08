import { FormEvent, useRef, useContext } from 'react';
import styled from 'styled-components';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from '../../firebaseClient';
import { AuthCtx } from '../..';

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
  const { state: authState } = useContext(AuthCtx);
  const inputRef = useRef<HTMLInputElement>(null);

  const signInHandler = (e: FormEvent) => {
    e.preventDefault();
    signInWithEmailAndPassword(
      auth,
      'admin@admin.com',
      inputRef.current?.value || ''
    );
  };
  const signOutHandler = (e: FormEvent) => {
    e.preventDefault();
    signOut(auth);
  };

  return (
    <Box>
      <Title>DAHD's Records</Title>
      {!authState && (
        <form onSubmit={signInHandler}>
          <input placeholder='Password' type='password' ref={inputRef} />
          <button type='submit'>Sign in</button>
        </form>
      )}
      {authState && (
        <form onSubmit={signOutHandler}>
          Signed in
          <button type='submit'>Sign out</button>
        </form>
      )}
    </Box>
  );
};

export default Header;
