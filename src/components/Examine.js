import {
  Box,
  Button,
  Container,
  Heading,
  Progress,
  Stack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Questions from "../json/Questionnaire.json";

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

  const handleClick = (type) => {
    setResultObj((prev) => {
      return {
        ...prev,
        [type]: prev[type] + 1,
      };
    });

    if (stage + 1 === Questions.length) {
      goResultPage();
    } else {
      setStage(stage + 1);
    }
  };

  return (
    <Box w={"100%"}>
      <Container h={"100vh"}>
        <Progress
          value={stage * (100 / Questions.length)}
          size="lg"
          hasStripe={false}
        />
        <>
          <Heading size={"md"}>{nowQuestion.question}</Heading>
          <Stack>
            {nowQuestion.answers.map((a, index) => (
              <Button key={a.type} onClick={() => handleClick(a.type)}>{`${
                index + 1
              }. ${a.content}`}</Button>
            ))}
          </Stack>
        </>
      </Container>
    </Box>
  );
};

export default Examine;
