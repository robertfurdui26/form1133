import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [formName, setFormName] = useState("");
  const [formPasssword, setFormPassword] = useState("");
  const [nameList, setNameList] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3005/show").then((response) => {
      setNameList(response.data);
    });
  }, []);

  const register = () => {
    axios
      .post("http://localhost:3005/create", {
        name: formName,
        password: formPasssword,
      })
      .then(() => {
        setNameList([...nameList, { name: formName, password: formPasssword }]);
      });
  };

  const getList = () => {
    axios.get("http://localhost:3005/show").then((response) => {
      setNameList(response.data);
    });
  };

  const deleteName = (id) => {
    axios.delete(`http://localhost:3005/delete/${id}`).then((response) => {
      setNameList(
        nameList.filter((val) => {
          return val.id != id;
        })
      );
    });
  };
  return (
    <div className="App">
      <form className="form">
        <h1>CRUD Application</h1>
        <label>UserName</label>
        <input
          type="text"
          onChange={(e) => {
            setFormName(e.target.value);
          }}
          placeholder="UserName"
        />
        <label>Password</label>
        <input
          type="curent-password"
          onChange={(e) => {
            setFormPassword(e.target.value);
          }}
          placeholder="Password"
        />
        <button type="submit" onClick={register}>
          Create
        </button>

        <button type="show" onClick={getList}>
          Show
        </button>

        {nameList.map((val) => {
          return (
            <div className="card">
              <h1> Name:{val.name}</h1>
              <p>Password:{val.password}</p>
              <button
                onClick={() => {
                  deleteName(val.id);
                }}
              >
                Delete
              </button>
              <input type="text" id="updateInput" />
              <button>Update</button>
            </div>
          );
        })}
      </form>
    </div>
  );
}

export default App;
