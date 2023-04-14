import {
  AspectRatio,
  Box,
  Button,
  Container,
  Heading,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const ErrorPage = () => {
  const naviagte = useNavigate();

  const handleRetry = () => {
    naviagte("/");
  };

  return (
    <Box w={"100%"} minH={"100vh"} bg={"box"}>
      <Container w={"80%"} minH={"100vh"} bg={"container"}>
        <Stack
          width={"100%"}
          minH={"100vh"}
          direction="column"
          justifyContent={"center"}
          alignItems={"center"}
          spacing={"20"}
        >
          <Heading size={["sm", "md", "lg"]} color="darkText">
            <Text textAlign={"center"} py={"4"}>
              미안하다
            </Text>
            <Text textAlign={"center"}>
              이거 들려주려고 에러 페이지 만들었다
            </Text>
          </Heading>
          <AspectRatio maxW={"560px"} ratio={1} w={"90%"} h={["2xs", "sm"]}>
            <Box
              as="iframe"
              title="uuid"
              src="https://www.youtube.com/embed/JLR2Do5jNVk"
              allowFullScreen
            />
          </AspectRatio>
          <Button
            bg={"box"}
            color={"brightText"}
            fontSize={["md", "2xl"]}
            _hover={{ bg: "twitter.100", color: "darkText" }}
            onClick={handleRetry}
            py={["10%", "6%"]}
            minW={["70%", "50%"]}
          >
            테스트 하러 돌아가기
          </Button>
        </Stack>
      </Container>
    </Box>
  );
};

export default ErrorPage;
