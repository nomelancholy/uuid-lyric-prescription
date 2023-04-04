import {
  Box,
  Button,
  Center,
  Container,
  Heading,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import uuidCover from "../img/uuid_cover.jpg";

const Welcome = () => {
  const naviagte = useNavigate();
  const handleClick = () => {
    naviagte("examine");
  };

  return (
    <Box w="100%" bg={"gray.100"}>
      <Container height={"100vh"} bg={"white"}>
        <Image src={uuidCover} paddingTop={"18%"} px={"5%"} />
        <Center>
          <Heading pt="18%">가사 처방전</Heading>
        </Center>
        <Center>
          <Stack spacing={1} py={"8%"} textAlign={"center"}>
            <Text fontSize={"md"}>지금 당신에게 필요한</Text>
            <Text fontSize={"md"}>가사를 처방해드릴게요</Text>
          </Stack>
        </Center>
        <Center paddingY={"2%"}>
          <Button paddingY={"6%"} paddingX={"8%"} onClick={handleClick}>
            진단 받으러 가기
          </Button>
        </Center>
      </Container>
    </Box>
  );
};

export default Welcome;
