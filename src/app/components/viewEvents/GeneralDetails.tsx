"use client";
import { AddIcon } from "@chakra-ui/icons";
import { Set } from "es6-shim";
import {
    Input,
    Button,
    VStack,
    Box,
    Stack,
    Switch,
    HStack,
    TagLabel,
    TagCloseButton,
    Tag,
    Text,
    Textarea,
} from "@chakra-ui/react";

import { ChangeEvent, useState } from "react";

const GeneralDetails = () => {

    const [KPIs, setKPIs] = useState<string[]>([]);
    const [newKpi, setNewkpi] = useState<string>("");

    const handleChangeInput = (event: ChangeEvent<HTMLInputElement>): void => {
        setNewkpi(event.target.value);
    };

    const handleAddKpi = (): void => {
        if (newKpi !== "") {
            setKPIs((prev) => [...new Set<string>([...prev, newKpi])] as string[]);
            setNewkpi("");
        }
    };

    const handleDeleteTag = (tagName: string) => {
        const newKPIs = KPIs.filter(kpi => kpi !== tagName)
        setKPIs(newKPIs)
    }

    return (
        <Box mt={10} display="flex" justifyContent="center">
            <VStack spacing={4} align="stretch" w={"80%"}>
                <Stack
                    direction="column"
                    spacing={4}
                    align="left"
                >
                    <Stack
                        direction="row"
                        spacing={6}
                        align="center"
                        justify={"space-between"}
                    >
                        <Text fontSize="1xl">Event name</Text>
                        <Stack
                            direction="row"
                            spacing={6}
                            align="center"
                        >
                            <Stack
                                direction="row"
                                spacing={2}
                                align="center"
                            >
                                <Text fontSize="sm">
                                    Desktop
                                </Text>
                                <Switch size="lg" />
                            </Stack>
                            <Stack
                                direction="row"
                                spacing={2}
                                align="center"
                            >
                                <Text fontSize="sm">
                                    Mobile
                                </Text>
                                <Switch size="lg" />
                            </Stack>
                        </Stack>
                    </Stack>
                    <Input placeholder="Name" />
                </Stack>
                <Stack
                    direction="column"
                    spacing={4}
                    align="left"
                >
                    <Text fontSize="1xl" width={"auto"}>
                        Event description
                    </Text>
                    <Textarea
                        placeholder="Description"
                        size="lg"
                        rows={9}
                    />
                </Stack>
                <Stack
                    direction="column"
                    spacing={4}
                    align="left"
                    mt={2}
                >
                    <Text fontSize="1xl">KPIs</Text>
                    <Stack
                        direction="row"
                        justify={"flex-start"}
                        spacing={"6"}
                    >
                        <Input
                            placeholder="KPIs"
                            value={newKpi}
                            onChange={handleChangeInput}
                        />
                        <Button
                            size="xh"
                            w="10%"
                            colorScheme="orange"
                            onClick={handleAddKpi}
                        >
                            <AddIcon />
                        </Button>
                    </Stack>

                    <HStack spacing={4}>
                        {KPIs.map((tagName, index) => (
                            <Tag
                                size={"lg"}
                                key={index}
                                borderRadius="full"
                                variant="solid"
                                colorScheme="green"
                            >
                                <TagLabel>{tagName}</TagLabel>
                                <TagCloseButton onClick={() => handleDeleteTag(tagName)} />
                            </Tag>
                        ))}
                    </HStack>
                </Stack>
            </VStack>
        </Box>
    );
};

export default GeneralDetails;
