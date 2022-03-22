import "./App.css";
import { Center, Button, Grid, GridItem, Box, Heading } from "@chakra-ui/react";

export const App = () => {
  return (
    <>
      <Box bg="#0d6efd" w="100%" p={4} color="white">
        <Heading as="h4" size="md">
          WEB抽選ツール
        </Heading>
      </Box>
      <h1>Hello world</h1>
      <Center>
        <Button>Push me!</Button>
      </Center>
    </>
  );
};
