import { Box, StyleProps, Text, Flex } from '@chakra-ui/react';
import SignInForm from './SignInForm';
// import HeaderMenu from './HeaderMenu';
// import { auth } from '../../firebaseClient';

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
    <Box as="header" {...HeaderStyles}>
      <Text fontWeight="bold" color="white">
        DAHD's Records
      </Text>
      <Flex alignItems="center">
        <SignInForm />
        {/* {auth.currentUser && auth.currentUser.uid === boardData.user_id && <HeaderMenu />} */}
      </Flex>
    </Box>
  );
};

export default Header;
