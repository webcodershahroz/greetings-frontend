import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  FormErrorMessage,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  useToast,
  Spinner
} from '@chakra-ui/react'
import { Link, useNavigate } from 'react-router-dom'
import { useState,useContext } from 'react'
import {
  ViewIcon, ViewOffIcon
} from '@chakra-ui/icons'
import Navbar from '../components/Navbar'
import noteContext from './context/ChatContext'


export default function SignupCard() {
  const [showPassword, setShowPassword] = useState(false)
  const [pic, setPic] = useState(false)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("");
  const [loading, setloading] = useState(false)
  const toast = useToast()
  const navigate = useNavigate();
  const { registerNewUser,isUploaded } = useContext(noteContext)
  document.title='Signup to Greetings';




  const postImageDetails = (pic) => {
    setloading(true)
    if (pic === undefined) {
      toast({
        title: 'Image is not selected',
        description: "Please select image to continue",
        status: 'warning',
        duration: 5000,
        isClosable: true,
        position: "top"
      })
      return
    }
    if (pic.type === "image/jpeg" || pic.type === "image/png") {
      const data = new FormData();
      data.append("file", pic)
      data.append("upload_preset", "chat-app")
      data.append("cloud_name", "dcapbaqct")

      fetch("https://api.cloudinary.com/v1_1/dcapbaqct/image/upload", {
        method: 'POST',
        body: data
      }).then((res) => res.json())
        .then(data => {
          setloading(false);
          setPic(data.url.toString())

        }).catch((err) => {
          setloading(false);
          return
        })

    } else {
      toast({
        title: 'Image is not in right format',
        description: "Please select image of png or jpeg format",
        status: 'warning',
        duration: 5000,
        isClosable: true,
        position: "bottom"
      })
      setloading(false)
      return;
    }

  }
  const handleSignupClick = (e) => {
    e.preventDefault()
    registerNewUser(name, pic, email, password)
  }


  return (
    <>
      <Navbar />
      <Flex
        minH={'100vh'}
        align={'center'}
        justify={'center'}
        bg={useColorModeValue('gray.50', 'gray.800')}>
        <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
          <Stack align={'center'}>
            <Heading fontSize={'4xl'} textAlign={'center'}>
              Sign up
            </Heading>
            <Text fontSize={'lg'} color={'gray.600'}>
              Sign up to Greetings
            </Text>
          </Stack>
          <Box
            rounded={'lg'}
            bg={useColorModeValue('white', 'gray.700')}
            boxShadow={'lg'}
            p={8}>

            <Stack spacing={4}>
              <form onSubmit={handleSignupClick}>
                <FormControl isRequired py={2}>
                  <InputGroup>
                    <Input type={"file"} accept={"image/"} p={1.5} onChange={(e) => postImageDetails(e.target.files[0])} />
                    <InputRightElement h={'full'}>
                      {loading ? <Spinner color='green.500' size='sm' /> : ''}
                    </InputRightElement>
                  </InputGroup>
                </FormControl>
                <Box>
                  <FormControl id="firstName" isRequired>
                    <FormLabel>Name</FormLabel>
                    <Input type="text" onChange={(e) => setName(e.target.value)} />
                  </FormControl>
                </Box>

                <FormControl id="email" isRequired>
                  <FormLabel>Email address</FormLabel>
                  <Input type="email" onChange={(e) => setEmail(e.target.value)} />
                  <FormErrorMessage>Email is required.</FormErrorMessage>
                </FormControl>

                <FormControl id="password" isRequired>
                  <FormLabel>Password</FormLabel>
                  <InputGroup>
                    <Input type={showPassword ? 'text' : 'password'} onChange={(e) => setPassword(e.target.value)} />
                    <InputRightElement h={'full'}>
                      <Button
                        variant={'ghost'}
                        onClick={() => setShowPassword((showPassword) => !showPassword)}>
                        {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                </FormControl>
                <Stack spacing={10} pt={2}>
                  <Button
                    type='submit'
                    size="lg"
                    isLoading={isUploaded}
                    bg={'blue.400'}
                    color={'white'}
                    _hover={{
                      bg: 'blue.500',
                    }}>
                    Sign up
                  </Button>
                </Stack>
                <Stack pt={6}>
                  <Text align={'center'}>
                    Already a user? <Link to={"/login"} color={'blue.400'}>Login</Link>
                  </Text>
                </Stack>
              </form>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    </>
  )
}