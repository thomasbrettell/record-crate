import { Box, StyleProps, Text, Flex } from '@chakra-ui/react';
import { useContext } from 'react';
import { UserDataCtx } from '../..';
import SignInForm from './SignInForm';
// import useIsAuthed from '../../hooks/useIsAuthed';
// import HeaderMenu from './HeaderMenu';

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
  // const isAuthed = useIsAuthed()
  const { state: userData } = useContext(UserDataCtx);
  return (
    <Box as='header' {...HeaderStyles}>
      <Text fontWeight='bold' color='white' textTransform='capitalize'>
        {userData?.name}'s Records
      </Text>
      <Flex alignItems='center'>
        <SignInForm />
        {/* {isAuthed && <HeaderMenu />} */}
      </Flex>
    </Box>
  );
};

export default Header;
