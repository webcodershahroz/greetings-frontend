import './App.css';
import Signup from './components/Signup'
import Login from './components/Login'
import Home from './components/Home'
import Chat from './components/Chat';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

import NoteState from './components/context/ChatState'
function App() {
  return (
    <Router>
      <NoteState>
        <Routes>
          <Route path={"/signup"} element={<Signup />}></Route>
          <Route path={"/login"} element={<Login />}></Route>
          <Route path={"/"} element={<Home />}></Route>
          <Route path={"/chat"} element={<Chat />}></Route>
        </Routes>
      </NoteState>
    </Router>
  );
}

export default App;
