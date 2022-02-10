import { Box, StyleProps, Text } from '@chakra-ui/react';
import SignInForm from './SignInForm';

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
  return (
    <Box as='header' {...HeaderStyles}>
      <Text fontWeight='bold' color='white'>
        DAHD's Records
      </Text>
      <SignInForm />
    </Box>
  );
};

export default Header;
