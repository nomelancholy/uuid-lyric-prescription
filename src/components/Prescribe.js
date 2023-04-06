import {
  Box,
  Button,
  Container,
  Heading,
  Stack,
  StackDivider,
  VStack,
} from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
import Prescription from "../json/Prescription.json";

const Prescribe = () => {
  let { type } = useParams();

  const result = Prescription[type.toLowerCase()];
  const naviagte = useNavigate();

  const handleRetry = () => {
    naviagte("/");
  };

  return (
    <Box w={"100%"}>
      <Container height={"100vh"}>
        <Stack>
          <Heading>지금 당신에게 필요한 건 UUID의 {type} 입니다~</Heading>
          <Heading>{result.type}</Heading>
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
            {result.verse.map((v, i) => (
              <Box h={"40px"} key={i}>
                {v}
              </Box>
            ))}
          </VStack>
          {/* To-do : SNS 공유 기능 */}

          <Button onClick={handleRetry}>다시 하기</Button>

          <Button>공유하기</Button>

          <Button>
            <a
              href="https://luminant.kr/ICQ671qr_0"
              target="_blank"
              rel="noopener noreferrer"
            >
              UUID 들으러 가기
            </a>
          </Button>
        </Stack>
      </Container>
    </Box>
  );
};

export default Prescribe;
