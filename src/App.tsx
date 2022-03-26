import "./App.css";
import {
  Center,
  Button,
  SimpleGrid,
  Box,
  Heading,
  Container,
  Input,
  Select,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";

type ChusenList = {
  title: string;
  omomi: number;
};

export const App = () => {
  const listA: ChusenList = {
    title: "A",
    omomi: 1,
  };
  const listB: ChusenList = {
    title: "AA",
    omomi: 2,
  };
  const listC: ChusenList = {
    title: "AAA",
    omomi: 3,
  };
  const lists: ChusenList[] = [listA, listB, listC];
  const [chusenLists, setChusenLists] = useState<ChusenList[]>(lists);

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
              {chusenLists.map((chusenList) => (
                <Center>
                  <Box
                    p={1.5}
                    mt={3}
                    w="90%"
                    h="20"
                    border="2px"
                    borderColor="blue.300"
                    shadow="md"
                    rounded="md"
                    bg="white"
                  >
                    <Input
                      variant="unstyled"
                      placeholder="入力"
                      size="sm"
                      w="80%"
                      mt={-1.5}
                      ml={3}
                    />
                    <Button
                      ml={5}
                      h="7"
                      rounded="lg"
                      bg="orange.300"
                      _hover={{ bg: "orange.200" }}
                    >
                      ×
                    </Button>
                    <Select variant="unstyled" w="15%" ml={3} mt={2}>
                      <option value="1">1倍</option>
                      <option value="2">2倍</option>
                      <option value="3">3倍</option>
                      <option value="4">4倍</option>
                      <option value="5">5倍</option>
                    </Select>
                  </Box>
                </Center>
              ))}
              <Center mt={6}>
                <Button w="25%" h="10" border="2px" borderRadius="md">
                  追加
                </Button>
              </Center>
            </Box>
            <Center mt={6}>
              <Button w="25%" h="10" border="2px" borderColor="green.500">
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
