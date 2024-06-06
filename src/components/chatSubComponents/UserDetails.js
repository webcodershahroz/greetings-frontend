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
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons'



export default function WithAction() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const loginDetails = JSON.parse(localStorage.getItem('loginDetails'));

    return (
        <>
            <Box
                mt={'4'}
                borderBottom={'1px'}
                bg={useColorModeValue('gray.100', 'gray.900')}
                px={'5'}>
                <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
                    <Box
                        fontSize={'2xl'}
                        fontWeight={'bold'}>Greetings: The Chat App
                    </Box>
                    <Box alignItems={'center'}>
                        <Box><img src={loginDetails ? loginDetails.pic : ""} alt="P" style={{ 'height': '50px', 'borderRadius': '24px' }} /></Box>
                    </Box>
                
                </Flex>


            </Box>
        </>
    )
}
