"use client"
import useGlobalHover from '../hooks/useGlobalHover';
import {
  Modal,
  ModalOverlay,
  useDisclosure,
  ModalContent,
  ModalCloseButton,
  Text
} from '@chakra-ui/react';
import EventTable from './EventTable';
import { useState } from 'react';
import MainTab from './vewProperties/MainTab';

const ComponentPropertyModal = () => {
  const [menuItem, setMenuItem] = useState<number>(1);
  const { isOpen, onOpen, onClose } = useDisclosure({ defaultIsOpen: false });

  useGlobalHover(onOpen, isOpen, setMenuItem);

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} size="full" id='modal'>
        <ModalOverlay />
        <ModalContent
          zIndex={10001}
          backgroundColor="gray.800"
          color="white"
          borderRadius={"2%"}
          w="full"
          id="componentPropertyEditor"
        >
          <ModalCloseButton margin={5} onClick={onClose} />
          {
            menuItem === 1 && <EventTable onClose={onClose} />
          }
          {
            menuItem === 2 && <MainTab />
          }
          {
            menuItem === 3 && <Text >View Revisions</Text>
          }

        </ModalContent>
      </Modal>
    </>
  );
};

export default ComponentPropertyModal;