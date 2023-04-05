import {
  Box,
  Button,
  Container,
  Heading,
  ListItem,
  Stack,
  UnorderedList,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import Prescription from "../json/Prescription.json";

const Prescribe = () => {
  let { type } = useParams();

  console.log("type :>> ", type);
  console.log("Prescription :>> ", Prescription[type]);
  const result = Prescription[type];

  return (
    <Box w={"100%"}>
      <Container height={"100vh"}>
        <Stack>
          <Heading>지금 당신에게 필요한 건 UUID의 {type} 입니다~</Heading>
          <Heading>{result.type}</Heading>
          {/* To-do : https://alvarotrigo.com/blog/css-text-animations/ 가사 애니메이션 */}
          <UnorderedList>
            {result.verse.map((v, i) => (
              <ListItem key={i}>{v}</ListItem>
            ))}
          </UnorderedList>
          {/* To-do : SNS 공유 기능 */}
          <Button>공유하기</Button>
          <Button>UUID 들으러 가기</Button>
        </Stack>
      </Container>
    </Box>
  );
};

export default Prescribe;
