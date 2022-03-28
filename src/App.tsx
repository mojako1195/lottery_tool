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
  Radio,
  RadioGroup,
  Stack,
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
  // 順位
  const [rank, setRank] = useState<string>("1");
  // 当選数
  const [num, setNum] = useState<number>(1);
  // 当選リスト
  const [rankList, setRankList] = useState<string[]>([]);

  const onChangeText = (e: ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };
  const onChangeOmomi = (e: ChangeEvent<HTMLSelectElement>) => {
    setOmomi(e.target.value);
  };
  const onChangeRank = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    setRank(e.target.value);
  };
  const onChangeNum = (e: ChangeEvent<HTMLSelectElement>) => {
    const value: number = Number(e.target.value);
    console.log(value);
    setNum(value);
  };
  const updateRankList = () => {
    setRankList(rankList.map((ranklist, index) => ranklist));
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

  // 抽選ボタン
  const onClickChusen = () => {
    if (chusens.length == 0) {
      alert("抽選対象を追加してください。");
      return;
    }
    if (!num) {
      alert("当選数を選択してください。");
      return;
    }
    const textList: string[] = [];
    chusens.map((chusen) => {
      for (let i = 0; i < parseInt(chusen.omomi); i++) {
        textList.push(chusen.title);
      }
    });
    const shuffledList = shuffleArray(textList);

    rankList.length = 0;
    console.log(rankList.length);
    while (rankList.length < num) {
      const rand = Math.floor(Math.random() * shuffledList.length);
      if (rankList.includes(shuffledList[rand])) {
        continue;
      } else {
        rankList.push(shuffledList[rand]);
      }
    }
    setRankList(rankList);
    updateRankList();
    console.log(rankList);
  };

  // 配列シャッフル
  const shuffleArray = (array: string[]) => {
    const cloneArray = [...array];

    for (let i = cloneArray.length - 1; i >= 0; i--) {
      let rand = Math.floor(Math.random() * (i + 1));
      // 配列の要素の順番を入れ替える
      let tmpStorage = cloneArray[i];
      cloneArray[i] = cloneArray[rand];
      cloneArray[rand] = tmpStorage;
    }

    return cloneArray;
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
                  placeholder="入力（最大２５字）"
                  onChange={onChangeText}
                />
                <Select
                  variant="unstyled"
                  w="20%"
                  ml={3}
                  mt={2}
                  value={omomi}
                  onChange={onChangeOmomi}
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
            <Box mt={10}>
              <Heading m={1} as="h4" size="md">
                ２：各種設定を選択
              </Heading>
              <Grid
                h="20"
                templateRows="repeat(2, 1fr)"
                templateColumns="repeat(4, 1fr)"
                gap={4}
                p={4}
              >
                <GridItem colSpan={1}>
                  <Text mt={2.5}>当選数：</Text>
                </GridItem>
                <GridItem colSpan={3}>
                  <Select
                    mt={0.5}
                    variant="flushed"
                    w="50%"
                    value={num}
                    onChange={onChangeNum}
                  >
                    {chusens.map((chusen, index) => (
                      <option value={index + 1}>{index + 1}</option>
                    ))}
                  </Select>
                </GridItem>
              </Grid>
              <RadioGroup defaultValue="1" pl={4}>
                <Stack spacing={5} direction="row">
                  <Text>順位　：</Text>
                  <Radio colorScheme="red" value="1" onChange={onChangeRank}>
                    なし
                  </Radio>
                  <Radio colorScheme="green" value="2" onChange={onChangeRank}>
                    あり
                  </Radio>
                </Stack>
              </RadioGroup>
              <Box mt={10}>
                <Heading m={1} as="h4" size="md">
                  ３：抽選ボタンをクリック
                </Heading>
                <Center mt={6}>
                  <Button
                    w="25%"
                    h="10"
                    border="2px"
                    borderColor="green.500"
                    onClick={onClickChusen}
                  >
                    抽選
                  </Button>
                </Center>
              </Box>
            </Box>
          </Box>
          <Box p={0} mt={3} w="100%" h="500" border="2px" sx={scrollBoxStyles}>
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
        </SimpleGrid>
        <SimpleGrid
          mt={5}
          columns={{ sm: 1, md: 1 }}
          spacing={{ sm: "50px", md: "80px" }}
        >
          <Box mt={5} mb={3}>
            <Heading as="h4" size="md">
              ４：抽選結果
            </Heading>
            <Box
              p={0}
              mt={3}
              w="100%"
              h="400"
              border="2px"
              sx={scrollBoxStyles}
            >
              {rankList.map((rankText, index) =>
                rank === "2" ? (
                  <Box>
                    {index + 1}位：{rankText}
                  </Box>
                ) : (
                  <Box>{rankText}</Box>
                )
              )}
            </Box>
          </Box>
        </SimpleGrid>
      </Container>
    </>
  );
};
