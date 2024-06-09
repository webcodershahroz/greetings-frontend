import React, { useContext } from 'react'
import { Box } from '@chakra-ui/react'
import Contacts from './chatSubComponents/Contacts'
import MessageBox from './chatSubComponents/MessageBox'
import UserDetails from './chatSubComponents/UserDetails'
import { io } from 'socket.io-client'
import { useEffect } from 'react'
import { useState } from 'react'
import noteContext from './context/ChatContext'
import { useNavigate } from 'react-router-dom'


function Chat() {
    const isLoggedIn = localStorage.getItem('loginDetails');
    const { socket, setSocket, activeReciver } = useContext(noteContext)
    // const [activeUsers, setActiveUsers] = useState("")
    const userId = JSON.parse(localStorage.getItem('loginDetails')).email;
    const navigate = useNavigate()

    useEffect(() => {
        setSocket(io('https://backend-sandy-beta.vercel.app'))


    }, [])
    useEffect(() => {
        socket?.emit('addUser', userId);


        socket?.on('getUsers', users => {
            // await setActiveUsers(users)
        })

    }, [socket])


    return (
        <>

            <div>
                <UserDetails />
                <Box
                    className='d-flex flex-column flex-xl-row flex-md-row '>
                    <Contacts w={'30%'} />
                    <MessageBox w={'65%'} />
                </Box>
            </div>


        </>
    )
}

export default Chat
