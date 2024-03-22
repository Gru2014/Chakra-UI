"use client";
import {
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    Button,
    Box,
    Stack,
    ButtonGroup,
    Stepper,
    StepIcon,
    StepTitle,
    StepIndicator,
    Step,
    StepNumber,
    useSteps,
    StepStatus,
    StepSeparator,
    useDisclosure,
} from "@chakra-ui/react";

import { useEffect, useState } from "react";
import ViewEvents from "./viewEvents";

const Illusion: React.FC = () => {
    const { isOpen, onOpen, onClose } = useDisclosure({ defaultIsOpen: false });

    const steps = [
        { title: "General Details" },
        { title: "Trigger" },
        { title: "Metadatas" },
        { title: "Ticket" },
    ];
    const [currentStep, setCurrentStep] = useState<number>(0)

    const { activeStep, setActiveStep } = useSteps({
        index: currentStep,
        count: 4,
    });

    const handleNext = () => {
        setCurrentStep(prev => prev + 1);
    }

    const handleGoto = (step: number): void => {
        if (step != currentStep && step < 4)
            setCurrentStep(step)
    }

    useEffect(()=>{
        setActiveStep(currentStep)
    }, [currentStep, setActiveStep])

    return (
        <>
            <ModalHeader alignSelf={"center"}>Add Event</ModalHeader>
            <ModalBody overflow={"visible"}>
                <Box m={[5, 2]}>
                    <Stepper index={activeStep}>
                        {steps.map((step, index) => (
                            <Step key={index} >
                                <StepIndicator cursor={"pointer"} onClick={() => handleGoto(index)}>
                                    <StepStatus
                                        complete={<StepIcon />}
                                        incomplete={<StepNumber />}
                                        active={<StepNumber />}
                                    />
                                </StepIndicator>

                                <Box flexShrink="0" cursor={"pointer"} onClick={() => handleGoto(index)}>
                                    <StepTitle >{step.title}</StepTitle>
                                </Box>

                                <StepSeparator />
                            </Step>
                        ))}
                    </Stepper>
                </Box>
                {/* custom body */}
                <ViewEvents step={currentStep as number} />
            </ModalBody>

            <ModalFooter flexDirection="column" alignItems="stretch">
                <Stack
                    direction="row"
                    spacing={4}
                    justify={"space-between"}
                    marginLeft={"10%"}
                    marginRight={"10%"}
                >
                    <Button colorScheme="red" variant="outline">
                        Cancel
                    </Button>
                    <ButtonGroup spacing={"20%"}>
                        <Button colorScheme="teal" variant="outline">
                            Save
                        </Button>
                        <Button colorScheme="teal" variant="outline" onClick={handleNext}>
                            Next
                        </Button>
                    </ButtonGroup>
                </Stack>
            </ModalFooter>
        </>
    );
};

export default Illusion;
