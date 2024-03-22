import styles from "./page.module.css";
import { Box, Text, Card, CardHeader, Heading, CardBody, Stack, Button } from "@chakra-ui/react"
import ComponentPropertyModal from "./components/ComponentPropertyModal";

export default function Home() {

  return (
    <main className={styles.main}>
      <Text fontSize='5xl'>Welcome to a New Way to Experiment!</Text>
      <Box position='relative'>
        <Text id='menu-event' fontSize='xl'>
          Chat with our assistant about your data help you generate the graphs from you data.
        </Text>
      </Box>
      <ComponentPropertyModal />

      <Card id='menu' display='none' position='absolute'>
        <CardHeader textAlign='center'>
          <Heading size='md' >Actions</Heading>
        </CardHeader>
        <CardBody p={0}>
          <Stack >
            <Box>
              <Button id='view-events' fontSize='sm' w='100%' borderRadius={0}>
                View Events
              </Button>
            </Box>
            <Box>
              <Button id='view-properties' fontSize='sm' borderRadius={0}>
                View Properties
              </Button>
            </Box>
            <Box>
              <Button id='view-revisions' fontSize='sm' w='100%' borderRadius={0}>
                View Revisions
              </Button>
            </Box>
          </Stack>
        </CardBody>
      </Card>

    </main>
  );
}
