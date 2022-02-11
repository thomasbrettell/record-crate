import {
  MenuButton,
  IconButton,
  MenuList,
  Menu,
  MenuItem,
  IconButtonProps,
} from '@chakra-ui/react';
import { SettingsIcon } from '@chakra-ui/icons';

const MenuButtonStyles: IconButtonProps = {
  color: 'white',
  'aria-label': 'idk',
  display: 'flex',
  _hover: {
    backgroundColor: 'whiteAlpha.300',
  },
};

const HeaderMenu = () => {
  return (
    <Menu>
      <MenuButton
        size="sm"
        as={IconButton}
        icon={<SettingsIcon />}
        colorScheme="whiteAlpha"
        marginLeft="15px"
        variant="unstyled"
        {...MenuButtonStyles}
      />
      <MenuList>
        <MenuItem>Coming soon</MenuItem>
      </MenuList>
    </Menu>
  );
};

export default HeaderMenu;
