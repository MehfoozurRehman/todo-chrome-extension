import React, { useState, useEffect } from "react";
import "./App.css";
import "./font-awesome.css";

const STATUS_CLASSES = {
  checked: "fa-check-circle",
  unchecked: "fa-circle-thin",
  lineThrough: "lineThrough",
};

function App() {
  const [inputValue, setInputValue] = useState("");
  const [list, setList] = useState(
    () => JSON.parse(localStorage.getItem("TODO")) || []
  );
  const handleInputKeyUp = (event) => {
    if (window.event.keyCode === 13) {
      const toDo = input.value;

      if (toDo) {
        const newTask = {
          name: toDo,
          id: list.length > 0 ? list[list.length - 1].id + 1 : 0,
          done: false,
          trash: false,
        };
        setList([...list, newTask]);
        setInputValue("");
      }
    }
  };

  const handleItemClick = (event) => {
    const element = event.target;
    const elementJob = element.attributes.job.value;
    const elementId = parseInt(element.attributes.id.value);

    const newList = list.map((item) => {
      if (item.id === elementId) {
        switch (elementJob) {
          case "complete":
            return {
              ...item,
              done: !item.done,
            };
          case "delete":
            return {
              ...item,
              trash: true,
            };
          default:
            return item;
        }
      } else {
        return item;
      }
    });

    setList(newList);
  };

  useEffect(() => {
    localStorage.setItem("TODO", JSON.stringify(list));
  }, [list]);

  const options = { weekday: "long", month: "short", day: "numeric" };
  const today = new Date();
  const formattedDate = today.toLocaleDateString("en-US", options);

  return (
    <>
      <div className="container">
        <div className="content">
          <div className="header">
            <div className="row">
              <div className="my-day">Shedule, Be productive</div>
              <div id="date_section">
                <div id="date">{formattedDate}</div>
              </div>
            </div>
            <div className="column"></div>
          </div>
          <div className="item-area">
            <ul id="list" onClick={handleItemClick}>
              {list.map((item) => (
                <li
                  className="item"
                  key={item.id}
                  style={item.trash ? { display: "none" } : {}}
                >
                  <i
                    className={`fa ${
                      item.done ? STATUS_CLASSES.checked : STATUS_CLASSES.unchecked
                    } co`}
                    job="complete"
                    id={item.id}
                  ></i>
                  <p className={`text ${item.done ? STATUS_CLASSES.lineThrough : ""}`}>
                    {item.name}
                  </p>
                  <i className="fa fa-trash-o de" job="delete" id={item.id}></i>
                </li>
              ))}
            </ul>
            <div className="input-list-item">
              <i className="fa fa-plus co" job="add" id="1"></i>
              <input
                type="text"
                id="input"
                placeholder="Add Task"
                autoFocus={true}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyUp={handleInputKeyUp}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;