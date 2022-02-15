import { Box, Text } from '@chakra-ui/react';
import SignUpForm from '../components/SignUpForm';
import { useNavigate } from 'react-router-dom';

const SignUpPage = () => {
  const navigate = useNavigate();
  return (
    <Box h="full" w="full" display="flex" padding="20px">
      <Box backgroundColor="white" w="full" maxW="450px" p="30px" margin="auto">
        <Text as="h1" fontSize="2xl" fontWeight="bold" marginBottom="20px">
          Sign up
        </Text>
        <SignUpForm navigate={navigate} />
      </Box>
    </Box>
  );
};

export default SignUpPage;
