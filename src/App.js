import './App.css';
import Signup from './components/Signup'
import Login from './components/Login'
import Home from './components/Home'
import Chat from './components/Chat';
import {
  HashRouter as Router,
  Routes,
  Route
} from "react-router-dom";

import NoteState from './components/context/ChatState'
import MessageBox from './components/chatSubComponents/MessageBox';
function App() {
  return (
    <Router>
      <NoteState>
        <Routes>
          <Route path={"/signup"} element={<Signup />}></Route>
          <Route path={"/login"} element={<Login />}></Route>
          <Route path={"/"} element={<Home />}></Route>
          <Route path={"/chat"} element={<Chat />}></Route>
          <Route path={"/messages"} element={<MessageBox />}></Route>
        </Routes>
      </NoteState>
    </Router>
  );
}

export default App;
