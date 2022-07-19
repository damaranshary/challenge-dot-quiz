import {
  Button,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
  useBreakpointValue,
  Center
} from '@chakra-ui/react';
import { Link as ReactRouterLink } from 'react-router-dom';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { RootState } from '../../redux/store';
import { setTimerCount, setTimerNotification } from '../../redux/slices/timer'
import { setAlreadyAnswered } from '../../redux/slices/questions';

const Home = () => {
  const dispatch = useAppDispatch();
  const timerCount = useAppSelector((state: RootState) => state.timer.timerCount);

  useEffect(() => {
    const id = setInterval(() => {
      dispatch(setTimerCount(-1)); // ✅ This doesn't depend on `count` variable outside
    }, 1000);
    if (timerCount <= 0) {
      dispatch(setAlreadyAnswered(true));
      dispatch(setTimerNotification("Your time is up!"));
    }
    return () => clearInterval(id);
  }, [dispatch, timerCount]); // ✅ Our effect doesn't use any variables in the component scope


  return (
    <Stack minH={'80vh'} direction={{ base: 'column', md: 'row' }}>
      <Flex p={8} flex={1} align={'center'} justify={'center'}>
        <Stack spacing={6} w={'full'} maxW={'lg'}>
          <Heading fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }}>
            <Text
              as={'span'}
              position={'relative'}
              _after={{
                content: "''",
                width: 'full',
                height: useBreakpointValue({ base: '20%', md: '30%' }),
                position: 'absolute',
                bottom: 1,
                left: 0,
                bg: 'blue.400',
                zIndex: -1,
              }}>
              MBKM dot
            </Text>
            <br />{' '}
            <Text color={'blue.400'} as={'span'}>
              Quiz App Projects
            </Text>{' '}
          </Heading>
          <Text fontSize={{ base: 'md', lg: 'lg' }} color={'gray.500'}>
            This project is created for the internship tests by <br></br>
            DOT Indonesia X Kampus Merdeka.
          </Text>
          <Stack direction={{ base: 'column', md: 'row' }} spacing={4}>
            <Button
              as={ReactRouterLink}
              to='/quiz'
              rounded={'full'}
              bg={'blue.400'}
              color={'white'}
              _hover={{
                bg: 'blue.500',
              }}>
              Go to Quiz
            </Button>
          </Stack>
        </Stack>
      </Flex>
      <Flex flex={1}>
        <Center >
          <Image
            alt={'Login Image'}

            src={
              'cover-home.jpg'
            }
            maxH='xl'
            rounded='xl'
          />
        </Center>
      </Flex>

    </Stack>
  );
}

export default Home;