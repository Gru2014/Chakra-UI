"use client";
import { AddIcon, TriangleDownIcon } from "@chakra-ui/icons";

import {
    Button,
    Box,
    Stack,
    Text,
    Select,
    HStack,
    IconButton,
    Textarea,
} from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import { useState } from "react";

const Trigger: React.FC = () => {
    const [isAddConditional, setIsAddConditional] = useState<boolean>(false);
    const tracks = [
        { title: 1 },
        { title: 1 },
        { title: 1 },
        { title: 1 },
        { title: 1 },
    ]

    const handleAddConditional = ():void => {
        setIsAddConditional(true)
    }

    const handleDelete = ():void => {
        setIsAddConditional(false)
    }

    return (
        <>
            <Box mt={200} display="flex" flexDirection={'column'} alignItems={'center'} >
                <Box w={600} >
                    <HStack w={'100%'}>
                        <Stack w={'17%'} align={'center'}>
                            <Text fontSize="xl">Track</Text>
                        </Stack>
                        <Stack w={'100%'}>
                            <Select variant={'outline'} placeholder="Click" icon={<TriangleDownIcon />} borderColor={'darkgray'}>
                                {tracks.map((track, index) => (
                                    <option key={index} value={track.title}>{track.title}</option>
                                ))}
                            </Select>
                        </Stack>
                        <Stack ml={5} visibility={'hidden'}>
                            <IconButton aria-label='delete' colorScheme='red' variant='outline' icon={<DeleteIcon />} />
                        </Stack>
                    </HStack>
                    <HStack mt={10} w={'100%'}>
                        {!isAddConditional ?
                            <>
                                <Stack w={'15%'} align={'center'} visibility={'hidden'}>
                                </Stack>
                                <Stack w={'90%'}>
                                    <Button rightIcon={<AddIcon />} colorScheme='purple' variant='outline' onClick={handleAddConditional}>
                                        Add conditional
                                    </Button>
                                </Stack>
                                <Stack ml={5} visibility={'hidden'}>
                                    <IconButton aria-label='delete' colorScheme='red' variant='outline' icon={<DeleteIcon />} />
                                </Stack>
                            </>

                            :
                            <>
                                <Stack w={'15%'} align={'center'}>
                                    <Text fontSize="xl">if</Text>
                                </Stack>
                                <Stack w={'90%'}>
                                    <Textarea borderColor={'darkgray'} ></Textarea>
                                </Stack>
                                <Stack ml={5}>
                                    <IconButton aria-label='delete' colorScheme='red' variant='outline' icon={<DeleteIcon />} onClick={handleDelete} />
                                </Stack>
                            </>
                        }
                    </HStack>
                </Box>

            </Box>
        </>
    );
};

export default Trigger;
