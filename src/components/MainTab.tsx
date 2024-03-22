import React from 'react';
import InputComponent from './InputComponent';
import DynamicMenu from './DynamicMenu';
import TabsComponent from './TabsComponent';
import { Button } from '@chakra-ui/react';
import { apiVariantData } from '../types/types';

function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

//call this when Save button is clicked with appropriate data  
async function callAPI(data:apiVariantData[]){ 
  await sleep(3000); 
  console.log(data);
} 

function MainTab() {
  
  return (
    <div
    style={{
        backgroundColor:"#282c34",
        color:"white",
        width:"100%",
        height:"100vh",
        display:"flex",
        flexDirection:"column",
        justifyContent:"center",
        alignItems:"center",
      
    }}
    >
     <div
     style={{
            width:"40%",
            minHeight:"90%",
            display:"flex",
            flexDirection:"column",
            justifyContent:"flex-start",
            alignItems:"center",
            border:"1px solid grey",
            boxShadow:"0 2px 4px grey",
            borderRadius:"20px",
            padding:"10px",
     }}
     >
    <div
    style={{
        width:"100%",
        height:"10%",
        display:"flex",
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center",
    }}
    >
    <InputComponent />
    <DynamicMenu />
    </div>
        <TabsComponent />
        <Button colorScheme="teal" variant="outline">
          Save
        </Button>
     </div>
     
                        
    </div>
  );
}

export default MainTab;
