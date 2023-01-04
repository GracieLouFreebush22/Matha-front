import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";

interface pasteI {
  id: number;
  name: string;
  pastetitle: string;
  pastecontent: string;
}

export default function PasteBin(): JSX.Element {
  const [pasteData, setPasteData] = useState<pasteI[]>([]);
  const [button, setButton] = useState<boolean>(false);
  const [editButton, setEditButton] = useState<boolean>(false);
  const [editObject, setEditObject] = useState<pasteI>()
  const [editContent, setEditContent] = useState<string>("")
  console.log("I am trying to print paste data", pasteData);
  console.log("title", pasteData[2]?.pastecontent);

  useEffect(() => {
    const fetchRemoteDb = async () => {
      //const response = await axios.get("")
      const response = await axios.get("http://localhost:4000/pastes");
      const wholeResponseData = response.data;
      const responseData = wholeResponseData.data;
      setPasteData(responseData);
      console.log("use effect is running");
    };
    fetchRemoteDb();
  }, []);

  console.log(pasteData);


  const handleEdit = (idNum: number) => {
    setEditButton(true)
    console.log(idNum)
    for (const item of pasteData){
      if (item.id === idNum){
        setEditObject(item)
        setEditContent(item.pastecontent)
      }
    }
  }

 const handleSubmitChange = async (newContent: string) => {
  // patch request which sets our editable items paste content to be the newly edited content
  console.log(editContent)
  const response = await axios.patch("http://localhost:4000/pastes", 
  {id: editObject?.id, pastecontent: editContent})
  console.log(response)
 }

  return (
    <div>
      <table className="table">
        <tr>
          <th> ID NUM</th>
          <th className="name"> NAME </th>
          <th className="title"> TITLE </th>
          <th className="content"> CONTENT </th>
        </tr>

        {pasteData.map((item) => (
          <tr key={item.id}>
            <td> {item.id} </td>
            <td> {item.name} </td>
            <td> {item.pastetitle} </td>
            {button === false ? (
              <td>
                {" "}
                {item.pastecontent.slice(0, 300)}...{" "}
                <button className="button" onClick={() => setButton(!button)}>
                  {" "}
                  ⬇️{" "}
                </button>{" "}
                {" "}
                <button onClick = {() => handleEdit(item.id)}>🖊</button>
              </td>
            ) : (
              <td>
                {" "}
                {item.pastecontent}{" "}
                <button className="button" onClick={() => setButton(!button)}>
                  {" "}
                  ⬆️{" "}
                </button>{" "}
                <button onClick = {() => handleEdit(item.id)}>🖊</button>
              </td>
            )}
          </tr>
        ))}
      </table>
      {editButton === true && editObject ? <><input className = "inputBox" type = "text" value = {editContent} onChange={(e) => setEditContent(e.target.value)}/> 
      <button onClick = {() => handleSubmitChange(editContent)}> Make change </button>
      </>
      : <p> Select an item to edit</p>}
    </div>
  );
}


