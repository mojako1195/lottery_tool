import "./App.css";
import { Center, Button, Grid, GridItem } from "@chakra-ui/react";

export const App = () => {
  return (
    <>
      <h1>Hello world</h1>
      <Center>
        <Button>Push me!</Button>
      </Center>
      <Grid
        h="200px"
        templateRows="repeat(2, 1fr)"
        templateColumns="repeat(5, 1fr)"
        gap={4}
      >
        <GridItem rowSpan={2} colSpan={1} bg="red.500" />
        <GridItem colSpan={2} bg="red.500" />
        <GridItem colSpan={2} bg="red.500" />
        <GridItem colSpan={4} bg="red.500" />
      </Grid>
    </>
  );
};
