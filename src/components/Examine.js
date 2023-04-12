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

const colorScale = ["#D01B1B", "#FF4242", "#FFFFFF", "#95D2EC", "#47abd8"];

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
        <Container w={"80%"} h={"100vh"} bg={"container"}>
          <Stack
            width={"100%"}
            height={"100%"}
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
          <Container
            bg={"container"}
            w={"80%"}
            h={["calc(100vh - 1em)", "calc(100vh - 2em)"]}
          >
            <Stack
              height={"100%"}
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
                  <Text fontSize={["3xl", "4xl", "5xl"]} pr={[4, 6, 8]}>
                    🙅‍♂️
                  </Text>
                  {answers.map((answer, index) => (
                    <Radio
                      size={["sm", "md", "lg"]}
                      bgColor={colorScale[index]}
                      pr={[4, 6, 8]}
                      value={answer.score}
                      key={`${nowQuestion.type}-${nowQuestion.id}-${answer.score}`}
                      onChange={() =>
                        handleAnswer({
                          type: nowQuestion.type,
                          score: answer.score,
                        })
                      }
                    />
                  ))}
                  <Text fontSize={["3xl", "4xl", "5xl"]}>🙆‍♂️</Text>
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
