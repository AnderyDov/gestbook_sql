import express from "express";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";
import { createPool } from "mysql2";
import { HOST, USER, PASSWORD, DB } from "./config/db.config.js";

let __dirname = dirname(fileURLToPath(import.meta.url));
__dirname = __dirname.split("back")[0];

const pool = createPool({
  host: HOST,
  user: USER,
  password: PASSWORD,
  database: DB,
  waitForConnections: true,
  connectionLimit: 30,
  queueLimit: 30,
});

const server = express();
server.use(bodyParser.json());
server.use(express.static(path.resolve(__dirname, "front/build")));

server.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, "front/build", "index.html"));
});

server.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});

server.get("/connect", (req, res) => {
  pool.query("SELECT * FROM notes", (err, result, fields) => {
    if (!err) {
      res.send("connect");
    } else {
      console.log(err);
    }
  });
});

server.get("/notes", (req, res) => {
  pool.query("SELECT * FROM notes", (err, result, fields) => {
    if (!err) {
      res.send(result);
    } else {
      console.log(err);
    }
  });
});

server.post("/add", (req, res) => {
  let t = req.body;
  if (t.name === "" || t.note === "") {
    res.send(JSON.stringify("все поля надо заполнить"));
  } else if (t.name.length < 3) {
    res.send(JSON.stringify("имя не меньше трёх символов"));
  } else {
    let date = `${new Date().getDate()} ${
      new Date().toDateString().split(" ")[1]
    } ${new Date().getFullYear()} ${formate(new Date().getHours())}:${formate(
      new Date().getMinutes()
    )}:${formate(new Date().getSeconds())}`;

    pool.query(
      `INSERT INTO notes (date, name, note) VALUES ('${date}', '${t.name}', '${t.note}')`,
      (err, result, fields) => {
        if (!err) {
          pool.query(`SELECT * FROM notes`, (err, result, fields) => {
            if (!err) {
              res.send(result);
            } else {
              console.log(err);
            }
          });
        } else {
          console.log(err);
        }
      }
    );
  }
});

server.use((req, res) => {
  res.send("error");
});

server.listen(3000, () => {
  console.log("http://localhost:3000");
});

function formate(num) {
  let str = num.toString();
  if (str.length < 2) {
    return `0${str}`;
  } else {
    return str;
  }
}
