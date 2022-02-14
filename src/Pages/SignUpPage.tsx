import { Box, Text } from '@chakra-ui/react';
import SignUpForm from '../components/SignUpForm';

const SignUpPage = () => {
  return (
    <Box h='full' w='full' display='flex' padding='20px'>
      <Box backgroundColor='white' w='full' maxW='450px' p='30px' margin='auto'>
        <Text fontSize='2xl' fontWeight='bold' marginBottom='20px'>
          Sign up
        </Text>
        <SignUpForm />
      </Box>
    </Box>
  );
};

export default SignUpPage;
