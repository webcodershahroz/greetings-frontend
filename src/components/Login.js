import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
} from '@chakra-ui/react'
import { useState,useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import noteContext from './context/ChatContext'


export default function SimpleCard() {
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const {loginUser,isUploaded} = useContext(noteContext)
  document.title='Login to Greetings';
  const handleClick = (e)=>{
    e.preventDefault()
    loginUser(email,password)
  }

  return (
    <>
      <Navbar/>
      <Flex
        minH={'100vh'}
        align={'center'}
        justify={'center'}
        bg={useColorModeValue('gray.50', 'gray.800')}>
        <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
          <Stack align={'center'}>
            <Heading fontSize={'4xl'}>Login to your account</Heading>
            <Text fontSize={'lg'} color={'gray.600'}>
              Login to Greetings ✌️
            </Text>
          </Stack>
          <Box
            rounded={'lg'}
            bg={useColorModeValue('white', 'gray.700')}
            boxShadow={'lg'}
            p={8}>
            <Stack spacing={4}>
              <form onSubmit={handleClick}>
                <FormControl id="email">
                  <FormLabel>Email address</FormLabel>
                  <Input type="email" onChange={(e) => setEmail(e.target.value)} />
                </FormControl>
                <FormControl id="password">
                  <FormLabel>Password</FormLabel>
                  <Input type="password" onChange={(e) => setPassword(e.target.value)} />
                </FormControl>
                <Stack spacing={10}>
                  <Stack
                    direction={{ base: 'column', sm: 'row' }}
                    align={'start'}
                    justify={'space-between'}>
                    <Checkbox>Remember me</Checkbox>
                    <Text color={'blue.400'}>Forgot password?</Text>
                  </Stack>
                  <Button
                    type='submit'
                    isLoading={isUploaded}
                    bg={'blue.400'}
                    color={'white'}
                    _hover={{
                      bg: 'blue.500',
                    }}>
                    Login
                  </Button>
                </Stack>
              </form>

            </Stack>
          </Box>
        </Stack>
      </Flex>
    </>
  )
}