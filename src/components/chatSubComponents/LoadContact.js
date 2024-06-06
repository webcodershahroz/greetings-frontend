import React, { useContext, useState } from 'react'
import {
    Box,
    HStack,
    VStack
} from '@chakra-ui/react'
import noteContext from '../context/ChatContext'

function LoadContact(props) {
    const { setMessagesFromDb, setActiveReciver, activeReciver, lastMessage, setLastMessage } = useContext(noteContext)
    const element = props.value;
    const loginDetails = JSON.parse(localStorage.getItem('loginDetails'));
    const handleNewUser = async () => {

        await setLastMessage(lastMessage.filter(em => em.reciver !== element.email))
        console.log(lastMessage)
        setMessagesFromDb(null)
        await setActiveReciver(element.email)
   
        //get messages from db
        fetch("http://localhost:2000/messages/showMessages", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({ senderId: loginDetails.email, reciverId: element.email })

        }).then((res) => res.text())
            .then((data) => {
                setMessagesFromDb(data)
            }).catch(err => alert(err.message))



    }
    const isNewMessages = (email) => {
        if (lastMessage.length > 0) {
            if (activeReciver !== email && lastMessage.filter(em => em.email === email)) {
                return true
            }
        }

        return false
    }


    return (
        <>
            <a href="#messageContainer">

                <Box
                    display={'flex'}
                    justifyContent={'center'}
                    onClick={handleNewUser}
                    className={`contact ${activeReciver === element.email ? 'active' : ""}`}
                    cursor={'pointer'}
                    backgroundColor={'#43526b'}
                    color={'white'}
                    p={'3'}
                    h={'90px'}
                    borderBottom={'2px'}
                    borderColor={'blackAlpha.500'}

                    w={'100'}
                    flexDirection={'column'}>
                    <HStack>
                        <Box><img src={element.pic} alt="P" style={{ 'height': '60px', 'width': '60px', 'borderRadius': '50px' }} /></Box>
                        <Box display={'flex'}
                            width={'64%'}
                            justifyContent={'space-between'}>
                            <Box
                                fontWeight={'bold'}
                                fontSize={'large'}>{element.name}
                            </Box>

                            {isNewMessages(element.email) ? <span class="cus-badge badge badge-light">New Messages</span> : ""}

                        </Box>
                    </HStack>
                </Box>
            </a>
        </>
    )
}

export default LoadContact
