import "./App.css";
import {
  Center,
  Button,
  SimpleGrid,
  Box,
  Heading,
  Container,
} from "@chakra-ui/react";

export const App = () => {
  return (
    <>
      <Box bg="#0d6efd" w="100%" p={4} color="white">
        <Heading as="h4" size="md">
          WEB抽選ツール
        </Heading>
      </Box>
      <Container maxW={"6xl"}>
        <SimpleGrid
          mt={5}
          columns={{ sm: 1, md: 2 }}
          spacing={{ sm: "50px", md: "80px" }}
        >
          <Box>
            <Heading as="h4" size="md">
              抽選対象
            </Heading>
            <Box p={0} mt={3} w="100%" h="500" border="2px">
              There are many benefits to a joint design and development system.
              Not only does it bring benefits to the design team, but it also
              brings benefits to engineering teams. It makes sure that our
              experiences have a consistent look and feel, not just in our
              design specs, but in production
            </Box>
            <Center mt={6}>
              <Button w="25%" h="10">
                抽選
              </Button>
            </Center>
          </Box>
          <Box>
            <Heading as="h4" size="md">
              抽選結果
            </Heading>
            <Box p={0} mt={3} w="100%" h="400" border="2px">
              There are many benefits to a joint design and development system.
              Not only does it bring benefits to the design team, but it also
              brings benefits to engineering teams. It makes sure that our
              experiences have a consistent look and feel, not just in our
              design specs, but in production
            </Box>
          </Box>
        </SimpleGrid>
      </Container>
    </>
  );
};
