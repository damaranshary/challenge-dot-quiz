import {
  Box,
  Button,
  Container,
  Heading,
  useToast,
  Center,
  Text,
} from "@chakra-ui/react";
import { auth } from "../../firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useState } from "react";
import { useAppDispatch } from "../../redux/hooks";
import { setUserProfileData } from "../../redux/slices/userProfile";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const dispatch = useAppDispatch();
  const provider = new GoogleAuthProvider();
  const navigate = useNavigate();

  const handleLogin = async () => {
    setLoading(true);
    await signInWithPopup(auth, provider)
      .then(async (response) => {
        const { uid, email, displayName, photoURL } = response.user;
        photoURL !== null &&
          dispatch(setUserProfileData({ uid, email, displayName, photoURL }));
      })
      .catch((error) => {
        console.log(error);
        toast({ title: error.message, status: "error" });
      })
      .finally(() => {
        setLoading(false);
        navigate('/home');
      });
  };

  return (
    <Box as={Center} minH="100vh" py="16">
      <Container
        as={Center}
        maxW="6xl"
        alignItems="center"
      >
        <Box w={{ base: "100%", md: "100%", lg: "50%" }}>
          <Heading >Quiz Apps</Heading>
          <Text mb="10" >
            Halo, Selamat datang!
          </Text>
          <Button
            isLoading={loading}
            onClick={handleLogin}
            bgColor={"#2447F9"}
            mb="6"
          >
            Masuk dengan Google
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default Login;