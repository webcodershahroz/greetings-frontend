import React, { useContext, useState, useEffect } from 'react'
import {
    Box, HStack, VStack, Flex, Button, Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure, FormControl, FormLabel, Input, Spinner
} from '@chakra-ui/react'
import noteContext from '../context/ChatContext'
import LoadContact from './LoadContact'
import { useNavigate } from 'react-router-dom'

function Contacts() {
    const navigate = useNavigate()
    const senderId = JSON.parse(localStorage.getItem('loginDetails')).email;
    const [isLoading, setisLoading] = useState(false)
    const { addContact, userContacts, getContacts, activeReciver, setActiveReciver } = useContext(noteContext)
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const { isOpen, onOpen, onClose } = useDisclosure()
    const initialRef = React.useRef(null)
    const finalRef = React.useRef(null)
    const loginDetails = JSON.parse(localStorage.getItem('loginDetails'))
    const [adderEmail, setAdderEmail] = useState(loginDetails.email)

    useEffect(() => {

        getContacts(senderId)

    }, [addContact])

    const handleClick = () => {
        addContact(name, adderEmail, email);
        onClose()
    }


    return (
        <>
            <Box
                overflowY={'scroll'}
                h={'85vh'}
                className={'overflowContacts'}
                minWidth={'35%'}
                maxWidth={'100%'}
                display={'flex'}
                flexDirection={'column'}
                backgroundColor={'gray.700'}
                color={'gray.700'}>
                <Box
                    className='d-flex align-item-center justify-content-between'
                    p={'2'}>
                    <Box
                        fontSize={'4xl'}
                        fontWeight={'bold'}
                        color={'white'}>Chat
                    </Box>
                    <div className='d-flex align-items-center' style={{'gap':'5px'}}>
                        <Button onClick={onOpen}
                            textColor={'white'}
                            fontWeight={'bold'}
                            fontSize={'3xl'}
                            paddingBottom={'6px'}>+
                        </Button>
                        <div class="dropdown">
                            <a style={{
                                'color': 'white',
                                'backgroundColor': '#3d4756',
                                'padding': '8px',
                                'borderRadius': '8px'
                            }} class="nav-link dropdown-toggle" href="#" id="navbarDarkDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Menu
                            </a>
                            <ul class="dropdown-menu dropdown-menu-dark" aria-labelledby="navbarDarkDropdownMenuLink">
                                <li class="dropdown-item">Profile</li>
                                <li class="dropdown-item">Settings</li>
                                <l i class="dropdown-item" onClick={() => { localStorage.removeItem('loginDetails'); navigate('/') }}>Logout</l>
                            </ul>

                        </div>
                    </div>


                </Box>
                <Modal
                    initialFocusRef={initialRef}
                    finalFocusRef={finalRef}
                    isOpen={isOpen}
                    onClose={onClose}
                >
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>Add new contact</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody pb={6}>
                            <FormControl>
                                <FormLabel>Name</FormLabel>
                                <Input ref={initialRef} placeholder='Name' onChange={(e) => { setName(e.target.value) }} />
                            </FormControl>

                            <FormControl mt={4}>
                                <FormLabel>Email</FormLabel>
                                <Input placeholder='Email' onChange={(e) => { setEmail(e.target.value) }} />
                            </FormControl>
                        </ModalBody>

                        <ModalFooter>
                            <Button onClick={handleClick} colorScheme='blue' mr={3}>
                                Add
                            </Button>
                            <Button onClick={onClose}>Cancel</Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
                {
                    Array.from(userContacts).map(element => {
                        return <LoadContact key={element.email} value={element} />
                    })
                }

            </Box>

        </>
    )
}

export default Contacts
