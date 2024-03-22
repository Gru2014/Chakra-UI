import React, { useState, useEffect } from 'react';
import {
  Box,
  Text,
  NumberInput,
  NumberInputField,
  InputRightAddon,
  InputGroup,
  HStack,
  Checkbox
} from '@chakra-ui/react';
import { useMyContext } from '../../context/context';

function VariantPercentageInput() {
  const { variants, setVariants } = useMyContext();

  const handleSetPercent = (val: string, index: number) => {
      variants[index].percentage = Number(val)
      setVariants(variants.filter(variant => variant.variantName !== ""))
  }

  const handleCheckbox = (index: number) => {
      variants[index].isDefaultVariant = !variants[index].isDefaultVariant
      setVariants(variants.filter(variant => variant.variantName !== ""))
  }

  return (
      variants.map((variant, index) => (
        <Box key={index} p={5} shadow="md" border="none" borderRadius="md" bg="gray.700" color="white" w={'100%'} mt={10}>
          <HStack justifyContent="space-between">
            <Text fontSize="xl" fontWeight="bold" w={'20%'}>
              {variant && variant.variantName}
            </Text>
            <InputGroup maxW="10vw">
              <NumberInput value={String(variant.percentage)} min={0} max={100} clampValueOnBlur={false} >
                <NumberInputField paddingRight="2rem" onChange={(e) => handleSetPercent(e.target.value, index)} />
              </NumberInput>
              <InputRightAddon background="transparent" border="none">%</InputRightAddon>
            </InputGroup>
            <Checkbox isChecked={variant.isDefaultVariant} onChange={() => handleCheckbox(index)} >Default</Checkbox>
          </HStack>
        </Box>
      ))
  );
}

export default VariantPercentageInput;