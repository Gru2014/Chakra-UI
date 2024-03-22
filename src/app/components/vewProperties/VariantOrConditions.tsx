import React, { useEffect, useState } from 'react';
import {
  Button,
  Grid,
  GridItem,
  Select,
  Input,
  VStack,
  IconButton,
  HStack,
} from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';
import VariantAndConditions from './VariantAndConditions';

type ConditionRowProps = {
  onAdd: () => void;
  onDelete: (index: number) => void;
  position: number;
};

const ConditionRow: React.FC<ConditionRowProps> = ({ onAdd, onDelete, position }) => {
  return (
    <Grid templateColumns="repeat(5, 1fr)" gap={2} alignItems="center" marginTop="10px">
      <GridItem colSpan={1} >
        <Select border="1px" borderColor={"gray"} >
          <option value="userId">userId</option>
          {/* ... other options ... */}
        </Select>
      </GridItem>
      <GridItem colSpan={1}>
        <Select borderColor={"gray"}>
          <option value="equals">=</option>
          {/* ... other options ... */}
        </Select>
      </GridItem>
      <GridItem colSpan={2} borderColor={"gray"}>
        <Input placeholder="alexandarWang" />
      </GridItem>
      <GridItem colSpan={1}>
        <HStack spacing={4}>
          <Button colorScheme="green" onClick={onAdd}>
            AND
          </Button>
          <IconButton
            background={"transparent"}
            aria-label='Delete'
            color="white"
            icon={<DeleteIcon />}
            onClick={() => onDelete(position)}
            size="md" // adjust the size as needed
          />
        </HStack>
      </GridItem>
    </Grid>
  );
};

const VariantOrConditions: React.FC = () => {
  const [conditions, setConditions] = useState([{}]);

  const addOrCondition = () => {
    setConditions([...conditions, {
      bitOperator: "OR"
    }]);
  }

  const deleteOrCondition = (index: number) => {
    const newConditions = conditions.filter((_, i) => i !== index);
    setConditions(newConditions);
  }

  return (
    <VStack>
      {conditions.map((condition, index) => (
        <VariantAndConditions key={index} onAddOr={addOrCondition} />
      ))
      }
    </VStack>
  );
};

export default VariantOrConditions;