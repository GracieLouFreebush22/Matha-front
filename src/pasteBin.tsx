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
                ({item.pastecontent.slice(0, 300)}...{" "}
                <button className="button" onClick={() => setButton(!button)}>
                  {" "}
                  ⬇️{" "}
                </button>{" "}
                ){" "}
              </td>
            ) : (
              <td>
                {" "}
                {item.pastecontent}{" "}
                <button className="button" onClick={() => setButton(!button)}>
                  {" "}
                  ⬆️{" "}
                </button>{" "}
              </td>
            )}
          </tr>
        ))}
      </table>
    </div>
  );
}

//})}
/*
<div>
{pasteData.map((item) => (
  <div key= {item.id}>

  <li> {item.name} </li>
  <li> {item.title} </li>
  <li> {item.pasteContent}</li>
  </div>
))}
</div>
*/
