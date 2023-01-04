
import {useState} from "react"

import axios from "axios"

interface pasteI {
    name: string;
    pasteTitle: string;
    pasteContent: string;
  }
  

export default function InputPastes():JSX.Element {
const [title, setTitle] = useState<string>("")
const [content, setContent] = useState<string>("")
const [name, setName] = useState<string>("")
const [pasteObject, setPasteObject] = useState<pasteI>({name: "", pasteTitle: "", pasteContent: ""})

const handleSubmit = async () => {
    console.log("yo")
    setPasteObject({name: name, pasteTitle: title, pasteContent: content})
    const response = await axios.post("http://localhost:4000/pastes", 
        {name: pasteObject.name, pasteTitle: pasteObject.pasteTitle, pasteContent: pasteObject.pasteContent})
    console.log(response);
}


    return (
        <div>
            <p> Please enter your paste </p>
            <div>
                <p> Enter paste title: {title}</p>
                <input type = "text" onChange = {(e) => setTitle(e.target.value)} />
            </div>
            <div> 
            <p> Enter paste content: {content}</p>
                <input type = "text" onChange = {(e) => setContent(e.target.value)} />
            </div>
            <div> 
            <p> Enter your name: {name}</p>
                <input type = "text" onChange = {(e) => setName(e.target.value)}/>
            </div>
            <div>
                <button onClick = {handleSubmit}>Submit</button>
                <p> {pasteObject.name}{pasteObject.pasteContent}{pasteObject.pasteTitle}</p>
            </div>
        </div>
    )
}