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
  Grid,
  GridItem,
} from "@chakra-ui/react";
import { useState, useCallback, ChangeEvent } from "react";
import { useChusenList } from "./hooks/useChusenList";

export const App = () => {
  // カスタムフックから取得
  const { chusens, addChusen, deleteChusen } = useChusenList();
  // 入力値
  const [text, setText] = useState<string>("");
  // 重み
  const [omomi, setOmomi] = useState<string>("1");

  const onChangeText = (e: ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };
  const onChangetOmomi = (e: ChangeEvent<HTMLSelectElement>) => {
    setOmomi(e.target.value);
  };

  // 削除ボタン
  const onClickDelete = useCallback(
    (index: number) => {
      deleteChusen(index);
    },
    [deleteChusen]
  );

  // 追加ボタン
  const onClickAdd = () => {
    if (text.trim() === "") {
      alert("追加する抽選対象を入力してください。");
      return;
    }
    addChusen(text, omomi);
    setText("");
    setOmomi("1");
  };

  const scrollBoxStyles = {
    overflow: "auto",
  };

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
            <Heading m={1} as="h4" size="md">
              １：抽選対象の追加
            </Heading>
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
                  variant="flushed"
                  size="sm"
                  w="90%"
                  mt={-1.5}
                  ml={3}
                  value={text}
                  maxLength={25}
                  placeholder="入力"
                  onChange={onChangeText}
                />
                <Select
                  variant="unstyled"
                  w="20%"
                  ml={3}
                  mt={2}
                  value={omomi}
                  onChange={onChangetOmomi}
                >
                  <option value="1">1倍</option>
                  <option value="2">2倍</option>
                  <option value="3">3倍</option>
                  <option value="4">4倍</option>
                  <option value="5">5倍</option>
                </Select>
              </Box>
            </Center>
            <Center mt={4} mb={5}>
              <Button
                w="25%"
                h="10"
                border="2px"
                borderRadius="md"
                onClick={onClickAdd}
              >
                追加
              </Button>
            </Center>
            <Box
              p={0}
              mt={3}
              w="100%"
              h="500"
              border="2px"
              sx={scrollBoxStyles}
            >
              {chusens.map((chusen, index) => (
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
                    <Grid
                      h="20"
                      templateRows="repeat(2, 1fr)"
                      templateColumns="repeat(5, 1fr)"
                      gap={4}
                    >
                      <GridItem rowSpan={2} colSpan={4}>
                        <Box mt={1} ml={1} h="70%" fontWeight="bold">
                          {chusen.title}
                        </Box>
                      </GridItem>
                      <GridItem colSpan={1}>
                        <Button
                          h="7"
                          m={1}
                          rounded="lg"
                          bg="orange.300"
                          _hover={{ bg: "orange.200" }}
                          onClick={() => onClickDelete(index)}
                        >
                          ×
                        </Button>
                      </GridItem>
                      <GridItem colSpan={1}>
                        <Box h="7" ml={1} mt={-3}>
                          × {chusen.omomi}倍
                        </Box>
                      </GridItem>
                    </Grid>
                  </Box>
                </Center>
              ))}
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
