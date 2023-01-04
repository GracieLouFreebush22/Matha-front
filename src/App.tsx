import PasteBin from "./pasteBin";
import InputPastes from "./inputPastes";
import { useState } from "react";

export default function App(): JSX.Element {
  const [render, setRender] = useState<string>("home");

  return (
    <div>
      <h1> Martha's Pastes </h1>
      <button onClick={() => setRender("home")}>🏠</button>
      <button onClick={() => setRender("bin)")}>🗑️</button>
      {render === "home" ? <InputPastes /> : <PasteBin />}
    </div>
  );
}
