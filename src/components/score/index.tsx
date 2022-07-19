import { Button, VStack, Text } from "@chakra-ui/react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { RootState } from "../../redux/store";
import { clearQuestionsData } from "../../redux/slices/questions";

const ScoreComponent = () => {
  const totalCorrectAnswers = useAppSelector((state: RootState) => state.questions.value.totalCorrectAnswers);
  const totalIncorrectAnswers = useAppSelector((state: RootState) => state.questions.value.totalIncorrectAnswers);
  const totalAnsweredQuestions = useAppSelector((state: RootState) => state.questions.value.totalAnsweredQuestions);
  const totalUnansweredQuestions = useAppSelector((state: RootState) => state.questions.value.totalUnansweredQuestions);
  const dispatch = useAppDispatch();

  const handleRetryNewQuiz = async () => {
    dispatch(clearQuestionsData());
  }

  return (
    <>
      <VStack spacing={4}>
        <Text>Answered Questions    : {totalAnsweredQuestions}</Text>
        <Text>Unanswered Questions  : {totalUnansweredQuestions}</Text>
        <Text>Correct Answers       : {totalCorrectAnswers}</Text>
        <Text>Incorrect Answers     : {totalIncorrectAnswers}</Text>
        <Button onClick={handleRetryNewQuiz} mt={5}  colorScheme='blue'>Try new Questions</Button>
      </VStack>
    </>
  );
};

export default ScoreComponent;
