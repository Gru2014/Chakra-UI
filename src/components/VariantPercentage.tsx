import React from 'react';
import {
  Box,
  Grid,
  Text,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  InputRightAddon,
  InputGroup,
  Icon,
  HStack,
  Checkbox
} from '@chakra-ui/react';
import { LockIcon } from '@chakra-ui/icons';

function VariantPercentageInput() {
  return (
    <Box p={5} shadow="md" border="none" borderRadius="md" bg="gray.700" color="white">
      <HStack justifyContent="space-between">
        <Text fontSize="xl" fontWeight="bold">
          Variant 1
        </Text>
        
        <InputGroup maxW="120px">
          <NumberInput defaultValue={12} min={0} max={100} clampValueOnBlur={false} >
            <NumberInputField paddingRight="2rem" />         
          </NumberInput>
          <InputRightAddon background="transparent" children="%" border="none" />
        </InputGroup>
        <Checkbox >Default</Checkbox>
      </HStack>
    </Box>
  );
}

export default VariantPercentageInput;