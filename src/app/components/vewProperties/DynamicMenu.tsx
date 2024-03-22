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
import { useMyContext } from '../../context/context';
import { apiVariantData, ComponentProperty } from '@/app/types/types';

function DynamicMenu() {
  const { variants, setVariants, setCurrentVariant, currentVariant } = useMyContext();

  const [newMenuItem, setNewMenuItem] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  const { isOpen, onToggle, onClose, onOpen } = useDisclosure();
  const initialFocusRef = useRef<HTMLInputElement>(null);

  const [selectedItem, setSelectedItem] = useState(currentVariant?.variantName || "Empty");

  const handleAddMenuItem = () => {
    if (newMenuItem.trim() !== '') {
      // setMenuItems([...menuItems, newMenuItem]);
      let tempDuplicatedProperties : ComponentProperty[] = []
      let duplicatedProperties : ComponentProperty[] = []
      variants.map(variant => {
        if (variant.properties) {
          const Properties = variant.properties.filter(property => property.isDuplicate)
          tempDuplicatedProperties = [...tempDuplicatedProperties, ...Properties]
        }
      })

      tempDuplicatedProperties.map(property => {
        if (!duplicatedProperties.find(p => p.name === property.name)) duplicatedProperties.push({...property, value: "", enumValues: []})
      })

      if (!variants.find(variant => variant.variantName === newMenuItem)) {
        const newVariant: apiVariantData = {
          variantName: newMenuItem,
          properties: [...duplicatedProperties || []],
          rules: [{
            property: "User Id",
            operator: "equals",
            value: "",
            indexWithinGroup: 0,
            orGroupId: 0
          }],
          percentage: 0,
          isDefaultVariant: false
        }
        setVariants([...variants, newVariant])
        setCurrentVariant(newVariant)
        setNewMenuItem('');
        setIsEditing(false);
        setSelectedItem(newMenuItem);
        onClose();
      }

    }
  };

  const handleCancelEdit = () => {
    setNewMenuItem('');
    setIsEditing(false);
    onClose();
  };

  const handleMenuItemSelect = (variant: apiVariantData) => {
    setSelectedItem(variant.variantName);
    setCurrentVariant(variant);
  };

  const handleDeleteMenuItem = (variantName: string) => {
    const remains = variants.filter((variant: apiVariantData) => variant.variantName !== variantName)
    setVariants(remains);
    if (!remains.length) {
      setSelectedItem("Empty")
      const emptyVariant: apiVariantData = {
        variantName: "",
        isDefaultVariant: false
      }
      setCurrentVariant(emptyVariant)
    }
    else {
      setSelectedItem(remains[0].variantName)
      setCurrentVariant(remains[0])
    }
  };

  return (
    <HStack
      boxShadow="md"
      borderRadius="lg"
      align="center"
      w="200px"

    >
      <Menu >
        <MenuButton _hover={{ background: "transparent" }} _focus={{ background: "transparent" }} color="pink" background="transparent" as={Button} rightIcon={<ChevronDownIcon />} width="full">
          {selectedItem}
        </MenuButton>
        {selectedItem !== "Empty" &&
          <MenuList background={"gray.700"}>
            {variants.map((variant, index) => (
              <HStack key={index} justify="space-between" align="center" background={"gray.700"} >
                <MenuItem onClick={() => handleMenuItemSelect(variant)} width="80%" color={"white"} background={"gray.700"} >
                  {variant?.variantName}
                </MenuItem>
                <Menu>
                  <MenuButton as={IconButton} icon={<SettingsIcon />} variant="outline" size="sm" border={'none'} color={'white'} mr={2} />
                  <MenuList >
                    <MenuItem icon={<DeleteIcon />} onClick={() => handleDeleteMenuItem(variant.variantName)} color="black">
                      Delete
                    </MenuItem>
                  </MenuList>
                </Menu>
              </HStack>
            ))}
          </MenuList>
        }
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