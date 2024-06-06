import { useState } from "react";
import NoteContext from "./ChatContext";


export default function NoteState(props) {
    const [activeReciver,setActiveReciver] = useState('null');

  return (
    <NoteContext.Provider value={{activeReciver, setActiveReciver}}>
      {props.children}
    </NoteContext.Provider>
  )
}

