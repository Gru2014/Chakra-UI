import React from 'react';
import {
  Editable,
  EditableInput,
  EditablePreview,
  ButtonGroup,
  IconButton,
  Flex,
  Input,
} from '@chakra-ui/react';
import { CheckIcon, CloseIcon, EditIcon } from '@chakra-ui/icons';
import { useEditableControls } from '@chakra-ui/react';

function InputComponent() {
  function EditableControls() {
    const {
      isEditing,
      getSubmitButtonProps,
      getCancelButtonProps,
      getEditButtonProps,
    } = useEditableControls();

    return isEditing ? (
      <ButtonGroup justifyContent='center' size='sm' ml={4}
      >
        <IconButton
          icon={<CheckIcon />}
          {...(getSubmitButtonProps() as any)}
        />
        <IconButton
          icon={<CloseIcon />}
          {...(getCancelButtonProps() as any)}
        />
      </ButtonGroup>
    ) : (
      <Flex justifyContent='center'>
        <IconButton
          size='sm'
          ml={12}
          icon={<EditIcon />}
          {...(getEditButtonProps() as any)}
        />
      </Flex>
    );
  }

  return (
    <Editable
      textAlign='center'
      defaultValue='Component Name'
      fontSize='15px'
      marginRight='20px'
      isPreviewFocusable={false}
      style={{
        display: 'flex',
        justifyContent: 'center',
        padding: '5px',
        borderRadius: '10px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        color: '#ffc0cb',
      }}
    >
      <EditablePreview />
      <Input as={EditableInput}
      />
      <EditableControls />
    </Editable>
  );
}

export default InputComponent;
