import { Button, Container, Center, Stack, Heading, Text, Box, Flex, VStack } from "@chakra-ui/react";
import { fetchQuestionData } from "../../api-call/fetchOpentdbData";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { RootState } from "../../redux/store";
import { setQuestionsData, setTotalUnansweredQuestions , setAlreadyAnswered } from "../../redux/slices/questions";
import { setTimerCount, resetTimerCount, setTimerNotification } from "../../redux/slices/timer";
import QuestionComponent from "../../components/questions";
import ScoreComponent from "../../components/score";

const Quiz = () => {
  const questions = useAppSelector((state: RootState) => state.questions.value.questionsData);
  const timerCount = useAppSelector((state: RootState) => state.timer.timerCount);
  const totalAnsweredQuestions = useAppSelector((state: RootState) => state.questions.value.totalAnsweredQuestions);
  const alreadyAnswered = useAppSelector((state: RootState) => state.questions.value.alreadyAnswered)
  const timerNotification = useAppSelector((state: RootState) => state.timer.timerNotification);
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const secondsToDisplay = timerCount % 60;
  const minutesRemaining = (timerCount - secondsToDisplay) / 60;
  const minutesToDisplay = minutesRemaining % 60;
  const hoursToDisplay = (minutesRemaining - minutesToDisplay) / 60;

  const twoDigits = (num: number) => String(num).padStart(2, "0");

  useEffect(() => {
    const id = setInterval(() => {
      dispatch(setTimerCount(-1)); // ✅ This doesn't depend on `count` variable outside
    }, 1000);
    if (timerCount <= 0) {
      dispatch(setAlreadyAnswered(true));
      dispatch(setTimerNotification("Your time is up!"));
      dispatch(setTotalUnansweredQuestions(questions.length - totalAnsweredQuestions));
    }
    return () => clearInterval(id);
  }, [dispatch, questions.length, totalAnsweredQuestions, timerCount]); // ✅ Our effect doesn't use any variables in the component scope


  const handleResetQuestion = () => {
    dispatch(setAlreadyAnswered(false));
    dispatch(resetTimerCount());
    dispatch(setTimerNotification(undefined));
  }

  const handleStartQuiz = async () => {
    setLoading(true);
    await fetchQuestionData().then(res => dispatch(setQuestionsData(res.results))).finally(() => { setLoading(false) })
    handleResetQuestion();
  }

  const showTimerNotification = () => {
    if (timerNotification === undefined) {
      return (<>{twoDigits(hoursToDisplay) + ":" + twoDigits(minutesToDisplay) + ":" + twoDigits(secondsToDisplay)}</>)
    }
    else {
      return (
        <>{timerNotification}</>
      )
    }
  }

  return (
    <>
      {questions.length === 0 ?
        <Box as={Flex} flexDirection='column' mt={10}>
          <Center py={6}>
            <Box
              maxW={'320px'}
              w={'full'}
              boxShadow={'2xl'}
              rounded={'lg'}
              bg={'gray.600'}
              p={8}
              minW='lg'
            >
              <Center>
                <Heading fontSize={'2xl'} fontFamily={'body'} mt={4}>
                  10 Questions Quiz
                </Heading>
              </Center>
              <Center>
                <Text fontWeight={600} color={'gray.500'}>
                  @opentdb
                </Text>
              </Center>
              <VStack alignItems='left'>

                <Text mt={4}>Time      : 20 Minutes</Text>
                <Text>Category  : Animal</Text>
                <Text>Difficulty : Medium</Text>
              </VStack>

              <Stack mt={8} direction={'row'} spacing={4}>
                <Button
                  isLoading={loading}
                  loadingText='Starting'
                  variant='outline'
                  flex={1}
                  fontSize={'sm'}
                  rounded={'full'}
                  bg={'blue.400'}
                  color={'white'}
                  onClick={handleStartQuiz}
                  boxShadow={
                    '0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)'
                  }
                  _hover={{
                    bg: 'blue.500',
                  }}
                  _focus={{
                    bg: 'blue.500',
                  }}>
                  Start the Quiz
                </Button>
              </Stack>
            </Box>
          </Center>
        </Box >
        :
        <Container minH='85vh' maxW='100vh' centerContent>
          <Heading mb={10}>{showTimerNotification()}</Heading>
          <div className="app">
            {alreadyAnswered ? (
              <ScoreComponent />
            ) : (
              <QuestionComponent />
            )}
          </div>
        </Container>
      }
    </>
  );
};

export default Quiz;
