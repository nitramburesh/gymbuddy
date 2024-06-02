import { useEffect } from "react";
import Hero from "../components/Hero";
import { Box } from "@chakra-ui/react";
import axios from "axios";
import { useRecoilValue } from "recoil";
import { apiUrl } from "../atoms";

export default function Homepage() {
  const baseApiUrl = useRecoilValue(apiUrl);

  useEffect(() => {
    try {
      axios.get(baseApiUrl).then((res) => console.log(res));
    } catch (error) {
      console.log(error);
    }
  }, []);
  return (
    <Box height="100%">
      <Hero />
    </Box>
  );
}
