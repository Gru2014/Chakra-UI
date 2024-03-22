import React, { useState } from 'react';
import {
    Button,
    FormControl,
    FormLabel,
    Input,
    IconButton,
    Select,
    Box,
    HStack,
    VStack,
    Tag,
} from '@chakra-ui/react';
import {
     DeleteIcon, CloseIcon, AddIcon,
} from '@chakra-ui/icons';
import { ComponentProperty, PropertyTypes } from '../types/types';


function PropertiesContent() {
    const [propertiesToRender, setPropertiesToRender] = useState<ComponentProperty[]>([]);    
    const [isAddingCustomProperty, setIsAddingCustomProperty] = useState(false);
    const [customPropertyName, setCustomPropertyName] = useState('');
    const changePropertyType= (type: PropertyTypes, index: number) => {

        setPropertiesToRender((prevProperties) => {
            const newProperties = [...prevProperties];
            newProperties[index].type = type;
            return newProperties;
        });
    }
    const addCustomProperty = (name: string) => {   
        if(name === '') return;
        setCustomPropertyName('');
        setIsAddingCustomProperty(false);
        setPropertiesToRender((prevProperties) => [...prevProperties, { value: '', type: PropertyTypes.TEXT, name }]);
    };

    const handleInputChange = (value: string, index: number) => {
        setPropertiesToRender((prevProperties) => {
            const newProperties = [...prevProperties];
            newProperties[index].value = value;
            return newProperties;
        });
    };

    
    const handleDeleteProperty = (index: number) => {
        setPropertiesToRender((prevProperties) => {
            const newProperties = [...prevProperties];
            newProperties.splice(index, 1);
            return newProperties;
        });
    };

    const addEnumValue = (index: number, value: string) => {
        console.log("index",index, value); 
        const newProperties = [...propertiesToRender];
        if(!newProperties[index].enumValues){
            newProperties[index].enumValues = [value];
        } else{
            newProperties[index].enumValues?.push(value);
        }
        setPropertiesToRender(newProperties);
    }

    const renderFormControl = () => {
        return propertiesToRender.map((property, index) => {
            const customPropertyName = property.name; 
            console.log(property.type, property.value, customPropertyName)
            return (
                <VStack spacing={0} align="stretch" paddingBottom={4} bg="gray.700" marginTop="10px" padding="10px" border="1px" borderRadius={"20px"} >
                    <FormControl>
                        <FormLabel textColor={"white"}>{customPropertyName}</FormLabel>
                    </FormControl>
                    <HStack spacing={0} width="350px">
                        <Select
                        
                        defaultValue={"TEXT"}
                        borderTop={"0px"}
                        borderRight={"0px"}
                        borderBottom={"0px"}
                        borderLeft={"0px"}                       
                        color="gray.500"
                        
                        onChange={(e)=>changePropertyType(e.target.value as any, index) }
                        w="full" // Set width to full to take up all available space
                        // onChange, value, etc...
                        // Add your dropdown options here
                        >
                            <option value="TEXT">Text</option>
                            <option value="COLOR">Color</option>
                            <option value="NUMBER">Number</option>
                            <option value="VISIBILITY">Visibility</option>
                            <option value="ENUM">Enum</option>
                        </Select>
                        <Input
                            type={property.type === "NUMBER" ? "number" : property.type === "COLOR" ? "color" : "text"}
                            value={property.value}

                            onChange={(e) => handleInputChange(e.target.value, index)}
                            w="full" // Set width to full to take up all available space
                            style={{
                                color: 'white',
                                borderRadius: '5px',
                                borderColor: 'rgb(255, 255, 255, 0.16)', // Adjusted for Chakra UI color scheme
                                padding: '5px',
                            }}       
                            placeholder="Value"      
                            _placeholder={{ color: 'gray.400' }} // Adjusted for Chakra UI color scheme        
                        />
                        {property.type === "ENUM" && (
                        <IconButton
                            aria-label="Add variant"
                            icon={<AddIcon />}
                            onClick={(event)=> { 
                                event.stopPropagation();
                                handleInputChange('', index)
                                addEnumValue(index, property.value);
                            }}
                            size="sm"
                            // add your styling here
                        />)}
                        <IconButton
                        marginLeft={"10px"}
                        aria-label='Delete'
                        color="white"
                        background={"transparent"}
                        icon={<DeleteIcon />}
                        onClick={() => handleDeleteProperty(index)}
                        size="md" // adjust the size as needed
                        />
                    </HStack>
                    {
                            property.enumValues && property.enumValues.length > 0 ? (
                                <HStack marginTop={"5%"}>
                                { property.enumValues.map((enumValue) => (
                                    <Tag> {enumValue}</Tag>
                                    )) }
                                </HStack>
                                // The content you want to render when property.enumValues is defined and has a length greater than 0
                              ) : null
                    }
                    
                </VStack>
            );


        });
    };

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: '10px',

            }}
        >
            {propertiesToRender.length > 0 && (
                <Box>
                    {renderFormControl()}
                </Box>
            )}

            { isAddingCustomProperty && (
                <Box
                style={{
                    color: 'white',
                    borderRadius: '5px',
                    border: '1px solid grey',
                    padding: '5px',
                    boxShadow: '0 0 5px 0px grey',
                    background:'gray.200'
                }}
                marginTop={4}>
                <VStack spacing={0} align="stretch" paddingBottom={4} padding={"3%"}>                
                <HStack spacing={0} width="350px"> 
                
                <Input
                    type='text'
                    value={customPropertyName}
                    placeholder='Enter Custom Property Name'                            
                    onChange={(e) => setCustomPropertyName(e.target.value)}
                    w="full" // Use Chakra UI's "full" instead of "100%" for width
                    _placeholder={{ color: 'purple.400' }} // Adjusted for Chakra UI color scheme
                    borderColor="gray.600" // Assuming you want to match the border color in the image
                    color='white'
                    border="0px"
                    borderRadius='md' // Adjusted for Chakra UI's 'md' value which is typically 4px
                    paddingRight="12" // Adding padding to the right to match the delete icon in the image
                    paddingLeft="4" // Adjusted padding for consistency in Chakra UI
                />
               
                <IconButton
                    icon={<CloseIcon />}
                    aria-label='Cancel'
                    onClick={() => { 
                    setCustomPropertyName('');
                    setIsAddingCustomProperty(false);
                    }}
                    size={"sm"}
                    colorScheme="red" // You can choose the color scheme that fits your design
                    borderRadius='md'
                    marginRight={"10px"}
                    // If you want the icons without background:
                    variant="ghost"
                />
                </HStack>
                </VStack>
                </Box>
                
                
            )}
            <Button
              colorScheme="purple"

                style={{
                    marginTop: '10px',
                    border: '1px solid',
                 
                    borderRadius: '5px'
                }}
                variant={"outline"}
                onClick={() => isAddingCustomProperty ? addCustomProperty(customPropertyName) : setIsAddingCustomProperty(true)}>{ isAddingCustomProperty ? "Add Property" : "Create Property" }</Button>
        </div>
    );
}

export default PropertiesContent;




