import { Box, Text } from '@chakra-ui/react';
import SignUpForm from '../components/SignUpForm';
import { useNavigate } from 'react-router-dom';
import { httpsCallable } from 'firebase/functions';
import { functions } from '../firebaseClient';

const SignUpPage = () => {
  const navigate = useNavigate();
  const addMessage = httpsCallable(functions, "addMessage");

  return (
    <Box h="full" w="full" display="flex" padding="20px">
      <Box backgroundColor="white" w="full" maxW="450px" p="30px" margin="auto">
        <Text as="h1" fontSize="2xl" fontWeight="bold" marginBottom="20px">
          Sign up
        </Text>
        <SignUpForm navigate={navigate} />
        <button onClick={() => {
          console.log('fUFC')
          addMessage({text: 'text'}).then((result) => {
            console.log(result)
          })
        }}>temp</button>
      </Box>
    </Box>
  );
};

export default SignUpPage;
