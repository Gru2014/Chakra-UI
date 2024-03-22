"use client";
import React, { useEffect, useState } from "react";
import {
    Input,
    VStack,
    Popover,
    Text,
    PopoverTrigger,
    PopoverContent,
    useColorModeValue,
    Checkbox,
    Box
} from "@chakra-ui/react";
import { useMyContext } from '../../context/context';

type Props = {
    setCustomPropertyName: (name: string) => void;
    setDisabled: (disabled: boolean) => void;
}

let wordlist: string[] = [];

const CustomDropDown = ({ setCustomPropertyName, setDisabled }: Props) => {
    const borderColor = useColorModeValue("gray.300", "gray.600");
    const popoverContentBg = useColorModeValue("#1a202c", "gray.800");

    const [inputValue, setInputValue] = useState("");
    const [open, setOpen] = useState<boolean>(false)
    const [previewList, setPreviewList] = useState<string[]>([]);

    const { variants, currentVariant } = useMyContext();

    useEffect(() => {
        const properties: string[] = [];
        variants.forEach(variant => {
            if (variant?.properties) {
                variant?.properties.forEach(property => {
                    properties.push(property.name)
                });
            }
        });
        wordlist = [...new Set(properties)]
    }, [variants, currentVariant])

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const preList = wordlist.filter((word) => word.includes(event.target.value));
        if (preList.length === 0 && event.target.value.length) {
            setPreviewList([`create new "${event.target.value}" property`]);
        }
        else setPreviewList(preList);
        setInputValue(event.target.value);
        setCustomPropertyName(event.target.value);
    };

    const handleCreateClick = () => {
        // Implement the logic to handle the creation of the metadata
    };

    useEffect(() => {
        if (previewList.length && inputValue.length) setOpen(true);
        else setOpen(false)
    }, [previewList, inputValue]);

    useEffect(() => {
        const modal = document.getElementById("chakra-modal-modal") as HTMLElement
        modal.addEventListener('click', handleDropdown)
        // Clean up event listeners
        return () => {
            modal.removeEventListener('click', handleDropdown);
        };
    }, [])

    const handleDropdown = () => {
        setOpen(false)
    }

    const handleSet = (setStr: string): void => {
        setPreviewList([]);
        if (setStr.includes(`"`)) {
            setInputValue(setStr.split(`"`)[1])
            setCustomPropertyName(setStr.split(`"`)[1]);
        } else {
            setInputValue(setStr);
            setCustomPropertyName(setStr);
        }
        setDisabled(false)
    };

    return (
        <VStack spacing={4} align="stretch" w={'100%'}>
            <Popover placement="bottom-start" isOpen={open} computePositionOnMount autoFocus={false}>
                <PopoverTrigger>
                    <Input
                        value={inputValue}
                        onChange={handleInputChange}
                        placeholder='Enter Custom Property Name'
                        // onChange={(e) => setCustomPropertyName(e.target.value)}
                        w="full" // Use Chakra UI's "full" instead of "100%" for width
                        _placeholder={{ color: 'purple.400' }} // Adjusted for Chakra UI color scheme
                        borderColor="gray.600" // Assuming you want to match the border color in the image
                        color='white'
                        border="0px"
                        borderRadius='md' // Adjusted for Chakra UI's 'md' value which is typically 4px
                    />
                </PopoverTrigger>
                <PopoverContent borderColor={borderColor} bg={popoverContentBg} zIndex={10002} w={'100%'}>
                    <VStack w={'100%'}>
                        {previewList &&
                            previewList.map((item, index) => (
                                <Box key={index} w={'100%'} onClick={() => handleSet(item)} cursor={'pointer'}>
                                    <Text textAlign={'center'} m={4}>
                                        {item}
                                    </Text>
                                </Box>
                            ))}
                    </VStack>
                </PopoverContent>
            </Popover>
        </VStack>
    );
};

export default CustomDropDown;
