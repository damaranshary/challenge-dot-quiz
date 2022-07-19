import { Button, VStack, Heading, Text } from "@chakra-ui/react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { RootState } from "../../redux/store";
import { setCurrentQuestion, setTotalAnsweredQuestions, setTotalCorrectAnswers, setTotalIncorrectAnswers, setAlreadyAnswered } from "../../redux/slices/questions";
import { setTimerNotification } from "../../redux/slices/timer";

const QuestionComponent = () => {
    const questions = useAppSelector((state: RootState) => state.questions.value.questionsData);
    const currentQuestion = useAppSelector((state: RootState) => state.questions.value.currentQuestion);
    const totalCorrectAnswers = useAppSelector((state: RootState) => state.questions.value.totalCorrectAnswers);
    const totalIncorrectAnswers = useAppSelector((state: RootState) => state.questions.value.totalIncorrectAnswers);
    const totalAnsweredQuestions = useAppSelector((state: RootState) => state.questions.value.totalAnsweredQuestions);
    const dispatch = useAppDispatch();

    const handleAnswerOptionClick = (answerOption: boolean) => {
        if (answerOption) {
            dispatch(setTotalCorrectAnswers(totalCorrectAnswers + 1));
        }
        else {
            dispatch(setTotalIncorrectAnswers(totalIncorrectAnswers + 1));
        }
        
        dispatch(setTotalAnsweredQuestions(totalAnsweredQuestions + 1));

        const nextQuestion = currentQuestion + 1;

        if (nextQuestion < questions.length) {
            dispatch(setCurrentQuestion(nextQuestion));
        }
        else {
            dispatch(setAlreadyAnswered(true));
            dispatch(setTimerNotification("Congratulations!"));
        }
    };

    return (
        <>
            <div className="question-section">
                <Heading as='h3' size='lg'> Question {currentQuestion + 1}/{questions.length} </Heading>
                <Text>{questions[currentQuestion].question}</Text>
            </div>
            <VStack gap={3} mt={4}>
                {questions[currentQuestion].incorrect_answers.map((answerOption, index) => (
                    <Button onClick={() => handleAnswerOptionClick(false)} key={index} minW='lg' colorScheme='blue'>
                        {answerOption}
                    </Button>
                ))}
                <Button onClick={() => handleAnswerOptionClick(true)} minW='lg' colorScheme='blue'>
                    {questions[currentQuestion].correct_answer}
                </Button>
            </VStack>
        </>

    );
};

export default QuestionComponent;
