import {
  Box,
  Container,
  Heading,
  Progress,
  Radio,
  RadioGroup,
  Stack,
  Text,
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
  // To-do : 전체 css ( transition 효과들 추가 )
  const [stage, setStage] = useState(0);
  const [nowQuestion, setNowQuestion] = useState(Questions[0]);

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
    const prescribeType = Object.keys(resultObj).reduce((a, b) =>
      resultObj[a] > resultObj[b] ? a : b
    );

    naviagte(`/prescribe/${prescribeType}`);
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

  return (
    <Box w={"100%"} bg={"twitter.200"}>
      <Progress
        bg={"twitter.400"}
        h={["4", "6", "8"]}
        value={stage * (100 / Questions.length)}
        size="lg"
        hasStripe={false}
      />
      <Container
        bg={"twitter.100"}
        w={"80%"}
        h={["calc(100vh - 1em)", "calc(100vh - 2em)"]}
      >
        <Stack height={"100%"} justifyContent={"center"} alignItems={"center"}>
          <Heading
            color={"gray.500"}
            size={"lg"}
            width={"100%"}
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
    </Box>
  );
};

export default Examine;
