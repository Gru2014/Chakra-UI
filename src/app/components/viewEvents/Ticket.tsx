"use client";
import {
    VStack,
    Box,
    Stack,
    TagLabel,
    Tag,
    Text,
    Textarea,
} from "@chakra-ui/react";

import { useState } from "react";

const Ticket = () => {

    const handleChangeStatus = (index: number): void => {
        if (currentStatus === index) setCurrentStatus(4);
        else setCurrentStatus(index);
    };

    const colors = ["blue", "red", "green"];
    const [currentStatus, setCurrentStatus] = useState(4);

    return (
        <>
            <Box mt={20} display="flex" justifyContent="center">
                <VStack spacing={4} w={"80%"} align={"stretch"}>
                    <Stack
                        direction="column"
                        spacing={4}
                        align="left"
                        justify={"center"}
                    >

                        <Text fontSize="2xl">Ticket Detail</Text>
                        <Textarea
                            rows={15}
                            placeholder="Name"
                            width={"100%"}
                            defaultValue={'Task: Enhance `setEventMetadataForPageX` for Sensor Addition Tracking       Details:     Generate Function: Execute  `npm run generate:analytics --session=&ldquo;abc&rdquo;`to generate the helper function named `setEventMetadataForPageX`.   Integration: Add a  `sensor_added` boolean parameter to the  `setEventMetadataForPageX`  function to track sensor additions by users. Set to  `true` when a sensor is added, and `false` otherwise. Ensure accuracy in logging this data.'}
                        >
                            
                        </Textarea>
                    </Stack>
                    <Stack
                        direction="row"
                        spacing={10}
                        mt={2}
                    >
                        <Text fontSize="2xl">Status:</Text>
                        <Stack
                            direction="row"
                            justify={"flex-start"}
                            spacing={"13"}
                        >
                            {[
                                "In production",
                                "Developing",
                                "Switched off",
                            ].map((status, index) => (
                                <Tag
                                    size={"lg"}
                                    key={status}
                                    cursor={"pointer"}
                                    variant={
                                        index === currentStatus
                                            ? "solid"
                                            : "outline"
                                    }
                                    colorScheme={colors[index]}
                                    onClick={(): void =>
                                        handleChangeStatus(index)
                                    }
                                >
                                    <TagLabel>{status}</TagLabel>
                                </Tag>
                            ))}
                        </Stack>
                    </Stack>
                </VStack>
            </Box>
        </>
    );
};

export default Ticket;
