import {
  Box,
  Flex,
  HStack,
  IconButton,
  Button,
  useDisclosure,
  useColorModeValue,
  Stack,
} from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons'

interface Props {
  children: React.ReactNode
}

const NavLink = (props: Props) => {
  const { children } = props
  return (
    <Box
      as="a"
      px={2}
      py={1}
      rounded={'md'}
      _hover={{
        textDecoration: 'none',
        bg: useColorModeValue('gray.200', 'gray.700'),
      }}
      href={'#'}>
      {children}
    </Box>
  )
}

export default function WithAction() {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <IconButton
            size={'md'}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={'Open Menu'}
            display={{ md: 'none' }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={'center'}>
            <Box>Greetings : The Chat App</Box>
          </HStack>
          <Flex alignItems={'center'}>
            <Button
              variant={'solid'}
              colorScheme={'teal'}
              size={'md'}
              mr={4}>
              <Link to={'/login'}>
                Login
              </Link>
            </Button>
            <Button
              variant={'solid'}
              colorScheme={'orange'}
              size={'md'}
              mr={4}>
              <Link to={'/signup'}>
                Sign Up
              </Link>
            </Button>
          </Flex>
        </Flex>

        
      </Box>
    </>
  )
}