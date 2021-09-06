import React from "react";
import "./App.css";
import "./font-awesome.css";

window.onload = function () {
  const dateElement = document.getElementById("date");
  const list = document.getElementById("list");
  const input = document.getElementById("input");
  const date_section = document.getElementById("date_section");

  const CHECK = "fa-check-circle";
  const UNCHECK = "fa-circle-thin";
  const LINE_THROUGH = "lineThrough";

  let LIST, id;

  let data = localStorage.getItem("TODO");

  if (data) {
    LIST = JSON.parse(data);
    id = LIST.length;
    loadList(LIST);
  } else {
    LIST = [];
    id = 0;
  }

  function loadList(array) {
    array.forEach(function (item) {
      addToDo(item.name, item.id, item.done, item.trash);
    });
  }

  date_section.addEventListener("click", () => {
    localStorage.date_section();
    window.location.reload();
  });

  const options = { weekday: "long", month: "short", day: "numeric" };
  const today = new Date();

  dateElement.innerHTML = today.toLocaleDateString("en-US", options);

  function addToDo(toDo, id, done, trash) {
    if (trash) {
      return;
    }

    const DONE = done ? CHECK : UNCHECK;
    const LINE = done ? LINE_THROUGH : "";

    const item = `<li class="item">
                    <i class="fa ${DONE} co" job="complete" id="${id}"></i>
                    <p class="text ${LINE}">${toDo}</p>
                    <i class="fa fa-trash-o de" job="delete" id="${id}"></i>
                  </li>
                `;

    const position = "beforeend";

    list.insertAdjacentHTML(position, item);
  }

  document.addEventListener("keyup", function (even) {
    if (window.event.keyCode === 13) {
      const toDo = input.value;

      if (toDo) {
        addToDo(toDo, id, false, false);

        LIST.push({
          name: toDo,
          id: id,
          done: false,
          trash: false,
        });

        localStorage.setItem("TODO", JSON.stringify(LIST));

        id++;
      }
      input.value = "";
    }
  });

  function completeToDo(element) {
    element.classList.toggle(CHECK);
    element.classList.toggle(UNCHECK);
    element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);

    LIST[element.id].done = LIST[element.id].done ? false : true;
  }

  function removeToDo(element) {
    element.parentNode.parentNode.removeChild(element.parentNode);

    LIST[element.id].trash = true;
  }

  list.addEventListener("click", function (event) {
    const element = event.target;
    const elementJob = element.attributes.job.value;

    if (elementJob === "complete") {
      completeToDo(element);
    } else if (elementJob === "delete") {
      removeToDo(element);
    }

    localStorage.setItem("TODO", JSON.stringify(LIST));
  });
};

function App() {
  return (
    <>
      <div className="container">
        <div className="content">
          <div className="header">
            <div className="row">
              <div className="my-day">Shedule, Be productive</div>
              <div id="date_section">
                <div id="date"></div>
              </div>
            </div>
            <div className="column"></div>
          </div>
          <div className="item-area">
            <ul id="list"></ul>
            <div className="input-list-item">
              <i className="fa fa-plus co" job="add" id="1"></i>
              <input
                type="text"
                id="input"
                placeholder="Add Task"
                autofocus={true}
              />
            </div>
          </div>
        </div>
      </div>
      <script src="js/app.js"></script>
    </>
  );
}

export default App;
