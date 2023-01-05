import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { createModuleResolutionCache } from "typescript";

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
  const [editObject, setEditObject] = useState<pasteI>();
  const [editContent, setEditContent] = useState<string>("");
  const [commentID, setCommentID] = useState<number>()
  const [comment, setComments] = useState<string>("")

  console.log(commentID, "current commentID")


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

  useEffect(() => {
    console.log("entered comment use effect")
    const fetchRemoteDb = async () => {
      //const response = await axios.get("")
      console.log("running fetchremoteDB function")
      const response = await axios.get(`http://localhost:4000/comments/${commentID}`);
      console.log("get has ran")
      const wholeResponseData = response.data;
      const responseData = wholeResponseData.data;
      setComments(responseData);
    };
    fetchRemoteDb();
  }, [commentID]);

  console.log(pasteData);

  const handleEdit = (idNum: number) => {
    setEditButton(true);
    console.log(idNum);
    for (const item of pasteData) {
      if (item.id === idNum) {
        setEditObject(item);
        setEditContent(item.pastecontent);
      }
    }
  };

  const handleSubmitChange = async (newContent: string) => {
    // patch request which sets our editable items paste content to be the newly edited content
    console.log("i am edit conetnet", editContent);
    const response = await axios.patch("http://localhost:4000/pastes", {
      id: editObject?.id,
      pastecontent: newContent,
    });
  };

  const handleShowComments = async (id: number) => {
    // console.log("show comment clicked")
    // const response = await axios.get(`http://localhost:4000/comments/${id}`, {
    //    data: {pasteId: id}
    // });
    // const wholeResponseData = response.data;
    // const responseData = wholeResponseData.data;
    // console.log("this is the comment", responseData);
    console.log("show comment button")
    setCommentID(id)
  };

  const handleMakeComment = async (id: number) => {
    console.log("i am make comment");
  };

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
                <button onClick={() => handleEdit(item.id)}>🖊</button>
                <button onClick={() => handleShowComments(item.id)}>
                  {" "}
                  🗨️{" "}
                </button>
                <button onClick={() => handleMakeComment(item.id)}> 📝 </button>
              </td>
            ) : (
              <td>
                {" "}
                {item.pastecontent}{" "}
                <button className="button" onClick={() => setButton(!button)}>
                  {" "}
                  ⬆️{" "}
                </button>{" "}
                <button onClick={() => handleEdit(item.id)}>🖊</button>
                <button onClick={() => handleShowComments(item.id)}>
                  {" "}
                  🗨️{" "}
                </button>
                <button onClick={() => handleMakeComment(item.id)}> 📝 </button>
              </td>
            )}
          </tr>
        ))}
      </table>
      {editButton === true && editObject ? (
        <>
          <input
            className="inputBox"
            type="text"
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
          />
          <button onClick={() => handleSubmitChange(editContent)}>
            {" "}
            Make change{" "}
          </button>
        </>
      ) : (
        <p> Select an item to edit</p>
        
      )}
      <p> {comment}</p>
    </div>
  );
}
