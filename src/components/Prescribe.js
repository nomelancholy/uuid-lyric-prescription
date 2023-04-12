import {
  Box,
  Button,
  Center,
  Container,
  Heading,
  Stack,
  StackDivider,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
import Prescription from "../json/Prescription.json";
import { useEffect, useState } from "react";
import AnimatedText from "react-animated-text-content";

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
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (isSomethingWrong) {
      naviagte("/error");
    }
    // eslint-disable-next-line
  }, [isSomethingWrong]);

  const result = Prescription[type.toLowerCase()];

  const handleRetry = () => {
    naviagte("/");
  };

  return (
    <Box w={"100%"} minH={"100vh"} bg={"box"}>
      <Container width={"80%"} minH={"100vh"} height={"100%"} bg={"container"}>
        <Center>
          <Stack spacing={1} py={["16%", "12%"]} textAlign={"center"}>
            <Heading
              color={"darkText"}
              fontSize={["lg", "xl", "2xl"]}
              pb={["10%", "14%"]}
            >
              <Text pb={"2%"}>{result?.type}</Text>
              <Text pb={"2%"}> 당신에게 필요한 가사는</Text>
              <Text>UUID의 {type} 입니다</Text>
            </Heading>
            <VStack
              divider={<StackDivider borderColor="box" align="stretch" />}
              spacing={"2"}
            >
              {result?.verse.map((v, i) => {
                const intervalRandomNumber = Math.random() * 0.1;
                const durationRandomNumber = Math.random();
                const thresholdRandomNumber = Math.random();

                return (
                  <Box
                    h={"40px"}
                    key={i}
                    display={"flex"}
                    justifyContent={"center"}
                    alignItems={"center"}
                    fontSize={["sm", "md"]}
                    color={"darkText"}
                  >
                    <AnimatedText
                      type="words"
                      animation={{
                        scale: 1.2,
                        ease: "ease-in-out",
                      }}
                      animationType="throw"
                      interval={intervalRandomNumber}
                      duration={durationRandomNumber}
                      tag="p"
                      className="animated-paragraph"
                      includeWhiteSpaces
                      threshold={thresholdRandomNumber}
                      rootMargin="10%"
                    >
                      {v}
                    </AnimatedText>
                  </Box>
                );
              })}
            </VStack>
            {/* To-do : SNS 공유 기능 */}
            <VStack pt={"20%"}>
              <Button
                bg="box"
                color={"brightText"}
                minW={["70%", "50%"]}
                _hover={{ bg: "twitter.100", color: "darkText" }}
              >
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
              <Button
                bg={"box"}
                color={"brightText"}
                minW={["70%", "50%"]}
                _hover={{ bg: "twitter.100", color: "darkText" }}
              >
                테스트 공유하기
              </Button>
              <Button
                bg={"box"}
                color={"brightText"}
                minW={["70%", "50%"]}
                _hover={{ bg: "twitter.100", color: "darkText" }}
                onClick={handleRetry}
              >
                테스트 다시 하기
              </Button>
            </VStack>
          </Stack>
        </Center>
      </Container>
    </Box>
  );
};

export default Prescribe;
