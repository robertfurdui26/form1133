const express = require("express");
const app = express();
const cors = require("cors");
const mysql = require("mysql");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "123",
  database: "form1",
});

app.post("/create", (req, res) => {
  const name = req.body.name;
  const password = req.body.password;
  db.query(
    "INSERT INTO myform (name,password) VALUES (?,?)",
    [name, password],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("succes");
      }
    }
  );
});

app.get("/show", (req, res) => {
  db.query(
    "SELECT * FROM myform",

    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.delete("/delete/:id", (req, res) => {
  const name = req.params.id;

  db.query("DELETE FROM myform WHERE id=?", [id], (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send(err);
    } else {
      res.send(result);
    }
  });
});

app.listen(3005, () => {
  console.log("hey it's is running in port 3005!");
});
