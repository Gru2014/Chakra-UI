import React from 'react';
import { Tabs, TabList, TabPanels, Tab, TabPanel, Box, useColorModeValue, useTheme, Button } from '@chakra-ui/react';
import PropertiesContent from './PropertiesContent';
import CollapsibleVariantSlider from './VariantPercentage';
import VariantPercentageInput from './VariantPercentage';
import VariantConditions from './VariantAndConditions';
import VariantOrConditions from './VariantOrConditions';

function TabsComponent() {
  const theme = useTheme();
  const bg = useColorModeValue('white', 'gray.800');
  const tabBg = useColorModeValue('gray.200', 'gray.700');
  const tabColor = useColorModeValue('gray.600', 'white');
  const tabSelectedBg = useColorModeValue('teal.300', 'teal.500');
  const borderColor = useColorModeValue('gray.200', 'gray.600');

  return (
    <Box p={5} borderRadius="md" boxShadow="md" color={tabColor}>
      <Tabs variant="solid-rounded" colorScheme="teal" align="center" >
        <TabList >
          <Tab width="150px" _selected={{ bg: tabSelectedBg, color: 'white'}}  borderColor="white"  borderWidth="1px"  _focus={{ boxShadow: 'none' }} marginRight={"10%"} >Properties</Tab>
          <Tab width="150px" _selected={{ bg: tabSelectedBg, color: 'white'}} borderColor="white"  borderWidth="1px"  _focus={{ boxShadow: 'none' }} marginRight={"10%"}>Rules</Tab>
          <Tab width="150px" _selected={{ bg: tabSelectedBg, color: 'white'}} borderColor="white"  borderWidth="1px"  _focus={{ boxShadow: 'none' }}>Percentages</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <PropertiesContent />
          </TabPanel>
          <TabPanel>
            <VariantOrConditions />
          </TabPanel>
          <TabPanel>
            <VariantPercentageInput />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
}

export default TabsComponent;
