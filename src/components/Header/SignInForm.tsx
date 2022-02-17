import { auth } from '../../firebaseClient';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { Text, Input, Button, Flex, HStack } from '@chakra-ui/react';
import { ChangeEvent, FormEvent, useContext, useState } from 'react';
import { UserDataCtx } from '../..';
import useIsAuthed from '../../hooks/useIsAuthed';

const SignInForm = () => {
  const { state: userData } = useContext(UserDataCtx);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [password, setPassword] = useState('');
  const isAuthed = useIsAuthed();

  const signInHandler = (e: FormEvent) => {
    e.preventDefault();
    if (!password || !userData) return;
    setLoading(true);
    signInWithEmailAndPassword(auth, userData?.email, password)
      .then(() => setPassword(''))
      .catch(() => {
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const signOutHandler = (e: FormEvent) => {
    e.preventDefault();
    signOut(auth);
  };
  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    error && setError(false);
    setPassword(e.target.value);
  };

  return (
    <>
      {!isAuthed && (
        <Flex as='form' onSubmit={signInHandler}>
          <Input
            placeholder='Password'
            backgroundColor='gray.100'
            size='xs'
            type='password'
            borderRadius='md'
            borderTopRightRadius='0'
            borderBottomRightRadius='0'
            w='auto'
            onChange={changeHandler}
            value={password}
            isInvalid={error}
            errorBorderColor='crimson'
            focusBorderColor={error ? 'crimson' : 'blue.500'}
          />
          <Button
            type='submit'
            size='xs'
            borderTopLeftRadius='0'
            borderBottomLeftRadius='0'
            colorScheme='blue'
            isLoading={loading}
          >
            Sign in
          </Button>
        </Flex>
      )}
      {isAuthed && (
        <HStack as='form' onSubmit={signOutHandler} color='white'>
          <Text fontSize='xs' fontWeight='bold'>
            Signed in
          </Text>
          <Button type='submit' size='xs' colorScheme='blue'>
            Sign out
          </Button>
        </HStack>
      )}
    </>
  );
};

export default SignInForm;
