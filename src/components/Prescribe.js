import {
  Box,
  Button,
  Center,
  Container,
  Heading,
  Stack,
  StackDivider,
  VStack,
} from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
import Prescription from "../json/Prescription.json";
import { useEffect, useState } from "react";

const Prescribe = () => {
  let { type } = useParams();
  const [isSomethingWrong, setIsSomethingWrong] = useState(false);
  const validParams = ["verse1", "verse2", "verse3", "hook"];

  const naviagte = useNavigate();

  const checkIsSomethingWrong = () => {
    if (isSomethingWrong) {
      return;
    }
    if (!type || typeof type !== "string" || !isNaN(type)) {
      setIsSomethingWrong(true);
    } else {
      if (!validParams.includes(type.toLowerCase())) {
        setIsSomethingWrong(true);
      }
    }
  };

  useEffect(() => {
    checkIsSomethingWrong();
  }, []);

  useEffect(() => {
    if (isSomethingWrong) {
      naviagte("/error");
    }
  }, [isSomethingWrong]);

  const result = Prescription[type.toLowerCase()];

  const handleRetry = () => {
    naviagte("/");
  };

  return (
    <Box w={"100%"} height={"100vh"} bg={"twitter.200"}>
      <Container width={"80%"} height={"100%"} bg={"gray.100"}>
        <Center>
          <Stack spacing={1} py={["16%", "12%"]} textAlign={"center"}>
            <Heading>지금 당신에게 필요한 건 UUID의 {type} 입니다~</Heading>
            <Heading>{result?.type}</Heading>
            {/* To-do : https://alvarotrigo.com/blog/css-text-animations/ 가사 애니메이션 */}
            <VStack
              divider={
                <StackDivider
                  borderColor="gray.200"
                  spacing={6}
                  align="stretch"
                />
              }
            >
              {result?.verse.map((v, i) => (
                <Box h={"40px"} key={i}>
                  {v}
                </Box>
              ))}
            </VStack>
            {/* To-do : SNS 공유 기능 */}

            <Button onClick={handleRetry}>테스트 다시 하기</Button>

            <Button>SNS 공유하기</Button>

            <Button>
              <a
                href="https://luminant.kr/ICQ671qr_0"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                UUID 들으러 가기
              </a>
            </Button>
          </Stack>
        </Center>
      </Container>
    </Box>
  );
};

export default Prescribe;
