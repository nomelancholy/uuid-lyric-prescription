import {
  Box,
  Button,
  Center,
  Container,
  Heading,
  IconButton,
  Stack,
  StackDivider,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
import Prescription from "../json/Prescription.json";
import { useEffect, useState } from "react";
import AnimatedText from "react-animated-text-content";
import {
  FacebookShareButton,
  TwitterShareButton,
  TelegramShareButton,
  FacebookIcon,
  TwitterIcon,
  TelegramIcon,
} from "react-share";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink, faComment } from "@fortawesome/free-solid-svg-icons";

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

  const kakaoInit = () => {
    const script = document.createElement("script");
    script.src = "https://t1.kakaocdn.net/kakao_js_sdk/2.1.0/kakao.min.js";
    script.async = true;
    document.body.appendChild(script);

    return () => document.body.removeChild(script);
  };

  useEffect(() => {
    checkIsSomethingWrong();
    kakaoInit();
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

  const handleKakaoShare = () => {
    const kakao = window.Kakao;
    kakao.init(process.env.REACT_APP_KAKAO_KEY);
    if (kakao?.isInitialized()) {
      kakao.Share.sendDefault({
        objectType: "feed",
        content: {
          title: "지금 당신에게 필요한",
          description: "UUID 가사를 처방해드립니다",
          imageUrl: "https://i.ibb.co/VCmgvQQ/Take-Knowledge-UUID.jpg",
          link: {
            mobileWebUrl: "https://uuid-lyrics-prescription.netlify.app",
            webUrl: "https://uuid-lyrics-prescription.netlify.app",
          },
        },
      });
    }
  };

  const handleCopyClipboard = async () => {
    try {
      await navigator.clipboard.writeText(
        "https://uuid-lyrics-prescription.netlify.app/"
      );
      alert("클립보드에 링크가 복사되었습니다.");
    } catch (e) {
      alert("복사에 실패하였습니다");
    }
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
            <VStack pt={["10%", "12%"]}>
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
                onClick={handleRetry}
              >
                테스트 다시 하기
              </Button>
              <Stack direction={"row"} pt={["6", "12"]}>
                <FacebookShareButton
                  url="https://uuid-lyrics-prescription.netlify.app/"
                  title="공유하기"
                >
                  <FacebookIcon size={40} round />
                </FacebookShareButton>
                <TwitterShareButton
                  url="https://uuid-lyrics-prescription.netlify.app/"
                  title="공유하기"
                >
                  <TwitterIcon size={40} round />
                </TwitterShareButton>
                <TelegramShareButton
                  url="https://uuid-lyrics-prescription.netlify.app/"
                  title="공유하기"
                >
                  <TelegramIcon size={40} round />
                </TelegramShareButton>
                <IconButton
                  size={"md"}
                  borderRadius={"full"}
                  bg={"#FFEA21"}
                  color={"#3F3035"}
                  _hover={{ bg: "#F9E81E", color: "#C5AB6A" }}
                  icon={<FontAwesomeIcon size="xl" icon={faComment} />}
                  onClick={() => handleKakaoShare()}
                />
                <IconButton
                  size={"md"}
                  borderRadius={"full"}
                  bg={"box"}
                  color={"brightText"}
                  _hover={{ bg: "brightText", color: "box" }}
                  icon={<FontAwesomeIcon size="xl" icon={faLink} />}
                  onClick={() => handleCopyClipboard()}
                />
              </Stack>
            </VStack>
          </Stack>
        </Center>
      </Container>
    </Box>
  );
};

export default Prescribe;
