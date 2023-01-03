import { greet } from "./utils/greet";
import { useEffect } from "react";
import { useState } from "react";
import axios from 'axios'


interface pasteI  {
  id: number,
  name: string ,
  pasteTitle: string,
  pasteContent: string
}

function App(): JSX.Element {
const [pasteData, setPasteData] = useState<pasteI[]>([])
console.log('I am trying to print paste data', pasteData)
console.log("hello")

useEffect(() => {
  const fetchRemoteDb =  async() => {
  const response = await axios.get('http://localhost:4000/pastes');
  const wholeResponseData = response.data;
  const responseData = wholeResponseData.data;
  setPasteData(responseData);
  console.log('use effect is running')

}
fetchRemoteDb()
},[])


  return (
  <div>
    <div>
      <h1> Martha's Pastes </h1>
    </div>
    
  {pasteData.map((item, i) => (<div key={item.id}> Hello my name is {item.name} </div> ))}
     
</div>
    

  )
}

export default App;

//})}