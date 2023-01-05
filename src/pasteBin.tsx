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
  const [droppedDownID, setDroppedDownID] = useState<number[]>([]);

  const [editButton, setEditButton] = useState<boolean>(false);
  const [editObject, setEditObject] = useState<pasteI>();
  const [editContent, setEditContent] = useState<string>("");
  const [commentID, setCommentID] = useState<number | undefined>();
  const [displayComment, setDisplayComment] = useState<string>("");
  const [typedComment, setTypedComment] = useState<string>("");

  console.log(commentID, "current commentID");

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
    console.log("entered comment use effect");
    const fetchRemoteDb = async () => {
      //const response = await axios.get("")
      console.log("running fetchremoteDB function");
      try {
        const response = await axios.get(
          `http://localhost:4000/pastes/${commentID}`,
          { data: { id: commentID } }
        );
        console.log("get has ran");
        const wholeResponseData = response.data;
        const responseData = wholeResponseData.data;
        setDisplayComment(responseData);
      } catch (err) {
        console.log("get request failed");
      }
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
    console.log(response);
  };

  const handleShowComments = async (id: number) => {
    // console.log("show comment clicked")
    // const response = await axios.get(`http://localhost:4000/comments/${id}`, {
    //    data: {pasteId: id}
    // });
    // const wholeResponseData = response.data;
    // const responseData = wholeResponseData.data;
    // console.log("this is the comment", responseData);
    console.log("show comment button");
    setCommentID(id);
  };

  const handleMakeComment = async (id: number, comment: string) => {
    console.log("i am make comment");
    const response = await axios.post("http://localhost:4000/comments", {
      pasteid: id,
      comment: comment,
    });
    console.log(response, "made your comment");
    setTypedComment("");
    setCommentID(undefined);
  };

  return (
    <div>
      {typeof commentID === "number" ? (
        <>
          <input
            type="text"
            placeholder="make comment"
            value={typedComment}
            onChange={(e) => setTypedComment(e.target.value)}
          />
          <button
            onClick={() => handleMakeComment(commentID as number, typedComment)}
          >
            {" "}
            Submit comment{" "}
          </button>{" "}
        </>
      ) : (
        <></>
      )}
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
            {!droppedDownID.includes(item.id) ? (
              <td>
                {" "}
                {item.pastecontent.slice(0, 300)}...{" "}
                <button
                  key={item.id}
                  className="button"
                  onClick={() => setDroppedDownID([...droppedDownID, item.id])}
                >
                  {" "}
                  ⬇️{" "}
                </button>{" "}
                <button onClick={() => handleEdit(item.id)}>🖊</button>
                <button onClick={() => handleShowComments(item.id)}>
                  {" "}
                  🗨️{" "}
                </button>
                <button onClick={() => setCommentID(item.id)}> 📝 </button>
              </td>
            ) : (
              <td>
                {" "}
                {item.pastecontent}{" "}
                <button
                  key={item.id}
                  className="button"
                  onClick={() =>
                    setDroppedDownID([
                      ...droppedDownID.slice(
                        droppedDownID.indexOf(item.id) + 1
                      ),
                    ])
                  }
                >
                  {" "}
                  ⬆️{" "}
                </button>{" "}
                <button onClick={() => handleEdit(item.id)}>🖊</button>
                <button onClick={() => handleShowComments(item.id)}>
                  {" "}
                  🗨️{" "}
                </button>
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
      <p> {displayComment}</p>
    </div>
  );
}
