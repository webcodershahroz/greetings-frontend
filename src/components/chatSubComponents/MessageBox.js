import React, { useContext, useEffect } from 'react'
import { Box, Input, HStack, VStack, Flex, Button, useEditable } from '@chakra-ui/react'
import { useState } from 'react'
import noteContext from '../context/ChatContext'


function MessageBox() {
  const { messagesFromDb, lastMessage, setLastMessage } = useContext(noteContext)
  const [message, setMessage] = useState('');
  // const [status, setStatus] = useState('not sent');
  const { activeReciver, socket } = useContext(noteContext)
  const sender = JSON.parse(localStorage.getItem('loginDetails')).email;
  let currentDate = null;

  //send message
  const sendMessage = async () => {
    const messageContainer = document.getElementById('messageContainer');
    const messagebox = document.createElement('Box');
    const msgStatus = document.createElement('Box');

    const date = document.createElement('span');
    messagebox.innerHTML += `${message} `

    messagebox.classList.add('right')
    messageContainer.appendChild(messagebox);
    messageContainer.scrollTop = messageContainer.scrollHeight;
    setMessage('')

    //save message to database
    await fetch("https://backend-sandy-beta.vercel.app/messages/saveMessages", {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ senderId: sender, reciverId: activeReciver, sentMessage: message, sendOrRecive: 'sent' })
    }).then(res => res.text())
      .then(async (data) => {
        const messageData = {
          message,
          reciver: activeReciver,
          sender,
          date: JSON.parse(data).createdAt
        }
        await socket?.emit('sendMessage', messageData);

        if (data === "Message not sent") {
          alert("Message not sent try again")
          msgStatus.innerHTML = 'not sent'
          msgStatus.classList.add('date');
          date.innerHTML = JSON.parse(data).createdAt.slice(11, 16);
          date.classList.add('date')
          messagebox.appendChild(date);
          messagebox.appendChild(msgStatus)


        }
        // else if (activeReciver === JSON.parse(data).reciverId) {

        // }
        else {
          msgStatus.classList.add('date');
          msgStatus.innerHTML = 'sent'
          date.innerHTML = JSON.parse(data).createdAt.slice(11, 16);
          date.classList.add('date')
          messagebox.appendChild(date);
          messagebox.appendChild(msgStatus)
          // messageContainer.innerHTML =

        }

      }).catch((error) => { alert(error) })

    // const messageContainer = document.getElementById('messageContainer');
    // const messagebox = document.createElement('Box');
    // messagebox.innerHTML += `${message}`
    // messagebox.classList.add('right')
    // messageContainer.appendChild(messagebox);
    // setMessage('')
  }

  //receive message
  useEffect(() => {
    socket?.removeAllListeners()
    socket?.on('reciveMessage', async (messageRecived) => {

      if (activeReciver === messageRecived.sender) {
        const messageContainer = document.getElementById('messageContainer');
        const messagebox = document.createElement('Box');
        const date = document.createElement('span');
        messagebox.innerHTML += `${messageRecived.message}`
        date.innerHTML = messageRecived.date.slice(11, 16);
        messagebox.classList.add('left')
        date.classList.add('date')
        messagebox.appendChild(date);
        messageContainer.appendChild(messagebox);
        messageContainer.scrollTop = messageContainer.scrollHeight;
      }
      else {
        await setLastMessage(lastMessage.concat(messageRecived))

        console.log(lastMessage)
      }


    })

  })

  return (
    <>
      <Box
        h={'85vh'}
        minWidth={'65%'}
        maxWidth={'100%'}
        p={'5'}
        // borderRadius={'2xl'}
        display={'flex'}
        flexDirection={'column'}
        gap={'5px'}
        backgroundColor={'gray.900'}
        color={'gray.700'}>
        <Flex
          h={'100%'}
          flexDirection={'column'}
          justifyContent={'space-between'}>

          <Box
            overflowY={'scroll'}
            padding={'5px'}
            color={'white'} id={'messageContainer'}>


            {messagesFromDb ?
              JSON.parse(messagesFromDb).map(element => {
                const isNewDate = currentDate === null || element.createdAt.slice(0, 10) !== currentDate;
                currentDate = element.createdAt.slice(0, 10);
                if (isNewDate)
                  return <center className='date-day'>-------------------------- {currentDate} ---------------------------</center>
                if (element.senderId === sender && element.reciverId === activeReciver)
                  return <Box>
                    <Box className="right"
                      w={'fit-content'}
                      my={'1'}
                      borderRadius={'md'}
                      float={'right'}
                      style={{ 'clear': 'both' }}>{element.sentMessage}<span className='date'>{element.createdAt.slice(11, 16)}</span>
                    </Box>

                  </Box>

                else if (element.senderId === activeReciver && element.reciverId === sender)
                  return <Box className="left"
                    w={'fit-content'}
                    my={'1'}
                    float={'left'}
                    borderRadius={'md'}
                    style={{ 'clear': 'both' }}>{element.sentMessage}<span className='date'>{element.createdAt.slice(11, 16)}</span></Box>

              }) : "Welcome to Greetings: the Chat app"
            }


          </Box>

          {activeReciver !== '' ? <Box>
            <HStack>
              <Input color={'white'} value={message} placeholder='Enter Message...' onChange={(e) => setMessage(e.target.value)} onKeyDown={(key) => { if (key.code === "Enter") document.getElementById('btnSend').click() }}></Input>

              <Button
                id='btnSend'
                onClick={sendMessage}
                type='submit'
                size={'md'} isDisabled={message.length <= 0 ? true : false}>Send</Button>
            </HStack>
          </Box> : <Box fontWeight={'bold'} color={'white'} fontSize={'6xl'}>Select Conversation to start</Box>}

        </Flex>
      </Box >
    </>
  )
}

export default MessageBox
