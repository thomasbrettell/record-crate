import { auth } from '../../firebaseClient';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { Text, Input, Button, Flex, HStack } from '@chakra-ui/react';
import { ChangeEvent, FormEvent, useState } from 'react';

const SignInForm = () => {
  const [error, setError] = useState(false);
  const [password, setPassword] = useState('');
  const signInHandler = (e: FormEvent) => {
    e.preventDefault();
    if (!password.trim()) return;
    signInWithEmailAndPassword(auth, 'admin@admin.com', password)
      .then(() => setPassword(''))
      .catch(() => {
        setError(true);
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
      {!auth.currentUser && (
        <Flex as="form" onSubmit={signInHandler}>
          <Input
            placeholder="Password"
            backgroundColor="gray.100"
            size="xs"
            type="password"
            borderRadius="md"
            borderTopRightRadius="0"
            borderBottomRightRadius="0"
            w="auto"
            onChange={changeHandler}
            value={password}
            isInvalid={error}
            errorBorderColor="crimson"
            focusBorderColor={error ? 'crimson' : 'blue.500'}
          />
          <Button
            type="submit"
            size="xs"
            borderTopLeftRadius="0"
            borderBottomLeftRadius="0"
            colorScheme="blue"
          >
            Sign in
          </Button>
        </Flex>
      )}
      {auth.currentUser && (
        <HStack as="form" onSubmit={signOutHandler} color="white">
          <Text fontSize="xs" fontWeight="bold">
            Signed in
          </Text>
          <Button type="submit" size="xs" colorScheme="blue">
            Sign out
          </Button>
        </HStack>
      )}
    </>
  );
};

export default SignInForm;
