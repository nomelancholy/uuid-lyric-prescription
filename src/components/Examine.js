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
  const [stage, setStage] = useState(0);
  const [nowQuestion, setNowQuestion] = useState(Questions[0]);
  const naviagte = useNavigate();

  useEffect(() => {
    setNowQuestion(Questions[stage]);
  }, [stage]);

  console.log("nowQuestion :>> ", nowQuestion);

  const goResultPage = () => {
    // to-do : map 생성 후 결과 따라 페이지 이동
    naviagte("/prescribe/Verse1");
    console.log("call result page");
  };

  const handleClick = (type) => {
    console.log(type);

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
