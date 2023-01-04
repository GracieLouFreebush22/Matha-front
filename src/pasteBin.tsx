import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";

interface pasteI {
  id: number;
  name: string;
  title: string;
  pasteContent: string;
}

export default function PasteBin(): JSX.Element {
  const [pasteData, setPasteData] = useState<pasteI[]>([]);
  console.log("I am trying to print paste data", pasteData);

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
  }, [pasteData]);

  console.log(pasteData);
  return (
    <div>
      <h1> Martha's Pastes </h1>

      <table className="table">
        <tr>
          <th> NAME </th>
          <th> TITLE </th>
          <th> CONTENT </th>
        </tr>

        {pasteData.map((item) => (
          <tr key={item.id}>
            <td> {item.name} </td>
            <td> {item.title} </td>
            <td> {item.pasteContent} </td>
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
