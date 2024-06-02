import { useEffect } from "react";
import axios from "axios";

const Exercises = () => {
  const getExercises = async () =>
    await axios
      // .get("http://localhost:8080/api/exercises")
      .get("")
      .then((response) => console.log(response.data));

  useEffect(() => {
    try {
      getExercises();
    } catch (error) {
      console.log(error);
    }
  }, []);
  return <></>;
};

export default Exercises;
