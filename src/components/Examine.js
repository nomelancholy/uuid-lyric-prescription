import {
  Box,
  Center,
  Container,
  Heading,
  Progress,
  Radio,
  RadioGroup,
  Spinner,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Questions from "../json/Questionnaire.json";

const colorScale = ["#CC3333", "#CC3333", "#757575", "#00B9FC", "#00B9FC"];
const radioSizeList = ["lg", "md", "sm", "md", "lg"];
const emojiList = ["비동의", "", "", "", "동의"];

const answers = [
  {
    score: -2,
    content: "전혀 그렇지 않다",
  },
  {
    score: -1,
    content: "그렇지 않다",
  },
  {
    score: 0,
    content: "중립",
  },
  {
    score: 1,
    content: "그렇다",
  },
  {
    score: 2,
    content: "매우 그렇다",
  },
];

const Examine = () => {
  const [stage, setStage] = useState(0);
  const [nowQuestion, setNowQuestion] = useState(Questions[0]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const [resultObj, setResultObj] = useState({
    verse1: 0,
    verse2: 0,
    verse3: 0,
    hook: 0,
  });

  const naviagte = useNavigate();

  useEffect(() => {
    setNowQuestion(Questions[stage]);
  }, [stage]);

  const goResultPage = () => {
    if (isCompleted) {
      return;
    }
    setIsAnalyzing(true);

    setTimeout(() => {
      setIsCompleted(true);
    }, 2000);
  };

  const handleAnswer = ({ type, score }) => {
    setResultObj((prev) => {
      return {
        ...prev,
        [type]: prev[type] + score,
      };
    });

    if (stage + 1 === Questions.length) {
      goResultPage();
    } else {
      setStage(stage + 1);
    }
  };

  useEffect(() => {
    if (isCompleted) {
      const prescribeType = Object.keys(resultObj).reduce((a, b) =>
        resultObj[a] > resultObj[b] ? a : b
      );

      naviagte(`/prescribe/${prescribeType}`);
    }
    // eslint-disable-next-line
  }, [isCompleted]);

  return (
    <Box w={"100%"} bg={"box"}>
      {isAnalyzing ? (
        <Container w={"80%"} minH={"100vh"} bg={"container"}>
          <Stack
            width={"100%"}
            minH={"100vh"}
            direction="column"
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Center>
              <VStack>
                <Heading color={"darkText"} pb={"20%"}>
                  결과 분석중입니다
                </Heading>
                <Spinner
                  thickness="4px"
                  speed="0.65s"
                  emptyColor="gray.200"
                  color="box"
                  size="xl"
                />
              </VStack>
            </Center>
          </Stack>
        </Container>
      ) : (
        <>
          <Progress
            bg={"twitter.300"}
            h={["4", "6", "8"]}
            value={stage * (100 / Questions.length)}
            size="lg"
            hasStripe={false}
          />
          <Container bg={"container"} w={"80%"} minH={"100vh"}>
            <Stack
              minH={"100vh"}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <Heading
                color={"darkText"}
                size={"lg"}
                width={"80%"}
                textAlign={"center"}
                mt={"-8"}
                pb={["16%", "20%"]}
              >
                {nowQuestion.question}
              </Heading>

              <RadioGroup>
                <Stack direction={"row"}>
                  {answers.map((answer, index) => (
                    <Stack
                      justifyContent={"center"}
                      alignItems={"center"}
                      key={`${nowQuestion.type}-${nowQuestion.id}-${answer.score}`}
                      px={[1, 2, 3]}
                    >
                      <Radio
                        size={radioSizeList[index]}
                        border={`2px solid ${colorScale[index]}`}
                        value={answer.score}
                        onChange={() =>
                          handleAnswer({
                            type: nowQuestion.type,
                            score: answer.score,
                          })
                        }
                      />
                      <Text
                        textAlign={"center"}
                        color={"darkText"}
                        height={"8"}
                        width={[9, 10]}
                        fontSize={["xs", "sm"]}
                        pt={3}
                      >
                        {emojiList[index]}
                      </Text>
                    </Stack>
                  ))}
                </Stack>
              </RadioGroup>
            </Stack>
          </Container>
        </>
      )}
    </Box>
  );
};

export default Examine;
