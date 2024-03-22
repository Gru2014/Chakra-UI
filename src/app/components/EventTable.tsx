"use client";
import { AddIcon } from "@chakra-ui/icons";
import {
  ModalBody,
  ModalFooter,
  Button,
  VStack,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  HStack,
  Tag,
  TagLabel,
  extendTheme,
  ChakraProvider,
} from "@chakra-ui/react";

import { useState } from "react";
import Illusion from "./Illusion";

const customTheme = extendTheme({
  td: {
    borderRight: "1px",
    borderRightColor: "grey.100",
  },
  th: {
    borderRight: "1px",
    borderRightColor: "grey.100",
  },
});

type Props = {
  onClose: () => void;
}

const EventTable: React.FC<Props> = ({ onClose }: Props) => {
  const [eventOpen, setEventOpen] = useState(false);

  const handleClickEvent = () => {
    setEventOpen(true);
  };

  const events = [
    {
      id: 1,
      name: "Sensor_added",
      time: "July 4th 2023 13:00 est",
      status: 0,
    },
    {
      id: 2,
      name: "Sensor_added",
      time: "July 4th 2023 13:00 est",
      status: 1,
    },
    {
      id: 3,
      name: "Sensor_added",
      time: "July 4th 2023 13:00 est",
      status: 2,
    },
    {
      id: 4,
      name: "Sensor_added",
      time: "July 4th 2023 13:00 est",
      status: 1,
    },
  ];
  const colors = ["blue", "red", "green"];
  const status = ["In production", "Developing", "Swirched off"];

  return (
    <>
      {!eventOpen ?
        <>
          <ModalBody overflow={"visible"}>
            <VStack>
              <ChakraProvider theme={customTheme}>
                <TableContainer
                  marginTop={100}
                  border="1px"
                  borderColor="grey.100"
                >
                  <Table
                    size="lg"
                    variant={"unstyled"}
                    colorScheme="gray"
                  >
                    <Thead
                      border="1px"
                      borderColor="grey.100"
                    >
                      <Tr>
                        <Th
                          borderRight={"1px"}
                          borderRightColor={
                            "grey.100"
                          }
                        >
                          Event name
                        </Th>
                        <Th
                          borderRight={"1px"}
                          borderRightColor={
                            "grey.100"
                          }
                        >
                          Created at
                        </Th>
                        <Th>Status</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {events.map((event) => (
                        <Tr
                          key={event.id}
                          onClick={handleClickEvent}
                          cursor="pointer"
                          borderBottom="1px"
                          borderBottomColor="grey.100"
                        >
                          <Td
                            borderRight={"1px"}
                            borderRightColor={
                              "grey.100"
                            }
                          >
                            {event.name}
                          </Td>
                          <Td
                            borderRight={"1px"}
                            borderRightColor={
                              "grey.100"
                            }
                          >
                            {event.time}
                          </Td>
                          <Td>
                            <HStack spacing={4}>
                              <Tag
                                size={"lg"}
                                variant="outline"
                                colorScheme={
                                  colors[
                                  event
                                    .status
                                  ]
                                }
                              >
                                <TagLabel>
                                  {
                                    status[
                                    event
                                      .status
                                    ]
                                  }
                                </TagLabel>
                              </Tag>
                            </HStack>
                          </Td>
                        </Tr>
                      ))}
                    </Tbody>
                  </Table>
                </TableContainer>
              </ChakraProvider>
              <Button
                colorScheme="purple"
                variant="outline"
                marginTop={10}
                rightIcon={<AddIcon />}
              >
                Add event
              </Button>
            </VStack>
          </ModalBody>
          <ModalFooter
            flexDirection="column"
            alignItems="center"
          ></ModalFooter>
        </>
        :
        <Illusion />}
    </>


  );
};

export default EventTable;
