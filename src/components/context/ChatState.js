import { useState } from "react";
import { useNavigate } from "react-router-dom";
import NoteContext from "./ChatContext";
import { useToast } from '@chakra-ui/react'


export default function NoteState(props) {
  const navigate = useNavigate();
  const toast = useToast();
  const [userContacts, setUserContacts] = useState("");
  const [activeReciver, setActiveReciver] = useState("");
  const [socket, setSocket] = useState(null)
  const [messagesFromDb,setMessagesFromDb] = useState(null)
  const [lastMessage,setLastMessage] = useState([])



  const [isUploaded, setIsUploading] = useState(false)
  //Login API call
  const loginUser = (email, password) => {
    setIsUploading(true)
    fetch("http://localhost:2000/auth/login", {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },

      body: JSON.stringify({ email, password })

    }).then((res) => res.text())
      .then((data) => {
        setIsUploading(false)
        if (data === "Incorrect Password")
          toast({
            title: data,
            status: 'error',
            duration: 5000,
            isClosable: true,
            position: "top"
          })
        else if (data === "User not exists")
          toast({
            title: "User not exists",
            description: "Check email and password",
            status: 'error',
            duration: 5000,
            isClosable: true,
            position: "top"
          })
        else {
          // setLoginDetails(JSON.stringify(data));
          localStorage.setItem('loginDetails', data)
          navigate('/chat')
        }
      }).catch(() => {
        toast({
          title: "Server Error",
          description: "Try Again",
          status: 'error',
          duration: 5000,
          isClosable: true,
          position: "top"
        })
        setIsUploading(false)
      })
  }
  //Signup API call
  const registerNewUser = (name, pic, email, password) => {
    setIsUploading(true)
    fetch("http://localhost:2000/auth/signup", {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },

      body: JSON.stringify({ name, pic, email, password })

    }).then((res) => res.text())
      .then((data) => {
        setIsUploading(false)
        if (data === "User already exists")
          toast({
            title: data,
            description: "Login to continue",
            status: 'warning',
            duration: 5000,
            isClosable: true,
            position: "top"
          })
        else {
          toast({
            title: "Account created successfuly",
            description: "Login to continue",
            status: 'success',
            duration: 5000,
            isClosable: true,
            position: "top"
          })

          navigate('/login')
        }
      }).catch(() => {
        toast({
          title: "Server Error",
          description: "Try Again",
          status: 'error',
          duration: 5000,
          isClosable: true,
          position: "top"
        })
        setIsUploading(false)
      })
  }
  //add contact
  const addContact = (name, adderEmail, email) => {
    fetch("http://localhost:2000/user/addContact", {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },

      body: JSON.stringify({ name, adderEmail, email })

    }).then((res) => res.text())
      .then((data) => {
        if (data === 'Already added' || data === 'Invite your friend') {
          toast({
            title: data,
            status: 'warning',
            duration: 5000,
            isClosable: true,
            position: "top"
          })
        } else {
          setUserContacts(JSON.parse(data))
          toast({
            title: "Contact added successfully",
            status: 'success',
            duration: 5000,
            isClosable: true,
            position: "top"
          })
        }
      }).catch(err => alert(err.message))
  }

  // const setMessages = (senderId, reciverId, message) => {
  //   fetch("http://localhost:2000/user/getContact", {
  //     method: 'POST',
  //     headers: {
  //       "Content-Type": "application/json"
  //     },

  //     body: JSON.stringify({ senderId, reciverId, message })

  //   }).then((res) => res.text())
  //     .then((data) => { console.log(data) })
  // }
  // const getMessages = (senderId, reciverId) => {
  //   fetch("http://localhost:2000/messages/getMessages", {
  //     method: 'POST',
  //     headers: {
  //       "Content-Type": "application/json"
  //     },

  //     body: JSON.stringify({ senderId, reciverId })

  //   }).then((res) => res.text())
  //     .then((data) => { setMsgFromDb(JSON.parse(data)) })
  // }
  const getContacts = (adderEmail) => {
    fetch("http://localhost:2000/user/getContact", {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },

      body: JSON.stringify({ adderEmail })

    }).then((res) => res.text())
      .then((data) => { setUserContacts(JSON.parse(data)) }).catch(err => alert(err.message))
  }

  return (
    <NoteContext.Provider value={{lastMessage,setLastMessage, messagesFromDb,setMessagesFromDb, getContacts, userContacts, addContact, loginUser, isUploaded, registerNewUser, activeReciver, setActiveReciver, socket, setSocket }}>
      {props.children}
    </NoteContext.Provider>
  )
}

