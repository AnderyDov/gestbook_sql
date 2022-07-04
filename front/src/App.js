import "./App.css";
import List from "./list/List";
import Form from "./form/Form";
import { useState, useEffect } from "react";

export default function App() {
  let [base, setBase] = useState([]);
  let [name, setName] = useState("");
  let [note, setNote] = useState("");

  useEffect(() => {
    fetch("/notes")
      .then((res) => (res = res.json()))
      .then((res) => setBase(res));
  }, []);

  let out = (
    <>
      <h2 className="head">Gest book</h2>
      <div className="App">
        <Form
          setBase={setBase}
          name={name}
          setName={setName}
          note={note}
          setNote={setNote}
        />
        <List base={base} />
      </div>
    </>
  );

  return out;
}
