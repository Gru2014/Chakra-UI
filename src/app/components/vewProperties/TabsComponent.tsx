import React from 'react';
import { Tabs, TabList, TabPanels, Tab, TabPanel, Box, useColorModeValue } from '@chakra-ui/react';
import PropertiesContent from './PropertiesContent';
import VariantPercentageInput from './VariantPercentage';
import VariantOrConditions from './VariantOrConditions';

function TabsComponent() {
  const tabColor = useColorModeValue('gray.600', 'white');
  const tabSelectedBg = useColorModeValue('teal.300', 'teal.500');

  return (
    <Box p={5} borderRadius="md" boxShadow="md" color={tabColor} mt={10}>
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
