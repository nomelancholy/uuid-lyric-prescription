import {
  Box,
  Button,
  Center,
  Container,
  Img,
  Link,
  Spinner,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import uuidCover from "../img/uuid_cover.jpg";
import { useEffect, useLayoutEffect, useState } from "react";

const Welcome = () => {
  const naviagte = useNavigate();
  const handleClick = () => {
    naviagte("examine");
  };

  const [isLoading, setIsLoading] = useState(true);

  const imgPreload = () => {
    const img = new Image();
    img.src = uuidCover;
  };

  useLayoutEffect(() => {
    imgPreload();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  return (
    <Box w="100%" h={"100vh"} bg={"twitter.200"}>
      <Container w={"80%"} h={"100%"} bg={"gray.100"}>
        {isLoading ? (
          <Stack
            width={"100%"}
            height={"100%"}
            direction="row"
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Center>
              <Spinner
                thickness="4px"
                speed="0.65s"
                emptyColor="gray.200"
                color="blue.500"
                size="xl"
              />
            </Center>
          </Stack>
        ) : (
          <>
            <Img src={uuidCover} px={"1em"} py={["20%", "10%"]} />

            <Center>
              <Stack spacing={1} py={["16%", "12%"]} textAlign={"center"}>
                <Text fontSize={["md", "2xl"]}>지금 당신에게 필요한</Text>

                <Text fontSize={["md", "2xl"]}>
                  <Link
                    href="https://luminant.kr/ICQ671qr_0"
                    color={"twitter.600"}
                    isExternal
                  >
                    UUID
                  </Link>
                  가사를 처방해드립니다
                </Text>
              </Stack>
            </Center>
            <Center paddingY={["8%", "4%"]}>
              <Button
                bg={"twitter.400"}
                py={["10%", "6%"]}
                paddingX={"8%"}
                onClick={handleClick}
                fontSize={["md", "2xl"]}
                color={"whiteAlpha.800"}
                _hover={{ bg: "twitter.100", color: "gray.500" }}
              >
                진단 받으러 가기
              </Button>
            </Center>
          </>
        )}
      </Container>
    </Box>
  );
};

export default Welcome;
