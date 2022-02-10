import { FormEvent, useRef, useContext } from 'react';
import styled from 'styled-components';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from '../../firebaseClient';
import { AuthCtx } from '../..';
import Button from '../UI/Button';
import Input from '../UI/Input';

const Box = styled.header`
  padding: 6px 16px;
  background-color: #242424;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: 44px;
`;

const Title = styled.span`
  font-weight: 700;
`;

const Header = () => {
  const { state: authState } = useContext(AuthCtx);
  const inputRef = useRef<HTMLInputElement>(null);

  const signInHandler = (e: FormEvent) => {
    e.preventDefault();
    if (!inputRef.current?.value.trim()) return;
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
          <Input placeholder="Password" type="password" ref={inputRef} />
          <Button type="submit">Sign in</Button>
        </form>
      )}
      {authState && (
        <form onSubmit={signOutHandler}>
          Signed in
          <Button type="submit">Sign out</Button>
        </form>
      )}
    </Box>
  );
};

export default Header;
