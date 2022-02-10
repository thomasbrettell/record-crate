import { FormEvent, useRef, useContext } from 'react';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from '../../firebaseClient';
import { AuthCtx } from '../..';
import {
  Box,
  StyleProps,
  Text,
  Input,
  Button,
  Flex,
  HStack,
} from '@chakra-ui/react';

const HeaderStyles: StyleProps = {
  display: 'flex',
  padding: '0 16px',
  backgroundColor: 'gray.900',
  justifyContent: 'space-between',
  alignItems: 'center',
  minH: '44px',
  maxH: '44px',
};

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
    <Box as='header' {...HeaderStyles}>
      <Text fontWeight='bold' color='white'>
        DAHD's Records
      </Text>
      {!authState && (
        <Flex as='form' onSubmit={signInHandler}>
          <Input
            placeholder='Password'
            backgroundColor='gray.100'
            size='xs'
            type='password'
            ref={inputRef}
            borderRadius='md'
            borderTopRightRadius='0'
            borderBottomRightRadius='0'
            w='auto'
          />
          <Button
            type='submit'
            size='xs'
            borderTopLeftRadius='0'
            borderBottomLeftRadius='0'
            colorScheme='blue'
          >
            Sign in
          </Button>
        </Flex>
      )}
      {authState && (
        <HStack as='form' onSubmit={signOutHandler} color='white'>
          <Text fontSize='xs' fontWeight='bold'>Signed in</Text>
          <Button type='submit' size='xs' colorScheme='blue'>
            Sign out
          </Button>
        </HStack>
      )}
    </Box>
  );
};

export default Header;
