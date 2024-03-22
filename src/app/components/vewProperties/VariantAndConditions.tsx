import React, { useEffect, useState } from 'react';
import {
  Box,
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
import { ruleProperty, ConditionalToRender } from '../../types/types';
import { useMyContext } from '../../context/context';


const userProperties: ruleProperty[] = [
  {
    name: "User Id",
    type: "TEXT",
    enumValues: [],
  },
  {
    name: "User Plan",
    type: "ENUM",
    enumValues: ["Free", "Professional", "Business Starter", "Enterprise"],
  },
  {
    name: "Timezone",
    type: "NUMBER",
    enumValues: [],
  }
]

type ConditionRowProps = {
  onAdd: (bitOperator: string, index: number) => void;
  onDelete: (index: number) => void;
  setConditionalOperator: (operator: string, index: number) => void;
  setConditionValue: (value: string, index: number) => void;
  setConditionalProperty: (property: string, index: number) => void,
  conditionalVal: ConditionalToRender;
  position: number;
  status: number;
};

type ConditionalAndProps = {
  onAddOr: () => void;
};



const ConditionRow: React.FC<ConditionRowProps> = ({ onAdd, onDelete, setConditionalOperator, setConditionValue, setConditionalProperty, conditionalVal, position, status }) => {

  const [currentRule, setCurrentRule] = useState<ruleProperty | null>(userProperties[0]);

  const setConditionalRuleProperty = (index: number) => {
    setCurrentRule(userProperties[index])
  }

  return (
    <>

      <Box px={8} pt={5} pb={ status % 4 > 1 ? 6: 0} gap={0} shadow="md" bg="gray.700" color="white" borderBottom={status > 1 ? "dashed" : "none"} borderLeft="dashed" borderRight={"dashed"} borderTop={status % 3 ? "none" : "dashed"} borderTopRadius={status % 3 ? "none" : "md"} borderBottomRadius={status < 2 ? "none" : "md"}>
        <Grid templateColumns="repeat(5, 1fr)" gap={2} alignItems="center" marginTop="10px" >
          <GridItem colSpan={1} >
            <Select border="1px" borderColor={"gray"} onChange={(e) => {
              setConditionalProperty(e.target.value, position)
              setConditionalRuleProperty(e.target.selectedIndex)
            }} value={conditionalVal.property ?? ""}>
              {
                userProperties.map((rule, index) =>
                  <option key={index} value={rule.name} itemID={index.toString()}>{rule.name}</option>
                )
              }
              {/* ... other options ... */}
            </Select>
          </GridItem>
          <GridItem colSpan={1}>

            <Select borderColor={"gray"} onChange={(e) => setConditionalOperator(e.target.value, position)
            } value={conditionalVal.operator ?? ""}>
              <option value="equals">=</option>
              <option value="greater_than" hidden={currentRule?.type !== "NUMBER"}> {">"}</option>
              <option value="greater_than_equal" hidden={currentRule?.type !== "NUMBER"} > {">="}</option>
              <option value="lesser_than" hidden={currentRule?.type !== "NUMBER"}> {"<"}</option>
              <option value="lesser_than_equal" hidden={currentRule?.type !== "NUMBER"}> {"<="}</option>
              <option value="not_equal" > {"!="}</option>
            </Select>
          </GridItem>
          <GridItem colSpan={2} borderColor={"gray"}>
            {currentRule?.type === "ENUM" ?

              (
                <Select border="1px" borderColor={"gray"} onChange={(e) => {
                  setConditionValue(e.target.value, position)
                }} value={conditionalVal.value ?? ""}>
                  {
                    currentRule.enumValues.map((enumValue, index) => {
                      return (<option key={index} value={enumValue} itemID={index.toString()}>{enumValue}</option>)
                    })
                  }
                </Select>
              )
              : (<Input type={currentRule?.type === "NUMBER" ? "number" : "text"} onChange={(e) => setConditionValue(e.target.value, position)} value={conditionalVal.value ?? ""} />)
            }
          </GridItem>
          <GridItem colSpan={1}>
            <HStack spacing={4}>
              <Button colorScheme="green" onClick={() => onAdd("AND", position)}>
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
      </Box>
      {
        (status === 2 || status === 3) &&
        <Button colorScheme="red" onClick={() => onAdd("OR", position)} m={3}>
          OR
        </Button>
      }
    </>
  );
};

const VariantAndConditions: React.FC<ConditionalAndProps> = ({ onAddOr }) => {
  const { variants, setVariants, currentVariant } = useMyContext();
  const [conditions, setConditions] = useState<ConditionalToRender[]>([{
    property: "User Id",
    operator: "equals",
    value: "",
    indexWithinGroup: 0,
    orGroupId: 0
  }]);

  useEffect(() => {
    const variant = variants.find(v => v.variantName === currentVariant?.variantName)
    if (variant?.rules) {
      setConditions(variant?.rules)
    }
  }, [variants, currentVariant])

  const addCondition = (bitOperator: string, index: number) => {
    const variant = variants.find(v => v.variantName === currentVariant?.variantName)
    if (variant?.rules) {
      const rule = variant.rules[index]
      console.log("bitOperator =>", bitOperator)
      if (index !== variant.rules.length - 1) {
        variant.rules.splice(index + 1, 0, {
          property: "User Id",
          operator: "equals",
          value: "",
          indexWithinGroup: bitOperator === "AND" ? rule.indexWithinGroup + 1: 0,
          orGroupId: bitOperator === "AND" ? rule.orGroupId : rule.orGroupId + 1
        })
        if (bitOperator === "OR") variant.rules.map((r, i) => {if (i > index + 1) r.orGroupId++})
        else variant.rules.map((r, i) => {if (i > index + 1 && rule.orGroupId === r.orGroupId) r.indexWithinGroup++})
      } else {
        variant.rules.push({
          property: "User Id",
          operator: "equals",
          value: "",
          indexWithinGroup: bitOperator === "AND" ? rule.indexWithinGroup + 1: 0,
          orGroupId: bitOperator === "AND" ? rule.orGroupId : rule.orGroupId + 1
        })
      }
      setVariants(variants.filter(variant => variant.variantName !== ""))
      setConditions(variant.rules)
    }
  };

  const deleteCondition = (index: number) => {
    const variant = variants.find(v => v.variantName === currentVariant?.variantName)
    if (variant?.rules && conditions.length - 1) {
      const deletedRule = variant.rules[index]
      const newRules = variant.rules.filter((_, i) => i !== index);
      newRules.map((rule, i) => {
        if (deletedRule.orGroupId === rule.orGroupId && i >= index) {
          rule.indexWithinGroup--;
        }
      });
      variant.rules = newRules
      setVariants(variants.filter(variant => variant.variantName !== ""))
      setConditions(newRules);
    }
  }

  const setConditionalOperator = (operator: string, index: number) => {
    const variant = variants.find(v => v.variantName === currentVariant?.variantName)
    if (variant?.rules) {
      const newConditions = variant.rules.map((condition, i) => {
        if (i === index) {
          return {
            ...condition,
            operator
          }
        }
        return condition;
      });
      variant.rules = newConditions
      setVariants(variants.filter(variant => variant.variantName !== ""))
      setConditions(newConditions);
    }
  }

  const setConditionValue = (value: string, index: number) => {
    const variant = variants.find(v => v.variantName === currentVariant?.variantName)
    if (variant?.rules) {
      const newConditions = variant.rules.map((condition, i) => {
        if (i === index) {
          return {
            ...condition,
            value
          }
        }
        return condition;
      });
      variant.rules = newConditions
      setVariants(variants.filter(variant => variant.variantName !== ""))
      setConditions(newConditions);
    }
  }

  const setConditionalProperty = (property: string, index: number) => {
    const variant = variants.find(v => v.variantName === currentVariant?.variantName)
    if (variant?.rules) {
      const newConditions = variant.rules.map((condition, i) => {
        if (i === index) {
          if (property === "User Plan") {
            return {
              ...condition,
              property,
              value: "Free"
            }
          } else {
            return {
              ...condition,
              property,
              value: ""
            }
          }
        }
        return condition;
      });
      variant.rules = newConditions
      setVariants(variants.filter(variant => variant.variantName !== ""))
      setConditions(newConditions);
    }
  }

  if (conditions.length === 0) {
    return null;
  }

  const styleProp = (index: number): number => {

    if (index + 1 < conditions.length && conditions.length > 1)
      if (conditions[index].orGroupId === conditions[index + 1].orGroupId)
        if (index === 0)
          return 0;
        else if (conditions[index].orGroupId !== conditions[index - 1].orGroupId)
          return 0;
    if (index > 0
      && index + 1 < conditions.length
      && conditions[index].orGroupId === conditions[index + 1].orGroupId
      && conditions[index].orGroupId === conditions[index - 1].orGroupId)
      return 1;
    if (index > 0 && conditions[index].orGroupId === conditions[index - 1].orGroupId)
      if (index === conditions.length - 1)
        return 2;
      else if (conditions[index].orGroupId !== conditions[index + 1].orGroupId)
        return 2;
    return 3
  }

  return (
    //render this only if conditions.length > 0

    <VStack gap={0}>
      {conditions.map((condition, index) => {
        const status = styleProp(index)
        return <ConditionRow key={index} onAdd={addCondition} onDelete={deleteCondition} position={index}
          setConditionValue={setConditionValue} setConditionalOperator={setConditionalOperator} setConditionalProperty={setConditionalProperty} conditionalVal={condition} status={status} />
      })}
      {/* <Button colorScheme="red" onClick={() => addCondition("OR", conditions.length - 1)} m={3}>
        OR
      </Button> */}
    </VStack>
  )
};

export default VariantAndConditions;