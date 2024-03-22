import React, { useRef, useState } from 'react';
import {
  Box,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  IconButton,
  Input,
  ButtonGroup,
  useDisclosure,
  HStack,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverHeader,
  PopoverBody,

} from '@chakra-ui/react';
import {
  ChevronDownIcon, CheckIcon, CloseIcon, AddIcon, DeleteIcon, HamburgerIcon, SettingsIcon
} from '@chakra-ui/icons';

function DynamicMenu() {
  const [newMenuItem, setNewMenuItem] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  const { isOpen, onToggle, onClose, onOpen } = useDisclosure();
  const initialFocusRef = useRef<HTMLInputElement>(null);

  const [menuItems, setMenuItems] = useState([
    'variant1',
    'variant2',
    'variant3',
    'variant4',
    'variant5',
  ]);
  const [selectedItem, setSelectedItem] = useState(menuItems[0]);

  const handleAddMenuItem = () => {
    if (newMenuItem.trim() !== '') {
      setMenuItems([...menuItems, newMenuItem]);
      setNewMenuItem('');
      setIsEditing(false);
      setSelectedItem(newMenuItem);
      onClose();
    }
  };

  const handleCancelEdit = () => {
    setNewMenuItem('');
    setIsEditing(false);
    onClose();
  };

  const handleMenuItemSelect = (item: string) => {
    setSelectedItem(item);
  };

  const handleDeleteMenuItem = (item: string) => {
    const updatedMenuItems = menuItems.filter((menuItem) => menuItem !== item);
    setMenuItems(updatedMenuItems);
  };

  return (
    <HStack
      boxShadow="md"
      borderRadius="lg"
      align="center"
      w="200px"
      
    >
      <Menu > 
        <MenuButton _hover={{background:"transparent"}} _focus={{background: "transparent"}} color="pink" background="transparent"as={Button} rightIcon={<ChevronDownIcon />} width="full">
          {selectedItem}
        </MenuButton>
        <MenuList background={"gray.700"}>
          {menuItems.map((item, index) => (
            <HStack key={index} justify="space-between" align="center" background={"gray.700"} >
              <MenuItem onClick={() => handleMenuItemSelect(item)} width="80%"  color={"white"} background={"gray.700"} >
                {item}
              </MenuItem>
              <Menu>
                <MenuButton as={IconButton} icon={<SettingsIcon />} variant="outline" size="sm" />
                <MenuList>
                  <MenuItem icon={<DeleteIcon />} onClick={() => handleDeleteMenuItem(item)} color="white">
                    Delete
                  </MenuItem>
                </MenuList>
              </Menu>
            </HStack>
          ))}
        </MenuList>
      </Menu>
      <Popover
      
        isOpen={isOpen}
        initialFocusRef={initialFocusRef}
        onClose={onClose}
      >
      <PopoverTrigger>
        <IconButton
          aria-label="Add variant"
          icon={<AddIcon />}
          onClick={onOpen}
          size="sm"
          // add your styling here
        />
      </PopoverTrigger>
      <PopoverContent background={"teal.400"} color='white' >
        <PopoverCloseButton />
        <PopoverHeader border="none" >Add New Variant</PopoverHeader>
        <PopoverBody>
          <Box pt={2} w="100%" color="white">
            <HStack>
            <Input
              ref={initialFocusRef as React.MutableRefObject<HTMLInputElement>}
              value={newMenuItem}
              onChange={(e) => setNewMenuItem(e.target.value)}
              placeholder='Variant name'
            />
            <ButtonGroup justifyContent='center'>
              <IconButton
                icon={<CheckIcon />}
                aria-label='Submit'
                onClick={handleAddMenuItem}
              />
              <IconButton
                icon={<CloseIcon />}
                aria-label='Cancel'
                onClick={handleCancelEdit}
              />
            </ButtonGroup>
            </HStack>
          </Box>     
        </PopoverBody>
      </PopoverContent>
    </Popover>
    </HStack>
  );
}

export default DynamicMenu;