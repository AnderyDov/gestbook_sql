import { useState } from "react";
import "./form.css";

export default function Form({ setBase, name, setName, note, setNote }) {
  let [errNote, setErrNote] = useState("");

  let out = (
    <div className="form">
      <fieldset>
        <legend>Form to add</legend>
        <div>
          <input
            type="text"
            placeholder="введтите имя"
            value={name}
            onInput={(e) => setName(e.target.value.trim())}
          />
        </div>
        <div>
          <textarea
            placeholder="введтите отзыв"
            value={note}
            onInput={(e) => setNote(e.target.value.trim())}
          ></textarea>
        </div>
        <div className="err">{errNote}</div>
        <div>
          <button onClick={handlerAdd}>оставить отзыв</button>
        </div>
      </fieldset>
    </div>
  );

  function handlerAdd() {
    fetch("/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
        Accept: "application/json",
      },
      body: JSON.stringify({
        name: name,
        note: note,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res === "все поля надо заполнить") {
          setErrNote("все поля надо заполнить");
        } else if (res === "имя не меньше трёх символов") {
          setErrNote("имя не меньше трёх символов");
        } else {
          setBase(res);
          setName("");
          setNote("");
        }
      });
  }

  return out;
}
